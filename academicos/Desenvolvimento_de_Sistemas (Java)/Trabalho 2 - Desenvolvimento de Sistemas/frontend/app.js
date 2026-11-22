// Endereço da API (backend Spring Boot)
const API_URL = "http://localhost:8080/api";

const formPaciente = document.getElementById("form-paciente");
const formConvenio = document.getElementById("form-convenio");
const selectConvenio = document.getElementById("convenio");
const tabelaPacientes = document.getElementById("tabela-pacientes");
const listaConvenios = document.getElementById("lista-convenios");
const campoBusca = document.getElementById("busca");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const tituloForm = document.getElementById("titulo-form");
const statusApi = document.getElementById("status-api");
const caixaMensagem = document.getElementById("mensagem");

let timerMensagem = null;
let timerBusca = null;

/* ---------- Comunicação com a API ---------- */

// Faz a requisição HTTP e transforma erros da API em exceções com mensagem amigável.
async function requisicao(caminho, opcoes = {}) {
    let resposta;
    try {
        resposta = await fetch(API_URL + caminho, {
            headers: { "Content-Type": "application/json" },
            ...opcoes,
        });
    } catch (e) {
        marcarApi(false);
        throw { mensagem: "Não foi possível conectar à API. Verifique se o backend está rodando em localhost:8080." };
    }
    marcarApi(true);

    if (resposta.status === 204) {
        return null;
    }

    const corpo = await resposta.json().catch(() => null);
    if (!resposta.ok) {
        throw {
            status: resposta.status,
            mensagem: (corpo && corpo.mensagem) || `Erro ${resposta.status} ao comunicar com a API`,
            campos: (corpo && corpo.campos) || {},
        };
    }
    return corpo;
}

/* ---------- Feedback visual ---------- */

function mostrarMensagem(texto, tipo = "sucesso") {
    caixaMensagem.textContent = texto;
    caixaMensagem.className = `mensagem ${tipo}`;
    clearTimeout(timerMensagem);
    timerMensagem = setTimeout(() => caixaMensagem.classList.add("oculto"), 4500);
}

function marcarApi(online) {
    statusApi.textContent = online ? "API online" : "API offline";
    statusApi.className = `status ${online ? "online" : "offline"}`;
}

function limparErros(form) {
    form.querySelectorAll(".erro-campo").forEach((el) => (el.textContent = ""));
    form.querySelectorAll(".invalido").forEach((el) => el.classList.remove("invalido"));
}

// Mostra cada erro de validação devolvido pela API embaixo do campo correspondente.
function mostrarErrosCampos(form, campos, prefixo = "") {
    Object.entries(campos).forEach(([campo, msg]) => {
        const nome = prefixo + campo;
        const aviso = form.querySelector(`.erro-campo[data-campo="${nome}"]`);
        if (aviso) aviso.textContent = msg;
        const input = form.querySelector(`#${nome}`);
        if (input) input.classList.add("invalido");
    });
}

function tratarErro(erro, form, prefixo) {
    if (form && erro.campos && Object.keys(erro.campos).length > 0) {
        mostrarErrosCampos(form, erro.campos, prefixo);
        mostrarMensagem("Corrija os campos destacados no formulário.", "erro");
    } else {
        mostrarMensagem(erro.mensagem || "Erro inesperado.", "erro");
    }
}

function escapar(texto) {
    const div = document.createElement("div");
    div.textContent = texto ?? "";
    return div.innerHTML;
}

function formatarData(iso) {
    if (!iso) return "-";
    const [ano, mes, dia] = iso.split("-");
    return `${dia}/${mes}/${ano}`;
}

/* ---------- Convênios ---------- */

async function carregarConvenios() {
    try {
        const convenios = await requisicao("/convenios");
        const selecionado = selectConvenio.value;

        selectConvenio.innerHTML = '<option value="">Selecione um convênio</option>' +
            convenios.map((c) => `<option value="${c.id}">${escapar(c.nome)}</option>`).join("");
        selectConvenio.value = selecionado;

        listaConvenios.innerHTML = convenios.length === 0
            ? '<li class="vazio">Nenhum convênio cadastrado</li>'
            : convenios.map((c) => `
                <li>
                    <span>${escapar(c.nome)}</span>
                    <button class="perigo pequeno" data-excluir-convenio="${c.id}" data-nome="${escapar(c.nome)}">Excluir</button>
                </li>`).join("");
    } catch (erro) {
        tratarErro(erro);
    }
}

formConvenio.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formConvenio);
    const input = document.getElementById("convenio-nome");
    try {
        await requisicao("/convenios", { method: "POST", body: JSON.stringify({ nome: input.value.trim() }) });
        mostrarMensagem("Convênio cadastrado com sucesso!");
        input.value = "";
        await carregarConvenios();
    } catch (erro) {
        // A API devolve o erro no campo "nome"; no HTML o campo se chama "convenio-nome".
        tratarErro(erro, formConvenio, "convenio-");
    }
});

