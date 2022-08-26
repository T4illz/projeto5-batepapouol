function verificaMsgs(){
    const msgsServer = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    msgsServer.then(carregarMsgs)
}


/* Template para msgs

`
        <li class="msg-simples">
        ${msgs[i].time} ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}
        </li>
        `
`
        <li class="msg-reservada">
        ${msgs[i].time} ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}
        </li>
        `

*/


function carregarMsgs(resp){
    
    console.log(resp.data);

    msgs = resp.data;

    const renderMsg = document.querySelector('.tela');
    renderMsg.innerHTML = '';
   for (let i = 0; i < msgs.length; i++){
        
        if (msgs[i].to !== 'Todos'){
            renderMsg.innerHTML = renderMsg.innerHTML + 
        `
        <li class="msg-reservada">
        ${msgs[i].time} ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}
        </li>
        `;
        }
        if (msgs[i].text === 'sai da sala...' || msgs[i].text === 'entra da sala...'){
            `
        <li class="entrou">
        ${msgs[i].time} ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}
        </li>
        `;
        }
        else {
            renderMsg.innerHTML = renderMsg.innerHTML + 
        `
        <li class="msg-simples">
        ${msgs[i].time} ${msgs[i].from} para ${msgs[i].to}: ${msgs[i].text}
        </li>
        `;
        }
    }
}

let usuario = prompt('Qual será seu usuário?');
const nome = 
{
    name: `${usuario}`
};
let nomes = [];
let msgs = [];

function verificaNome(){
    const entrando = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', nome);

    entrando.then(validaNome);
    entrando.catch(nomeInvalido);
}

verificaNome();

function carregaUsuarios(resp){
    const nomes = resp.data;
    console.log(nomes);    

}

function buscaUsuarios(){
    const servUsuarios = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
    servUsuarios.then(carregaUsuarios);
}

function validaNome(resp){
    console.log('Usuário valido!')
    
    buscaUsuarios();
    verificaMsgs();

}

function nomeInvalido(resp){
    if (resp.response.status === 400){
        usuario = prompt('Usuário já em uso, favor informar usuário!');
        verificaNome();
    }
    console.log(resp.response.status);
}