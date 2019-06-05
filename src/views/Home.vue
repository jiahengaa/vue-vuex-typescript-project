<template>
  <div class="home">
    <v-pluginselect></v-pluginselect>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import pluginSelect from '../components/PluginSelect.vue'

@Component({
  name: 'home',
  components: {
    'v-pluginselect': pluginSelect,
  }
})
export default class Home extends Vue {}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
}
</style>
