/* PRELOAD IMAGES & ASSETS */
const images = {
    background: {
        src: 'img/background.jpg',
        img: new Image()
    },
    background1: {
        src: 'img/background1.png',
        img: new Image()
    },
    woman: {
        src: 'img/woman.png',
        img: new Image()
    },
    computer2: {
        src: 'img/computer2.jpg',
        img: new Image()
    },
    dapps: {
        src: 'img/dapps.png',
        img: new Image()
    },
    uiux: {
        src: 'img/uiux.png',
        img: new Image()
    },
    audit: {
        src: 'img/audit.png',
        img: new Image()
    },
    ufo: {
        src: 'img/ufo.png',
        img: new Image()
    },
    contact: {
        src: 'img/contact.png',
        img: new Image()
    },
    head: {
        src: 'img/head.png',
        img: new Image()
    },
    cactuar: {
        src: 'https://web3.builders/images/cactuar.png',
        img: new Image()
    },
    stakemri: {
        src: 'https://web3.builders/images/stakemri.png',
        img: new Image()
    },
    reserver: {
        src: 'https://web3.builders/images/reserver.png',
        img: new Image()
    },
    teamos: {
        src: 'https://web3.builders/images/teamOS.png',
        img: new Image()
    },
    staticpower: {
        src: 'https://web3.builders/images/staticpower.png',
        img: new Image()
    },
    shopping: {
        src: 'https://web3.builders/images/shopping.png',
        img: new Image()
    },
    brofistcoin: {
        src: 'https://web3.builders/images/brofistcoin.png',
        img: new Image()
    },
    fomocube: {
        src: 'https://web3.builders/images/fomocube.png',
        img: new Image()
    },
    zero60: {
        src: 'https://web3.builders/images/0x60.jpg',
        img: new Image()
    },
    black: {
        src: 'img/black.jpg',
        img: new Image()
    }
};

for (let key in images) {
    images[key].img.onload = assetLoaded;
    images[key].img.onerror = handleError;
    images[key].img.src = images[key].src;
}

let assetsToLoad = Object.keys(images).length;
let assetsLoaded = 0;
var loadingScreen = document.getElementById('loading');

function assetLoaded() {
    assetsLoaded++;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = (assetsLoaded / assetsToLoad) * 100 + '%';
    if (assetsLoaded === assetsToLoad) {
        document.body.classList.remove('loading-active');
        loadingScreen.classList.add('loading-fadeout');
    }
}

loadingScreen.addEventListener('animationend', () => {
    loadingScreen.style.display = 'none';
});

function handleError(e) {
    console.log('Error loading asset: ', e.target.src);
}


/* HERO & ABOUT SECTIONS */
const heroTitle = document.getElementById('hero-title');
const heroSubtitle = document.getElementById('hero-subtitle');
const triangles = document.querySelector('.triangles');
const aboutSection = document.querySelector(".about");
const boxes = document.querySelectorAll(".about .box");

window.addEventListener('scroll', function() {
    let {
        pageYOffset,
        innerHeight
    } = window;
    let scrollRatio = pageYOffset / innerHeight;

    // HERO SECTION
    triangles.style.backgroundPosition = 'center ' + (pageYOffset * 0.5) + 'px';
    heroTitle.style.transform = `translateY(-${scrollRatio * 50}px)`;
    heroTitle.style.opacity = 1 - scrollRatio;
    heroSubtitle.style.transform = `translateY(-${scrollRatio * 20}px)`;
    heroSubtitle.style.opacity = 0.6 - scrollRatio;

    // ABOUT SECTION 
    let aboutSectionTop = aboutSection.offsetTop;
    let aboutSectionBottom = aboutSectionTop + aboutSection.offsetHeight;

    //  Determine how far the window is scrolled into the about section
    let scrollPercent = (pageYOffset - aboutSectionTop) / (aboutSectionBottom - aboutSectionTop);

    // Limit the scroll percent between 0 and 1
    scrollPercent = Math.min(1, Math.max(0, scrollPercent));

    boxes.forEach((box, i) => {
        let direction = i === 0 ? -1 : 1;
        box.style.transform = `translateX(${direction * 70 * (1 - scrollPercent)}px)`;
    });
});

