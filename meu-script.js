function verificaMsgs(){
    const msgsServer = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    msgsServer.then(carregarMsgs)
}

function carregarMsgs(resp){
    console.log(resp.data);
}

let usuario = prompt('Qual será seu usuário?');
const nome = 
{
    name: `${usuario}`
};
const nomes = [];
const msgs = [];

function verificaNome(){
    const entrando = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

    entrando.then(validaNome);
    entrando.catch(nomeInvalido);
}

verificaNome();

function validaNome(resp){
    console.log('Usuário valido!')
        verificaMsgs();

}

function nomeInvalido(resp){
    if (resp.response.status === 400){
        usuario = prompt('Usuário já em uso, favor informar usuário!');
        verificaNome();
    }
    console.log(resp.response.status);
}