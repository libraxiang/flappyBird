// 微信部分api的使用
import {
  DataStore
} from "./js/base/DataStore.js";

export class Tool {
  constructor() {
    // 初始化数据(没有数据需要初始化，不写)
  }

  // 手机振动的效果
  zhendong() {
    wx.vibrateLong({
      success() {
        console.log('振动了一次');
      }
    })
  }
  // 播放音乐
  voice(src, loop) {
    // 创建音频
    const music = wx.createInnerAudioContext();
    // 音频文件的路径
    music.src = src;
    // 设置循环播放
    music.loop = loop;
    // 播放
    // music.play();
    return music;
  }
  // 获取手机信息
  getTelInfo() {
    wx.getSystemInfo({
      success(res) {
        console.log(res);
      }
    })
  }
  // 获取用户的信息
  getUserInfo(callback) {
    // 创建用户信息按钮
    const button = wx.createUserInfoButton({
      type: "text",
      text: "请授权用户信息",
      style: {
        left: 100,
        top: 100,
        width: 150,
        height: 40,
        backgroundColor: '#3ed4a0',
        borderColor: '#e34d0a',
        borderWidth: 2,
        borderRadius: 10,
        color: 'golden',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 40
      }
    });
    // 监听按钮的点击事件
    button.onTap(res => {
      if (res.userInfo) {
        // 用户授权了
        // console.log(res.userInfo);
        callback();
        // 销毁按钮
        button.destroy();
      }
    });
  }

  // 向服务器发送http请求
  send() {
    wx.request({
      url: 'http://localhost:4000',
      success(res) {
        console.log(res);
      }
    })
  }
  // 模拟发送多条数据
  sendMore() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        wx.sendSocketMessage({
          data: '微信发送的数据',
          success() {
            return resolve();
          }
        });
      }, 2000);
    })
  }
  // 发送socket数据
  sendSocket() {
    // 1. 建立连接
    wx.connectSocket({
      url: 'ws://localhost:4000',
      success(res) {
        console.log('连接服务端socket成功');
      },
      fail(err) {
        console.log('连接失败，socket');
      }
    });

    // 2. 连接成功后，回调中可以发送数据
    wx.onSocketOpen(() => {
      // 向后台发送数据
      this.sendMore().then(() => {
        return this.sendMore();
      }).then(() => {
        return this.sendMore();
      }).then(() => {
        console.log('发送完毕');
      })
      // 从后台接收数据
      wx.onSocketMessage(function(res) {
        console.log(res);
      })
    });
  }

  // 下载图片
  downPic() {
    wx.downloadFile({
      url: 'http://pic38.nipic.com/20140228/2457331_083845176000_2.jpg',
      success(res) {
        console.log(res);
        //   显示到手机屏幕
        /* let img = wx.createImage();
        img.src = res.tempFilePath;
        img.onload = () => {
          DataStore.getInstance().ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
        } */
        //   保存到手机相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            console.log("success");
          },
          fail() {
            console.log("fail");
          }
        })
        //  下载在线音乐并播放
        let path = res.tempFilePath; // 获取下载音乐的临时地址
        // 播放音乐
        let ctx = wx.createInnerAudioContext();
        ctx.src = path;
        ctx.autoplay = true;
      }
    })
  }
  // 上传图片
  upload() {
    wx.chooseImage({
      success(res) {
        const tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: "http://localhost:4000", //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            const data = res.data
            //do something
          }
        })
      }
    })
  }
  // 播放音乐
  playMusic() {
    /* http://vd4.bdstatic.com/mda-jjki9ivgnuh7xp6u/sc/mda-jjki9ivgnuh7xp6u.mp4 */
    var video = wx.createVideo({
      src: "http://vd4.bdstatic.com/mda-jjki9ivgnuh7xp6u/sc/mda-jjki9ivgnuh7xp6u.mp4",
      x: 0,
      y: 0,
      autoplay: true,
      controls: true,
      showCenterPlayBtn: false
    })
    // console.log(video);
    return video;
  }
}