/* EXPERTISE SECTION */
const buttons = document.querySelectorAll('.buttons button');
const cube = document.querySelector('.cube');
let isDragging = false;
let rotateX = -30,
    rotateY = 45;
let mouseX = 0,
    mouseY = 0;
let lastMouseX = 0,
    lastMouseY = 0;

// Button click handler
buttons.forEach(button => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.disabled = true); // Disable all buttons
        cube.style.transition = 'transform 2s';
        rotateToFace(button.getAttribute('data-face'));
        setTimeout(() => {
            cube.style.transition = '';
            buttons.forEach(btn => btn.disabled = false); // Re-enable all buttons
        }, 2000);
    });
});

// Update Cube transform 
function updateCubeTransform() {
    cube.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    updateBackgroundPosition();
}

cube.addEventListener('mousedown', (e) => {
    isDragging = true;
    lastMouseX = e.clientX;
    lastMouseY = e.clientY;
    cube.classList.add('dragging'); // add the dragging class
    cube.querySelectorAll('.face').forEach(face => face.classList.add('dragging'));
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    cube.classList.remove('dragging');
    cube.querySelectorAll('.face').forEach(face => face.classList.remove('dragging'));
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        rotateY += (mouseX - lastMouseX) / 2;
        rotateX -= (mouseY - lastMouseY) / 2;
        updateCubeTransform();
        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
});

function rotateToFace(face) {
    switch (face) {
        case 'top':
            rotateX = -90;
            rotateY = 0;
            break;
        case 'right':
            rotateX = 0;
            rotateY = -90;
            break;
        case 'back':
            rotateX = 0;
            rotateY = 180;
            break;
        case 'left':
            rotateX = 0;
            rotateY = 90;
            break;
        case 'bottom':
            rotateX = 90;
            rotateY = 0;
            break;
        case 'front':
        default:
            rotateX = 0;
            rotateY = 0;
            break;
    }
    updateCubeTransform();
}

// Update stardust on Cube 
function updateBackgroundPosition() {
    let xPosition = rotateY / 1.75;
    let yPosition = rotateX / 1.75;
    let faces = document.querySelectorAll('.face .texture');

    faces.forEach(face => {
        face.style.backgroundPosition = `${xPosition}px ${yPosition}px`;
    });
}

let ufoArrived = false;

// Observer callback
const observerCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.target.classList.contains('expertise')) {
            const scene = entry.target.querySelector('.scene');
            const buttons = entry.target.querySelectorAll('.buttons button');
            const expertiseTitle = entry.target.querySelector('.expertise-title');

            if (entry.isIntersecting) {
                // When .expertise is in the viewport
                scene.classList.add('in-view');
                expertiseTitle.style.left = '20px'; // Bring the title into view

                buttons.forEach((button, index) => {
                    button.style.animation = `slideIn 0.3s ${index * 0.1}s forwards`;
                });

                // Restore interactive cube rotation
                rotateX = -30;
                rotateY = 45;
                updateCubeTransform();

                // Apply the moveIn animation
                scene.style.animation = 'zoomIn 0.3s forwards';
            } else {
                // When .expertise is not in the viewport
                scene.classList.remove('in-view');
                expertiseTitle.style.left = '-100%'; // Hide the title

                buttons.forEach((button, index) => {
                    button.style.animation = `slideOut 0.3s ${(buttons.length - index - 1) * 0.1}s forwards`;
                });

                // Reset cube rotation
                rotateX = -30;
                rotateY = 45;
                updateCubeTransform();

                // Apply the moveOut animation
                scene.style.animation = 'zoomOut 0.3s forwards';
            }
        } else if (entry.target.classList.contains('contact')) {
            const ufo = document.getElementById('ufo');
            const contactDetails = document.querySelector('.contact-details');
            const payload = document.getElementById('payload');
            const contactsConsole = document.getElementById('contactsConsole');
            const contactContent = document.getElementById('contact-content');

            if (entry.isIntersecting && !ufoArrived) {
                // Apply the flyUFO animation
                ufo.style.animation = 'flyUFO 3s linear forwards';

                // Listen for the end of the flyUFO animation
                ufo.addEventListener('animationend', function handler() {
                    // Remove the event listener so it doesn't get triggered multiple times
                    ufo.removeEventListener('animationend', handler);

                    // Switch to the hover animation
                    ufo.style.animation = 'hoverUFO 2s ease-in-out infinite';

                    // Drop payload  
                    payload.classList.add('dropPayload');

                    setTimeout(function() {
                        contactsConsole.classList.add('consoleZoomIn');
                        setTimeout(function() {
                            contactContent.classList.add('blink');
                            startTyping();
                        }, 400);
                    }, 1000);
                });

                ufoArrived = true;
            }
        } else if (entry.target.classList.contains('showcase')) {
            scatterItems();
            const elements = document.querySelectorAll('.folders-wrapper');
            elements.forEach(element => {
                element.classList.add('grayscale');
            });
        }
    });
};

