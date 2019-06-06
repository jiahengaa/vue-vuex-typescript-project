import { Message } from './Message'

export interface PluginPageState {
  Engins: Engin[]
  UE4Versions: Version[]
  UnityVersions: Version[]
  FuncModels: FuncModel[]
  Projects: Project[]
  Message: Message
}

export interface Engin {
  Name: string
  Id: string
}

export interface Version {
  Name: string
  Id: string
}

export interface FuncModel {
  Name: string
  Des: string
  Version: string
  Id: string
  RelativePath: string
  Versions: any[]
  Engine: string
}
export interface Project {
  Name: string
  Des: string
  Version: string
  Id: string
  RelativePath: string
  Versions: Version[]
  Engine: string
}

export interface ProjectCreateMoudle {
  Project: Project
  FuncModels: FuncModel[]
  ProjectName: string
  Des: string
}
