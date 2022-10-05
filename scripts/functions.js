let dnaRequired = 0;
let dnaAcquired = 0;

function toggleItem(e) {
  e.preventDefault();

  var item = e.currentTarget;

  if (e.which === 1 && !item.classList.contains('locked')) item.classList.toggle('grayscale');

  checkGoMode();
};

function decreaseDna(e) {
  e.preventDefault();

  dnaAcquired = Math.max(0, dnaAcquired - 1);
  updateDnaCounter();
  checkGoMode();
}

function increaseDna(e) {
  e.preventDefault();

  dnaAcquired = Math.min(dnaRequired, dnaAcquired + 1);
  updateDnaCounter();
  checkGoMode();
}

function updateDnaCounter() {
  var dnaCurrent = document.querySelector('#current-dna-count');

  dnaCurrent.innerHTML = `${dnaAcquired}/${dnaRequired}`;
}

function checkGoMode() {
  var params = new URLSearchParams(window.location.search);
  var unacquiredItemNodes = document.querySelectorAll('.item.grayscale');
  var goModeNode = document.querySelector('#go-mode');
  var unacquiredItems = [];
  let goMode = true;

  unacquiredItemNodes.forEach(function (item) {
    unacquiredItems.push(item.getAttribute('id'));
  });

  if (
    unacquiredItems.includes('spidermagnet')
    || unacquiredItems.includes('morphball')
    || unacquiredItems.includes('grapplebeam')
    || unacquiredItems.includes('supermissile')
    || unacquiredItems.includes('screwattack')
    || unacquiredItems.includes('crossbomb')
    || unacquiredItems.includes('wavebeam')
    || unacquiredItems.includes('powerbomb')
  ) {
    goMode = false;
  }

  if (dnaAcquired < dnaRequired) {
    goMode = false;
  }

  if (goMode && goModeNode.classList.contains('grayscale')) goModeNode.classList.remove('grayscale');
  else if (!goMode) goModeNode.classList.add('grayscale');
};
