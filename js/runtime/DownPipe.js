import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/* 下水管 */

export class DownPipe extends Pipe{
    constructor(top) {
        const img = Sprite.getImage("pieDown");
        super(img,top);
    }

    //  重写 Pipe 中的 draw 方法
    draw() {
        let gap = DataStore.getInstance().canvas.height / 5
        this.y = this.top + gap;
        super.draw();
    }
}