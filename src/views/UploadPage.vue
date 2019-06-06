<template>
  <div class="root">
    <el-button size="small" type="primary" @click="selectFolder">选取插件文件夹</el-button>
    <el-table :data="state.Files" height="auto" border style="width: 100%">
      <el-table-column prop="FileName" label="插件名称" width="180"></el-table-column>
      <el-table-column prop="Engine" label="引擎" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Engine" placeholder="请选择">
            <el-option v-for="item in engins" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="Version" label="版本" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Version" placeholder="请选择">
            <el-option
              v-for="item in (scope.row.Engine=='UE4'?uE4Versions:unityVersions)"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Des" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ZipFileFullPath" label="zip包" width="180"></el-table-column>
      <el-table-column prop="Msg" label="日志" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <i class="el-icon-loading" v-show="scope.row.IsUploading"></i>
          <i class="el-icon-check" v-show="scope.row.IsUploadSuccess"></i>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleUpload(scope.row)" type="text" size="small">上传</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-button size="small" type="primary" @click="selectProjectFolder">选取项目文件夹</el-button>
    <el-table :data="state.ProjectFiles" height="auto" border style="width: 100%">
      <el-table-column prop="FileName" label="项目名称" width="180"></el-table-column>
      <el-table-column prop="Engine" label="引擎" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Engine" placeholder="请选择">
            <el-option v-for="item in engins" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="Version" label="版本" width="180">
        <template slot-scope="scope">
          <el-select v-model="scope.row.Version" placeholder="请选择">
            <el-option
              v-for="item in (scope.row.Engine=='UE4'?uE4Versions:unityVersions)"
              :key="item.Id"
              :label="item.Name"
              :value="item.Id"
            ></el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="描述" width="180">
        <template slot-scope="scope">
          <el-input v-model="scope.row.Des" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="ZipFileFullPath" label="zip包" width="180"></el-table-column>
      <el-table-column prop="Msg" label="日志" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <i class="el-icon-loading" v-show="scope.row.IsUploading"></i>
          <i class="el-icon-check" v-show="scope.row.IsUploadSuccess"></i>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleUploadProject(scope.row)" type="text" size="small">上传</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { FileState, UploadPageState } from '../model/UploadPageState'
import { PluginPageState, FuncModel, Engin, Version } from '../model/PluginPageState'
import { Showtype, MessageType } from '@/model/Message'

@Component
export default class UploadPage extends Vue {
  public state: UploadPageState = {
    Files: [],
    ProjectFiles: [],
    Message: {
      Showtype: Showtype.Message,
      MsgType: MessageType.Undefine,
      Msg: '',
      Duration: 3
    }
  }

  public engins: Engin[] = [
    {
      Name: 'UE4',
      Id: 'UE4'
    },
    {
      Name: 'Unity',
      Id: 'Unity'
    }
  ]

  public uE4Versions: Version[] = [
    {
      Name: '4.21.x',
      Id: '4.21.x'
    },
    {
      Name: '4.20.x',
      Id: '4.20.x'
    }
  ]
  public unityVersions: Version[] = [
    {
      Name: '4.21.x',
      Id: '4.21.x'
    },
    {
      Name: '4.20.x',
      Id: '4.20.x'
    }
  ]

  public handleUpload(data: FileState) {
    window.uploadPageActions.uploadFolder(JSON.stringify(data))
  }

  public handleUploadProject(data: FileState) {
    window.uploadPageActions.uploadProjectFolder(JSON.stringify(data))
  }

  public selectFolder(event: MouseEvent) {
    window.uploadPageActions.selectFolder()
  }

  public selectProjectFolder(event: MouseEvent) {
    window.uploadPageActions.selectProjectFolder()
  }

  public created() {
    this.$root.$data.eventHub.$on('UploadPageState', (data: UploadPageState) => {
      this.state = data
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
