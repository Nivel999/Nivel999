// ============================================
// TRUCO 12 PONTOS - Lógica do Jogo (script.js)
// ============================================
//
// ESTRUTURA DO CÓDIGO:
//
// 1. LOGIN / CADASTRO
//    - switchTab(): Alterna entre abas de login e cadastro
//    - handleLogin(): Processa login (apenas interface)
//    - handleRegister(): Processa cadastro com validação de senha
//    - logout(): Retorna à tela de login
//
// 2. NAVEGAÇÃO ENTRE TELAS
//    - showScreen(): Sistema de telas (mostra uma, esconde as demais)
//    - goToMenu(), openSettings(), saveSettings(), openHowToPlay()
//    - applyTheme(): Aplica tema da mesa (verde/azul/vermelho)
//
// 3. MODO ESCURO / CLARO
//    - toggleDarkLight(): Alterna classe light-mode no body
//    - loadDarkLightMode(): Carrega preferência salva no localStorage
//
// 4. EMBARALHAMENTO E ANIMAÇÃO
//    - showShuffleAnimation(): Animação 3D de riffle shuffle
//    - animateDeal(): Animação de distribuição de cartas aos jogadores
//
// 5. LÓGICA DO JOGO (TRUCO)
//    - buildDeck(): Monta o baralho com 30 cartas (ranks + manilhas + coringas)
//    - renderCardHTML(): Gera HTML visual de cada carta (naipe + valor)
//    - startHand(): Inicia uma nova mão (distribui cartas, reseta estado)
//    - renderUI(): Atualiza toda a interface do jogo
//    - playerPlayCard(): Jogador clica em uma carta para jogar
//    - processCardPlacement(): Coloca carta na mesa e avança turno
//    - executeBotTurn(): IA dos bots (escolhe carta ou pede truco)
//    - evaluateVazaProgress(): Verifica se a vaza terminou
//    - checkHandWinner(): Determina quem ganhou a mão (melhor de 3)
//    - resolveHandWinner(): Soma pontos e verifica fim de jogo
//
// 6. SISTEMA DE APOSTAS
//    - playerRaisesAposta(): Jogador pede truco/6/9/12
//    - botRaisesAposta(): Bot pede aumento (modal com aceitar/correr/aumentar)
//    - handleMaoDe11Logic(): Regra especial quando time tem 11 pontos
//
// 7. TELAS DE RESULTADO
//    - showVictoryScreen(): Exibe tela de vitória com placar
//    - showDefeatScreen(): Exibe tela de derrota com placar
//
// 8. COMO JOGAR (Página informativa)
//    - switchHtpTab(): Navega entre abas (Regras/Cartas/Contato)
//    - filterHtpContent(): Filtra cartões pela barra de pesquisa
//    - initCarousel(), moveCarousel(), goToSlide(): Controle do carrossel
//    - handleContact(): Processa envio do formulário de contato
//
// HIERARQUIA DAS CARTAS (CARD_POWERS):
//    4♣ (Zap) = 100 > 7♥ (Copeta) = 99 > A♠ (Espadilha) = 98 >
//    7♦ (Sete de Ouros) = 97 > Coringa = 50 > 3 = 15 > 2 = 14 >
//    A = 13 > K = 12 > J = 11 > Q = 10
//
// TIMES:
//    Time 1 (Jogador): Índices 0 (Você) e 2 (Parceiro)
//    Time 2 (Adversários): Índices 1 (Oponente 1) e 3 (Oponente 2)
// ============================================

// --- LOGIN / CADASTRO ---
function switchTab(tab) {
    const tabLogin = document.getElementById('tab-login');
    const tabRegister = document.getElementById('tab-register');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (tab === 'login') {
        tabLogin.classList.add('active');
        tabRegister.classList.remove('active');
        formLogin.classList.remove('hidden');
        formRegister.classList.add('hidden');
    } else {
        tabRegister.classList.add('active');
        tabLogin.classList.remove('active');
        formRegister.classList.remove('hidden');
        formLogin.classList.add('hidden');
    }
}

