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
    //  判断小鸟与某一个水管是否碰撞(小鸟的模型和某一个水管的模型)
    isStrike(bird, pipe) {
        let strike = true;  // 假设撞了
        if (
            bird.right < pipe.left // 小鸟的右边x值 小于 水管的左边的x值
            || bird.buttom < pipe.top // 小鸟的下边 小于 水管的上边
            || bird.left > pipe.right   // 小鸟的左边 大于 水管的右边
            || bird.top > pipe.buttom) {  // 小鸟的上边 大于 水管的下边

            strike = false;
        }
        return strike;
    }
    //  判断小鸟的撞击事件(天、地、水管)
    check() {
        const birds = this.dataStore.get("birds");
        const land = this.dataStore.get("land");
        const pipes = this.dataStore.get("pipes");
        const score = this.dataStore.get("score");
        console.log(score);
        // 判断与天花板 地板相撞
        if (birds.birdsY[0] < 0 || birds.birdsY[0] + birds.birdsHeight[0] > land.y) {
            this.isGameOver = true;
            return;
        }
        //  判断与水管相撞
        //  构建小鸟的模型数据
        const birdBorder = {
            top: birds.birdsY[0],
            buttom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        }

        // 循环水管，遍历构建每一个水管的模型数据
        for (let i = 0; i < pipes.length; i++) {
            const pipe = pipes[i];
            const pipeBorder = {
                top: pipe.y,
                buttom: pipe.y + pipe.height,
                left: pipe.x,
                right: pipe.x + pipe.width,
            }
            if (this.isStrike(birdBorder, pipeBorder)) {
                // 撞到了
                this.isGameOver = true;
                return;
            }

        }
        //  小鸟越过水管，没有撞上，当前可以加分状态：加分
        //  越过的是第一组水管，只要判断小鸟和第一组水管的位置关系
        if (birds.birdsX[0] > pipes[0].x + pipes[0].width && score.canAdd) {
            score.score++;
            //  加了一份，改变加分状态为不可加分
            score.canAdd = false;
        }
    }

    //  点击屏幕，小鸟向上飞一段距离
    birdsUp() {
        const birds = this.dataStore.get("birds"); // 获取变量池中小鸟的对象
        for (let i = 0; i < 3; i++) {
            birds.y[i] = birds.birdsY[i];
        }
        birds.time = 0;
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
        // 检查游戏是否结束
        this.check();
        if (!this.isGameOver) {
             //  画背景图
            this.dataStore.get("background").draw();
            
            //  获取水管数组
            const pipes = this.dataStore.get("pipes");
            // console.log(pipes);
            //  创建水管之前先判断 
            //  出界就将其从数组 中删除
            if (pipes[0].x < - pipes[0].width && pipes.length == 4) {
                pipes.shift();
                pipes.shift();
                //  修改加分状态为t 可以加分
                this.dataStore.get("score").canAdd = true;
            }
            //  创建水管的条件：前面一组水管有没有越过屏幕中央，如果越过，则开始创建议下一组水管
            const width = this.dataStore.canvas.width; // 画布的宽
            if (pipes[0].x < (width - pipes[0].width) / 2 && pipes.length == 2) {
                this.createPipes();
            }

            // 遍历数组，画水管
            pipes.forEach(pipe => {
                pipe.draw();
            })
           

            //  画小鸟
            this.dataStore.get("birds").draw();

            // 画分数
            this.dataStore.get("score").draw();

            // 画地板
            this.dataStore.get("land").draw();

            //  循环运行
            this.id = requestAnimationFrame(() => { this.run()})
        } else {
            cancelAnimationFrame(this.id);     
            // 画结束的按钮
            this.dataStore.get("startButton").draw();
            // 销毁数据
            this.dataStore.destroy();
        }

    }
}