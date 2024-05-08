document.addEventListener('DOMContentLoaded', () => {
    let selected = null;
    let origX = 0;
    let origY = 0;
    let mouseX = 0;
    let mouseY = 0;

    function dragInit(elem) {
        selected = elem;
        origX = elem.offsetLeft;
        origY = elem.offsetTop;
        elem.classList.add('_absolute');
        selected.style.cursor = 'grabbing';
    }

    function moveElem(e) {
        if (selected) {
            e.preventDefault();
            mouseX = e.clientX;
            mouseY = e.clientY;
            window.requestAnimationFrame(moveAt);
        }
    }

    function moveAt() {
        if (selected) {
            selected.style.left = `${mouseX - selected.offsetWidth / 2}px`;
            selected.style.top = `${mouseY - selected.offsetHeight / 2}px`;
        }
    }

    function destroy() {
        if (selected) {
            const dropContainer = document.getElementById('drop-container');
            const elemRect = selected.getBoundingClientRect();
            const dropRect = dropContainer.getBoundingClientRect();

            const isInDropZone = elemRect.left < dropRect.right &&
                elemRect.right > dropRect.left &&
                elemRect.top < dropRect.bottom &&
                elemRect.bottom > dropRect.top;

            if (isInDropZone) {
                selected.classList.remove('_absolute')
                dropContainer.appendChild(selected);
                selected.style.position = 'static';
            } else {
                selected.style.left = `${origX}px`;
                selected.style.top = `${origY}px`;
            }

            selected.style.cursor = 'grab';
            selected = null;
        }

        document.removeEventListener('mousemove', moveElem);
        document.removeEventListener('mouseup', destroy);
    }

    document.querySelectorAll('.draggable').forEach((elem) => {
        elem.addEventListener('mousedown', (e) => {
            dragInit(elem);

            document.addEventListener('mousemove', moveElem);
            document.addEventListener('mouseup', destroy);
        });
    });
});