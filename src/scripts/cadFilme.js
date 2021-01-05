let generSelected = {};
const select = document.getElementById('list-of-gener');
const btn = document.getElementById('btn-t');
let divNova = [];
let spanNova = [];
let buttonNovo = [];

btn.addEventListener('click', () => {
    console.log(generSelected)

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

