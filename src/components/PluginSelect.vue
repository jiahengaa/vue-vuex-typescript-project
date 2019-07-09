<template>
  <div class="content">
    <div class="left">
      <div class="project">
        <el-table ref="singleTable" :data="renderProjects" style="width: 100%">
          <el-table-column width="55">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.Checked" @change="checkProjectChanged(scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column type="index" width="50"></el-table-column>
          <el-table-column property="Project.Name" label="模板项目名称" width="120"></el-table-column>
          <el-table-column property="Project.Engine" label="项目类型"></el-table-column>
          <el-table-column property="Project.Version" label="项目版本"></el-table-column>
          <el-table-column property="Project.Des" label="描述"></el-table-column>
        </el-table>
        <div class="item">
          <div class="item-label">项目名称</div>
          <el-input
            class="item-input"
            v-model="projectCreateMoudle.ProjectName"
            placeholder="请输入内容"
          ></el-input>
        </div>
        <div class="item">
          <div class="item-label">备注</div>
          <el-input
            type="textarea"
            class="item-input"
            v-model="projectCreateMoudle.Des"
            placeholder="请输入备注信息"
          ></el-input>
        </div>
        <el-button type="primary" @click="createProject">构建配置信息</el-button>
      </div>
    </div>
    <div class="right">
      <div class="rtop"></div>
      <div class="rbottom">
        <div>模块选择：</div>
        <div class="selectContent">
          <div>功能名称：</div>
          <el-input class="querylable" v-model="funcName" placeholder="请输入功能名称"></el-input>
          <el-button type="primary" @click="reset">刷新</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="computeRenderPlugins"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column width="55">
            <template slot="header">
              <el-checkbox :checked="checkAll" @change="checkAllAction"></el-checkbox>
            </template>
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.Checked" @change="checkStateChanged"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="功能模块" width="100%">
            <template slot-scope="scope">{{ scope.row.Plugin.Name }}</template>
          </el-table-column>
          <el-table-column
            prop="Plugin.Engine"
            label="引擎"
            :filters="Engins"
            :filter-method="filterEngine"
            width="auto"
          ></el-table-column>
          <el-table-column prop="Plugin.Des" label="描述" width="auto"></el-table-column>
          <el-table-column
            fixed="right"
            label="版本选择"
            :filters="Versions"
            :filter-method="filterVersion"
            width="120"
          >
            <template slot-scope="scope">
              <el-select v-model="scope.row.Plugin.Version" placeholder="请选择">
                <el-option
                  v-for="item in scope.row.Plugin.Versions"
                  :key="item.Id"
                  :label="item.Name"
                  :value="item.Id"
                ></el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { PluginPageState, FuncModel, Engin, Version, Project, ProjectCreateMoudle } from '../model/PluginPageState'
import { FileState } from '@/model/UploadPageState'
import { RenderPlugin, RenderProject } from '@/model/RenderPlugin'
import { MessageType, Showtype } from '../model/Message'
import MessageHelper from '@/util/MessageHelper'

@Component
export default class PluginSelect extends Vue {
  public currentProject: any
  public Versions: any[] = [
    {
      text: '4.21.x',
      value: '4.21.x'
    },
    {
      text: '4.20.x',
      value: '4.20.x'
    },
    {
      text: 'Unity2.0.0',
      value: 'Unity2.0.0'
    }
  ]

  public Engins: any[] = [
    {
      text: 'UE4',
      value: 'UE4'
    },
    {
      text: 'Unity',
      value: 'Unity'
    }
  ]
  public state: PluginPageState = {
    Message: {
      Showtype: Showtype.Message,
      MsgType: MessageType.Undefine,
      Msg: '',
      Duration: 3
    },
    Engins: [
      {
        Name: 'UE4',
        Id: 'UE4'
      },
      {
        Name: 'Unity',
        Id: 'Unity'
      }
    ],
    UnityVersions: [],
    UE4Versions: [
      {
        Name: '4.21.x',
        Id: '4.21.x'
      },
      {
        Name: '4.20.x',
        Id: '4.20.x'
      }
    ],
    FuncModels: [
      {
        Id: '1',
        Name: 'addfunc',
        Des: 'addfunc libary',
        Version: '4.20.x',
        Versions: [
          {
            Name: '4.20.x',
            Id: '4.20.x'
          }
        ],
        RelativePath: '',
        Engine: 'UE4'
      }
    ],
    Projects: []
  }

  public renderProjects: RenderProject[] = []

  public projectCreateMoudle: ProjectCreateMoudle = {
    Project: {
      Id: '',
      Des: '',
      Name: '',
      Engine: '',
      Version: '',
      Versions: [],
      RelativePath: ''
    },
    ProjectName: '',
    FuncModels: [],
    Des: ''
  }

  public renderPlugins: RenderPlugin[] = []

  public selectVersionSrc: Version[] = []

  public checkAll: boolean = false
  public classObj = {
    isChecked: this.checkAll
  }

  public funcName = ''

  public valueEngin = ''

  public valueVersion = ''

  public engineChanged(event: string) {
    if (event === 'Unity') {
      this.selectVersionSrc = this.state.UnityVersions
    } else {
      this.selectVersionSrc = this.state.UE4Versions
    }
  }

  public checkAllAction(checked: boolean) {
    this.renderPlugins.forEach(ele => (ele.Checked = checked))
  }

  public filterEngine(value: string, row: FuncModel, column: any) {
    return row.Engine === value
  }

  public filterVersion(value: string, row: FuncModel, column: any) {
    return row.Version === value
  }

  public checkProjectChanged(project: RenderProject) {
    this.currentProject = project
  }

  public createProject(event: MouseEvent) {
    this.projectCreateMoudle.Project = this.currentProject.Project
    this.projectCreateMoudle.FuncModels = []
    if (this.renderPlugins !== null) {
      this.renderPlugins.forEach(ele => {
        if (ele.Checked) {
          this.projectCreateMoudle.FuncModels.push(ele.Plugin)
        }
      })
    }

    if (this.projectCreateMoudle.ProjectName.trim() === '') {
      this.$message({
        showClose: true,
        message: '请填写项目名称',
        type: 'warning'
      })
      return
    }

    if (this.projectCreateMoudle.Des.trim() === '') {
      this.$message({
        showClose: true,
        message: '请填写项目描述',
        type: 'warning'
      })
      return
    }

    if (this.currentProject === undefined) {
      this.$message({
        showClose: true,
        message: '请选择模板项目',
        type: 'warning'
      })
      return
    }

    window.pluginPageActions.createProjectJson(JSON.stringify(this.projectCreateMoudle))

    this.$router.push({ path: '/setProjectPath' })
  }

  public reset(event: MouseEvent) {
    window.pluginPageActions.loadFuncs('', '', '')
  }

  get computeRenderPlugins() {
    if (this.renderPlugins != null) {
      return this.renderPlugins.filter(
        data => !this.funcName || data.Plugin.Name.toLowerCase().includes(this.funcName.toLowerCase())
      )
    } else {
      return []
    }
  }

  public checkStateChanged() {
    let tempCheckedAll = true
    for (const item of this.renderPlugins) {
      tempCheckedAll = tempCheckedAll && item.Checked
    }
    this.checkAll = tempCheckedAll
  }

  public initRenderPlugins(data: PluginPageState) {
    const oldRenderPlugins = this.renderPlugins
    const oldRenderProject = this.renderProjects

    this.renderProjects = []
    if (this.state.Projects != null) {
      this.state.Projects.forEach(ele => {
        if (oldRenderProject.find(p => p.Project.Id === ele.Id && p.Checked)) {
          this.renderProjects.push({
            Checked: true,
            Project: ele
          })
        } else {
          this.renderProjects.push({
            Checked: false,
            Project: ele
          })
        }
      })
    }

    this.renderPlugins = []
    if (this.state.FuncModels != null) {
      this.state.FuncModels.forEach(ele => {
        if (oldRenderPlugins.find(p => p.Plugin.Id === ele.Id && p.Checked)) {
          this.renderPlugins.push({
            Checked: true,
            Plugin: ele
          })
        } else {
          this.renderPlugins.push({
            Checked: false,
            Plugin: ele
          })
        }
      })
    }
  }

  public created() {
    this.$root.$data.eventHub.$on('PluginPageState', (data: PluginPageState) => {
      this.state = data
      this.initRenderPlugins(data)
      MessageHelper.MessageInstance.Message(this, data.Message)
    })

    window.pluginPageActions.loadEngins()
    window.pluginPageActions.loadEnginVersions()
    window.pluginPageActions.loadFuncs('', '', '')
    window.pluginPageActions.loadProjects()
  }
}
</script>
<style lang="scss" scoped>
.content {
  display: flex;

  .left {
    align-self: center;
    .project {
      flex-direction: column;
      display: flex;
      .item {
        display: flex;
        align-items: center;
        .item-label {
          width: 120px;
        }
      }
    }
  }
  .right {
    flex-grow: 1;
    flex-direction: column;
    display: flex;
    margin-left: 10px;

    .rtop {
      display: flex;
      padding: 10px;
      align-items: center;
      //  background-color: #fff;
    }
    .rbottom {
      padding: 10px;
      // background-color: #fff;
      margin-top: 10px;
      .selectContent {
        display: flex;
        align-items: center;
        margin: 20px;
        .querylable {
          width: 300px;
        }
      }
    }
  }
}
</style>
