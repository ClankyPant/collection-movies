const _ = require('underscore');
const {ipcRenderer} = require('electron');

let divNova = [];
let spanNova = [];
let buttonNovo = [];
let generSelected = {};
const btn = document.getElementById('btn-cadastrar');
const select = document.getElementById('list-of-gener');

btn.addEventListener('click', () => {
    let selectStatus = document.getElementById('status');

    if (_.isEmpty(generSelected)){
        ipcRenderer.send('show:msg:alert', 'Precisa ser escolhido ao menos um gênero!');
        return
    } else if (_.isEqual(selectStatus[selectStatus.selectedIndex].value, 'selecione')) {
        ipcRenderer.send('show:msg:alert', 'Escolha um status para o filme a ser adicionado!');
        return
    } else if (_.isEmpty(document.getElementById('nome-filme'))) {
        ipcRenderer.send('show:msg:alert', 'Escolha um nome para o Filme a ser adicionado!');
        return
    }
});

select.onchange = () => {
    let idx = select.selectedIndex;
    generSelected[idx] = select[select.selectedIndex].innerHTML;

    const generoContainer = document.getElementById('generos-container');

    divNova[idx] = document.createElement('div');
    divNova[idx].setAttribute('class', 'genero-selec');
    divNova[idx].setAttribute('id', select[select.selectedIndex].value);

    spanNova[idx] = document.createElement('span');
    spanNova[idx].innerHTML = select[select.selectedIndex].innerHTML;
    divNova[idx].appendChild(spanNova[idx]);
    
    buttonNovo[idx] = document.createElement('button');
    buttonNovo[idx].addEventListener('click', (e) => {
        e.preventDefault();
        delete generSelected[idx];
        select[idx].removeAttribute('hidden');
        divNova[idx].remove();
    });

    buttonNovo[idx].innerHTML = 'X';
    divNova[idx].appendChild(buttonNovo[idx]);

    generoContainer.appendChild(divNova[idx]);

    select[select.selectedIndex].setAttribute("hidden", '');
    select.value = 'undefined';
}

