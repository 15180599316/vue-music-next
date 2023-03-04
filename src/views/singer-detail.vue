<template>
  <div class="singer-detail">
    <music-list
      :songs="songs"
      :title="title"
      :pic="pic"
      :loading="loading">
    </music-list>
  </div>
</template>

<script>
import MusicList from '@/components/music-list/music-list.vue'
import { getSingerDetail } from '@/service/singer'
import storage from 'good-storage'
import { SINGER_KEY } from '@/assets/js/constant'
export default {
  name: 'singer-detail',
  components: {
    MusicList
  },
  props: {
    data: Object
  },
  computed: {
    computedData() {
      let ret = null
      const cached = storage.session.get(SINGER_KEY)
      if (this.data) {
        ret = this.data
      } else {
        if (cached && cached.mid === this.$route.params.id) {
          ret = cached
        }
      }
      return ret
    },
    pic() {
      const data = this.computedData
      return data && data.pic
    },
    title() {
      const data = this.computedData
      return data && (data.name || data.title)
    },
    loading() {
      return this.songs && this.songs.length === 0
    }
  },
  data () {
    return {
      songs: []
    }
  },
  async created () {
    const data = this.computedData
    if (!data) {
      const path = this.$route.matched[0].path
      this.$router.push({
        path
      })
    }
    const result = await getSingerDetail(data)
    this.songs = result.songs
  }
}
</script>
<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
}
</style>
