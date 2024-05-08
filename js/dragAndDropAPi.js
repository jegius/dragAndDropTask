document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-container');

    document.querySelectorAll('.draggable').forEach(item => {
        item.addEventListener('dragstart', (e) => {
            const rect = item.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            e.dataTransfer.setData('text/plain', JSON.stringify({
                id: item.id,
                offsetX,
                offsetY
            }));
            e.dataTransfer.effectAllowed = 'move';

            item.style.opacity = '0.5';
        });

        item.addEventListener('dragend', (e) => {
            e.preventDefault();
            item.style.opacity = '1';
        });
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const data = e.dataTransfer.getData('text/plain');
        const {id} = JSON.parse(data);
        const draggedItem = document.getElementById(id);

        if (draggedItem) {
            dropZone.appendChild(draggedItem);
            draggedItem.style.position = 'static';
            draggedItem.style.opacity = '1';
        }
    });
});