// Setting up your IntersectionObserver to watch both sections
let expertiseSection = document.querySelector('.expertise');
let contactSection = document.querySelector('.contact');
let showcaseSection = document.querySelector('.showcase');

let observer = new IntersectionObserver(observerCallback, {
    root: null, // The viewport
    rootMargin: '0px',
    threshold: 0.1 // Adjust this value as needed to control when the callback is triggered
});

// Start observing both sections
observer.observe(expertiseSection);
observer.observe(contactSection);
observer.observe(showcaseSection);

/* CONTACT SECTION */
function startTyping() {
    var text = document.getElementById('type-text').innerHTML;
    document.getElementById('type-text').innerHTML = '';

    var content = document.getElementById('the-message');
    content.style.opacity = '1';

    var delay = 25; // Tune this for different typing speeds.
    var step = 0;

    function type() {
        var char = text[step];
        // If the character is "<", add the entire HTML tag to the innerHTML
        if (char === "<") {
            var tagCloseIndex = text.indexOf('>', step);
            // If it's an opening anchor tag, find the corresponding closing tag
            if (text.slice(step, step + 2) === "<a") {
                tagCloseIndex = text.indexOf('</a>', step) + 4; // +4 to include the length of "</a>"
            }
            document.getElementById('type-text').innerHTML += text.slice(step, tagCloseIndex + 1);
            step = tagCloseIndex;
        } else {
            document.getElementById('type-text').innerHTML += char;
        }
        step++;
        if (step < text.length) {
            setTimeout(type, delay);
        }
    }

    setTimeout(type, delay);
};


/* SHOWCASE SECTION */
function scatterItems() {
    const safeZone = document.querySelector('.safe-zone');
    const itemSample = document.querySelector('.folders-item');

    const safeZoneDims = {
        width: safeZone.clientWidth,
        height: safeZone.clientHeight
    };
    const itemDims = {
        width: itemSample.offsetWidth,
        height: itemSample.offsetHeight
    };
    const minDistance = Math.sqrt(Math.pow(itemDims.width, 2) + Math.pow(itemDims.height, 2)) / 2;

    const safeZoneAdjustedDims = {
        width: safeZoneDims.width - itemDims.width,
        height: safeZoneDims.height - itemDims.height
    };

    const items = Array.from(document.querySelectorAll('.folders-item'));
    const positions = [];

    items.forEach((item, index) => {
        const rotate = Math.floor(Math.random() * 360);
        let attempts = 0;
        let maxAttempts = 1000;

        while (attempts < maxAttempts) {
            const x = Math.floor(Math.random() * safeZoneAdjustedDims.width);
            const y = Math.floor(Math.random() * safeZoneAdjustedDims.height);

            if (!isTooClose(x, y, positions, minDistance)) {
                positions.push({
                    x,
                    y
                });
                setItemPositionAndRotation(item, x, y, rotate);
                break;
            }

            attempts++;
        }
    });

    items.forEach(applyEventListenersToItem);
}

function arrangeItems() {
    let foldersItems = document.querySelectorAll('.folders-item');
    let topValue = 0;
    foldersItems.forEach((item, index) => {
        item.style.top = `${topValue}px`;
        topValue += 40;
    });
}

function isTooClose(x, y, positions, minDistance) {
    return positions.some(pos => {
        const dx = pos.x - x;
        const dy = pos.y - y;
        return Math.sqrt(dx * dx + dy * dy) < minDistance;
    });
}

