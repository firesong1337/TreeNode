document.addEventListener("DOMContentLoaded", function() {
    const treeContainer = document.getElementById('tree'); 

    fetch('/tree-data')
        .then(response => response.json())
        .then(data => {
            const treeData = buildTree(data.services);
            const treeHTML = htmlTree(treeData);
            treeContainer.innerHTML = treeHTML;
        })
        .catch(error => {
            console.error('Ошибка получения данных:', error);
        });
});

function buildTree(data, parentId = null) {
    const filteredNodes = data.filter(node => node.head === parentId);
    const sortedNodes = filteredNodes.sort((a, b) => a.sorthead - b.sorthead);
    return sortedNodes.map(node => ({
        name: node.name,
        price: node.price,
        children: buildTree(data, node.id)
    }));
}


function htmlTree(treeData) {
    return `<ul>${treeData.reduce((html, node) => html + 
        `<li>${node.name}${node.price ? ` (${node.price})` : ''}${node.children && node.children.length > 0 ? htmlTree(node.children) : ''}</li>`, '')}</ul>`;
}
