const draggableDiv = document.getElementById('spotify');
const main = document.getElementById('main-wrapper');

let isDragging = false;
let offset = { x: 0, y: 0 };

draggableDiv.addEventListener('mousedown', (e) => {
    isDragging = true;
    offset.x = e.clientX - draggableDiv.getBoundingClientRect().left;
    offset.y = e.clientY - draggableDiv.getBoundingClientRect().top;
});

main.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const newX = e.clientX - offset.x;
    const newY = e.clientY - offset.y;

    draggableDiv.style.left = `${newX}px`;
    draggableDiv.style.top = `${newY}px`;
});

main.addEventListener('mouseup', () => {
    isDragging = false;
});