function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById('login-user').value.trim();
    if (user) {
        showScreen('main-menu');
        document.getElementById('welcome-msg').innerText = 'Bem-vindo, ' + user + '!';
    }
}

function handleRegister(e) {
    e.preventDefault();
    const pass = document.getElementById('reg-pass').value;
    const confirm = document.getElementById('reg-pass-confirm').value;

    if (pass !== confirm) {
        alert('As senhas não coincidem!');
        return;
    }

    const user = document.getElementById('reg-user').value.trim();
    alert('Cadastro realizado com sucesso!');
    showScreen('main-menu');
    document.getElementById('welcome-msg').innerText = 'Bem-vindo, ' + user + '!';
}

function logout() {
    showScreen('login-screen');
}

// --- NAVEGAÇÃO ENTRE TELAS ---
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(function(s) {
        s.classList.add('hidden');
    });
    document.getElementById(screenId).classList.remove('hidden');
}

function goToMenu() {
    showScreen('main-menu');
}

function openSettings() {
    showScreen('settings-menu');
}

function saveSettings() {
    var selectedTheme = document.getElementById('theme-select').value;
    localStorage.setItem('truco-theme', selectedTheme);
    applyTheme(selectedTheme);
    showScreen('main-menu');
}

function applyTheme(theme) {
    var isLight = document.body.classList.contains('light-mode');
    document.body.className = '';
    if (isLight) document.body.classList.add('light-mode');
    if (theme === 'blue') document.body.classList.add('theme-blue');
    if (theme === 'red') document.body.classList.add('theme-red');
}

function loadSavedTheme() {
    var savedTheme = localStorage.getItem('truco-theme') || 'green';
    document.getElementById('theme-select').value = savedTheme;
    applyTheme(savedTheme);
}

// --- EMBARALHAMENTO E ANIMAÇÃO ---
function showShuffleAnimation(callback) {
    showScreen('shuffle-screen');
    var deck = document.getElementById('shuffle-deck');
    deck.innerHTML = '';

    // Cria cartas visuais para o embaralhamento
    for (var i = 0; i < 20; i++) {
        var card = document.createElement('div');
        card.className = 'shuffle-card';
        card.style.transform = 'translateZ(' + (i * 0.5) + 'px)';
        deck.appendChild(card);
    }

    var cards = deck.querySelectorAll('.shuffle-card');

    // Fase 1: Separar em duas pilhas
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            if (i < 10) {
                cards[i].style.transform = 'translateX(-60px) rotateZ(-5deg) translateZ(' + (i * 0.5) + 'px)';
            } else {
                cards[i].style.transform = 'translateX(60px) rotateZ(5deg) translateZ(' + ((i - 10) * 0.5) + 'px)';
            }
        }
    }, 300);

    // Fase 2: Intercalar de volta
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.transform = 'translateX(0) rotateZ(0deg) translateZ(' + (i * 0.5) + 'px)';
        }
    }, 1000);

    // Fase 3: Repetir separação
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            if (i < 10) {
                cards[i].style.transform = 'translateX(-50px) rotateZ(-3deg) translateZ(' + (i * 0.5) + 'px)';
            } else {
                cards[i].style.transform = 'translateX(50px) rotateZ(3deg) translateZ(' + ((i - 10) * 0.5) + 'px)';
            }
        }
    }, 1600);

    // Fase 4: Juntar novamente
    setTimeout(function() {
        for (var i = 0; i < cards.length; i++) {
            cards[i].style.transform = 'translateX(0) rotateZ(0deg) translateZ(' + (i * 0.5) + 'px)';
        }
    }, 2200);

    // Finaliza e chama callback
    setTimeout(function() {
        if (callback) callback();
    }, 2800);
}

