<template>
  <div class="root">
    <div class="main-container">
      <div class="work-area">
        <cell-header class="h-horizon">
          <div>
            客
            <br>户
            <br>侧
            <br>立
            <br>项
            <br>基
            <br>本
            <br>信
            <br>息
          </div>
        </cell-header>
        <div class="table-main">
          <row-item title="业务类型">
            <el-select class="w8" v-model="selectedValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </row-item>
          <row-item title="状态">
            <a href="#">正常</a>
          </row-item>
          <row-item title="销售">
            <el-select class="w8" v-model="selectedValue" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </row-item>
          <row-item title="销售团队">
            <div>张沙团队</div>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="状态">
            <div>safs</div>
          </row-item>
          <row-item title="状态">
            <div>safs</div>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="客户属性">
            <el-radio v-model="radio" label="1">直属客户</el-radio>
            <el-radio v-model="radio" label="2">代理商</el-radio>
          </row-item>
          <row-item title="产品名称">
            <el-input class="w8" placeholder="请输入内容"></el-input>
          </row-item>
        </div>
      </div>
      <div class="guid-area"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CellHeader from '../components/CellHeader.vue'
import RowItem from '../components/RowItem.vue'

@Component({
  components: {
    'cell-header': CellHeader,
    'row-item': RowItem
  }
})
export default class BsAddPage extends Vue {
  public options = [
    {
      value: '选项1',
      label: '黄金糕'
    },
    {
      value: '选项2',
      label: '双皮奶',
      disabled: true
    },
    {
      value: '选项3',
      label: '蚵仔煎'
    },
    {
      value: '选项4',
      label: '龙须面'
    },
    {
      value: '选项5',
      label: '北京烤鸭'
    }
  ]
  public selectedValue = ''
  public radio = false
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.h-horizon {
  width: 50px;
}

.h-vertical {
  height: 60px;
}

.root {
  width: 100%;
  .main-container {
    width: 100%;
    flex-grow: 1;
    background-color: #fff;
    display: flex;

    .work-area {
      width: 100%;
      display: flex;

      .table-main {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
      }
    }

    .guid-area {
      margin-left: 10px;
      width: 180px;
      border-left-width: 2px;
      border-left-color: #d5d5d5;
      border-left-style: solid;
    }
  }
}
</style>


