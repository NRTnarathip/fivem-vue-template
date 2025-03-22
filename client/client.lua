local webReadyTask = promise:new()
RegisterNUICallback(NUICallback.WebReady, function(body, resultCallback)
    resultCallback("ok")

    webReadyTask:resolve()
end)

RegisterNUICallback(NUICallback.GetHelloMessage, function (body, resultCallback)
    resultCallback("Hello World. this msg fron client.lua NUICallback.GetHelloMessage")
end)

CreateThread(function()
    Citizen.Await(webReadyTask)
    while not ESX.IsPlayerLoaded() do
        Wait(0)
    end
    print("web & client ready")


    -- ready
    SendNUIMessage({
        action = NUIAction.Hello,
        msg = "Hello. This msg fron client.lua",
    })
end)
