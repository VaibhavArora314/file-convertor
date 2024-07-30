export interface IFileAction {
    file: File,
    name: string,
    sizeInKb: number,
    to: string,
    from: string,
    type: string,
    isConverted: boolean,
    isConverting: boolean,
    isError: boolean,
    convertedUrl: string,
    output: string
}