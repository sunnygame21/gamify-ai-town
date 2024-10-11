var conversationHistory = {};
var chatHistory = "";

export const getPrevAnser = (characterName) => {
    var history = conversationHistory[characterName];
    if (history !== undefined) {
        return conversationHistory[characterName][conversationHistory[characterName].length - 1];
    } else {
        return "";
    }
}

export const addHistory = (characterName, answer) => {
    if (!conversationHistory[characterName]) {
        conversationHistory[characterName] = [];
    }
    conversationHistory[characterName].push(answer);
}

export const addChatHistory = (characterName, answer) => {
    if (characterName === "you") {
        chatHistory = characterName + ":" + answer + "\n---------------------\n" + chatHistory;
    } else {
        chatHistory = characterName + ":" + answer + "\n" + chatHistory;
    }
}

export const getChatHistory = () => {
    return chatHistory;
}
