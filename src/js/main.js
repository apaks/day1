import {app, shouldUseCamera} from "./app";
import {initRope, mouseTick} from "./trail";
import {getLastFingerPosition} from "./camera_input";
import getFruitWave from "./gameplay/fruits";
import initInterface from "./gameplay/interface";

const userInterface = initInterface();

initRope(app);

function getMousePosition() {
  const mouse = shouldUseCamera ? getLastFingerPosition() : app.renderer.plugins.interaction.mouse.global;
  return {x: mouse.x, y: mouse.y}
}


app.ticker.add((delta) => {
  // main game loop
  const mousePosition = getMousePosition();
  mouseTick(app, mousePosition);
  const fruitWave = getFruitWave();
  fruitWave.tick();
  let collisions = fruitWave.checkCollisions({...mousePosition, height: 1, width: 1});
  userInterface.score += collisions;
  userInterface.tick();
});