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
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputValue = messageInput.value.trim();
  if (inputValue) {
    // メッセージを送信（現在はコンソールに出力）
    console.log('送信されたメッセージ:', inputValue);
    messageInput.value = '';
  }
});

// 初期化
updateCounter();