// Animação de distribuição de cartas
function animateDeal(callback) {
    var hands = [
        document.getElementById('hand-0'),
        document.getElementById('hand-1'),
        document.getElementById('hand-2'),
        document.getElementById('hand-3')
    ];

    // Limpa mãos
    hands.forEach(function(h) { h.innerHTML = ''; });

    var delay = 0;
    for (var round = 0; round < 3; round++) {
        for (var p = 0; p < 4; p++) {
            (function(player, r, d) {
                setTimeout(function() {
                    var cardDiv = document.createElement('div');
                    cardDiv.className = 'card card-back dealing';
                    cardDiv.innerHTML = '<div class="card-back-pattern"></div>';
                    cardDiv.style.animationDelay = '0s';
                    hands[player].appendChild(cardDiv);
                }, d);
            })(p, round, delay);
            delay += 120;
        }
    }

    setTimeout(function() {
        if (callback) callback();
    }, delay + 400);
}

// --- LÓGICA DO JOGO ---
// Tabela de poder de cada carta (quanto maior, mais forte)
var CARD_POWERS = {
    '4 PAUS': 100, '7 CORACAO': 99, 'A ESPADA': 98, '7 OURO': 97,
    'JOKER': 50, '3': 15, '2': 14, 'A': 13, 'K': 12, 'J': 11, 'Q': 10
};

// Estado global do jogo - controla pontos, turno, cartas e decisões
var state = {
    scoreTeam1: 0,
    scoreTeam2: 0,
    handValue: 1,
    lastToRaiseTeam: null,
    currentVaza: 0,
    hands: [[], [], [], []],
    playedThisVaza: [],
    vazaWinners: [],
    turn: 0,
    dealer: 3,
    vazaOpener: 0,
    waitingDecision: false,
    isMaoDe11: false,
    isMaoDeFerro: false
};

// Inicia partida: reseta placar e mostra animação de embaralhamento
function startGame() {
    state.scoreTeam1 = 0;
    state.scoreTeam2 = 0;
    state.dealer = Math.floor(Math.random() * 4);

    showShuffleAnimation(function() {
        showScreen('game-ui');
        startHand();
    });
}

function backToMenu() {
    if (confirm('Tem certeza que deseja sair? O progresso será perdido.')) {
        showScreen('main-menu');
    }
}

// Monta baralho: 4 naipes x 6 ranks + 4 manilhas + 2 coringas = 30 cartas
function buildDeck() {
    var deck = [];
    var ranks = ['Q', 'J', 'K', 'A', '2', '3'];
    var suits = [
        { symbol: '\u2660', color: 'c-black' },
        { symbol: '\u2663', color: 'c-black' },
        { symbol: '\u2665', color: 'c-red' },
        { symbol: '\u2666', color: 'c-red' }
    ];

    ranks.forEach(function(r) {
        suits.forEach(function(s) {
            deck.push({ text: r, rank: r, suit: s.symbol, color: s.color });
        });
    });

    // Manilhas (cartas especiais com força máxima)
    deck.push({ text: '4 PAUS', rank: '4', suit: '\u2663', color: 'c-black' });
    deck.push({ text: '7 CORACAO', rank: '7', suit: '\u2665', color: 'c-red' });
    deck.push({ text: 'A ESPADA', rank: 'A', suit: '\u2660', color: 'c-black' });
    deck.push({ text: '7 OURO', rank: '7', suit: '\u2666', color: 'c-red' });
    // Coringas
    deck.push({ text: 'JOKER', rank: '\u2605', suit: 'JOKER', color: 'c-joker' });
    deck.push({ text: 'JOKER', rank: '\u2605', suit: 'JOKER', color: 'c-joker' });

    return deck;
}

// Gera o HTML interno de uma carta (cantos com rank/naipe + naipe central)
function renderCardHTML(card) {
    if (card.suit === 'JOKER') {
        return '<span class="card-corner">' + card.rank + '</span>' +
               '<span class="card-suit-center">JOKER</span>' +
               '<span class="card-corner bottom">' + card.rank + '</span>';
    }
    return '<span class="card-corner">' + card.rank + '<br>' + card.suit + '</span>' +
           '<span class="card-suit-center">' + card.suit + '</span>' +
           '<span class="card-corner bottom">' + card.rank + '<br>' + card.suit + '</span>';
}