function setItemPositionAndRotation(item, x, y, rotate) {
    item.style.top = `${y}px`;
    item.style.left = `${x}px`;
    item.querySelector('.folders-wrapper').style.transform = `rotate(${rotate}deg)`;
}

function applyEventListenersToItem(item) {
    const wrapper = item.querySelector('.folders-wrapper');
    const initialRotate = parseFloat(wrapper.style.transform.replace(/[^\d.-]/g, ''));

    wrapper.addEventListener('mouseenter', () => {
        const currentRotate = parseFloat(wrapper.style.transform.replace(/[^\d.-]/g, ''));
        const shortestRotate = getShortestAngle(currentRotate, 0);
        wrapper.style.transform = `rotate(${currentRotate + shortestRotate}deg)`;
    });

    wrapper.addEventListener('mouseleave', () => {
        wrapper.style.transform = `rotate(${initialRotate}deg)`;
    });

    const card = item.querySelector('.folders-card');
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const dx = x - rect.width / 2;
        const dy = y - rect.height / 2;
        const rotateY = 20 * dx / rect.width;
        const rotateX = -20 * dy / rect.height;
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
}

function getShortestAngle(from, to) {
    let difference = to - from;
    while (difference < -180) difference += 360;
    while (difference > 180) difference -= 360;
    return difference;
}




/*
const folders = document.querySelectorAll('.folders-item');
const windowEl = document.getElementById('window');
const windowContentEl = document.getElementById('window-content');
const closeButton = document.getElementById('close-button');

// Add event listener to each folder
folders.forEach(function(folder) {
  folder.addEventListener('click', function(e) {
    // Set window content based on data attribute
    const content = this.getAttribute('data-content');
    windowContentEl.textContent = content;

    // Position window at click point and show
    const rect = e.target.getBoundingClientRect();
    windowEl.style.left = rect.left + 'px';
    windowEl.style.top = rect.top + 'px';
    windowEl.style.display = 'block';

    // Animation to make window "zoom in"
    windowEl.style.transform = 'scale(0)';
    setTimeout(() => windowEl.style.transform = 'scale(1)', 10);
  });
});

// Close window when close button is clicked
closeButton.addEventListener('click', function() {
  windowEl.style.display = 'none';
});
*/




let folderItems = document.querySelectorAll('.folders-item');

folderItems.forEach((item) => {
    item.addEventListener('click', function(e) {
        let clickedElement = e.currentTarget;
        let value = clickedElement.getAttribute('data').toString();
        appear(value);
    });
});

const contents = {
    cactuar: 'Cactuar gone wild attacking random degens on the internet. Do you have what it takes to stop it? <a href="https://cactuar.fun" target="_blank">cactuar.fun</a> ',
    mri: 'StakeMRI is a staking platfom powered by the Generator from Team3D <a href="https://www.stakemri.com/" target="_blank">StakeMRI</a>',
    reserver: 'ReserverETH is a new concept of a NFT (Non Fungible Token) standard that\'s literally backed by Ethereum. You get your ETH back by burning the token! <a href="https://web3.builders/projects/reserver/" target="_blank">ReserverETH</a>',
    teamos: 'TeamOS is a desktop-like gateway to Team3D\'s decentralized metaverse. <a href="https://team3d.io" target="_blank">Team3d.io</a>',
    power: 'DeFi platform where trading fees are distributed to share holders proportional to their stake in the pool. <a href="https://staticpower.io/" target="_blank">StaticPower</a>',
    shopping: 'Staking platform with multiple choices for users to stake their SPI and GSPI tokens. <a href="https://shopping.io" target="_blank">Shopping.io</a>',
    brofist: '"This is the cryptocurrency that\'s really gonna make it" - BrofistCoin is a fan-made meme money for PewDiePie\'s meme network. <a href="https://brofistcoin.io" target="_blank">BrofistCoin.io</a>',
    fomocube: 'FomoCube has two games: CUBE which is a decentralized zero-sum game and FOMO where the last buyer wins the whole jackpot. <a href="https://fomocube.io" target="_blank">FomoCube.io</a>',
    zero: 'Experimental use case for a fully decentralized message board. This dapp has no traditional back-end or a database. Posts and comments are all stored on the blockchain.'
}

