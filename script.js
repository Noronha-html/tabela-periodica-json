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

/*function displayTable(elements) {
    const container = document.getElementById('container');
    const table = document.createElement('table');
    container.appendChild(table);

    // Crie as linhas da tabela
    for (let i = 0; i < 10; i++) { // 10 linhas para a tabela periódica
        const row = document.createElement('tr');
        table.appendChild(row);

        // Crie as colunas da tabela
        for (let j = 0; j < 18; j++) { // 18 colunas para a tabela periódica
            const cell = document.createElement('td');
            row.appendChild(cell);

            // Verifique se o elemento atual deve ser exibido na célula atual
            const elementIndex = i * 18 + j;
            if (elementIndex < elements.length) {
                const element = elements[elementIndex];
                cell.innerHTML = `
                    <span class="z">${element.numeroAtomico}</span>
                    <span class="simble">${element.simbolo}</span>
                    <h1 class="name">${element.nome}</h1>
                    <span class="mace">${element.massaAtomica}</span>
                `;
            }
        }
    }
}*/