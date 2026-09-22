const moodData = {
  sunny: {
    title: 'A little', accent: 'sunshine.', description: 'Bright, breezy, and impossible to sit still.',
    songs: [['Good Days', 'SZA', '☀', '4:39'], ['Walking on a Dream', 'Empire of the Sun', '◒', '3:18'], ['Put Your Records On', 'Corinne Bailey Rae', '✦', '3:35']]
  },
  soft: {
    title: 'Take it', accent: 'slowly.', description: 'Warm light, open windows, nowhere else to be.',
    songs: [['Bloom', 'The Paper Kites', '☁', '3:30'], ['Pink + White', 'Frank Ocean', '◌', '3:04'], ['Cherry Wine', 'Hozier', '✦', '4:00']]
  },
  focus: {
    title: 'Get in', accent: 'the zone.', description: 'Clean lines, quiet thoughts, and one thing at a time.',
    songs: [['Intro', 'The xx', '◒', '2:07'], ['A Walk', 'Tycho', '◌', '5:17'], ['Near Light', 'Olafur Arnalds', '✦', '3:28']]
  },
  electric: {
    title: 'Make it', accent: 'loud.', description: 'Big hooks, fast feet, and absolutely no wallflower energy.',
    songs: [['Levitating', 'Dua Lipa', 'ϟ', '3:23'], ['Midnight City', 'M83', '◒', '4:03'], ['Dog Days Are Over', 'Florence + The Machine', '✦', '4:12']]
  }
};

const moodButtons = document.querySelectorAll('.mood-card');
const mixTitle = document.querySelector('#mix-title');
const moodDescription = document.querySelector('#moodDescription');
const trackList = document.querySelector('#trackList');
const mixCount = document.querySelector('#mixCount');
const playerBar = document.querySelector('#playerBar');
const playingTitle = document.querySelector('#playingTitle');
const playingArt = document.querySelector('#playingArt');
const playButton = document.querySelector('#playButton');
const progressBar = document.querySelector('#progressBar');

function startSong(title, icon) {
  playingTitle.textContent = title;
  playingArt.textContent = icon;
  playerBar.hidden = false;
  playButton.textContent = 'Ⅱ';
  progressBar.style.width = '42%';
}

function renderMood(mood) {
  const selection = moodData[mood];
  mixTitle.innerHTML = `${selection.title}<br><em>${selection.accent}</em>`;
  moodDescription.textContent = selection.description;
  mixCount.textContent = `${selection.songs.length.toString().padStart(2, '0')} tracks`;
  trackList.innerHTML = selection.songs.map((song, index) => `
    <article class="track">
      <span class="track-number">0${index + 1}</span>
      <span class="track-art" aria-hidden="true">${song[2]}</span>
      <div><span class="track-title">${song[0]}</span><span class="track-artist">${song[1]}</span></div>
      <span class="track-duration">${song[3]}</span>
      <button class="track-play" type="button" data-title="${song[0]}" data-icon="${song[2]}" aria-label="Play ${song[0]}">▶</button>
    </article>`).join('');

  trackList.querySelectorAll('.track-play').forEach((button) => {
    button.addEventListener('click', () => startSong(button.dataset.title, button.dataset.icon));
  });
}

moodButtons.forEach((button) => {
  button.addEventListener('click', () => {
    moodButtons.forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    renderMood(button.dataset.mood);
    document.querySelector('#mix').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.querySelector('#randomMood').addEventListener('click', () => {
  const randomButton = moodButtons[Math.floor(Math.random() * moodButtons.length)];
  randomButton.click();
});

playButton.addEventListener('click', () => {
  playButton.textContent = playButton.textContent === 'Ⅱ' ? '▶' : 'Ⅱ';
});

renderMood('sunny');
