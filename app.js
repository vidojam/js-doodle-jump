document.addEventListener('DOMContentLoaded', function() {
    const grid = document.querySelector('.grid');
    const doodler = document.createElement('div');
    let isGameOver = false;
    let speed = 3;
    const platformCount = 5; // Use const if it's not going to change
    let platforms = [];
    let score = 0;
    let doodlerLeftSpace = 50;
    let startPoint = 150;
    let doodlerBottomSpace = startPoint;
    let isJumping = true;
    let gravity = 0.9;
    let upTimerId;
    let downTimerId;
    let isGoingLeft = false;
    let isGolingRight = false;
    let leftTimerId;
    let rightTimerId;


    class Platform {
        constructor(newPlatBottom) {
            this.bottom = newPlatBottom;
            this.left = Math.random() * 315;
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add('platform');
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms() {
        for (let i = 0; i < platformCount; i++) {
            let platGap = 600 / platformCount;
            let newPlatBottom = 100 + i * platGap;
            let newPlatform = new Platform(newPlatBottom);
            platforms.push(newPlatform);
        }
    }

function movePlatforms() {
    platforms.forEach(platform => {
        platform.bottom -= 4; // Move each platform down by 4 pixels
        platform.visual.style.bottom = platform.bottom + 'px';

        // Check if the platform goes below the threshold
        if (platform.bottom < 10) {
            platform.visual.remove(); // Remove the visual element
            platforms.shift(); // Remove the first platform from the array
            score++;
            let newPlatform = new Platform(600); // Create a new platform at the top
            platforms.push(newPlatform);
        }
    });
}


    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add('doodler');
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left = doodlerLeftSpace + 'px';
        doodler.style.bottom = doodlerBottomSpace + 'px';
    }

    function fall() {
        isJumping = false;
        clearInterval(upTimerId);
        downTimerId = setInterval(function() {
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace <= 0) {
                gameOver();
            }
            platforms.forEach(platform => {
                if (
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15) &&
                    ((doodlerLeftSpace + 60) >= platform.left) &&
                    (doodlerLeftSpace <= (platform.left + 85)) &&
                    !isJumping
                ) {
                    console.log('landed');
                    jump();
                }
            });
        }, 20);
    }
    fall();

    function jump() {  
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function() {
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if (doodlerBottomSpace > startPoint + 200) {
                fall();
                isJumping = false;
            }
        }, 30);
    }

    function gameOver() {
        isGameOver = true;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        grid.innerHTML = score;
        clearInterval(downTimerId);
     
    }

    function start() {
        if (!isGameOver) {
            createDoodler();    
            setInterval(movePlatforms, 30);
        }
    }

    createPlatforms(); // Move this outside of start to avoid duplicates
    start();
});


