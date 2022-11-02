import Awave from "./awave";

// holder to store the fruits
let wave;

export default () => {
        // iterate through the dudes and update their position
        if(!wave) {
            wave = new Awave();
        }
        if(!wave.isActive) {
            wave.clean();
            wave = new Awave();
        }
        return wave;
}