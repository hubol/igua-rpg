export function trimExtension(fileName: string)
{
    const dot = fileName.lastIndexOf(".");
    return dot !== -1 ? fileName.substr(0, dot) : fileName;
}