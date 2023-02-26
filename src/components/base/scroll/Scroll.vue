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
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {}
  },
  emits: ['scroll'],
  setup(props, { emit }) {
    const rootRef = ref(null)
    const { scroll } = useScroll(rootRef, { click: props.click, probeType: props.probeType }, emit)
    return {
      rootRef,
      scroll
    }
  }
}
</script>
