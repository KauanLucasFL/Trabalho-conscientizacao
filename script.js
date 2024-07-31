document.addEventListener('DOMContentLoaded', () => {
    const trashItems = document.querySelectorAll('.trash-item');
    const dryTrashCan = document.getElementById('dry-trash-can');
    const organicTrashCan = document.getElementById('organic-trash-can');

    trashItems.forEach(item => {
        item.addEventListener('dragstart', dragStart);
    });

    [dryTrashCan, organicTrashCan].forEach(trashCan => {
        trashCan.addEventListener('dragover', dragOver);
        trashCan.addEventListener('drop', drop);
    });

    function dragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
        setTimeout(() => {
            e.target.style.display = 'none';
        }, 0);
    }

    function dragOver(e) {
        e.preventDefault();
    }

    function drop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData('text/plain');
        const draggable = document.getElementById(id);
        const trashType = draggable.getAttribute('data-type');
        const targetType = e.target.id === 'dry-trash-can' ? 'dry' : 'organic';

        if (trashType === targetType) {
            e.target.appendChild(draggable);
            draggable.style.display = 'block';
            alert('Você jogou o lixo na lixeira correta!');
        } else {
            draggable.style.display = 'block';
            alert('Lixeira errada! Tente novamente.');
        }
    }
});