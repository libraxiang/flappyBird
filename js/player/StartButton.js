import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/* 开始按钮 */

export class StartButton extends Sprite {
    constructor() {
        const img = Sprite.getImage("startButton");
        const canvas = DataStore.getInstance().canvas;
        const land = Sprite.getImage("land");
        const x = (canvas.width - img.width) / 2;
        const y = (canvas.height-land.height - img.height) / 2;
        // console.log(land.height);
        super(img,0,0,img.width,img.height,x,y,img.width,img.height);
    }
}