Config = {}

-- Miranda Rights text configuration
-- Each line will be displayed as a separate paragraph
Config.MirandaRights = {
    "You have the right to remain silent.",
    "Anything you say can and will be used against you in a court of law.",
    "You have the right to an attorney present before and during questioning to protect your rights and interests.",
    "If you cannot afford an attorney, one will be provided for you.",
    "Do you understand your rights as I read them to you?",
    "With these rights in mind, do you wish to continue speaking with officers?"
}

-- UI Configuration
Config.UISettings = {
    Title = "MIRANDA WARNING",
    AcknowledgeButtonText = "I Understand",
    CloseButtonText = "Close"
}

-- Command Configuration
Config.Command = "miranda"
Config.DefaultKeybind = "F9"