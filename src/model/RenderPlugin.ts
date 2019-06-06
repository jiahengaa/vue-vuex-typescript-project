import { FuncModel, Project } from './PluginPageState'

export interface RenderPlugin {
  Checked: boolean
  Plugin: FuncModel
}

export interface RenderProject {
  Checked: boolean
  Project: Project
}