function appear(what) {
    const text = contents[what];
    const container = document.querySelector(".appainside");
    container.innerHTML = '';

    // Create a dummy div to hold the text
    const dummyDiv = document.createElement('div');
    dummyDiv.innerHTML = text;

    // Get all child nodes (text and <a> elements)
    const childNodes = Array.from(dummyDiv.childNodes);

    childNodes.forEach(node => {
        if (node.nodeName === "#text") { // If it's a text node
            let words = node.textContent.split(' ');
            words.forEach(word => {
                let span = document.createElement("span");
                span.textContent = word;
                span.classList.add("falling-letter");
                const delay = Math.random() * 2;
                span.style.animationDelay = `${delay}s`;

                container.appendChild(span);
                container.innerHTML += ' ';
            });
        } else if (node.nodeName === "A") { // If it's an <a> node
            let span = document.createElement("span");
            let a = document.createElement("a");
            a.href = node.href;
            a.textContent = node.textContent;
            a.target = "_blank"; // Open link in a new tab
            span.appendChild(a);

            span.classList.add("falling-letter");
            const delay = Math.random() * 2;
            span.style.animationDelay = `${delay}s`;

            container.appendChild(span);
            container.innerHTML += ' ';
        }
    });
}




/* SNAKE GAME */
const dotSize = 20;
let direction = 'Right';
let snake = [{
    top: 0,
    left: 0
}];
let apple = null;
let intervalId = null;
let score = 0;

function startGame() {
    // Clear any existing game interval
    if (intervalId) {
        clearInterval(intervalId);
    }
    direction = 'Right';
    snake = [{
        top: 0,
        left: 0
    }];
    apple = null;
    score = 0;

    document.getElementById('score-display').innerText = 'SCORE 0';
    document.getElementById('death-screen').style.display = 'none';
    document.getElementById('start-button').style.display = 'none';

    intervalId = setInterval(updateGame, 200);
}


function endGame() {
    clearInterval(intervalId);

    document.getElementById('death-screen').style.display = 'flex';
    document.getElementById('start-button').style.display = 'flex';

    let highScore = Math.max(score, localStorage.getItem('highScore') || 0);
    localStorage.setItem('highScore', highScore);
}

document.getElementById('start-button').addEventListener('click', startGame);

function updateGame() {
    let head = Object.assign({}, snake[0]);
    switch (direction) {
        case 'Left':
            head.left -= dotSize;
            break;
        case 'Right':
            head.left += dotSize;
            break;
        case 'Up':
            head.top -= dotSize;
            break;
        case 'Down':
            head.top += dotSize;
            break;
    }

    // Self or wall collision
    if (
        head.top < 0 || head.left < 0 ||
        head.top === 320 || head.left === 320 ||
        snake.some((dot, idx) => idx !== 0 && dot.top === head.top && dot.left === head.left)
    ) {
        return endGame();
    }

    // Apple collision
    if (apple && apple.top === head.top && apple.left === head.left) {
        apple = null;
        score++; // Increase score
        document.getElementById('score-display').textContent = `SCORE ${score}`;
    } else {
        snake.pop();
    }

    snake.unshift(head); // New head

    // Apple not exist, create a new one
    if (!apple) {
        apple = {
            top: Math.floor(Math.random() * 16) * dotSize,
            left: Math.floor(Math.random() * 16) * dotSize
        };
    }

    // Redraw the game
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    snake.forEach(dot => {
        const dotElement = document.createElement('div');
        dotElement.style.top = `${dot.top}px`;
        dotElement.style.left = `${dot.left}px`;
        dotElement.className = 'dot';
        gameBoard.appendChild(dotElement);
    });
    const appleElement = document.createElement('div');
    appleElement.style.top = `${apple.top}px`;
    appleElement.style.left = `${apple.left}px`;
    appleElement.className = 'apple';
    gameBoard.appendChild(appleElement);
}

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowLeft':
            e.preventDefault();
            if (direction !== 'Right' || snake.length === 1) direction = 'Left';
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (direction !== 'Left' || snake.length === 1) direction = 'Right';
            break;
        case 'ArrowUp':
            e.preventDefault();
            if (direction !== 'Down' || snake.length === 1) direction = 'Up';
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (direction !== 'Up' || snake.length === 1) direction = 'Down';
            break;
    }
});