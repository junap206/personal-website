// Swaps the right-hand panel between home / about / projects.
// Clicking the same link again returns to home.
const views = document.querySelectorAll('.view');
const links = document.querySelectorAll('[data-view]');

function show(id) {
  const target = document.getElementById(id) ? id : 'home';
  views.forEach(v => v.classList.toggle('is-active', v.id === target));
  links.forEach(l => l.classList.toggle('is-current', l.dataset.view === target));
}

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.view;
    const isCurrent = link.classList.contains('is-current');
    history.replaceState(null, '', isCurrent ? '#' : '#' + id);
    show(isCurrent ? 'home' : id);
  });
});

show(location.hash.slice(1));
