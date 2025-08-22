let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let paragrafoComNumeroLimite = `Escolha um número entre 1 e ${numeroLimite}`;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// Função exclusivamente para exibir uma mensagem inicial
function exibirMensagemInicial() {
    setTexto('h1', 'Jogo do número secreto');
    setTexto('p', paragrafoComNumeroLimite);
}

exibirMensagemInicial();

// Função com parametros e sem retorno
function setTexto(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
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