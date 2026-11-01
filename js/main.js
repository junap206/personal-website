// The email icon copies the address instead of opening a mail app.
const button = document.getElementById('copy-email');
const label = document.getElementById('copied');
const email = 'junap206@gmail.com';
let timer;

button.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
  } catch {
    const box = document.createElement('textarea');   // fallback for older browsers / file://
    box.value = email;
    document.body.appendChild(box);
    box.select();
    document.execCommand('copy');
    box.remove();
  }
  label.classList.add('show');
  clearTimeout(timer);
  timer = setTimeout(() => label.classList.remove('show'), 1500);
});