// Inicia nova mão: embaralha, distribui 3 cartas para cada jogador
function startHand() {
    state.currentVaza = 0;
    state.playedThisVaza = [];
    state.vazaWinners = [];
    state.handValue = 1;
    state.lastToRaiseTeam = null;
    state.waitingDecision = false;
    state.isMaoDe11 = (state.scoreTeam1 === 11 || state.scoreTeam2 === 11);
    state.isMaoDeFerro = (state.scoreTeam1 === 11 && state.scoreTeam2 === 11);

    if (state.isMaoDeFerro) {
        state.handValue = 1;
        updateLog('MÃO DE FERRO - No Escuro!');
    } else if (state.isMaoDe11) {
        state.handValue = 3;
        updateLog('MÃO DE 11 Ativa.');
    } else {
        updateLog('Nova rodada iniciada. Jogue!');
    }

    state.dealer = (state.dealer + 1) % 4;
    state.turn = (state.dealer + 1) % 4;
    state.vazaOpener = state.turn;

    var deck = buildDeck();
    deck.sort(function() { return Math.random() - 0.5; });

    for (var i = 0; i < 4; i++) {
        state.hands[i] = [deck.pop(), deck.pop(), deck.pop()];
    }

    resetVazaDots();
    clearTableSlots();

    // Animação de distribuição antes de renderizar as cartas reais
    animateDeal(function() {
        renderUI();

        if (state.isMaoDe11 && !state.isMaoDeFerro) {
            handleMaoDe11Logic();
        } else {
            if (state.turn !== 0) setTimeout(executeBotTurn, 1000);
        }
    });
}

function updateLog(msg) {
    document.getElementById('info-log').innerText = msg;
}

function clearTableSlots() {
    for (var i = 0; i < 4; i++) {
        document.getElementById('play-slot-' + i).innerHTML = '';
    }
}

function resetVazaDots() {
    for (var i = 0; i < 3; i++) {
        var dot = document.getElementById('vaza-' + i);
        dot.className = 'vaza-dot';
        dot.innerText = '-';
    }
}

function getNextRaiseValue(current) {
    if (current === 1) return 3;
    if (current === 3) return 6;
    if (current === 6) return 9;
    if (current === 9) return 12;
    return 12;
}

function renderUI() {
    document.getElementById('score-t1').innerText = state.scoreTeam1;
    document.getElementById('score-t2').innerText = state.scoreTeam2;
    document.getElementById('match-value').innerText = 'VALENDO ' + state.handValue + ' PONTO(S)';

    var isT1Turn = (state.turn === 0 || state.turn === 2);
    document.getElementById('t1-panel').className = 'team-score' + (isT1Turn ? ' active-turn' : '');
    document.getElementById('t2-panel').className = 'team-score' + (!isT1Turn ? ' active-turn' : '');

    for (var i = 0; i < 4; i++) {
        document.getElementById('seat-' + i).className = 'player-seat seat-' + getSeatName(i) + (state.turn === i ? ' active-player-glow' : '');
    }

    // Mão do jogador
    var pHand = document.getElementById('hand-0');
    pHand.innerHTML = '';
    state.hands[0].forEach(function(card, idx) {
        var cDiv = document.createElement('div');
        if (state.isMaoDeFerro) {
            cDiv.className = 'card card-back';
            cDiv.innerHTML = '<div class="card-back-pattern"></div>';
        } else {
            cDiv.className = 'card ' + card.color;
            cDiv.innerHTML = renderCardHTML(card);
            cDiv.onclick = function() { playerPlayCard(idx); };
        }
        pHand.appendChild(cDiv);
    });

    // Mãos dos bots
    for (var b = 1; b <= 3; b++) {
        var bHand = document.getElementById('hand-' + b);
        bHand.innerHTML = '';
        state.hands[b].forEach(function() {
            var cDiv = document.createElement('div');
            cDiv.className = 'card card-back';
            cDiv.innerHTML = '<div class="card-back-pattern"></div>';
            bHand.appendChild(cDiv);
        });
    }

    // Botão truco
    var btnT = document.getElementById('btn-truco');
    var nextVal = getNextRaiseValue(state.handValue);

    if (nextVal === 3) btnT.innerText = 'PEDIR TRUCO';
    else if (nextVal === 6) btnT.innerText = 'PEDIR 6';
    else if (nextVal === 9) btnT.innerText = 'PEDIR 9';
    else if (nextVal === 12) btnT.innerText = 'PEDIR 12';

    if (state.handValue === 12 || state.lastToRaiseTeam === 1 || state.waitingDecision || state.isMaoDe11 || state.isMaoDeFerro) {
        btnT.disabled = true;
    } else {
        btnT.disabled = false;
    }
}

