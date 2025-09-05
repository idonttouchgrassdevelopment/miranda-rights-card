local display = false

-- Load config
local mirandaRights = Config.MirandaRights
local uiSettings = Config.UISettings

-- Command to toggle the Miranda Rights card
RegisterCommand(Config.Command, function()
    SetDisplay(not display)
end, false)

-- Key binding (configurable)
RegisterKeyMapping(Config.Command, 'Toggle Miranda Rights Card', 'keyboard', Config.DefaultKeybind)

-- Function to handle display state
function SetDisplay(state)
    display = state
    SetNuiFocus(state, state)
    SendNUIMessage({
        type = "ui",
        status = state,
        config = {
            rights = mirandaRights,
            uiSettings = uiSettings
        }
    })
end

-- NUI Callback for closing the card
RegisterNUICallback('close', function(data, cb)
    SetDisplay(false)
    cb('ok')
end)

-- NUI Callback for acknowledging the rights
RegisterNUICallback('acknowledge', function(data, cb)
    -- Trigger a chat message or notification that the suspect acknowledged the rights
    TriggerEvent('chat:addMessage', {
        color = {0, 255, 0},
        multiline = true,
        args = {"Miranda Rights", "Suspect has acknowledged understanding their rights."}
    })
    
    -- You could add additional functionality here, like animations or sounds
    cb('ok')
end)

-- Exports for other resources to use
exports('showMirandaCard', function()
    SetDisplay(true)
end)

exports('hideMirandaCard', function()
    SetDisplay(false)
end)