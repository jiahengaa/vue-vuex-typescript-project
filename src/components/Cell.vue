<template>
  <div class="cell">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Cell extends Vue {}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.cell {
  border: 1px $bordercolor solid;
  margin-right: -1px;
  margin-bottom: -1px;

  display: flex;
  align-items: center; /*垂直居中*/
  justify-content: center; /*水平居中*/
}
</style>

