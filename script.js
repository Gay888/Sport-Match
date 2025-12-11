const sportsData = [
    { id: 1, name: 'ฟุตบอล', icon: '⚽' },
    { id: 2, name: 'บาสเกตบอล', icon: '🏀' },
    { id: 3, name: 'แบตมินตัน', icon: '🏸' },
    { id: 4, name: 'วอลเลย์บอล', icon: '🏐' },
    { id: 5, name: 'เทนนิส', icon: '🎾' },
    { id: 6, name: 'ปิงปอง', icon: '🏓' },
    { id: 7, name: 'วิ่ง', icon: '🏃' },
    { id: 8, name: 'เบสบอล', icon: '⚾' }
];

const gridElement = document.getElementById('grid');
const scoreElement = document.getElementById('score');
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const winScreen = document.getElementById('win-screen'); // เพิ่มตัวแปรหน้ารับรางวัล
const startBtn = document.getElementById('start-btn');

let cards = [];
let score = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;

startBtn.addEventListener('click', () => {
    startScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    initGame();
});

function initGame() {
    cards = [];
    sportsData.forEach(sport => {
        cards.push({ ...sport });
        cards.push({ ...sport });
    });

    cards.sort(() => 0.5 - Math.random());

    gridElement.innerHTML = '';
    cards.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;
        card.dataset.icon = item.icon;
        
        card.addEventListener('click', flipCard);
        gridElement.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('revealed');
    this.innerHTML = this.dataset.icon;
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    score += 1;
    scoreElement.innerText = score;

    resetBoard();

    // --- ตรวจสอบว่าชนะเกมหรือยัง ---
    // ถ้าคะแนนเท่ากับจำนวนชนิดกีฬา (8 คะแนน)
    if (score === sportsData.length) {
        setTimeout(() => {
            gameScreen.classList.add('hidden'); // ซ่อนหน้าเกม
            winScreen.classList.remove('hidden'); // แสดงหน้าชนะ
        }, 800); // หน่วงเวลานิดหน่อยให้ผู้เล่นเห็นคู่สุดท้ายก่อน
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        if(firstCard) {
            firstCard.classList.remove('revealed');
            firstCard.innerHTML = '';
        }
        if(secondCard) {
            secondCard.classList.remove('revealed');
            secondCard.innerHTML = '';
        }
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}