function getSeatName(id) {
    if (id === 0) return 'bottom';
    if (id === 1) return 'right';
    if (id === 2) return 'top';
    return 'left';
}

function playerPlayCard(idx) {
    if (state.turn !== 0 || state.waitingDecision) return;
    var card = state.hands[0].splice(idx, 1)[0];
    processCardPlacement(0, card);
}

function processCardPlacement(playerID, card) {
    state.playedThisVaza.push({ playerId: playerID, card: card, team: (playerID % 2 === 0 ? 1 : 2) });
    var slot = document.getElementById('play-slot-' + playerID);
    slot.innerHTML = '<div class="card ' + card.color + '">' + renderCardHTML(card) + '</div>';
    state.turn = (state.turn + 1) % 4;
    renderUI();
    setTimeout(evaluateVazaProgress, 800);
}

// IA do bot: decide se pede truco (15% chance com manilha) ou joga carta
function executeBotTurn() {
    if (state.turn === 0 || state.waitingDecision) return;
    var currentBot = state.turn;
    var botTeam = (currentBot % 2 === 0 ? 1 : 2);

    // Apenas oponentes (time 2, bots 1 e 3) podem pedir truco
    if (botTeam === 2 && state.handValue < 12 && state.lastToRaiseTeam !== 2 && !state.isMaoDe11 && !state.isMaoDeFerro) {
        var hasGoodCard = state.hands[currentBot].some(function(c) {
            return CARD_POWERS[c.text] >= 97;
        });
        if (hasGoodCard && Math.random() < 0.15) {
            botRaisesAposta(currentBot);
            return;
        }
    }

    var cardIdx = 0;
    if (state.playedThisVaza.length > 0) {
        var currentMax = 0;
        state.playedThisVaza.forEach(function(p) {
            var power = CARD_POWERS[p.card.text] || 0;
            if (power > currentMax) currentMax = power;
        });

        var choices = [];
        state.hands[currentBot].forEach(function(c, i) {
            var p = CARD_POWERS[c.text] || 0;
            if (p > currentMax) choices.push({ c: c, i: i, p: p });
        });
        choices.sort(function(a, b) { return a.p - b.p; });

        if (choices.length > 0) cardIdx = choices[0].i;
    }

    var card = state.hands[currentBot].splice(cardIdx, 1)[0];
    processCardPlacement(currentBot, card);
}

