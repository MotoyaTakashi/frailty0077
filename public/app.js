// カウンター機能
let count = 0;
const counterElement = document.getElementById('counter');
const incrementBtn = document.getElementById('incrementBtn');
const decrementBtn = document.getElementById('decrementBtn');
const resetBtn = document.getElementById('resetBtn');

function updateCounter() {
  counterElement.textContent = count;
}

incrementBtn.addEventListener('click', () => {
  count++;
  updateCounter();
});

decrementBtn.addEventListener('click', () => {
  count--;
  updateCounter();
});

resetBtn.addEventListener('click', () => {
  count = 0;
  updateCounter();
});

// メッセージ機能
let messages = [];
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const messagesContainer = document.getElementById('messagesContainer');
const clearBtn = document.getElementById('clearBtn');

function renderMessages() {
  if (messages.length === 0) {
    messagesContainer.innerHTML = '<p class="emptyMessage">メッセージがありません</p>';
    clearBtn.style.display = 'none';
  } else {
    const messageList = document.createElement('ul');
    messageList.className = 'messageList';
    
    messages.forEach((message) => {
      const messageItem = document.createElement('li');
      messageItem.className = 'messageItem';
      messageItem.textContent = message;
      messageList.appendChild(messageItem);
    });
    
    messagesContainer.innerHTML = '';
    messagesContainer.appendChild(messageList);
    clearBtn.style.display = 'block';
  }
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = messageInput.value.trim();
  if (inputValue) {
    messages.push(inputValue);
    messageInput.value = '';
    renderMessages();
  }
});

clearBtn.addEventListener('click', () => {
  messages = [];
  renderMessages();
});

// 初期化
updateCounter();
renderMessages();

