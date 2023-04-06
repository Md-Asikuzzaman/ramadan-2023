import { data } from './data.js';

const iftarProgress = () => {
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

  let progress = document.querySelector('.iftar-track');
  let iftar__countdown = document.querySelector('.iftar__countdown p');

  // check current date
  const date = new Date();
  var currentMonth = month[date.getMonth()];
  var currentDate = new Date().getDate();

  // fetch data from API
  var ramadanDate = '';
  var iftarTime = '';
  var sehriLastTime = '';
  var advSeheriLastTime = '';

  var makeDate = `${currentDate} ${currentMonth}`;

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

  var iftarFun = countDownCounter(ramadanDate, currentMonth, iftarTime);

  const countDown = `${iftarFun.d_hour}:${iftarFun.d_minute}:${iftarFun.d_second}`;

  // checker

  // check the specific time
  const checkTime = (date, month, time) => {
    var dest = new Date(`${date} ${month}, 2023 ${time}`).getTime();
    var now = new Date(`${date} ${month}, 2023 12:00:01 AM`).getTime();

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

  let theTime = checkTime(ramadanDate, currentMonth, sehriLastTime);

  if (
    theTime.d_hour !== 0 ||
    (theTime.d_hour < -1 && theTime.d_minute !== 0) ||
    (theTime.d_minute < -1 && theTime.d_second !== 0) ||
    theTime.d_second < -1
  ) {
    if (
      iftarFun.d_hour > -1 ||
      iftarFun.d_hour > -1 ||
      iftarFun.d_second > -1
    ) {
      const start = new Date(
        `${ramadanDate} ${currentMonth} , 2023 ${sehriLastTime}`
      );
      const end = new Date(`${ramadanDate} ${currentMonth}, 2023 ${iftarTime}`);

      const today = new Date();
      var percentage = ((today - start) * 100) / (end - start);

      const radius = progress.r.baseVal.value;
      const circleRef = Math.PI * (radius * 2);
      const point = Math.floor(
        circleRef - (percentage.toFixed(3) / 100) * circleRef
      );

      progress.style.strokeDashoffset = point;
      progress.style.stroke = '#1dc01d';
      progress.style.transition = '300ms';

      // count down display settings
      iftar__countdown.innerHTML = countDown;
    } else {
      progress.style.stroke = '#1dc01d';
      iftar__countdown.innerHTML = 'ইফতার করুন।';
    }
  } else {
    progress.style.stroke = '#1dc01d';
    iftar__countdown.innerHTML = 'ইফতার করুন।';
  }
};

export default iftarProgress;
