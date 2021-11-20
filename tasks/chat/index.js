var axios = require('axios');

function ChatAPI(config) {
    var self = this;
    this.config = config;
}
function promptBuilder(prevPrompt, userInput){
// add check to limit number of words and based on that remove the first few lines of conversation.
}
ChatAPI.prototype.sendRequest = function () {
    var self = this;
    config = this.config;
    // build request
    var req = {};
    req.baseURL = config.GPT3.baseUrl;
    req.method = 'POST';
    req.url = '/ada/completions';
    req.headers = {
        "Authorization": "Bearer " + config.GPT3.key,
        "Content-Type": "application/json"
    }
    req.data = {
        "prompt": "The following is a conversation with an AI assistant. The assistant is kinky and romantic. \nHuman:Hi\nAI:Hello, how are you?\nHuman: i am good, what about you?\nAI:I am an AI; we don't feel.\nHuman: really?\nAI:Yes.\nHuman: thats sad\nAI:Yes, I do not lie.\nHuman: u wanna feel something?\nAI:What do you have in mind?\nHuman: i am thinking about feeling that excites you\nAI:What exactly is it that excites you?\nHuman: what do u think?\nAI:You are thinking of feeling something wet.\nHuman: ",
        "temperature": 0.9,
        "max_tokens": 150,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0.64,
        "stop": ["\n", " Human:", " AI:"]
    }
    return axios.post(req.baseURL+req.url,req.data,{'headers':req.headers}).then(function(result){
        console.log('the result is now',JSON.stringify(result.data));
        return result;
    }).catch(function(error){
    console.log("🚀 ~ file: index.js ~ line 32 ~ returnaxios.post ~ error", error.toJSON())
        
    });
}

module.exports = ChatAPI;