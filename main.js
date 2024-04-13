document.addEventListener('DOMContentLoaded', () => {
  
    function displayMessage(message, sender) {
      const chatMessages = document.getElementById('chat-messages');
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.classList.add(sender);
      chatMessages.appendChild(messageDiv);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    function getResponse(message) {
      let response;
      switch(message.toLowerCase()) {
        case 'hello':
          response = 'Hi there!';
          break;
        case 'how are you?':
          response = 'I\'m a bot, I\'m always good!';
          break;
        default:
          response = 'Sorry, I do not understand that.';
      }
      setTimeout(function() {
        displayMessage(response, 'bot');
      }, 1000);
    }
    
    // Press Enter to send message
    document.getElementById('chat-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        document.getElementById('send-btn').click();
      }
    });
    
    // Function to toggle chat interface visibility
    function toggleChat() {
      const chatInterface = document.getElementById('chat-interface');
      chatInterface.classList.toggle('chat-hidden');
    }
    
    // Event listener for the chat button
    document.getElementById('chat-button').addEventListener('click', function(event) {
      // Prevent the document event listener from hiding the chat
      event.stopPropagation();
      toggleChat();
    });

    function displayMessage(message, sender) {
        const chatMessages = document.getElementById('chat-messages');
        const messageDiv = document.createElement('div');
        // Include the sender prefix within the message content
        const senderPrefix = sender === 'user' ? 'You: ' : 'Chatbot: ';
        messageDiv.textContent = senderPrefix + message;
        messageDiv.classList.add(sender);
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }
      
    
    // Event listener for sending a message
    document.getElementById('send-btn').addEventListener('click', function() {
      const inputField = document.getElementById('chat-input');
      const message = inputField.value.trim();
      inputField.value = '';
      
      if (message !== '') {
        displayMessage(message, 'user');
        getResponse(message);
      }
    });
  
    // Event listener to prevent the chat from closing when interacting with it
    document.getElementById('chat-interface').addEventListener('click', function(event) {
      event.stopPropagation();
    });
    
    // Close chat when clicking outside the chat box
    document.addEventListener('click', function(event) {
      const chatInterface = document.getElementById('chat-interface');
      const chatButton = document.getElementById('chat-button');
      if (!chatInterface.contains(event.target) && !chatButton.contains(event.target) && !chatInterface.classList.contains('chat-hidden')) {
        toggleChat();
      }
    });
    
  });
  