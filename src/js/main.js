import {app, shouldUseCamera} from "./app";
import {initRope, mouseTick} from "./trail";
import {getLastFingerPosition, getGestures} from "./camera_input";
// import getFruitWave from "./game_bunny/animals";
import getAnimalWave from "./game_bunny/animals";
import initInterface from "./game_bunny/interface";

const userInterface = initInterface();

initRope(app);

function getMousePosition() {
  const mouse = shouldUseCamera ? getLastFingerPosition() : app.renderer.plugins.interaction.mouse.global;
  return {x: mouse.x, y: mouse.y}
}


app.ticker.add((delta) => {
  // main game loop
  const mousePosition = getMousePosition();
  const gesture = getGestures();

  mouseTick(app, mousePosition);
  // const fruitWave = getFruitWave();
  const animalWave = getAnimalWave();
  animalWave.tick();

  // let collisions = fruitWave.checkCollisions({...mousePosition, height: 1, width: 1});
  let collisions = animalWave.checkCollisions(gesture);
  userInterface.score += collisions;
  userInterface.tick();
});
