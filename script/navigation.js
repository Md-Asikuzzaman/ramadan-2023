import { data } from './data.js';

const navigation = () => {
  const nav__options = document.querySelector('.nav__options');
  const sahori__card = document.querySelector('.sahori__card');
  const iftar__card = document.querySelector('.iftar__card');

  const nav__item = document.querySelectorAll('.nav__item');
  const sahori__item = document.querySelector('.sahori__item');
  const iftar__item = document.querySelector('.iftar__item');

  const close = document.querySelectorAll('.close__icon');

  sahori__card.addEventListener('click', () => {
    nav__item.forEach((item) => {
      item.style.display = 'none';
    });

    nav__options.style.display = 'none';
    sahori__item.style.display = 'block';
  });

  iftar__card.addEventListener('click', () => {
    nav__item.forEach((item) => {
      item.style.display = 'none';
    });

    nav__options.style.display = 'none';
    iftar__item.style.display = 'block';
  });

  close.forEach((close__btn) => {
    close__btn.addEventListener('click', () => {
      nav__item.forEach((item) => {
        item.style.display = 'none';
      });
      nav__options.style.display = 'flex';
    });
  });

  // setup display data

  const ramadan__count = document.querySelectorAll('.ramadan__count');
  const bangla__date = document.querySelector('.bangla__date');
  const bangla__day = document.querySelector('.bangla__day');
  const ramadanTitle = document.querySelector('.ramadan__title');

  const month = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // check current date
  const date = new Date();
  var currentMonth = month[date.getMonth()];
  var currentDate = new Date().getDate();
  var currentDay = new Date().getDay();

  var ramadanCount = '';
  var banglaDate = '';

  var makeDate = `${currentDate} ${currentMonth}`;
  data.forEach((value) => {
    if (value.ramadanDate == makeDate) {
      ramadanCount += value.ramadanCount;
      banglaDate += value.banglaDate;
    }
  });

  ramadan__count.forEach((item) => {
    item.innerHTML = ramadanCount;
  });
  bangla__date.innerHTML = banglaDate;

  // setup bangla day

  let banglaDay = null;

  switch (currentDay) {
    case 0:
      banglaDay = 'রবিবার';
      break;

    case 1:
      banglaDay = 'সোমবার';
      break;

    case 2:
      banglaDay = 'মঙ্গলবার';
      break;

    case 3:
      banglaDay = 'বুধবার';
      break;

    case 4:
      banglaDay = 'বৃহস্পতিবার';
      break;

    case 5:
      banglaDay = 'শুক্রবার';
      break;

    case 6:
      banglaDay = 'শনিবার';
      break;

    default:
      banglaDay = 'দিনের নাম';
      break;
  }

  bangla__day.innerHTML = banglaDay;

  // ramadan month title setup

  let ramadan__title = null;

  if (currentDate >= 3 && currentDate <= 13) {
    ramadan__title = 'মাগফিরাত';
  } else if (currentDate >= 13 && currentDate <= 22) {
    ramadan__title = 'নাজাত';
  } else {
    ramadan__title = 'রহমত';
  }

  ramadanTitle.innerHTML = ramadan__title;
};

export default navigation;
