<template>
  <div class="root">
    <el-button type="primary" class="btn" @click="createProject">
      开始生成
      <i class="el-icon-s-tools el-icon--right"></i>
    </el-button>

    <el-table ref="multipleTable" :data="state.Models" tooltip-effect="dark" style="width: 100%">
      <el-table-column label="下载项" width="100%">
        <template slot-scope="scope">{{ scope.row.Name }}</template>
      </el-table-column>
      <el-table-column prop="Engine" label="引擎" width="120"></el-table-column>
      <el-table-column prop="Des" label="描述" width="120"></el-table-column>
      <el-table-column label="下载进度" width="auto">
        <template slot-scope="scope">
          <el-progress
            :text-inside="true"
            :stroke-width="26"
            :percentage="scope.row.Percent"
            status="success"
          ></el-progress>
        </template>
      </el-table-column>
      <el-table-column label="解压" width="auto">
        <template slot-scope="scope">
          <div>
            <i class="el-icon-finished" v-show="true"></i>
          </div>
          <div
            v-show="scope.row.UnzipedState===`start`"
            v-loading="true"
            element-loading-text="拼命解压中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 1)"
            style="width: 100%;height: 70px;"
          ></div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { CreateProjectPageState, ModelProcess } from '../model/CreateProjectPageState'
import { PluginPageState, FuncModel, Engin, Version, Project, ProjectCreateMoudle } from '../model/PluginPageState'
import { Showtype, MessageType } from '@/model/Message'
import MessageHelper from '@/util/MessageHelper'

@Component
export default class CreateProjectPage extends Vue {
  public state: CreateProjectPageState = {
    Models: [],
    Message: {
      Showtype: Showtype.Message,
      MsgType: MessageType.Undefine,
      Msg: '',
      Duration: 3
    }
  }
  public createProject() {
    window.createProjectActions.startProcess(JSON.stringify(this.state.Models))
  }
  public created() {
    this.$root.$data.eventHub.$on('CreateProjectPageState', (data: CreateProjectPageState) => {
      this.state = data
      MessageHelper.MessageInstance.Message(this, data.Message)
    })
    window.createProjectActions.loadMoudels()

    window.createProjectActions.refreshUpload = this.refreshUpload
    window.createProjectActions.refreshUnzipedState = this.refreshUnzipedState
  }

  public refreshUpload(id: string, percent: number) {
    const model = ((this.state.Models.find(p => p.Id === id) as ModelProcess).Percent = percent)
  }

  public refreshUnzipedState(id: string, unzipedState: string) {
    const model = ((this.state.Models.find(p => p.Id === id) as ModelProcess).UnzipedState = unzipedState)
  }
}
</script>

<style lang="scss" scoped>
.root {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>
