import './style.css';

document.querySelector('#app').innerHTML = `
  <h1>カウンター</h1>
  <p id="count">0</p>
  <button id="btn">増やす</button>
  <button id="decrease">減らす</button>
  <button id="reset">リセット</button>
`;

const countEl = document.querySelector('#count');
const btn = document.querySelector('#btn');
const decreaseBtn = document.querySelector('#decrease');
const resetBtn = document.querySelector('#reset');
let count = 0;

btn.addEventListener('click', () => {
  count += 1;
  countEl.textContent = count;
});

decreaseBtn.addEventListener('click', () => {
  count -= 1;
  countEl.textContent = count;
});

resetBtn.addEventListener('click', () => {
  count = 0;
  countEl.textContent = count;
});