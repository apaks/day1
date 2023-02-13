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

    set action(action) {
        this._action = action;
    }

    get action() {
        return this._action;
    }

    get actionText() {
        return this._actionText;
    }
    
    set duration(duration) {
        this._duration = duration;
    }

    get duration() {
        return this._duration;
    }

    get durationText() {
        return this._durationText;
    }


    constructor() {
        this._score = 0;
        this._action = 0;
        this._duration = 0;

        let statText = new PIXI.Text(this.getScoreTextValue(),{fontFamily : 'Arial', 
            fontSize: 24, fill : 'white', align : 'center'});
        this._scoreText = statText;
        
        let durText = new PIXI.Text(this.getDurationTextValue(),{fontFamily : 'Arial', 
            fontSize: 24, fill : 'white', align : 'center'});
        durText.anchor.set(0.5, 0.5);
        durText.position.set(app.screen.width/2, 25);
        this._durationText = durText;

        let text = new PIXI.Text(this.getActionTextValue(),{fontFamily : 'Arial', 
            fontSize: 24, fill : 'white', align : 'center'});
        text.anchor.set(0.5, 0.5);
        text.position.set(app.screen.width/2, app.screen.height - 25);
        this._actionText = text

    }

    getScoreTextValue() {
        return 'Score: ' + this.score[0] + '/' +  this.score[1];
    }

    getActionTextValue() {
        return 'Action: ' + this.action;
    }

    getDurationTextValue() {
        return 'Time: ' + this.duration[0] + ':' + this.duration[1];
    }


    tick() {
        this._scoreText.text = this.getScoreTextValue();
        this._actionText.text = this.getActionTextValue();
        this._durationText.text = this.getDurationTextValue();

    }
}

export default function initInterface() {
    let userInterface = new Interface();
    app.stage.addChild(userInterface.scoreText);
    app.stage.addChild(userInterface.actionText);
    app.stage.addChild(userInterface.durationText);

    return userInterface;
}
