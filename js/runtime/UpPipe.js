import { Pipe } from "./Pipe.js";
import { Sprite } from "../base/Sprite.js";

/* 上水管 */

export class UpPipe extends Pipe {
    constructor(top) {
        // 获取上水管的图片
        const img = Sprite.getImage("pieUp");
        super(img, top);
    }
    //  重写 draw 方法
    draw() {
        this.y =  this.top- this.height;
        // console.log(this.y);
        super.draw();
    }
}