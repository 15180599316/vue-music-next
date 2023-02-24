import loading from '@/components/base/loading/loading.vue'
import { addClass, removeClass } from '@/assets/js/dom'
import { createApp } from 'vue'
 const loadingDirective = {
  mounted(el, binding) {
    const instance = createApp(loading).mount(document.createElement('div'))
    el.instance = instance
    const title = binding.arg
    if (typeof title !== 'undefined') {
      instance.setTitle(title)
    }
    if (binding.value) {
        append(el)
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el)
    }
  }
}
function append(el) {
  const style = getComputedStyle(el)
  if (!['relative', 'fixed', 'absolute'].includes(style.position)) {
    addClass(el, 'g-relative')
  }
  el.appendChild(el.instance.$el)
}
function remove(el) {
  removeClass(el, 'g-relative')
  el.removeChild(el.instance.$el)
}
export default loadingDirective
