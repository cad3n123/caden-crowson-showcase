// Elements
const $iframe = document.querySelector('iframe');
const $iframeLink = document.querySelector('#video-content > a');
const [$select, $videoContent] = ['select', 'video-content'].map((id) =>
  document.getElementById(id)
);

// Constant Variables

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  [
    {
      url: './infinite-matter',
      title: 'Infinite Matter',
    },
    {
      url: './infinite-factory',
      title: 'Infinite Factory',
    },
    {
      url: './',
      title: 'This Website',
    },
  ].forEach(({ url, title }) => {
    const $vhs = document.createElement('div');
    $vhs.classList.add('vhs');
    $vhs.setAttribute('data-url', url);
    $vhs.innerHTML = title;
    $vhs.addEventListener('click', (mouseEvent) => {
      const URL = mouseEvent.target.getAttribute('data-url');
      $videoContent.classList.add('active');
      $iframe.src = URL;
      $iframeLink.href = URL;
    });

    $select.appendChild($vhs);
  });

  setTimeout(() => $videoContent.classList.add('active'), 500);
});
$iframe.addEventListener('click', (mouseEvent) => {
  console.log(mouseEvent.target);
});
