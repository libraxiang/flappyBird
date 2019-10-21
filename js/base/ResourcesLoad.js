//  资源加载器，保证游戏是在图片加载完成之后开始主循环
//  当图片加载完成，canvas才开始渲染，否则canvas 无法渲染到图片
import { Resources } from "./Resources.js";

export class ResourceLoader {
    constructor() {
        //  获取图片的资源路径
        this.map = new Map(Resources);
        // console.log(this.map);
        //  遍历集合map ，将其中的字符串路径替换为 img对象
        for (const [k, v] of this.map) {
            // const img = wx.createImage(); // 微信端适用
            const img = new Image(); // 页面适用
            img.src = v; // 将图片路径赋值给 img 的 src属性
            //  将原来的字符串 替换为 img对象(重新设置key 对应的值)

            //  map.set(key,value) ：设置map集合中每个key的值为value
            this.map.set(k, img);
        }
        // console.log(this.map);
    }

    /* 定义图片加载完成方法 */
    onloaded(callback) {
        // console.log(this); // ResourceLoader
        let n = 0; // 计数器，记加载图片成功的数目
        //  遍历 map 集合  let self = this;
        for (const val of this.map.values()) {
            val.onload =  () =>{
                //  可使用 箭头函数，保证this的指向不变 || 可提前留住this，就不必使用箭头函数
                n++;
                //  判断 n 有没有达到 map集合的长度(有没有加载完成)
                //  map 数据的长度 用 size 表示
                if (n >= this.map.size) {
                    // 全部加载完整,返回加载完成后的map集合
                    callback(this.map);
                }
            }
        }
    }

}