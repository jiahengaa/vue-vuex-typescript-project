<template>
  <div class="home">
    <v-pluginselect></v-pluginselect>
    <render-hello :level="1">Hello world!</render-hello>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import pluginSelect from '../components/PluginSelect.vue'
import RenderHello from '../views/RenderHello'

@Component({
  name: 'home',
  components: {
    'v-pluginselect': pluginSelect,
    'render-hello': RenderHello
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
</style>
