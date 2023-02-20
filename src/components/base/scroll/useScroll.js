import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import { ref, onMounted, onUnmounted } from 'vue'
BScroll.use(ObserveDOM)

export default function useScroll(wrapperRef, options) {
  const bScroll = ref(null)
  onMounted(() => {
    bScroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      ...options
    })
  })
  onUnmounted(() => {
    bScroll.value.destroy()
  })
}
