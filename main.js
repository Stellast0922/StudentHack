document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'YOUR_API_KEY';

    function fetchAstronomyPictureOfTheDay() {
        const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;
    
        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayMessage(`Today's Astronomy Picture of the Day: ${data.title}`, 'bot');
                displayMessage(`Explanation: ${data.explanation}`, 'bot');
                if (data.media_type === 'image') {
                    displayImage(data.url, 'Today\'s Astronomy Image');
                }
            })
            .catch(error => {
                console.error('Error fetching APOD:', error);
                displayMessage("Sorry, I couldn't fetch the astronomy picture of the day.", 'bot');
            });
    }
    
    function displayImage(imageUrl, altText) {
        const chatMessages = document.getElementById('chat-messages');
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = altText;
        img.style.maxWidth = '100%';
        chatMessages.appendChild(img);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displayMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        const senderPrefix = sender === 'user' ? 'You: ' : 'Chatbot: ';
        messageDiv.textContent = senderPrefix + message;
        messageDiv.classList.add(sender);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function displaySuggestedResponses(responses) {
        const container = document.getElementById('suggested-responses');
        container.innerHTML = ''; // Clear previous suggestions
        responses.forEach(response => {
            const button = document.createElement('button');
            button.textContent = response;
            button.addEventListener('click', () => {
                sendResponse(response);
            });
            container.appendChild(button);
        });
    }
    
    function sendResponse(message) {
        displayMessage(message, 'user');
        getResponse(message);
        document.getElementById('suggested-responses').innerHTML = '';
    }
    
    function getResponse(message) {
        const lowerCaseMessage = message.toLowerCase();
        if (lowerCaseMessage.includes("astronomy picture")) {
            fetchAstronomyPictureOfTheDay();
        } else {
            switch (lowerCaseMessage) {
                case 'hello':
                case 'hi':
                case 'hey':
                    displayMessage('Hi there! What can I help you with?', 'bot');
                    displaySuggestedResponses(['Astronomy Picture']);
                    break;
                case 'how are you?':
                    displayMessage("I'm a bot, I'm always good!", 'bot');
                    break;
                case 'bye':
                    displayMessage("Bye!", 'bot');
                    break;
                default:
                    displayMessage('Sorry, I do not understand that.', 'bot');
                    displaySuggestedResponses(['Hello', 'Astronomy Picture']);
            }
        }
    }
    
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            document.getElementById('send-btn').click();
        }
    });
    
    document.getElementById('chat-button').addEventListener('click', function(event) {
        event.stopPropagation();
        toggleChat();
    });

    document.getElementById('send-btn').addEventListener('click', function() {
        const inputField = document.getElementById('chat-input');
        const message = inputField.value.trim();
        inputField.value = '';
        if (message !== '') {
            displayMessage(message, 'user');
            getResponse(message);
        }
    });

    document.getElementById('chat-interface').addEventListener('click', function(event) {
        event.stopPropagation();
    });

    document.addEventListener('click', function(event) {
        const chatInterface = document.getElementById('chat-interface');
        const chatButton = document.getElementById('chat-button');
        if (!chatInterface.contains(event.target) && !chatButton.contains(event.target) && !chatInterface.classList.contains('chat-hidden')) {
            toggleChat();
        }
    });
    
    function toggleChat() {
        const chatInterface = document.getElementById('chat-interface');
        chatInterface.classList.toggle('chat-hidden');
    }
});