// Avalia vaza: quando 4 cartas foram jogadas, determina o vencedor
function evaluateVazaProgress() {
    if (state.playedThisVaza.length < 4) {
        if (state.turn !== 0) executeBotTurn();
        return;
    }

    var bestPlay = state.playedThisVaza[0];
    var isTie = false;

    for (var i = 1; i < state.playedThisVaza.length; i++) {
        var currentPower = CARD_POWERS[state.playedThisVaza[i].card.text] || 0;
        var bestPower = CARD_POWERS[bestPlay.card.text] || 0;

        if (currentPower > bestPower) {
            bestPlay = state.playedThisVaza[i];
            isTie = false;
        } else if (currentPower === bestPower) {
            if (state.playedThisVaza[i].team !== bestPlay.team) {
                isTie = true;
            }
        }
    }

    var winnerTeam = 'tie';
    var dot = document.getElementById('vaza-' + state.currentVaza);

    if (isTie) {
        dot.className = 'vaza-dot tie';
        dot.innerText = 'E';
        updateLog('Empatou a rodada!');
    } else {
        winnerTeam = bestPlay.team;
        dot.className = 'vaza-dot t' + winnerTeam;
        dot.innerText = winnerTeam === 1 ? 'V' : 'D';
        updateLog('Time ' + (winnerTeam === 1 ? 'Seu' : 'Adversário') + ' ganhou a rodada.');
        state.turn = bestPlay.playerId;
        state.vazaOpener = state.turn;
    }

    state.vazaWinners.push(winnerTeam);
    state.playedThisVaza = [];
    state.currentVaza++;

    var handWinner = checkHandWinner();
    if (handWinner) {
        setTimeout(function() { resolveHandWinner(handWinner); }, 1000);
    } else {
        setTimeout(function() {
            clearTableSlots();
            renderUI();
            if (state.turn !== 0) executeBotTurn();
        }, 1000);
    }
}

function checkHandWinner() {
    var w = state.vazaWinners;
    var t1 = w.filter(function(x) { return x === 1; }).length;
    var t2 = w.filter(function(x) { return x === 2; }).length;

    if (t1 === 2) return 1;
    if (t2 === 2) return 2;
    if (w[0] === 'tie' && w[1] !== 'tie') return w[1];
    if (w[0] !== 'tie' && w[1] === 'tie') return w[0];
    if (w[2] === 'tie' && w[0] !== 'tie') return w[0];
    if (w.length === 3 && w.every(function(x) { return x === 'tie'; })) {
        return (state.dealer % 2 === 0) ? 2 : 1;
    }
    return null;
}

function resolveHandWinner(winnerTeam) {
    var pointsGained = state.handValue;
    if (winnerTeam === 1) {
        state.scoreTeam1 += pointsGained;
    } else {
        state.scoreTeam2 += pointsGained;
    }

    if (state.scoreTeam1 >= 12) {
        showVictoryScreen();
    } else if (state.scoreTeam2 >= 12) {
        showDefeatScreen();
    } else {
        updateLog((winnerTeam === 1 ? 'Seu time' : 'Adversários') + ' marcou +' + pointsGained + ' ponto(s).');
        setTimeout(startHand, 1500);
    }
}

// --- TELAS DE RESULTADO ---
function showVictoryScreen() {
    document.getElementById('victory-score').innerText = state.scoreTeam1 + ' x ' + state.scoreTeam2;
    showScreen('victory-screen');
}

function showDefeatScreen() {
    document.getElementById('defeat-score').innerText = state.scoreTeam1 + ' x ' + state.scoreTeam2;
    showScreen('defeat-screen');
}

// --- APOSTAS ---
function playerRaisesAposta() {
    if (state.turn !== 0 || state.waitingDecision) return;
    state.waitingDecision = true;
    state.lastToRaiseTeam = 1;
    var targetValue = getNextRaiseValue(state.handValue);

    updateLog('Você pediu para aumentar para ' + targetValue + '!');

    setTimeout(function() {
        var bot1P = 0;
        state.hands[1].forEach(function(c) { bot1P += (CARD_POWERS[c.text] || 0); });
        var bot3P = 0;
        state.hands[3].forEach(function(c) { bot3P += (CARD_POWERS[c.text] || 0); });
        var maxBotPower = Math.max(bot1P, bot3P);

        if (maxBotPower > 45 && targetValue < 12 && Math.random() < 0.25) {
            var counterValue = getNextRaiseValue(targetValue);
            state.handValue = targetValue;
            state.waitingDecision = false;
            botRaisesAposta(1, counterValue);
        } else if (maxBotPower > 28 || Math.random() < 0.5) {
            state.handValue = targetValue;
            updateLog('Bots aceitaram! Vale ' + state.handValue + ' pontos.');
            state.waitingDecision = false;
            renderUI();
        } else {
            updateLog('Bots correram! Seu time ganha ' + state.handValue + ' ponto(s).');
            state.waitingDecision = false;
            resolveHandWinner(1);
        }
    }, 1200);
}

