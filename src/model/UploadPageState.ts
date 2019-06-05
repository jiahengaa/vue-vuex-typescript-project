export interface UploadPageState {
    Files: FileState[];
    ProjectFiles: FileState[];
}
export interface FileState {
    Engine: string;
    Des: string;
    Version: string;
    FileName: string;
    OriginalFileFullPath: string;
    ZipFileFullPath: string;
    IsZiped: boolean;
    IsUploading: boolean;
    IsUploadSuccess: boolean;
    Msg: string;
}

