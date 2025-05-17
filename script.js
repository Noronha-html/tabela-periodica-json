const elementsData = [];

fetch('dados_quimica.json')
    .then(response => response.json())
    .then(data => {
        elements = data;
        displayTable(data, 1);
    })
    .catch(error => console.error("Erro!", error));

function displayTable(elements, rowNumber) {
    let elementsNumber = 0;

    elements.forEach(element => {
        const row = document.getElementById(`tr${rowNumber}`);

        const td = document.createElement('td');
        td.classList.add('element');

        if(element.grupo == 'red') {
            td.style.border = 'none';
        }
        else if(element.grupo == 'não metal') {
            td.style.backgroundColor = 'lightgreen';
        }
        else if(element.grupo == 'metal') {
            td.style.backgroundColor = 'lightblue';
        }
        else if(element.grupo == 'metal alcalino') {
            td.style.backgroundColor = 'greenyellow';
        }
        else if(element.grupo == 'metal alcalino-terroso') {
            td.style.backgroundColor = 'orangered';
        }
        else if(element.grupo == 'metal de transição') {
            td.style.backgroundColor = 'lightcoral';
        }
        else if(element.grupo == 'metalóide') {
            td.style.backgroundColor = 'blueviolet';
        }
        else if(element.grupo == 'gás nobre') {
            td.style.backgroundColor = 'darkblue';
        }
        else if(element.grupo == 'halogênio') {
            td.style.backgroundColor = 'purple';
        }
        else if(element.grupo == 'post-transition metal') {
            td.style.backgroundColor = 'orange';
        }

        row.appendChild(td);
        td.innerHTML = `
            <span class="z">${element.numeroAtomico}</span>
            <span class="simble">${element.simbolo}</span>
            <h1 class="name">${element.nome}</h1>
            <span class="mace">${element.massaAtomica}</span>
        `;

        elementsNumber++;

        if(elementsNumber == 18) {
            rowNumber++;
            elementsNumber = 0;
        }
    });

    console.log(elementsNumber);
}