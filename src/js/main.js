import {app, shouldUseCamera} from "./app";
import {Howl, Howler} from 'howler';
import {initRope, mouseTick} from "./trail";
import {getLastFingerPosition, getGestures} from "./camera_input";
// import getFruitWave from "./game_bunny/animals";
import getAnimalWave from "./game_bunny/animals";
import initInterface from "./game_bunny/interface";

const userInterface = initInterface();
var trial = 0; 
var score = 0;
initRope(app);
// add sound
const sound = new Howl({
  src: ['./sounds/whip.mp3'],
  volume: 0.1
});
sound.play();

const stratTime = performance.now();
const soundNames = ['trackDo', 'trackRe', 'trackMi', 'trackFa'];
var hashSound = {};
const soundSrc = ['./sounds/do.wav', './sounds/re.wav', './sounds/mi.wav', './sounds/fa.wav'];

for (let idx = 0; idx < soundSrc.length; idx++) {
  // console.log(idx);
  hashSound[soundNames[idx]] = new Howl({
    src: [soundSrc[idx]]
  });
}
// console.log(soundSrc);

initRope(app);

function getMousePosition() {
  const mouse = shouldUseCamera ? getLastFingerPosition() : app.renderer.plugins.interaction.mouse.global;
  return {x: mouse.x, y: mouse.y}
}


app.ticker.add((delta) => {
  // main game loop
  
  var gameTime = Math.round((performance.now() - stratTime)/1000);
  const arrTime = [Math.floor(gameTime/60), gameTime%60];
  // convert to sec
  // console.log(gameTime);

  const mousePosition = getMousePosition();
  const gesture = getGestures();
  // Play each of the track.s
  

  mouseTick(app, mousePosition);
  // const fruitWave = getFruitWave();
  const animalWave = getAnimalWave();
  animalWave.tick();

  // let collisions = fruitWave.checkCollisions({...mousePosition, height: 1, width: 1});
  let collisions = animalWave.checkCollisions(gesture);
  if (collisions == 1) {
    score = score + 1;
    // console.log(soundNames[gesture - 1]);
    hashSound[soundNames[gesture-1]].play();
  }

  if (animalWave.isActive == 0) {
    trial = trial + 1;
  }
  const arrStat = [score, trial];
  
  userInterface.score = arrStat;
  userInterface.action = gesture;
  userInterface.duration = arrTime;
  userInterface.tick();
});
