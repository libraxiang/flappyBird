import { DataStore } from "./base/DataStore.js"
import { UpPipe } from "./runtime/UpPipe.js";
import { DownPipe } from "./runtime/DownPipe.js";

/* 导演：控制游戏的整个流程 */
export class Director {
    constructor() {
        // 获取变量池
        this.dataStore = DataStore.getInstance();
    }

    // 导演只能有一个
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    //  创建水管
    createPipes() {
        const minTop = this.dataStore.canvas.height / 8;
        const maxTop = this.dataStore.canvas.height / 2;
        const top = Math.random() * (maxTop - minTop + 1) + minTop;
        this.dataStore.get("pipes").push(new UpPipe(top));
        this.dataStore.get("pipes").push(new DownPipe(top));
    }

    //  运行
    run() {        
        //  获取水管数组
        const pipes = this.dataStore.get("pipes");
        // console.log(pipes);
        //  创建水管之前先判断 
        //  出界就将其从数组 中删除
        if (pipes[0].x < - pipes[0].width && pipes.length == 4) {
            pipes.shift();
            pipes.shift();
        }
        //  创建水管的条件：前面一组水管有没有越过屏幕中央，如果越过，则开始创建议下一组水管
        const width = this.dataStore.canvas.width; // 画布的宽
        if (pipes[0].x < (width  - pipes[0].width) / 2&& pipes.length == 2) {
            this.createPipes();
        } 

        //  画背景图
        this.dataStore.get("background").draw();
        

        // 遍历数组，画水管
        pipes.forEach(pipe => {
            pipe.draw();
        })
        // 画地板
        this.dataStore.get("land").draw();
        
        //  画小鸟
        this.dataStore.get("birds").draw();

        // new UpPipe().draw()
        //  循环运行
        requestAnimationFrame(() => {
            // console.log("Director",this);
            this.run();
        })

    }
}