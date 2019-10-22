//  微信API
export class Tool {
  constructor() {

  }
  // 震动
  zhendong() {
    wx.vibrateLong({
      success() {
        console.log("震动了一次");
      }
    })
  }
  // 播放音乐
  voice(src, loop) {
    // 创建音频
    const music = wx.createInnerAudioContext();
    // 音频文件的路径
    music.src = src;
    music.loop = loop; // 设置循环播放
    // 直接使用paly方法播放 或者返回music对象
    // music.play();
    return music;
  }
  getTelInfo() {
    wx.getSystemInfo({
      success(res) {
        console.log(res)
      }
    })
  }
  getUserInfo() {
    //  创建用户信息按钮
    const button = wx.createUserInfoButton({
      "type": "text",
      "text": "需要系统权限，是否同意？",
      "style": {
        left: 100,
        top: 100,
        width: 150,
        height: 70,
        backgroundColor: '#ff0000',
        borderColor: "#asda12",
        borderWidth: 2,
        borderRadius: 10,
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
        lineHeight: 30
      }
    });
    // 监听按钮的点击事件
    button.onTap(res => {
      if (res.userInfo) {
        // 已授权
        console.log(res.userInfo);
        // 销毁按钮
        button.destroy();
      }
    })

  }
}