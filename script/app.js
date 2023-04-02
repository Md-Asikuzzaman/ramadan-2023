import navigation from './navigation.js';
import seheriProgress from './seheri.js';
import iftarProgress from './iftar.js';

window.addEventListener('load', () => {
  app();
  navigation();
});

// clock settings
const clock = () => {
  const clock = document.querySelector('#clock');
  const currentTime = new Date().toLocaleTimeString();
  clock.innerHTML = currentTime;

  setInterval(() => {
    const currentTime = new Date().toLocaleTimeString();
    clock.innerHTML = currentTime;
  }, 1000);
};

const app = () => {
  clock();
  setInterval(() => {
    iftarProgress();
  }, 1000);

  iftarProgress();

  setInterval(() => {
    seheriProgress();
  }, 1000);
  seheriProgress();
};
