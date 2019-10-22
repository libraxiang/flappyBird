// 主程序：初始化游戏过程中的数据 ，以及点击事件的绑定

import { ResourceLoader } from "./js/base/ResourcesLoad.js";
import { DataStore } from "./js/base/DataStore.js";
import { Background } from "./js/runtime/Background.js";
import { Land } from "./js/runtime/Land.js";
import { Director } from "./js/Director.js";
import { Birds } from "./js/player/Birds.js";
import { StartButton } from "./js/player/StartButton.js";
import { Score } from "./js/player/Score.js";
import { Tool } from "./extra.js";


export class Main {
    constructor() {
        console.log("Game Start");

        // 初始化画布
        // this.canvas = document.getElementById("game"); // 页面
        this.canvas =wx.createCanvas(); // 微信

        this.ctx = this.canvas.getContext("2d");

        //  初始化资源加载器  let self = this;       
        this.loader = new ResourceLoader();

        //  初始化变量池
        this.DataStore = DataStore.getInstance();

        // 初始化导演
        this.director = Director.getInstance();

        //  加载完成之后，执行其他操作
        this.loader.onloaded(map => this.onResourceLoaded(map));

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
        this.ctx.fillText("aaa",0,0);
        let t = new Tool();
        t.voice("./audio/bgm.mp3",true).play();
        t.getTelInfo();
        t.getUserInfo();
        this.init();
    }
    // 游戏初始化,初始化游戏中的数据，将其保存进变量池中
    init() {

        this.director.isGameOver = false; // 将游戏结束改为false

        this.DataStore.set("background", new Background())
            .set("land", new Land())
            .set("pipes", [])
            .set("birds", new Birds())
            .set("startButton", new StartButton())
            .set("score", new Score())


        // 调用游戏的单击事件
        this.gameEvent();
        //  先创建一组水管
        this.director.createPipes();

        // 开始运行
        this.director.run();
    }
// 绑定单击事件
    gameEvent() {
        // this.canvas.addEventListener("touchstart", (e) => {
          wx.onTouchStart(res=>{ // 微信方法
            if (this.director.isGameOver) {
                // 游戏结束，点击重新开始
                this.init();
                //  销毁上一局数据，由导演负责
            } else {
                // console.log(new Director);
                this.director.birdsUp();

            }
        })
    }
}