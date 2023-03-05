<template>
  <div class="music-list">
    <div
      class="back"
      @click="goBack"
    >
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div
      class="bg-image"
      ref="bgImage"
      :style="bgImageStyle"
    >
      <div
        class="play-btn-wrapper"
        :style="playBtnStyle"
      >
        <div
          v-show="songs.length > 0"
          class="play-btn"
          @click="random"
        >
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
      <div
        class="filter"
        :style="filterStyle"
      ></div>
    </div>
    <scroll
    class="list"
    :style="`top:${ bgImageHeight }px`"
    :probe-type="3"
    @scroll="onScroll"
    v-loading="loading"
    v-no-result.[noResultText]="noResult"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs" @select="selectItemPlay"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from '@/components/base/song-list/song-list.vue'
import Scroll from '@/components/base/scroll/Scroll.vue'
import { mapActions } from 'vuex'
const TITLE_HEIGHT = 40

export default {
  name: 'music-list',
  components: {
    Scroll,
    SongList
  },
  props: {
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: '抱歉，没有找到可播放的歌曲'
    },
    songs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    noResult() {
      return !this.loading && !this.songs.length
    },
    playBtnStyle() {
      let display = ''
      if (this.scrollY >= this.maxTranslateY) {
        display = 'none'
      }
      return {
        display
      }
    },
    bgImageStyle() {
      let height = 0
      let paddingTop = '70%'
      let zIndex = 0
      let translateZ = 0
      const scrollY = this.scrollY
      if (scrollY > this.maxTranslateY) {
        height = `${TITLE_HEIGHT}px`
        zIndex = 10
        translateZ = 1
        paddingTop = 0
      }

      let scale = 1
      if (scrollY < 0) {
          scale = 1 + Math.abs(scrollY / this.bgImageHeight)
      }
      return {
        'background-image': `url(${this.pic})`,
        height,
        paddingTop,
        zIndex,
        transform: `scale(${scale}) translateZ(${translateZ}px)`
      }
    },
    filterStyle() {
      const scrollY = this.scrollY
      const maxTranslateY = this.maxTranslateY
      const bgImageHeight = this.bgImageHeight
      const blur = Math.min(maxTranslateY / bgImageHeight, scrollY / bgImageHeight) * 20
      return {
        backdropFilter: `blur(${blur}px)`
      }
    }
  },
  data () {
    return {
      scrollY: 0,
      bgImageHeight: 0,
      maxTranslateY: 0
    }
  },
  mounted () {
    this.bgImageHeight = this.$refs.bgImage.clientHeight | 0
    this.maxTranslateY = this.bgImageHeight - TITLE_HEIGHT
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onScroll(pos) {
      this.scrollY = -pos.y
    },
    random() {
      this.randomPlay(this.songs)
    },
    selectItemPlay({ song, index }) {
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    ...mapActions([
      'randomPlay',
      'selectPlay'
    ])
  }
}
</script>
<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
