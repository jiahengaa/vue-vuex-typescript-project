import { FileState } from './model/UploadPageState';

declare global {
    interface Window {
        vm: object,
        pluginPageActions: {
            createProjectJson: () => void,
            loadFuncs: (engin: string, version: string, querystr: string) => void,
            loadEngins: () => void,
            loadEnginVersions: () => void,
            loadProjects: () => void,
        },
        uploadPageActions: {
            selectFolder: () => void,
            selectProjectFolder: () => void,
            uploadFolder: (fileState: string) => void,
            uploadProjectFolder: (fileState: string) => void,
        }
    }
}
export default global
