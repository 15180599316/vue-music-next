import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'
BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options, emit) {
  const bScroll = ref(null)
  onMounted(() => {
    const bScrollVal = bScroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })
    // probeType === 0 不派发scroll事件
    if (options.probeType > 0) {
      bScrollVal.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })
  onUnmounted(() => {
    bScroll.value.destroy()
  })
  return {
    scroll: bScroll
  }
}
