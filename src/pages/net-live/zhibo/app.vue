<template>
  <div id="app">
    <el-card class="index-card">
     <div id="my-publisher"></div>
    </el-card>
  </div>
</template>

<script>
import logo from "assets/img/logo.png";
import modal from "components/modal.vue";
export default {
  components: {
    modal
  },
  data() {
    return {
      msg: "Use Vue 2.0 Today!",
      logoImg: logo
    };
  },
  methods: {
    createPublisher() {
      return new Promise((resolve, reject) => {
        new nePublisher(
          "my-publisher", // String 必选 推流器容器id
          {
            // Object 可选 推流初始化videoOptions参数
            videoWidth: 640, // Number 可选 推流分辨率 宽度 default 640
            videoHeight: 480, // Number 可选 推流分辨率 高度 default 480
            fps: 15, // Number 可选 推流帧率 default 15
            bitrate: 600, // Number 可选 推流码率 default 600
            video: true, // Boolean 可选 是否推流视频 default true
            audio: true // Boolean 可选 是否推流音频 default true
          },
          {
            // Object 可选 推流初始化flashOptions参数
            previewWindowWidth: 862, // Number 可选 预览窗口宽度 default 862
            previewWindowHeight: 486, // Number 可选 预览窗口高度 default 446
            wmode: "transparent", // String 可选 flash显示模式 default transparent
            quality: "high", // String 可选 flash质量 default high
            allowScriptAccess: "always" // String 可选 flash跨域允许 default always
          },
          function() {
            /*
            function 可选 初始化成功的回调函数
            可在该回调中调用getCameraList和getMicroPhoneList方法获取 摄像头和麦克风列表
            cameraList = this.getCameraList();
            microPhoneList = this.getMicroPhoneList();
            */
            let cameraList = this.getCameraList();
            let microPhoneList = this.getMicroPhoneList();
            console.log(cameraList);
            console.log(microPhoneList);

            if (cameraList.length && microPhoneList.length) {
              this.startPreview(0);
              var object = document.getElementById("my-publisher");
              object.width = "100%";
              object.height = "100%";

              this.setCamera(0);
              this.setMicroPhone(0);
              this.startPublish('rtmp://p1f404acd.live.126.net/live/13b19c6a77824834add731f09a4a9082?wsSecret=5fdb693c87db84b6678e0fc9b5820f3b&wsTime=1520841850');
            }

            resolve(this);
          },
          function(code, desc) {
            /*
            function 可选 初始化失败后的回调函数
            @param code 错误代码
            @param desc 错误信息
            判断是否有错误代码传入检查初始化时是否发生错误
            若有错误可进行相应的错误提示
        */
            reject();
          }
        );
      });
    }
  },

  created() {
    this._publisher = null;
  },

  mounted() {
    window.navigator.getMedia =
      window.navigator.getUserMedia || window.navigator.webkitGetUserMedia;
    window.navigator.getMedia
      ? window.navigator.getMedia(
          {
            video: true,
            audio: true
          },
          () => {
            this.createPublisher();
          },
          e => {
            console.log(e);
            e &&
              e.name &&
              "PermissionDeniedError" == e.name &&
              this.createPublisher();
          }
        )
      : this.createPublisher();
  }
};
</script>

<style lang="postcss">
.index-card {
  width: 1000px;
  margin: 10px auto;
}

.index-card > .el-card__body {
  height: 480px;
  padding:0;
}
</style>
