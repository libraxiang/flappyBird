// 主程序：初始化游戏过程中的数据 ，以及点击事件的绑定
import { ResourceLoader } from "./js/base/ResourcesLoad.js";
import { DataStore } from "./js/base/DataStore.js";


export class Main{
    constructor() {
        console.log("Game Start");
        this.canvas = document.getElementById("game");
        this.ctx = this.canvas.getContext("2d");

        //  初始化资源加载器  let self = this;       
        this.loader = new ResourceLoader();

        //  初始化变量池
        this.DataStore = DataStore.getInstance();

        //  加载完成之后，执行其他操作
        this.loader.onloaded(map => this.onResourceLoaded(map))

        /*  let bg = map.get("background");
            self.ctx.drawImage(bg, 0, 0, bg.width, bg.height); */
    }

    //  资源加载完成后 执行其他操作的方法
    onResourceLoaded(map) {
        //  模拟画背景图
        let bg = map.get("background");  //  拿背景图
        this.ctx.drawImage(bg, 50, 0, bg.width, bg.height, 0,0,this.canvas.width, this.canvas.height);

        //  保存各种资源
        //  不使用set 方法保存数据的原因：set 方法保存的数据在游戏结束时会被销毁
        //  而下面的数据及时游戏结束，也不会销毁，下一局可用
        this.DataStore.canvas = this.canvas;
        this.DataStore.ctx = this.ctx;
        this.DataStore.res = map;

        // this.init()
        
        // 游戏初始化
        // init(){}
    }
}