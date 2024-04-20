const MILLISECONDS = 1000;
const SECONDS = 60;
const MINUTES = 60;
const HOURS = 24;
const DAYS = 365;
const deviceWidth = window.innerWidth;
const deviceHeight = window.innerHeight;

let holdPosition = null;
let holdTime = null;
let holdTimeEnd = null;
let holdTimeStart = null;
let holdTimeTotal = null;
let holdPositionEnd = null;
let cardHold = false;

const MAX_ROTATION = 33;
const MAX_DISTANCE = deviceWidth / 2;
document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is ready');

    setInterval(showTime, 1000)

    const MAIN = document.querySelector('main');
    const SWIPE_CARD = document.querySelector('swipe-card');

    SWIPE_CARD.addEventListener('click', function () {
        console.log('Card clicked');
    });

    function registerSwipeStart(positionX) {
        MAIN.style.backgroundColor = `hsl(0, 0%, 0%)`;
        holdPosition = positionX
        holdTimeStart = new Date();
        cardHold = true;
    }
    SWIPE_CARD.addEventListener('touchstart', function (e) {
        console.log('started holding card');
        registerSwipeStart(e.touches[0].clientX);
    });

    function observeMouseMove(e) {
        if (!cardHold) {
            return;
        }
        observeSwipe(e.clientX);
    }

    SWIPE_CARD.addEventListener('mousedown', function (e) {
        console.log('started holding card');
        MAIN.addEventListener('mousemove', observeMouseMove);
        registerSwipeStart(e.clientX);

    });

    function observeSwipe(positionX) {
        if (!cardHold) {
            return;
        }

        const HOLD_DISTANCE = positionX - holdPosition;
        const ROTATE_DEGREE = HOLD_DISTANCE / MAX_DISTANCE * 45;
        const ROTATE_DEGREE_ABS = Math.abs(ROTATE_DEGREE);
        const TOO_MUCH_ROTATION = ROTATE_DEGREE_ABS > MAX_ROTATION;
        const ROTATION_DIRECTION = ROTATE_DEGREE > 0 ? 1 : -1;
        const CARD_ROTATION = TOO_MUCH_ROTATION ? MAX_ROTATION * ROTATION_DIRECTION : ROTATE_DEGREE;

        SWIPE_CARD.style.transform = `rotate(${CARD_ROTATION}deg)`;

        // color main with degree
        const HUE = CARD_ROTATION / MAX_ROTATION * 60 - 60;
        const SATURATION = Math.abs(CARD_ROTATION / MAX_ROTATION * 50);
        const LIGHTNESS = Math.abs(CARD_ROTATION / MAX_ROTATION * 25);

        MAIN.style.backgroundColor = `hsl(${HUE}, ${SATURATION}%, ${LIGHTNESS}%)`;



    }

    SWIPE_CARD.addEventListener('touchmove', function (e) {
        observeSwipe(e.touches[0].clientX);
    });




    function registerSwipeEnd() {

        cardHold = false;

        const CURRENT_TRANSFORM = parseInt(SWIPE_CARD.style.transform.split('(')[1].split(')')[0]);

        // if the degree is less then 7 degree reset it back to 0
        if (Math.abs(CURRENT_TRANSFORM) < 22) {
            SWIPE_CARD.style.transform = `rotate(0deg)`;
            MAIN.style.backgroundColor = `hsl(0, 0%, 0%)`;
        }

        cardHold = false;
    }

    MAIN.addEventListener('mouseup', function (e) {

        MAIN.removeEventListener('mousemove', observeMouseMove);

        registerSwipeEnd();
    });

    SWIPE_CARD.addEventListener('touchend', function () {

        registerSwipeEnd()
    });



});

const startDate = new Date();
// startDate.setDate(startDate.getDate() - 1);
startDate.setHours(startDate.getHours() - 35);
const dateEnd = new Date();
//dateEnd.setDate(dateEnd.getDate() + 2);
dateEnd.setHours(dateEnd.getHours() + 5);
function showTime() {


    const dateNow = new Date();
    const timeStamp = dateNow.getTime();
    const timeStampEnd = dateEnd.getTime();

    const diff = timeStampEnd - timeStamp;


    const secondsLeft = diff / MILLISECONDS;
    const minutesLeft = secondsLeft / SECONDS;
    const hoursLeft = minutesLeft / MINUTES;
    const daysLeft = hoursLeft / HOURS;

    const daysLeftInt = Math.floor(daysLeft);
    const hoursLeftInt = Math.floor(hoursLeft % HOURS);
    const minutesLeftInt = Math.floor(minutesLeft % MINUTES);
    const secondsLeftInt = Math.floor(secondsLeft % SECONDS);

    const secondsLeftString = secondsLeftInt < 10 ? '0' + secondsLeftInt : secondsLeftInt;
    const minutesLeftString = minutesLeftInt < 10 ? '0' + minutesLeftInt : minutesLeftInt;
    const hoursLeftString = hoursLeftInt < 10 ? '0' + hoursLeftInt : hoursLeftInt;
    const daysLeftString = daysLeftInt < 10 ? '0' + daysLeftInt : daysLeftInt;

    const timeLeft = `${daysLeftString} days and ${hoursLeftString}:${minutesLeftString}:${secondsLeftString}`;


    const timeLeftElement = document.querySelector('time-left');
    timeLeftElement.innerText = timeLeft + ' left';


    const elapsed = dateNow - startDate;

    const timeFrame = dateEnd - startDate;


    const progress = elapsed / timeFrame;


    const footer = document.querySelector('footer');
    // Construct a left to right gradient
    footer.style.background = `linear-gradient(to right, #a00a ${progress * 100}%, #eee3 ${progress * 100}%)`;

}