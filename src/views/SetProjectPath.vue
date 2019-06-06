<template>
  <div class="root">
    <el-input class="path" placeholder="请输入项目生成路径" v-model="state.OutputPath" clearable></el-input>
    <el-button type="primary" class="btn" @click="setPath">
      指定路径
      <i class="el-icon-folder-opened el-icon--right"></i>
    </el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SetProjectPathPageState } from '../model/SetProjectPathPageState'
import { Showtype, MessageType } from '@/model/Message'
import MessageHelper from '@/util/MessageHelper'

@Component
export default class SetProjectPath extends Vue {
  public state: SetProjectPathPageState = {
    IsLegal: false,
    Message: {
      Showtype: Showtype.Message,
      MsgType: MessageType.Undefine,
      Msg: '',
      Duration: 3
    },
    OutputPath: ''
  }
  public setPath(event: MouseEvent) {
    window.setProjectPathActions.setProjectPath()
  }
  public created() {
    this.$root.$data.eventHub.$on('SetProjectPathPageState', (data: SetProjectPathPageState) => {
      this.state = data
      MessageHelper.MessageInstance.Message(this, data.Message)
      if (data.IsLegal) {
        this.$router.push({ path: '/createProjectPage' })
      }
    })
  }
}
</script>


<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-items: center;

  .path {
    width: 300px;
    margin-left: 100px;
  }
  .btn {
    margin-left: 10px;
  }
}
</style>
