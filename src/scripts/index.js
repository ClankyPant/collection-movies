const {ipcRenderer} = require('electron');
const btnAdd = document.getElementById('btn-add-filme');

btnAdd.addEventListener('click', () => {
    ipcRenderer.send('open-cad-window', 'ping');
});