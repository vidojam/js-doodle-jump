document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let isGameOver = false;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodler.style.left = '50px';
        doodler.style.bottom = '100px';
    }
    createDoodler();
});