function botRaisesAposta(botId, forcedValue) {
    state.waitingDecision = true;
    state.lastToRaiseTeam = 2;
    var targetValue = forcedValue ? forcedValue : getNextRaiseValue(state.handValue);
    var botTurnWhenRaised = state.turn;

    updateLog('Adversários pediram para aumentar para ' + targetValue + '!');

    var modal = document.getElementById('aposta-modal');
    document.getElementById('m-title').innerText = 'AUMENTARAM PARA ' + targetValue + '!';
    document.getElementById('m-desc').innerText = 'O que o seu time deseja fazer?';

    document.getElementById('btn-m-accept').onclick = function() {
        state.handValue = targetValue;
        modal.style.display = 'none';
        state.waitingDecision = false;
        renderUI();
        // Continua o jogo: se era a vez de um bot, ele joga a carta
        if (state.turn !== 0) {
            setTimeout(executeBotTurn, 800);
        }
    };

    document.getElementById('btn-m-fold').onclick = function() {
        modal.style.display = 'none';
        state.waitingDecision = false;
        resolveHandWinner(2);
    };

    var btnRaise = document.getElementById('btn-m-raise');
    var nextLevel = getNextRaiseValue(targetValue);
    if (targetValue >= 12) {
        btnRaise.style.display = 'none';
    } else {
        btnRaise.style.display = 'block';
        btnRaise.innerText = 'PEDIR ' + nextLevel;
        btnRaise.onclick = function() {
            modal.style.display = 'none';
            state.handValue = targetValue;
            state.lastToRaiseTeam = 1;
            state.waitingDecision = false;
            // Re-raise: funciona como se o jogador pedisse aumento
            updateLog('Você pediu para aumentar para ' + nextLevel + '!');
            setTimeout(function() {
                var bot1P = 0;
                state.hands[1].forEach(function(c) { bot1P += (CARD_POWERS[c.text] || 0); });
                var bot3P = 0;
                state.hands[3].forEach(function(c) { bot3P += (CARD_POWERS[c.text] || 0); });
                var maxBotPower = Math.max(bot1P, bot3P);

                if (maxBotPower > 28 || Math.random() < 0.5) {
                    state.handValue = nextLevel;
                    updateLog('Bots aceitaram! Vale ' + state.handValue + ' pontos.');
                    renderUI();
                    if (state.turn !== 0) {
                        setTimeout(executeBotTurn, 800);
                    }
                } else {
                    updateLog('Bots correram! Seu time ganha ' + state.handValue + ' ponto(s).');
                    resolveHandWinner(1);
                }
            }, 1000);
        };
    }
    modal.style.display = 'flex';
}

function handleMaoDe11Logic() {
    state.waitingDecision = true;
    if (state.scoreTeam1 === 11) {
        var modal = document.getElementById('aposta-modal');
        document.getElementById('m-title').innerText = 'MÃO DE 11 DO SEU TIME';
        document.getElementById('m-desc').innerText = 'Vocês têm 11 pontos. Jogar valendo 3 ou correr (1 ponto para os bots)?';
        document.getElementById('btn-m-raise').style.display = 'none';

        document.getElementById('btn-m-accept').onclick = function() {
            state.handValue = 3;
            modal.style.display = 'none';
            state.waitingDecision = false;
            renderUI();
            if (state.turn !== 0) setTimeout(executeBotTurn, 1000);
        };

        document.getElementById('btn-m-fold').onclick = function() {
            modal.style.display = 'none';
            state.waitingDecision = false;
            resolveHandWinner(2);
        };
        modal.style.display = 'flex';
    } else if (state.scoreTeam2 === 11) {
        if (Math.random() < 0.5) {
            updateLog('Adversários correram na Mão de 11. +1 ponto!');
            state.waitingDecision = false;
            resolveHandWinner(1);
        } else {
            updateLog('Adversários aceitaram a Mão de 11!');
            state.handValue = 3;
            state.waitingDecision = false;
            renderUI();
            if (state.turn !== 0) setTimeout(executeBotTurn, 1000);
        }
    }
}

