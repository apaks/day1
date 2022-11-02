import Animal from "./animal";
import app, {extraDebug} from "../app";


export default class Awave {

    constructor() {
        console.log("bunny")
        this._waveSize = Math.random() * 4;
        this._active = this._waveSize;
        this._animals = [];

        for (let i = 0; i < this._waveSize; i++) {
            const animal = new Animal();
            this._animals.push(animal);
            app.stage.addChild(animal.sprite);
            if(extraDebug) {
                app.stage.addChild(animal.boundaries);
            }
        }
    }

    tick() {
        for (let i = 0; i < this._animals.length; i++) {
            let animal = this._animals[i];
            animal.tick(app);
            if (animal.sprite.y > app.screen.height) {
                animal.visible = false;
                animal.boundaries.visible = false;
                this._active--;
            }

        }
    }


    checkCollisions(collider) {
        let collisions = 0;
        // console.log(collider);
        for (let i = 0; i < this._animals.length; i++) {
            let animal = this._animals[i];
            // put gestures here
            const isColliding = (collider -1) == animal.posX;
            if (isColliding && animal.sprite.visible) {
                animal.sprite.visible = false;
                this._active--;
                collisions++;
            }
        }
        return collisions;
    }

    clean() {
        for (let i = 0; i < this._animals.length; i++) {
            app.stage.removeChild(this._animals[i].sprite); //is .sprite.visible = false is more efficient?
            app.stage.removeChild(this._animals[i].boundaries); //is .sprite.visible = false is more efficient?
        }
    }

    get animals() {
        return this._animals;
    }

    get isActive() {
        return this._active > 0
    }
}