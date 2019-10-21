import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

//  上下水管的父类

// 继承 Sprite

export class Pipe extends Sprite{
    // img : 传入的水管(上水管还是下水管)
    //  top : 水管的高度
    constructor(img,top) {
        const w = DataStore.getInstance().canvas.width;
        super(img, 0, 0, img.width, img.height, w, 0, img.width, img.height);
        this.top = top;
    }

    //  重写 draw 方法
    draw() {
        this.x -= 2;
        super.draw();
    }
}