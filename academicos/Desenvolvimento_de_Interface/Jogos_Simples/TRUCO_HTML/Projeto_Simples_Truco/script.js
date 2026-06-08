
        const POWERS = { '4 PAUS': 100, '7 CORACAO': 99, 'A ESPADA': 98, '7 OURO': 97, 'JOKER': 50, '3': 15, '2': 14, 'A': 13, 'K': 12, 'J': 11, 'Q': 10 };
        let state = { s1: 0, s2: 0, val: 1, hand: 0, hands: [], played: [], winners: [], turn: 0, dealer: 0 };

        function buildDeck() {
            let d = [];
            ['Q', 'J', 'K', 'A', '2', '3'].forEach(r => {
                d.push({ t: r, c: 'c-black' }, { t: r, c: 'c-red' }, { t: r, c: 'c-black' }, { t: r, c: 'c-red' });
            });
            d.push({ t: '4 PAUS', c: 'c-black' }, { t: '7 CORACAO', c: 'c-red' }, { t: 'A ESPADA', c: 'c-black' }, { t: '7 OURO', c: 'c-red' }, { t: 'JOKER', c: 'c-joker' }, { t: 'JOKER', c: 'c-joker' });
            return d.sort(() => Math.random() - 0.5);
        }

        function startHand() {
            state.played = []; state.winners = []; state.val = 1;
            state.dealer = (state.dealer + 1) % 4; state.turn = (state.dealer + 1) % 4;
            let deck = buildDeck();
            state.hands = Array.from({ length: 4 }, () => [deck.pop(), deck.pop(), deck.pop()]);
            document.querySelectorAll('.played-card-slot').forEach(s => s.innerHTML = '');
            document.getElementById('info-log').innerText = "Nova rodada iniciada.";
            render();
            if (state.turn !== 0) setTimeout(botTurn, 600);
        }

        function render() {
            document.getElementById('score-t1').innerText = state.s1;
            document.getElementById('score-t2').innerText = state.s2;
            document.getElementById('match-value').innerText = `VALENDO ${state.val} PONTO(S)`;

            const hand0 = document.getElementById('hand-0'); hand0.innerHTML = '';
            state.hands[0].forEach((card, idx) => {
                let div = document.createElement('div');
                div.className = `card ${card.c}`; div.innerText = card.t;
                div.onclick = () => playCard(0, idx);
                hand0.appendChild(div);
            });

            for (let i = 1; i <= 3; i++) {
                const h = document.getElementById(`hand-${i}`); h.innerHTML = '';
                state.hands[i].forEach(() => {
                    let div = document.createElement('div'); div.className = 'card card-back'; div.innerText = '?';
                    h.appendChild(div);
                });
            }
            document.getElementById('btn-truco').disabled = state.val >= 12 || state.turn !== 0;
        }

        function playCard(pId, idx) {
            if (state.turn !== pId) return;
            let card = state.hands[pId].splice(idx, 1)[0];
            state.played.push({ pId, card, team: pId % 2 === 0 ? 1 : 2 });
            document.getElementById(`play-slot-${pId}`).innerHTML = `<div class="card ${card.c}">${card.t}</div>`;
            state.turn = (state.turn + 1) % 4;
            render();
            setTimeout(evaluate, 600);
        }

        function botTurn() {
            if (state.turn === 0) return;
            playCard(state.turn, 0);
        }

        function evaluate() {
            if (state.played.length < 4) { botTurn(); return; }
            let best = state.played[0], tie = false;
            for (let i = 1; i < 4; i++) {
                let p1 = POWERS[state.played[i].card.t], p2 = POWERS[best.card.t];
                if (p1 > p2) { best = state.played[i]; tie = false; }
                else if (p1 === p2 && state.played[i].team !== best.team) tie = true;
            }

            let wTeam = tie ? 'tie' : best.team;
            state.winners.push(wTeam);
            state.played = [];
            if (!tie) state.turn = best.pId;

            document.querySelectorAll('.played-card-slot').forEach(s => s.innerHTML = '');
            document.getElementById('info-log').innerText = tie ? "Empatou a vaza!" : `Time ${wTeam === 1 ? 'Seu' : 'Adversário'} levou a vaza.`;

            let hWin = checkWin();
            if (hWin) {
                if (hWin === 1) state.s1 += state.val; else state.s2 += state.val;
                alert(hWin === 1 ? `Seu time ganhou +${state.val} ponto(s)!` : `Adversários ganharam +${state.val} ponto(s)!`);
                if (state.s1 >= 12 || state.s2 >= 12) {
                    alert(state.s1 >= 12 ? "FIM DE JOGO! SEU TIME VENCEU! 🏆" : "FIM DE JOGO! VITÓRIA DOS BOTS! 🤖");
                    state.s1 = 0; state.s2 = 0;
                }
                startHand();
            } else {
                render();
                if (state.turn !== 0) setTimeout(botTurn, 600);
            }
        }

        function checkWin() {
            const w = state.winners, t1 = w.filter(x => x === 1).length, t2 = w.filter(x => x === 2).length;
            if (t1 === 2) return 1; if (t2 === 2) return 2;
            if (w[0] === 'tie' && w[1] !== 'tie') return w[1];
            if (w[0] !== 'tie' && w[1] === 'tie') return w[0];
            if (w[2] === 'tie' && w[0] !== 'tie') return w[0];
            if (w.length === 3 && w.every(x => x === 'tie')) return state.dealer % 2 === 0 ? 2 : 1;
            return null;
        }

        function pedirTruco() {
            if (state.turn !== 0 || state.val >= 12) return;
            let proximoValor = state.val === 1 ? 3 : state.val + 3;
            if (confirm(`Deseja pedir aumento para ${proximoValor} pontos?`)) {
                if (Math.random() > 0.3) {
                    state.val = proximoValor;
                    alert(`Os adversários aceitaram! A rodada agora vale ${state.val} pontos.`);
                } else {
                    alert("Os adversários correram! Seu time ganha os pontos atuais da mão.");
                    state.s1 += state.val;
                    startHand();
                }
                render();
            }
        }

        window.onload = startHand;