import { data } from './data.js';

const seheriProgress = () => {
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

  let progress = document.querySelector('.sahori-track');
  let seheri__countdown = document.querySelector('.sahori__countdown p');

  // check current date
  const date = new Date();
  var currentMonth = month[date.getMonth()];
  var advDate = new Date().getDate() + 1;
  var currentDate = new Date().getDate();

  // fetch data from API

  var ramadanAdvDate = '';
  var iftarAdvTime = '';
  var sehriAdvLastTime = '';
  var advSeheriLastTime = '';

  var makeAdvDate = `${advDate} ${currentMonth}`;

  data.forEach((value) => {
    if (value.ramadanDate == makeAdvDate) {
      ramadanAdvDate += value.ramadanDate;
      iftarAdvTime += value.iftarTime;
      sehriAdvLastTime += value.sehriLastTime;
      advSeheriLastTime += value.advSeheriLastTime;
    }
  });

  var makeDate = `${currentDate} ${currentMonth}`;

  var ramadanDate = '';
  var iftarTime = '';
  var sehriLastTime = '';
  var advSeheriLastTime = '';

  data.forEach((value) => {
    if (value.ramadanDate == makeDate) {
      ramadanDate += value.ramadanDate;
      iftarTime += value.iftarTime;
      sehriLastTime += value.sehriLastTime;
      advSeheriLastTime += value.advSeheriLastTime;
    }
  });

  // set count down goal
  const countDownCounter = (date, month, time) => {
    var dest = new Date(`${date} ${month}, 2023 ${time}`).getTime();

    var now = new Date().getTime();

    var diff = dest - now;
    var hour = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minute = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var second = Math.floor((diff % (1000 * 60)) / 1000);

    // set countdown time
    const d_hour = hour.toString().length == '1' ? '0' + hour : hour;
    const d_minute = minute.toString().length == '1' ? '0' + minute : minute;
    const d_second = second.toString().length == '1' ? '0' + second : second;

    return {
      d_hour,
      d_minute,
      d_second,
    };
  };

  var seheriFun = countDownCounter(
    ramadanAdvDate,
    currentMonth,
    advSeheriLastTime
  );

  var iftarFun = countDownCounter(ramadanDate, currentMonth, iftarTime);

  const countDown = `${seheriFun.d_hour}:${seheriFun.d_minute}:${seheriFun.d_second}`;

  if (
    iftarFun.d_hour < -1 ||
    iftarFun.d_minute < -1 ||
    iftarFun.d_second < -1
  ) {
    if (
      seheriFun.d_hour > -1 ||
      seheriFun.d_minute > -1 ||
      seheriFun.d_second > -1
    ) {
      const start = new Date(
        `${ramadanDate} ${currentMonth} , 2023 ${iftarTime}`
      );
      const end = new Date(
        `${ramadanDate} ${currentMonth}, 2023 ${advSeheriLastTime}`
      );

      const today = new Date();
      var percentage = ((today - start) * 100) / (end - start);

      const radius = progress.r.baseVal.value;
      const circleRef = Math.PI * (radius * 2);
      const point = Math.floor(circleRef - (percentage / 100) * circleRef);

      progress.style.strokeDashoffset = point;
      progress.style.stroke = '#1dc01d';
      progress.style.transition = '300ms';

      if (seheriFun.d_minute <= 3) {
        progress.style.stroke = 'tomato';
      } else if (seheriFun.d_minute <= 5) {
        progress.style.stroke = 'orange';
      }

      // seheri count down
      seheri__countdown.innerHTML = countDown;
    } else {
      progress.style.stroke = '#F94330';
      seheri__countdown.innerHTML = 'সেহেরি বিরত রাখুন।';
    }
  } else {
    progress.style.stroke = '#F94330';
    seheri__countdown.innerHTML = 'সেহেরি বিরত রাখুন।';
  }
};

export default seheriProgress;
