import * as PIXI from 'pixi.js'
import app from "../app";

const g = 1;
var angle = 0;
var notesIdx = 0;
// const notes = [1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 0, 2 ,2, 2, 2, 2, 0, 0, 1, 2, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 
//     0, 0, 0, 0, 1, 1, 0, 2 ,2, 2, 2, 2, 0, 0, 1, 2, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 0, 2 ,2, 2, 2, 
//     2, 0, 0, 1, 2, 1, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 0, 0, 0, 0, 1, 1, 0, 2 ,2, 2, 2, 2, 0, 0, 1, 2, 1, 0, 1];

export default class Animal {
    get sprite() {
        return this._sprite;
    }
    set sprite(sprite) {
        this._sprite = sprite;
    }
    get boundaries() {
        return this._boundaries;
    }
    set boundaries(boundaries) {
        this._boundaries = boundaries;
    }
    constructor() {
        // notesIdx++;
        this._sprite = PIXI.Sprite.from('./assets/cube.png');
        this._velocity = 0;
        
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
          }
          
        angle = getRandomArbitrary(-0.2, 0.2);
        let posX = getRandomInt(-0.5, 3.5);
        // let posX = notes[notesIdx];
        // console.log(posX);
        this.posX = posX;
        // set the anchor point so the texture is centered on the sprite
        this._sprite.anchor.set(0.5);
        // set a random scale for the dude - no point them all being the same size!
        this._sprite.scale.set(0.05 + Math.random());
        // finally lets set the dude to be at a random position..
        this._sprite.x = posX * app.screen.width/4 + app.screen.width/8;
        this._sprite.y = Math.random() * app.screen.height;

        const rect = PIXI.Sprite.from(PIXI.Texture.WHITE);
        rect.width = this._sprite.width * 0.8;
        rect.height =  this._sprite.height * 0.8;
        rect.tint = 0xFF0000;
        rect.x = this._sprite.x - this._sprite.width / 2;
        rect.y = this._sprite.y - this._sprite.height / 2;
        this.boundaries = rect
    }

    tick() {
        // otherwise first wave boundaries are very small
        this.boundaries.width = this._sprite.width * 0.8;
        this.boundaries.height =  this._sprite.height * 0.8;

  
        this.sprite.y += g*Math.cos(angle);
        this.sprite.x += g*Math.sin(angle);
        // this.sprite.rotation = -this.sprite.direction - Math.PI / 2;

        this._boundaries.x = this._sprite.x - this._sprite.width / 2;
        this._boundaries.y = this._sprite.y - this._sprite.height / 2;
    }
}
