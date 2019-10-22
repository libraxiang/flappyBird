import { DataStore } from "../base/DataStore.js";

/* 分数 */
//  无需画图，所以不需要继承

export class Score {
    constructor() {
        this.score = 0;
        this.ctx = DataStore.getInstance().ctx;
        this.canAdd = true; // 判定是否可以加分
        this.canvas = DataStore.getInstance().canvas;
    }

    draw() {
        this.ctx.font = "30px 黑体";
        this.ctx.fillStyle = "red";
        this.ctx.fillText(this.score,this.canvas.width/2,50)
    }
}