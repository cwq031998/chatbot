document.getElementById('send-button').addEventListener('click', function() {
    var userInput = document.getElementById('user-input').value;
    if (userInput) {
        addMessage('You', userInput);
        document.getElementById('user-input').value = '';
        sendMessageToServer(userInput);
    }
});

function addMessage(sender, message) {
    var messagesDiv = document.getElementById('messages');
    var messageElement = document.createElement('div');
    messageElement.textContent = sender + ': ' + message;
    messagesDiv.appendChild(messageElement);
}

function sendMessageToServer(message) {
    fetch('/save-message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: message })
    })
    .then(response => response.json())
    .then(data => {
        addMessage('Bot', data.reply);
    })
    .catch(error => {
        console.error('Error:', error);
        addMessage('Bot', 'Sorry, something went wrong.');
    });
}
