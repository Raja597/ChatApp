var axios = require('axios');
var Promise = require('bluebird');
function ChatAPI(config) {
    var self = this;
    this.config = config;
}
function promptBuilder(msgArray, botDescription){
    console.log("🚀 ~ file: index.js ~ line 8 ~ promptBuilder ~ msgArray", msgArray)
    var prompt = botDescription + '\n'
    if(msgArray.length > 30){
        //limiting the msgArray
        msgArray = msgArray.slice(msgArray.length-20)
    }
    msgArray.forEach(function(msg){
        prompt = prompt + msg + '\n' ;
    });
    prompt += 'AI:'
    return prompt;
// add check to limit number of words and based on that remove the first few lines of conversation.
}
// Promise.promisify(promptBuilder);
ChatAPI.prototype.sendRequest = function (msgArray, botDescription) {  
    var prompt = promptBuilder(msgArray, botDescription);
    console.log("🚀 ~ file: index.js ~ line 19 ~ prompt", prompt)
    var self = this;
    config = this.config;
    // build request
    var req = {};
    req.baseURL = config.GPT3.baseUrl;
    req.method = 'POST';
    req.url = '/davinci/completions';
    req.headers = {
        "Authorization": "Bearer " + config.GPT3.key,
        "Content-Type": "application/json"
    }
    req.data = {
        "prompt": prompt,
        "temperature": 0.9,
        "max_tokens": 150,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0.64,
        "stop": ["\n", " user:", " AI:"]
    }
    return axios.post(req.baseURL+req.url,req.data,{'headers':req.headers}).then(function(result){
        console.log("🚀 ~ file: index.js ~ line 41 ~ returnaxios.post ~ result", result.data);
        console.log("🚀 ~ file: index.js ~ line 41 ~ returnaxios.post ~ result", typeof result);
        var result = result.data;
        // console.log('the result is now',JSON.stringify(result.data));
        if(result && result.choices){
            return result.choices[0].text;
        }
        return result;
    }).catch(function(error){
    console.log("🚀 ~ file: index.js ~ line 32 ~ returnaxios.post ~ error", error)     
    });
}

module.exports = ChatAPI;