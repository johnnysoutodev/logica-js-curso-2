let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

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
    return parseInt(Math.floor(Math.random() * 10) + 1);
}

// Função para limpar campo de entrada
function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

setTexto('h1', 'Jogo do número secreto');
setTexto('p', 'Escolha um número entre 1 e 10');