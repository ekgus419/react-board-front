export const convertUrlToFile = async (url: string) => {
    // 특정 url을 받아와서 파일 객체로 바꿔준다.
    const response = await fetch(url);
    const data = await response.blob();
    const extend = url.split(".").pop();
    const fileName = url.split("/").pop();
    const meta = { type: `image/${extend}` } ;
    
    return new File([data], fileName as string, meta);
}

export const convertUrlsToFile = async (urls: string[]) => {
    const files: File[] = [];
    for (const url of urls) {
        const file = await convertUrlToFile(url);
        files.push(file);
    }
    return files;
}