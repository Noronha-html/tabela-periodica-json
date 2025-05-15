const elementsData = [];

fetch('dados_quimica.json')
    .then(response => response.json())
    .then(data => {
        elements = data;
        displayTable(data);
    })
    .catch(error => console.error("Erro!", error));

function displayTable(elements) {
    const container = document.getElementById('container');
    elements.forEach(element => {
        const row = document.createElement('tr');
        row.classList.add('tr');
        row.innerHTML = `
            <td class="element">
                <span class="z">${element.numeroAtomico}</span>
                <span class="simble">${element.simbolo}</span>
                <h1 class="name">${element.nome}</h1>
                <span class="mace">${element.massaAtomica}</span>
            </td>
        `;
        container.appendChild(row);
    });
}