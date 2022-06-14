
var alarmString = null;
var fakeAlarms  = [{hour: 10, minutes: 48, seconds: 30, zone: 'AM'},{hour: 10, minutes: 48, seconds: 40, zone: 'AM'},{hour: 10, minutes: 48, seconds: 50, zone: 'AM'}];

const alarmAudio = document.getElementById("alarm-audio");

const createAlarm = document.querySelector(".create-alarm");

const activeAlarm = document.getElementById("active-alarm");
const clearAlarm = document.getElementById("clear-alarm");

const alarmTextContainer = document.getElementById("alarm-text");

const alarmText = (time) => `Alarm set at time ${time}`;

alarmAudio.src = "http://soundbible.com/grab.php?id=1252&type=mp3";
alarmAudio.load();

const renderAlarm = (event) => {
  event.preventDefault();
  const { hour, sec, min, zone } = document.forms[0];
  fakeAlarms.push({hour: Number(hour.value), minutes: Number(min.value), seconds: Number(sec.value), zone: zone.value})
  document.forms[0].reset();
  createAlarm.style.display = "none";
  activeAlarm.style.display = "block";
  let all = "";
  for (const alarm of fakeAlarms) { 
    let a = getTimeString({
      hours: alarm.hour,
      seconds: alarm.seconds,
      minutes: alarm.minutes,
      zone: alarm.zone
    });
    all +="<br/>"+ alarmText(a);
  }
  alarmTextContainer.innerHTML = all;
  alert('The Alarm is set ')
};

const handleClear = () => {
  alarmString = "";
  activeAlarm.style.display = "none";
  createAlarm.style.display = "block";
};

clearAlarm.addEventListener("click", handleClear);
document.forms[0].addEventListener("submit", renderAlarm);

const checkAlarm = (timeString) => {
  for(const alarm of fakeAlarms){
    alarmString = getTimeString({
      hours: alarm.hour,
      seconds: alarm.seconds,
      minutes: alarm.minutes,
      zone: alarm.zone
    });
    if (alarmString === timeString) {
      alarmAudio.play();
    }
  }
};

const getTimeString = ({ hours, minutes, seconds, zone }) => {
  if (minutes / 10 < 1) {
    minutes = "0" + minutes;
  }
  if (seconds / 10 < 1) {
    seconds = "0" + seconds;
  }
  return `${hours}:${minutes}:${seconds} ${zone}`;
};

const renderClock  = () => {
  var currentTime = document.getElementById("current-time");
  const currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var zone = hours >= 12 ? "PM" : "AM";
  if (hours > 12) {
    hours = hours % 12;
  }
  const timeString = getTimeString({ hours, minutes, seconds, zone });
  checkAlarm(timeString);
  currentTime.innerHTML = timeString;
};

setInterval(renderClock , 1000);