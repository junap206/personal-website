// Projects and About open as full pages on top of the home screen.
const pages = document.querySelectorAll('.page-full');
const openers = document.querySelectorAll('[data-view]');

function openPage(id) {
  pages.forEach(p => {
    const isTarget = p.id === id;
    p.classList.toggle('is-open', isTarget);
    p.setAttribute('aria-hidden', String(!isTarget));
  });
}

function goHome() {
  history.replaceState(null, '', location.pathname);
  openPage(null);
}

openers.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    history.replaceState(null, '', '#' + link.dataset.view);
    openPage(link.dataset.view);
  });
});

document.querySelectorAll('.back').forEach(btn => btn.addEventListener('click', () => {
  const target = btn.dataset.back;               // e.g. Demos goes back to Projects
  if (target) { history.replaceState(null, '', '#' + target); openPage(target); } else goHome();
}));
document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelector('.page-full.is-open .back')?.click(); });

openPage(location.hash.slice(1));

// Email icon copies the address instead of opening a mail app.
const copyBtn = document.querySelector('.copy-email');
const toast = copyBtn.querySelector('.toast');
let toastTimer;

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const t = document.createElement('textarea');   // fallback for older browsers / file://
    t.value = text;
    document.body.appendChild(t);
    t.select();
    document.execCommand('copy');
    t.remove();
  }
}

copyBtn.addEventListener('click', async () => {
  await copyText(copyBtn.dataset.email);
  toast.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 1600);
});
