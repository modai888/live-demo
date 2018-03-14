<template>
  <div id="app">
    <el-card class="index-card">
     <video id="my-video" class="video-js vjs-big-play-centered vjs-fluid" x-webkit-airplay="allow" webkit-playsinline controls :poster="logoImg">
    </video>
    </el-card>
  </div>
</template>

<script>
import logo from "assets/img/logo.png";
import modal from "components/modal.vue";

import "assets/css/neplayer.min.css";
import "assets/js/neplayer.min.js";
import "assets/js/video-js.swf";

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
    createPlayer() {
      return new Promise(resolve => {
        let player = neplayer(
          "my-video",
          {
            controls: true,
            autoplay: true,

            /*预加载选项*/
            preload: "auto"
          },
          () => {
            resolve(player);
          }
        );
      });
    }
  },

  created() {},

  mounted() {
    this.createPlayer().then(player => {
      debugger;
      this._player = player;
      player.setDataSource({
        type:'application/x-mpegURL',
        src:'http://pullhls1f404acd.live.126.net/live/13b19c6a77824834add731f09a4a9082/playlist.m3u8'
      });

      player.play();
    });
  }
};
</script>

<style lang="postcss">
.index-card {
  width: 1000px;
  margin: 10px auto;
}

.index-card > .el-card__body {
  height: 562px;
  padding: 0;
}
</style>
