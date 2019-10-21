// 主程序：初始化游戏过程中的数据 ，以及点击事件的绑定

import { ResourceLoader } from "./js/base/ResourcesLoad.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";
import { Birds } from "./js/player/Birds.js";


export class Main {
    constructor() {
        console.log("Game Start");
        // 初始化画布
      this.canvas = document.getElementById("game"); // 页面
        // this.canvas =wx.createCanvas(); // 微信
        this.ctx = this.canvas.getContext("2d");

        //  初始化资源加载器  let self = this;       
        this.loader = new ResourceLoader();

        //  初始化变量池
        this.DataStore = DataStore.getInstance();

        // 初始化导演
        this.directory = Director.getInstance();

        //  加载完成之后，执行其他操作
        this.loader.onloaded(map => this.onResourceLoaded(map))

        /*  let bg = map.get("background");
            self.ctx.drawImage(bg, 0, 0, bg.width, bg.height); */
    }

    //  资源加载完成后 执行其他操作的方法
    onResourceLoaded(map) {
        //  模拟画背景图
        // let bg = map.get("background");  //  拿背景图
        // this.ctx.drawImage(bg, 50, 0, bg.width, bg.height, 0,0,this.canvas.width, this.canvas.height);

        //  保存各种资源
        //  不使用set 方法保存数据的原因：set 方法保存的数据在游戏结束时会被销毁
        //  而下面的数据及时游戏结束，也不会销毁，下一局可用
        this.DataStore.canvas = this.canvas;
        this.DataStore.ctx = this.ctx;
        this.DataStore.res = map;

        this.init();
    }
    // 游戏初始化,初始化游戏中的数据，将其保存进变量池中
    init() {
        // 模拟画背景图
        // new Background().draw();
        // new Land().draw();

        this.DataStore.set("background", new Background())
            .set("land", new Land())
            .set("pipes", [])
            .set("birds", new Birds())
        //  先创建一组水管
        this.directory.createPipes();

        // 开始运行
        this.directory.run();
    }
}