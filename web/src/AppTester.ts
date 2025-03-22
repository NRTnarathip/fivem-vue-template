import { appConfig } from "./AppConfig";
import { NUIAction } from "./NUIAction";
import { NUICallback } from "./NUICallback";
import { RegisterNUICallbackFake, SendNUIMessageFake, TriggerNUICallback } from "./NUITool"

export async function StartTester() {
    console.log("starting on tester...")

    //test web & client NUI callback
    RegisterNUICallbackFake(NUICallback.GetHelloMessage, (data: any, cb: Function) => {
        cb("hello world");
    });
    const helloMsg = await TriggerNUICallback(NUICallback.GetHelloMessage);
    console.log("On GetHelloMessage from NUICallbackFake = ", helloMsg);


    //test client.lua
    SendNUIMessageFake({
        action: NUIAction.Hello,
        msg: "Hello World!",
    })
}