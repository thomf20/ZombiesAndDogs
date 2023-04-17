const gridContainer = document.getElementById('grid-container');
const southBtn = document.getElementById('south-btn');
const westBtn = document.getElementById('west-btn');
const eastBtn = document.getElementById('east-btn');
const northBtn = document.getElementById('north-btn');

const scoreElement = document.getElementById("score")
let score = 0;

const mapImage = document.getElementById('mapImage');

const numRows = 5;
const numCols = 5;
let currentRow = Math.floor(numRows / 2); // Uppdatera startraden
let currentCol = Math.floor(numCols / 2); // Uppdatera startkolumnen

// Skapa rutnät
for (let row = 0; row < numRows; row++) {
    for (let col = 0; col < numCols; col++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        gridContainer.appendChild(cell);
    }
}

gridContainer.children[currentRow * numCols + currentCol].classList.add('active');

function updateButtonStatus() {
    if (currentRow === 0) {
        northBtn.disabled = true;
    } else {
        northBtn.disabled = false;
    }

    if (currentRow === numRows - 1) {
        southBtn.disabled = true;
    } else {
        southBtn.disabled = false;
    }

    if (currentCol === 0) {
        westBtn.disabled = true;
    } else {
        westBtn.disabled = false;
    }

    if (currentCol === numCols - 1) {
        eastBtn.disabled = true;
    } else {
        eastBtn.disabled = false;
    }
    if (westBtn.disabled == true && northBtn.disabled == true) {
        setTimeout(function() {
            alert("Game over!");
            location.reload();
          }, 1000);
    }
}

updateButtonStatus();


function updateMapImage() {
    const imageSource = `images/bild_${currentRow}_${currentCol}.jpg`;
    const imageSourceZombie = `images/zombie_${currentRow}_${currentCol}.jpg`;
    const imageSourceDog = `images/dog_${currentRow}_${currentCol}.jpg`;
    const mapImage = document.getElementById("mapImage");
    const mapImageZ = document.getElementById("mapImageZombie");
    const mapImageD = document.getElementById("mapImageDog");
    mapImage.src = imageSource;
    mapImageZ.src = imageSourceZombie;
    mapImageD.src = imageSourceDog
}

function updateScore(){
    if (currentRow === 0 && currentCol === 4 || currentRow === 3 && currentCol === 1 ||
        currentRow === 3 && currentCol === 4 ||currentRow === 4 && currentCol === 1 ||
        currentRow === 4 && currentCol === 4 ) {

        score += 1;
        scoreElement.textContent = score;
        setTimeout(function() {
            alert("Hund hittad!");
          }, 500);
    }
}

southBtn.addEventListener('click', () => {
    if (currentRow < numRows - 1) {
        gridContainer.children[currentRow * numCols + currentCol].classList.remove('active');
        currentRow++;
        gridContainer.children[currentRow * numCols + currentCol].classList.add('active');
        updateMapImage();
        updateButtonStatus();
        updateScore()
    }
});

westBtn.addEventListener('click', () => {
    if (currentCol > 0) {
        gridContainer.children[currentRow * numCols + currentCol].classList.remove('active');
        currentCol--;
        gridContainer.children[currentRow * numCols + currentCol].classList.add('active');
        updateMapImage();
        updateButtonStatus();
        updateScore()
    }
});

eastBtn.addEventListener('click', () => {
    if (currentCol < numCols - 1) {
        gridContainer.children[currentRow * numCols + currentCol].classList.remove('active');
        currentCol++;
        gridContainer.children[currentRow * numCols + currentCol].classList.add('active');
        updateMapImage();
        updateButtonStatus();
        updateScore()
    }
});
northBtn.addEventListener('click', () => {
    if (currentRow > 0) {
        gridContainer.children[currentRow * numCols + currentCol].classList.remove('active');
        currentRow--;
        gridContainer.children[currentRow * numCols + currentCol].classList.add('active');
        updateMapImage();
        updateButtonStatus();
        updateScore()
    }
});

const apiKey = '5bb6267a748b9fade7bb9351cbcce6c3';

fetch(`https://api.openweathermap.org/data/2.5/weather?q=Eskilstuna,se&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
        const temperatureElement = document.getElementById('temperature-value');
        const weatherDescriptionElement = document.getElementById('weather-description-value');
        const windSpeedElement = document.getElementById('wind-speed-value');
        const weatherIconElement = document.getElementById('weather-icon');

        const temperature = data.main.temp;
        const weatherDescription = data.weather[0].description;
        const windSpeed = data.wind.speed;
        const weatherIconCode = data.weather[0].icon;

        temperatureElement.textContent = temperature;
        weatherDescriptionElement.textContent = weatherDescription;
        windSpeedElement.textContent = windSpeed;
        weatherIconElement.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
    })
    .catch(error => console.error('Error fetching weather data:', error));