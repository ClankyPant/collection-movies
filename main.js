const {app, BrowserWindow, ipcMain,dialog, ipcRenderer} = require('electron');
const path = require('path');
const _ = require('underscore');

let mainWindow;
let cadMovieWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 850,
        height: 850,
        minWidth: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // mainWindow.removeMenu();
    mainWindow.loadFile(path.join('src','views','index.html'));
    mainWindow.on('close', () => {
        app.quit();
    });

    ipcMain.on('open:cad:window', (event, arg) => {
        cadMovieWindow = new BrowserWindow({
            width: 750,
            height: 850,
            webPreferences: {
                nodeIntegration: true
            }
        });
        // cadMovieWindow.removeMenu();
        cadMovieWindow.loadFile(path.join('src', 'views', 'cadFilmes.html'));
        cadMovieWindow.on('close', () => {
            cadMovieWindow = null;
        });
    });

    ipcMain.on('show:msg:alert', (event, arg) => {
        dialog.showMessageBox(cadMovieWindow, {
            title: 'Aviso!',
            buttons: ['Fechar'],
            type: 'warning',
            message: arg,
        });
    });

    ipcMain.on('cadastrar:movies', (event, arg) => {
        const sqlite3 = require('sqlite3').verbose();

        let db = new sqlite3.Database(path.join('src','dataBase', 'db.db'), (error) => {
            if (error) {
                console.log(error);
            }
        });

        db.serialize(() => {
            db.run(` CREATE TABLE IF NOT EXISTS filmes (
                nome_filme VARCHAR(100) NOT NULL,
                generos VARCHAR(100),
                status VARCHAR(100) 
            ); `);
            
            let generosToArray = _.toArray(arg.generos).join(', ');
            
            db.run(' INSERT INTO filmes (nome_filme, generos, status) VALUES (?, ?, ?); ', [arg.nomeFilme, generosToArray, arg.status], (error) => {

                if (error) {
                    console.log(error.message);
                }
            });

            db.close();
        });
    });

    ipcMain.on('close:cad:win', (event, arg) => {
        if (!_.isNull(cadMovieWindow)) {
            cadMovieWindow.close();
            dialog.showMessageBox(cadMovieWindow, {
                title: 'Aviso!',
                buttons: ['Fechar'],
                type: 'info',
                message: 'Cadastro Concluido!',
            });
        }
    });
});