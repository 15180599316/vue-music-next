 <template>
  <Header></Header>
  <Tab></Tab>
  <router-view/>
</template>
<script>
import Header from '@/components/header/Header.vue'
import Tab from '@/components/tab/Tab.vue'
export default {
  name: 'app',
  components: {
    Header,
    Tab
  }
}
</script>
<style lang="scss">

</style>