// --- INICIALIZAÇÃO ---
// Carrega preferências salvas e inicializa componentes
loadSavedTheme();
loadDarkLightMode();
initCarousel();

// --- MODO ESCURO / CLARO ---
function toggleDarkLight() {
    document.body.classList.toggle('light-mode');
    var isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('truco-light-mode', isLight ? 'true' : 'false');
    var btn = document.getElementById('darkLightToggle');
    btn.innerHTML = isLight ? '&#9728;' : '&#9790;';
}

function loadDarkLightMode() {
    var saved = localStorage.getItem('truco-light-mode');
    if (saved === 'true') {
        document.body.classList.add('light-mode');
        document.getElementById('darkLightToggle').innerHTML = '&#9728;';
    }
}

// --- COMO JOGAR ---
function openHowToPlay() {
    showScreen('howtoplay-screen');
}

// Abas da página Como Jogar
function switchHtpTab(tab) {
    var tabs = document.querySelectorAll('.htp-tab');
    tabs.forEach(function(t) { t.classList.remove('active'); });

    document.getElementById('htp-regras').classList.add('hidden');
    document.getElementById('htp-cartas').classList.add('hidden');
    document.getElementById('htp-contato').classList.add('hidden');

    document.getElementById('htp-' + tab).classList.remove('hidden');

    // Ativar aba visual
    tabs.forEach(function(t) {
        if (t.textContent.toLowerCase().indexOf(tab.substring(0, 3)) !== -1) {
            t.classList.add('active');
        }
    });

    // Mapeamento direto
    if (tab === 'regras') tabs[0].classList.add('active');
    if (tab === 'cartas') tabs[1].classList.add('active');
    if (tab === 'contato') tabs[2].classList.add('active');
}

// Pesquisa/filtro de conteúdo
function filterHtpContent() {
    var query = document.getElementById('htp-search-input').value.toLowerCase().trim();
    var allCards = document.querySelectorAll('.info-card');

    allCards.forEach(function(card) {
        var searchData = (card.getAttribute('data-search') || '') + ' ' + card.textContent;
        if (query === '' || searchData.toLowerCase().indexOf(query) !== -1) {
            card.classList.remove('card-hidden');
        } else {
            card.classList.add('card-hidden');
        }
    });
}

// Carrossel
var carouselIndex = 0;

function initCarousel() {
    var dots = document.getElementById('carousel-dots');
    if (!dots) return;
    var slides = document.querySelectorAll('.carousel-slide');
    dots.innerHTML = '';
    for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('data-index', i);
        dot.onclick = function() { goToSlide(parseInt(this.getAttribute('data-index'))); };
        dots.appendChild(dot);
    }
}

function moveCarousel(dir) {
    var slides = document.querySelectorAll('.carousel-slide');
    carouselIndex += dir;
    if (carouselIndex < 0) carouselIndex = slides.length - 1;
    if (carouselIndex >= slides.length) carouselIndex = 0;
    goToSlide(carouselIndex);
}

function goToSlide(index) {
    var slides = document.querySelectorAll('.carousel-slide');
    var dots = document.querySelectorAll('.carousel-dot');
    carouselIndex = index;

    slides.forEach(function(s) { s.classList.remove('active'); });
    dots.forEach(function(d) { d.classList.remove('active'); });

    slides[carouselIndex].classList.add('active');
    if (dots[carouselIndex]) dots[carouselIndex].classList.add('active');
}

// Formulário de contato
function handleContact(e) {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Obrigado pelo contato.');
    e.target.reset();
}
