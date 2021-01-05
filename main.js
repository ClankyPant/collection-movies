const {app, BrowserWindow, ipcMain,dialog} = require('electron');
const path = require('path');

let mainWindow;
let cadMovieWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 850,
        height: 850,
        webPreferences: {
            nodeIntegration: true
        }
    });
    mainWindow.removeMenu();
    mainWindow.loadFile(path.join('src','views','index.html'));

    ipcMain.on('open:cad:window', (event, arg) => {
        cadMovieWindow = new BrowserWindow({
            webPreferences: {
                nodeIntegration: true
            }
        });
        cadMovieWindow.removeMenu();
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
        })
    });
});