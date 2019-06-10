import { FileState } from './model/UploadPageState'
import Vue from 'vue'
import { ModelProcess } from './model/CreateProjectPageState'

declare global {
  interface Window {
    vm: Vue
    pluginPageActions: {
      createProjectJson: (projectCreateJson: string) => void
      loadFuncs: (engin: string, version: string, querystr: string) => void
      loadEngins: () => void
      loadEnginVersions: () => void
      loadProjects: () => void
    }
    uploadPageActions: {
      selectFolder: () => void
      selectProjectFolder: () => void
      uploadFolder: (fileState: string) => void
      uploadProjectFolder: (fileState: string) => void
    }
    setProjectPathActions: {
      setProjectPath: () => void
    }
    createProjectActions: {
      startProcess: (modelListStr: string) => void
      loadMoudels: () => void
      refreshUpload: (id: string, percent: number) => void
      refreshUnzipedState: (id: string, unzipedState: string) => void
    }
  }
}
export default global