listaConvenios.addEventListener("click", async (evento) => {
    const botao = evento.target.closest("[data-excluir-convenio]");
    if (!botao) return;
    if (!confirm(`Excluir o convênio "${botao.dataset.nome}"?`)) return;
    try {
        await requisicao(`/convenios/${botao.dataset.excluirConvenio}`, { method: "DELETE" });
        mostrarMensagem("Convênio excluído.");
        await carregarConvenios();
    } catch (erro) {
        // Ex.: 409 Conflict quando há pacientes vinculados ao convênio
        tratarErro(erro);
    }
});

/* ---------- Pacientes ---------- */

async function carregarPacientes() {
    const nome = campoBusca.value.trim();
    const filtro = nome ? `?nome=${encodeURIComponent(nome)}` : "";
    try {
        const pacientes = await requisicao("/pacientes" + filtro);
        const idEditando = document.getElementById("paciente-id").value;

        tabelaPacientes.innerHTML = pacientes.length === 0
            ? '<tr><td colspan="7" class="vazio">Nenhum paciente encontrado</td></tr>'
            : pacientes.map((p) => `
                <tr class="${String(p.id) === idEditando ? "editando" : ""}">
                    <td>${p.id}</td>
                    <td>${escapar(p.nome)}</td>
                    <td>${escapar(p.email)}</td>
                    <td>${escapar(p.telefone) || "-"}</td>
                    <td>${formatarData(p.dataNascimento)}</td>
                    <td>${escapar(p.convenio ? p.convenio.nome : "-")}</td>
                    <td class="acoes">
                        <button class="secundario pequeno" data-editar="${p.id}">Editar</button>
                        <button class="perigo pequeno" data-excluir="${p.id}" data-nome="${escapar(p.nome)}">Excluir</button>
                    </td>
                </tr>`).join("");
    } catch (erro) {
        tabelaPacientes.innerHTML = '<tr><td colspan="7" class="vazio">Não foi possível carregar os pacientes</td></tr>';
        tratarErro(erro);
    }
}

function dadosDoFormulario() {
    const convenioId = selectConvenio.value;
    return {
        nome: document.getElementById("nome").value.trim(),
        email: document.getElementById("email").value.trim(),
        telefone: document.getElementById("telefone").value.trim() || null,
        dataNascimento: document.getElementById("dataNascimento").value || null,
        // A chave estrangeira é enviada como objeto com o id do convênio
        convenio: convenioId ? { id: Number(convenioId) } : null,
    };
}

function resetarFormulario() {
    formPaciente.reset();
    document.getElementById("paciente-id").value = "";
    limparErros(formPaciente);
    tituloForm.textContent = "Novo paciente";
    btnSalvar.textContent = "Cadastrar";
    btnCancelar.classList.add("oculto");
    tabelaPacientes.querySelectorAll("tr.editando").forEach((tr) => tr.classList.remove("editando"));
}

formPaciente.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    limparErros(formPaciente);

    const id = document.getElementById("paciente-id").value;
    const editando = Boolean(id);
    btnSalvar.disabled = true;
    try {
        await requisicao(editando ? `/pacientes/${id}` : "/pacientes", {
            method: editando ? "PUT" : "POST",
            body: JSON.stringify(dadosDoFormulario()),
        });
        mostrarMensagem(editando ? "Paciente atualizado com sucesso!" : "Paciente cadastrado com sucesso!");
        resetarFormulario();
        await carregarPacientes();
    } catch (erro) {
        tratarErro(erro, formPaciente);
    } finally {
        btnSalvar.disabled = false;
    }
});

btnCancelar.addEventListener("click", resetarFormulario);

tabelaPacientes.addEventListener("click", async (evento) => {
    const editar = evento.target.closest("[data-editar]");
    const excluir = evento.target.closest("[data-excluir]");

    if (editar) {
        try {
            const p = await requisicao(`/pacientes/${editar.dataset.editar}`);
            resetarFormulario();
            document.getElementById("paciente-id").value = p.id;
            document.getElementById("nome").value = p.nome;
            document.getElementById("email").value = p.email;
            document.getElementById("telefone").value = p.telefone || "";
            document.getElementById("dataNascimento").value = p.dataNascimento || "";
            selectConvenio.value = p.convenio ? p.convenio.id : "";
            tituloForm.textContent = `Editando paciente #${p.id}`;
            btnSalvar.textContent = "Salvar alterações";
            btnCancelar.classList.remove("oculto");
            editar.closest("tr").classList.add("editando");
            document.getElementById("nome").focus();
        } catch (erro) {
            tratarErro(erro);
        }
    }

    if (excluir) {
        if (!confirm(`Excluir o paciente "${excluir.dataset.nome}"?`)) return;
        try {
            await requisicao(`/pacientes/${excluir.dataset.excluir}`, { method: "DELETE" });
            mostrarMensagem("Paciente excluído.");
            if (document.getElementById("paciente-id").value === excluir.dataset.excluir) {
                resetarFormulario();
            }
            await carregarPacientes();
        } catch (erro) {
            tratarErro(erro);
        }
    }
});

campoBusca.addEventListener("input", () => {
    clearTimeout(timerBusca);
    timerBusca = setTimeout(carregarPacientes, 300);
});

/* ---------- Inicialização ---------- */

carregarConvenios();
carregarPacientes();
