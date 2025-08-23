let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let paragrafoComNumeroLimite = `Escolha um número entre 1 e ${numeroLimite}`;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let tipoVoz = responsiveVoice.setDefaultVoice('Brazilian Portuguese Female');
let tempoVoz = responsiveVoice.setDefaultRate(1.1);

// Função exclusivamente para exibir uma mensagem inicial
function exibirMensagemInicial() {
    setTexto('h1', 'Jogo do número secreto');
    setTexto('p', paragrafoComNumeroLimite);
}

exibirMensagemInicial();

// Função para validar suporte à API de voz
function validarSuporteVoz() {
    return responsiveVoice.voiceSupport() ? true : (console.log("ResponsiveVoice Speech API não suportada neste navegador."), false);
}

// Função para falar texto usando ResponsiveVoice
function falarTexto(texto) {
    if (validarSuporteVoz()) {
        responsiveVoice.speak(texto, tipoVoz, {rate: tempoVoz});
    }
}

// Função com parametros e sem retorno
function setTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    falarTexto(texto)
}

// Função sem parametros
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        setTexto('h1', 'Parabéns!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}!`;
        setTexto('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto){
            setTexto('p', 'Você errou. O número secreto é menor.');
        } else {
            setTexto('p', 'Você errou. O número secreto é maior.');
        }
        tentativas++;
        limparCampo();
    }
}

// Função que retorna um valor
function gerarNumeroAleatorio(){
    let numeroEscolhido = parseInt(Math.floor(Math.random() * numeroLimite) + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == 3) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

// Função para limpar campo de entrada
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

// Função reiniciarJogo para poder jogar novamente
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled', 'true');
    exibirMensagemInicial()
}

// ✅ APENAS VALIDAÇÃO SIMPLES - Adicionada no final
document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('input');
    
    if (input) {
        // Remove apenas caracteres não numéricos durante a digitação
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
        
        // Permite Enter para chutar
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verificarChute();
            }
        });
    }
});