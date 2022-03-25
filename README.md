# ChatApp
ChatApp using GPT-3 Algorithm

This is a basic chatbot created using GPT-3 API.

For API Config:
copy paste the below in api-config.json to config folder
{
    "GPT3":{
        "baseUrl":"https://api.openai.com/v1/engines",
        "engines":["davinci","curie","babbage","ada"],
        "tasks":["completions"],
        "key":"yourkey"
    }
}

For Bot Config:
copy paste the below in bot.json in config folder
{
    "token":"your bot token",
    "prefix":"!" // bot prefix
}
