const gameHeight = window.innerHeight - 50;

const player = document.getElementById('player');
const player_position = player.getBoundingClientRect();
let player_y = window.innerWidth / 2;

const player_jump = 5.7;
let v = 0;
const g = 0.4;

const obs1 = document.getElementById('obs1');
const obs2 = document.getElementById('obs2');
const ob1_position = obs1.getBoundingClientRect();
let obs_x = ob1_position.left;
const obsSpeed = 6;
const rest = window.innerWidth;

let score = 0;
let notPassed = true;


function engine() {
v += g;
player_y += v;
if (player_y >= gameHeight) { v = 0; player_y = gameHeight; }

obs_x -= obsSpeed;
if (obs_x < -70 ) { obs_x = rest; }

obs1.style.left = obs_x + 'px';
obs2.style.left = obs_x + 'px';
player.style.top = player_y + 'px';

const player_position = player.getBoundingClientRect();
const ob1_position = obs1.getBoundingClientRect();
const ob2_position = obs2.getBoundingClientRect();
if (collison(player_position, ob1_position) || collison(player_position, ob2_position)){ restGame(); return; } 

if (notPassed && ob1_position.right < player_position.left) {
score++; notPassed = false;  document.getElementById("score").innerText = "score : " + score; }
if (obs_x == rest) notPassed = true; 

requestAnimationFrame(engine); 
}

function jump() {
  v = -player_jump;
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
});

document.addEventListener("touchstart", e => {
  e.preventDefault();
  jump();
}, { passive: false });

function collison(a, b) {
    return !( a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
}

function restGame() {
player_y = window.innerWidth / 2;
obs_x = window.innerWidth;
v = 0;
score = 0;
document.getElementById("score").innerText = "score : " + score;
notPassed = true;
obs1.style.left = obs_x + 'px';
obs2.style.left = obs_x + 'px';
player.style.top = player_y + 'px';

alert("haha you lost");
requestAnimationFrame(engine);
}



engine();
