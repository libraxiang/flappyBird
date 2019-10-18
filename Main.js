// 主程序：初始化游戏过程中的数据 ，以及点击事件的绑定
import { ResourceLoader } from "./js/base/ResourcesLoad.js";


export class Main{
    constructor() {
        console.log("Game Start");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");
        //  初始化资源加载器  let self = this;
       
        this.loader = new ResourceLoader();
        //  加载完成之后，执行其他操作
        this.loader.onloaded(map => this.onResourceLoaded(map))

        /*  let bg = map.get("background");
            self.ctx.drawImage(bg, 0, 0, bg.width, bg.height); */
    }

    //  资源加载完成后 执行其他操作的方法
    onResourceLoaded(map) {
        console.log(map);
    }
}