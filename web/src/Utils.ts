const baseURL = import.meta.env.BASE_URL;
export function ResolvePublicPath(img: string) {
    //skip resolve with already path
    if (img.includes(baseURL)) {
        return img;
    }

    //resolve it
    return baseURL + img;
}
export function Delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
export function RandomRange(min: number, max: number) {
    return min + (Math.random() * (max - min));
}
export function RandomRangeInt(min: number, max: number) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export function Clamp(val: number, min: number, max: number): number {
    if (val < min)
        val = min
    else if (val > max)
        val = max

    return val
}

export function SetRootVariable(variable: string, value: string | number) {
    document.documentElement.style.setProperty("--" + variable, value.toString());
}