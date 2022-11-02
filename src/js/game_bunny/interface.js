import * as PIXI from 'pixi.js'
import app from "../app";

class Interface {

    set score(score) {
        this._score = score;
    }
    get score() {
        return this._score;
    }

    get scoreText() {
        return this._scoreText;
    }

    constructor() {
        this._score = 0;
        this._scoreText = new PIXI.Text(this.getScoreTextValue(),{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
    }

    getScoreTextValue() {
        return 'Score: ' + this.score;
    }

    tick() {
        this._scoreText.text = this.getScoreTextValue();
    }
}

export default function initInterface() {
    let userInterface = new Interface();
    app.stage.addChild(userInterface.scoreText);
    return userInterface;
}
