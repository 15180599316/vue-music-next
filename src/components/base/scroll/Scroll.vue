<template>
  <div ref="rootRef">
    <slot></slot>
  </div>
</template>

<script>
import { ref } from 'vue'
import useScroll from '@/components/base/scroll/useScroll'
export default {
  name: 'scroll',
  props: {
    click: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {}
  },
  setup(props) {
    const rootRef = ref(null)
    useScroll(rootRef, { click: props.click })
    return {
      rootRef
    }
  }
}
</script>
