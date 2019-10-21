import { DataStore } from "./DataStore.js";

//  各种图片的父类

export class Sprite {
    /**
     * @constructor
     * @param {Object} img 需要画的图片
     * @param {Number} srcX 图片的起始坐标 X
     * @param {Number} srcY 图片的起始坐标 Y
     * @param {Number} srcW 图片的宽
     * @param {Number} srcH 图片的高
     * @param {Number} x 画布的起始坐标 X
     * @param {Number} y 画布的起始坐标 Y
     * @param {Number} width 准备画的宽度
     * @param {Number} height   准备画的高度
     */
    constructor(img = null, srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) {
        // 获取变量池
        const dataStore = DataStore.getInstance();
        this.ctx = DataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

        // 画图
    draw(img = this.img, srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH = this.srcH, x = this.x, y = this.y, width = this.width, height = this.height) {
        console.log("sprite:",this);
        this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, width, height);
    }

    //  获取制定图片
    static getImage(key) {
        console.log(DataStore)
        return DataStore.getInstance().res.get(key)
    }
}