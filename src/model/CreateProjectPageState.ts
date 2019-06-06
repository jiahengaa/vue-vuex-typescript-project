import { Message } from './Message'

export interface CreateProjectPageState {
  Models: ModelProcess[]
  Message: Message
}
export interface ModelProcess {
  IsTemplateProject: boolean
  Percent: number
  StepName: string
  IsStart: boolean
  IsCompleted: boolean
  Name: string
  Version: string
  Engine: string
  OutputPath: string
  DownloadPath: string
  Id: string
  Des: string
}
