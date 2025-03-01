const getParentResourceName = (window as any).GetParentResourceName || function () {
    return null;
};

const scriptName = getParentResourceName();
const isOnFiveM = scriptName != null;

export async function TriggerNuiCallback(methodName: string, dataToSend: object = {}) {
    if (isOnFiveM == false) {
        return;
    }

    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataToSend),
        };

        const resp = await fetch(`https://${scriptName}/${methodName}`, options);
        await resp.json();
    } catch (err) {
    }
}
export {
    isOnFiveM,
}

export function ResolvePublicPath(img: string) {
    return import.meta.env.BASE_URL + img;
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