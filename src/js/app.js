let numeroSecreto = gerarNumeroAleatorio();

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
        setTexto('p', 'Você acertou o número secreto!');
    } else {
        if(chute > numeroSecreto){
            setTexto('p', 'Você errou. O número secreto é menor.');
        } else {
            setTexto('p', 'Você errou. O número secreto é maior.');
        }
    }
}

// Função que retorna um valor
function gerarNumeroAleatorio(){
    return parseInt(Math.floor(Math.random() * 10) + 1);
}

setTexto('h1', 'Jogo do número secreto');
setTexto('p', 'Escolha um número entre 1 e 10');