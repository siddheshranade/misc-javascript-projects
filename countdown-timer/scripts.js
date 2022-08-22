let monthsDisplay = document.querySelector('#months');
let daysDisplay = document.querySelector('#days');
let hoursDisplay = document.querySelector('#hours');
let minutesDisplay = document.querySelector('#minutes');
let secondsDisplay = document.querySelector('#seconds');

setInterval(displayCountdown, 1000);

function displayCountdown() {
    let currentDateAndTime = new Date();
    let concertDateAndTime = new Date(2023, 7, 4, 19, 30);
    let diffInMilliseconds = concertDateAndTime - currentDateAndTime;

    if (diffInMilliseconds < 0) {
        document.querySelector('h1').innerHTML = 'The concert is done!';
        return;
    }

    // All consts in milliseconds
    const ONE_MONTH = 1000 * 60 * 60 * 24 * 30;
    const ONE_DAY = 1000 * 60 * 60 * 24;
    const ONE_HOUR = 1000 * 60 * 60;
    const ONE_MINUTE = 1000 * 60;
    const ONE_SECOND = 1000;

    const remainingDays = diffInMilliseconds % ONE_MONTH;
    const remainingHours = diffInMilliseconds % ONE_DAY;
    const remainingMinutes = remainingHours % ONE_HOUR;

    let months = Math.floor(diffInMilliseconds / ONE_MONTH).toString();
    let days = Math.floor(remainingDays / ONE_DAY).toString();
    let hours = Math.floor(remainingHours / ONE_HOUR).toString();
    let minutes = Math.floor(remainingMinutes / ONE_MINUTE).toString();
    let seconds = Math.floor((remainingMinutes % ONE_MINUTE) / ONE_SECOND).toString();

    monthsDisplay.innerHTML = months;
    daysDisplay.innerHTML = days;
    hoursDisplay.innerHTML = hours;
    minutesDisplay.innerHTML = minutes;
    secondsDisplay.innerHTML = seconds;
}

