import {drawLandmarks, drawConnectors, lerp} from '@mediapipe/drawing_utils/drawing_utils';
import {Hands} from '@mediapipe/hands/hands';
import {Camera} from '@mediapipe/camera_utils/camera_utils';
import {ControlPanel, FPS} from '@mediapipe/control_utils/control_utils';
import app, {APP_HEIGHT, APP_WIDTH, extraDebug} from "./app";

// grabs camera input
const videoElement = document.getElementsByClassName('input_video')[0];
// allows to adjust library setting
const controlsElement = document.getElementsByClassName('control-panel')[0];
// we use canvas to visualize output of the Mediapipe library (at least for debugging purposes)
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const canvasCtx = canvasElement.getContext('2d');

export const fpsControl = new FPS();

const FIRST_HAND = 0;
const POINTING_FINGER_TIP = 8;
let position = {x: 0, y: 0};
export const getLastFingerPosition = () => {
    return position;
}

const setPosition = (results) => {
    if(results && results.multiHandLandmarks) {
        let finger = results.multiHandLandmarks[FIRST_HAND][POINTING_FINGER_TIP];
        position = {x: finger.x * app.screen.width, y: finger.y * app.screen.height};
    }
}


// for (let index = 0; index < results.multiHandLandmarks.length; index++) {
//   const classification = results.multiHandedness[index];
//   const isRightHand = classification.label === 'Right';
//   const landmarks = results.multiHandLandmarks[index];
//   drawingUtils.drawConnectors(
//       canvasCtx, landmarks, mpHands.HAND_CONNECTIONS,
//       {color: isRightHand ? '#00FF00' : '#FF0000'}
// );

//   drawingUtils.drawLandmarks(canvasCtx, landmarks, {
//     color: isRightHand ? '#00FF00' : '#FF0000',
//     fillColor: isRightHand ? '#FF0000' : '#00FF00',
//     radius: (data: drawingUtils.Data) => {
//       return drawingUtils.lerp(data.from!.z!, -0.15, .1, 10, 1);
//     }
//   });
// }


function drawPointFingerLandMark(results) {
    // Draw the overlays.
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    if (results.multiHandLandmarks && results.multiHandedness) {

  
      for (let index = 0; index < results.multiHandLandmarks.length; index++) {
        const classification = results.multiHandedness[index];
        const isRightHand = classification.label === 'Right';

        const landmarks = results.multiHandLandmarks[index];
      
        drawLandmarks(canvasCtx, landmarks, {
          color: isRightHand ? '#00FF00' : '#FF0000',
          fillColor: isRightHand ? '#FF0000' : '#00FF00',
          radius: (x) => {
              return lerp(x.from.z, -0.4, .01, 1, 0.1) } } );

        drawConnectors( canvasCtx, landmarks, hands.HAND_CONNECTIONS,
          {color: isRightHand ? '#00FF00' : '#FF0000', lineWidth: 20} );

      }

    }
    canvasCtx.restore();
}

function onResults(results) {
  setPosition(results);
  // Update the frame rate.
  fpsControl.tick();

  if(extraDebug) {
      drawPointFingerLandMark(results);
  }
}

const hands = new Hands({locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  }});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
  });

hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({image: videoElement});
  },
  width: APP_WIDTH,
  height: APP_HEIGHT
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
  selfieMode: true,
  maxNumHands: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5
})
    .add([
      fpsControl
    ])
    .on(options => {
      videoElement.classList.toggle('selfie', options.selfieMode);
      hands.setOptions(options);
    })