<template>
    <div class="content">
        <div class="left">
            <div class="project">
                <el-table
                    ref="singleTable"
                    :data="state.Projects"
                    highlight-current-row
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                    <el-table-column
                    type="index"
                    width="50">
                    </el-table-column>
                    <el-table-column
                    property="Name"
                    label="模板项目名称"
                    width="120">
                    </el-table-column>
                    <el-table-column
                    property="Engine"
                    label="项目类型">
                    </el-table-column>
                    <el-table-column
                    property="Version"
                    label="项目版本">
                    </el-table-column>
                    <el-table-column
                    property="Des"
                    label="描述">
                    </el-table-column>
                </el-table>
                <div class="item">
                    <div class="item-label">项目名称</div>
                    <el-input class="item-input" v-model="projectName" placeholder="请输入内容"></el-input>
                 </div>
                 <div class="item">
                     <div class="item-label">备注</div>
                     <el-input type="textarea" class="item-input" v-model="projectDesc" placeholder="请输入备注信息"></el-input>
                 </div>
                 <el-button type="primary" @click="createProject">构建配置信息</el-button>
            </div>
        </div>
        <div class="right">
            <div class="rtop">
            </div>
            <div class="rbottom">
                <div>
                    模块选择：
                </div>
                <div class="selectContent">
                    <div>功能名称：</div>
                    <el-input class="querylable" v-model="funcName" placeholder="请输入功能名称"></el-input>
                    <el-button type="primary" @click="search">搜索</el-button>
                    <el-button type="primary" @click="reset">重置</el-button>
                </div>
                <el-table
                    ref="multipleTable"
                    :data="state.FuncModels.filter(data=> !funcName || data.Name.toLowerCase().includes(funcName.toLowerCase()))"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column
                    label="功能模块"
                    width="100%">
                    <template slot-scope="scope">
                        {{ scope.row.Name }}
                    </template>
                    </el-table-column>
                    <el-table-column
                    prop="Engine"
                    label="引擎"
                    :filters=Engins
                    :filter-method="filterEngine"
                    width="auto">
                    </el-table-column>
                    <el-table-column
                    prop="Des"
                    label="描述"
                    width="auto">
                    </el-table-column>
                    <el-table-column
                    fixed="right"
                    label="版本选择"
                    :filters="Versions"
                    :filter-method="filterVersion"
                    width="120">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.Version" placeholder="请选择">
                            <el-option
                            v-for="item in scope.row.Versions"
                            :key="item.Id"
                            :label="item.Name"
                            :value="item.Id">
                            </el-option>
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
import { PluginPageState, FuncModel, Engin, Version, Project} from '../model/PluginPageState'
import { FileState } from '@/model/UploadPageState';

@Component
export default class PluginSelect extends Vue {
    public currentProject: any
    public Versions: any[] = [{
             text: '4.21.x',
             value: '4.21.x'
        }, {
             text: '4.20.x',
             value: '4.20.x'
        }, {
            text: 'Unity2.0.0',
            value: 'Unity2.0.0'
        }]

    public Engins: any[] = [{
        text: 'UE4',
        value: 'UE4',
    }, {
        text: 'Unity',
        value: 'Unity',
    }]
    public state: PluginPageState = {
        Engins: [{
             Name: 'UE4',
             Id: 'UE4'
        }, {
             Name: 'Unity',
             Id: 'Unity'
        }],
        UnityVersions: [],
        UE4Versions: [{
             Name: '4.21.x',
             Id: '4.21.x'
        }, {
             Name: '4.20.x',
             Id: '4.20.x'
        }],
        FuncModels: [
            {
                Id: '1',
                Name: 'addfunc',
                Des: 'addfunc libary',
                Version: '4.20.x',
                Versions: [{
                    Name: '4.20.x',
                    Id: '4.20.x'
                }],
                RelativePath: '',
                Engine: 'UE4',
            }
        ],
        Projects: []
    }

    public selectVersionSrc: Version[] = []

    public projectName = ''
    public projectDesc = ''
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

    public filterEngine(value: any, row: FuncModel, column: any) {
        return row.Engine === value;
    }

    public filterVersion(value: any, row: FuncModel, column: any) {
        return row.Version === value;
    }

    public handleCurrentChange(project: any) {
        this.currentProject = project;
    }

    public handleSelectionChange(arr: any[]) {
        console.log('bb')
    }
    public createProject(event: MouseEvent) {
        console.log('aa')
    }
    public search(event: MouseEvent) {
        console.log('search')

    }
    public reset(event: MouseEvent) {
        console.log('reset')
    }

    public created() {
        console.log('create')
        this.$root.$data.eventHub.$on('PluginPageState', (data: PluginPageState) => {
            this.state = data;
        })

        window.pluginPageActions.loadEngins()
        window.pluginPageActions.loadEnginVersions()
        window.pluginPageActions.loadFuncs('', '', '')
        window.pluginPageActions.loadProjects()
    }
}
</script>
<style lang="scss" scoped>
.content{
    display: flex;

    .left{
        align-self: center;
        .project{
            flex-direction: column;
            display: flex;
            .item{
                display: flex;
                align-items: center;
                .item-label{
                    width: 120px;
                }
            }
        }
    }
    .right{
        flex-grow: 1;
        flex-direction: column;
        display: flex;
        margin-left: 10px;
        
        .rtop{
            display: flex;
            padding: 10px;
             align-items: center;
            //  background-color: #fff;
        }
        .rbottom{
            padding: 10px;
            // background-color: #fff;
            margin-top: 10px;
            .selectContent{
                display: flex;
                align-items: center;
                margin: 20px;
                .querylable{
                    width: 300px;
                }
            }
        }
    }
}
</style>
