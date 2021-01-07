const {ipcRenderer} = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const btnAdd = document.getElementById('btn-add-filme');

let divArray = [];
let spanArray = [];
let imgCheckArray = [];
let imgGiveUpArray = [];
let imgTrashArray = [];


btnAdd.addEventListener('click', () => {
    ipcRenderer.send('open:cad:window', 'ping');
});

const selectAllMovies = () => {
    let db = new sqlite3.Database(path.join('src','dataBase', 'db.db'), (error) => {
        if (error) {
            console.log(error);
        }
    });

    db.all(`SELECT rowid, * FROM FILMES;`, [], (error, rows) => {
        refreshList(rows);
    });
    
    db.close();
};

const refreshList = (rows) => {
    
    let mainDiv = document.querySelector('.list-of-movies');
    mainDiv.textContent = '';

    rows.forEach((row) => {
        let idx = row.rowid;
        console.log(row);
        divArray[idx] = document.createElement('div');
        divArray[idx].setAttribute('class', 'container-movie');
        divArray[idx].setAttribute('id', 'div'+idx);

        spanArray[idx] = document.createElement('span');
        spanArray[idx].setAttribute('class', 'nome-filme');
        spanArray[idx].setAttribute('id', 'span'+idx);
        spanArray[idx].innerHTML = row.nome_filme;
        divArray[idx].appendChild(spanArray[idx]);

        imgCheckArray[idx] = document.createElement('img');
        imgCheckArray[idx].setAttribute('src', '../img/check-img.svg');
        imgCheckArray[idx].setAttribute('id', 'check-img'+idx);
        imgCheckArray[idx].setAttribute('class', 'first-img');
        imgCheckArray[idx].setAttribute('alt', 'check-img');
        if (row.status !== "assistido" &&  row.status !== "nao-finalizado") {
            divArray[idx].setAttribute('style', "background-color: #9ae0a1e0;");
        }
        divArray[idx].appendChild(imgCheckArray[idx]);

        imgGiveUpArray[idx] = document.createElement('img');
        imgGiveUpArray[idx].setAttribute('src', '../img/give-up-img.svg');
        imgGiveUpArray[idx].setAttribute('id', 'check-img'+idx);
        imgGiveUpArray[idx].setAttribute('alt', 'give-up-img');
        divArray[idx].appendChild(imgGiveUpArray[idx]);

        imgTrashArray[idx] = document.createElement('img');
        imgTrashArray[idx].setAttribute('src', '../img/trash-img.svg');
        imgTrashArray[idx].setAttribute('id', 'check-img'+idx);
        imgTrashArray[idx].setAttribute('alt', 'trash-img');
        divArray[idx].appendChild(imgTrashArray[idx]);

        mainDiv.appendChild(divArray[idx]);
    });
};

selectAllMovies();