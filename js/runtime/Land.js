import { Sprite } from "../base/Sprite.js";
import { DataStore } from "../base/DataStore.js";

/* 地板 */

export class Land extends Sprite{
    constructor() {
        const img = Sprite.getImage("land");
        const height = DataStore.getInstance().canvas.height;
        // canvas 的高度
        const h = height - img.height; // 地板实际所在的高
        super(img, 0, 0, img.width, img.height, 0, h, img.width, img.height);
        this.landX = 0; // 实际的坐标       
    }
    // 重写父类 Sprite 的draw方法，实现地板的移动
    draw() {
        this.landX -= 2;
        //  图片出界，重置
        const width = DataStore.getInstance().canvas.width;
        if (this.landX < (width - this.srcW)) {
            this.landX = 0;
        }
        // 重写父类的draw 
        super.draw(this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            this.landX, this.y,
            this.width, this.height)
    }
}