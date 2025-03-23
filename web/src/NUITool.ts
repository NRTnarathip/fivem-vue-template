import { NUIAction } from "./NUIAction";

const getParentResourceName = (window as any).GetParentResourceName || function () {
    return null;
};

const scriptName = getParentResourceName();
export const isOnFiveM = scriptName != null;

const registerNUICallbackList = new Map<string, Function>();
export function RegisterNUICallbackFake(eventName: string, callback: Function) {
    registerNUICallbackList.set(eventName, callback)
}

export async function TriggerNUICallback(eventName: string, dataToSend: object = {}) {
    if (isOnFiveM == false) {
        const callback = registerNUICallbackList.get(eventName);
        if (callback == null) return null;

        const task = new Promise(async (resolve) => {
            let result: any = null;
            await callback?.(dataToSend, (resultFromCallback: any) => {
                result = resultFromCallback;
            });
            resolve(result);
        });
        return await task;
    }

    try {
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(dataToSend),
        };

        const response = await fetch(`https://${scriptName}/${eventName}`, options);
        return await response.json();
    } catch (err) {

    }
}

export function SendNUIMessageFake(data: any) {
    postMessage({
        ...data
    })
}

// NUI Action Tool
const nuiActionCallbackMap = new Map<NUIAction, Function>();
export function RegisterNUIAction(action: NUIAction, callback: Function) {
    nuiActionCallbackMap.set(action, callback)
}

window.onmessage = (msg: MessageEvent) => {
    const data = msg.data;
    const action = data.action as NUIAction;
    const callback = nuiActionCallbackMap.get(action)
    if (callback) {
        callback(data);
    }
};