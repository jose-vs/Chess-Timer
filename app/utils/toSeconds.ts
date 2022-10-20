export const toSeconds = (time: string): number => { 
    const timeArray = time.split(":")
    return (+timeArray[0]) * 60 * 60 + (+timeArray[1]) * 60 + (+timeArray[2]); 
}