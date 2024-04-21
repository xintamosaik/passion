// ts-check

/**
 * @var {number} MILLISECONDS
 * @description Number of milliseconds in a second
 * @constant
 */
const MILLISECONDS = 1000;

/**
 * @var {number} SECONDS
 * @description Number of seconds in a minute
 * @constant
 */
const SECONDS = 60;

/**
 * @var {number} MINUTES
 * @description Number of minutes in an hour
 * @constant
 */
const MINUTES = 60;

/**
 * @var {number} HOURS
 * @description Number of hours in a day
 * @constant
 */
const HOURS = 24;

/**
 * @var {number} DAYS
 * @description Number of days in a year
 * @constant
 */
const DAYS = 365;

/**
 * @var {number} DEVICE_WIDTH
 * @description Width of the device screen
 * @constant
 */
const DEVICE_WIDTH = window.innerWidth;

/**
 * @var {number} DEVICE_HEIGHT
 * @description Height of the device screen
 * @constant
 */
const DEVICE_HEIGHT = window.innerHeight;

/**
 * @var {number} holdPosition
 * @description a position of the mouse or touch when the swipe starts
 */
let holdPosition = 0;

/**
 * @var {boolean} cardHold
 * @description a flag to indicate if the card is being held
 * @default false
 */
let cardHold = false;

/**
 * @var {number} MAX_ROTATION
 * @description Maximum rotation of the card in degrees
 * @constant 
 * 
 * @default 33
 */
const MAX_ROTATION = 33;

/**
 * @var {number} MAX_DISTANCE
 * @description Maximum distance the card can be swiped
 * @constant
 * 
 * @default DEVICE_WIDTH / 2
 */
const MAX_DISTANCE = DEVICE_WIDTH / 2;

document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM is ready');

   

    setInterval(showTime, 1000);

    /**
     * @var {HTMLElement} MAIN
     * 
     * @description The main element of the document
     * @constant
     */
    const MAIN = document.querySelector('main');
    if (!MAIN) {
        throw new Error('Main element not found');
    }
    MAIN.style.backgroundColor = `hsl(0, 0%, 0%)`;
    
    /**
     * @var {HTMLElement} SWIPE_CARD
     *
     * @description The swipe card element
     * @constant
     */
    // const SWIPE_CARD = document.querySelector('swipe-card');
    // type script way of the above
    const SWIPE_CARD = document.querySelector('swipe-card') as HTMLElement;
    if (!SWIPE_CARD) {
        throw new Error('Swipe card element not found');
    }
    /**
     * @description Registers the start of the swipe. It sets the hold position and sets the cardHold flag to true
     * 
     * @param {number} positionX - The x position of the mouse or touch
     * 
     * @returns {void}
     */
    function registerSwipeStart(positionX) {
        holdPosition = positionX;
        cardHold = true;
    }

    SWIPE_CARD.addEventListener('touchstart', function (e: TouchEvent) {
        registerSwipeStart(e.touches[0].clientX);
    });


    /**
     * @description Observes the mouse move event and calls the observeSwipe function.
     * @param {MouseEvent} e - The mouse event
     *
     * @returns {void}
     */
    function observeMouseMove(e) {
        if (!cardHold) {
            return;
        }
        observeSwipe(e.clientX);
    }

    SWIPE_CARD.addEventListener('mousedown', function (e: MouseEvent) {
        MAIN.addEventListener('mousemove', observeMouseMove);
        registerSwipeStart(e.clientX);
    });

    /**
     * @description Observes the swipe event and rotates the card based on the swipe distance 
     * @param {number} positionX - The x position of the mouse or touch
     *
     * @returns {void}
     */
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

        if (SWIPE_CARD) {
            SWIPE_CARD.style.transform = `rotate(${CARD_ROTATION}deg)`;
        }
        // color main with degree
        const HUE = CARD_ROTATION / MAX_ROTATION * 60 - 60;
        const SATURATION = Math.abs(CARD_ROTATION / MAX_ROTATION * 50);
        const LIGHTNESS = Math.abs(CARD_ROTATION / MAX_ROTATION * 25);
        
        if (MAIN) {
            MAIN.style.backgroundColor = `hsl(${HUE}, ${SATURATION}%, ${LIGHTNESS}%)`;
        }


    }

    SWIPE_CARD.addEventListener('touchmove', function (e : TouchEvent) {
        observeSwipe(e.touches[0].clientX);
    });




    function registerSwipeEnd() {

        cardHold = false;
        if (!SWIPE_CARD) {
            return;
        }
        
        const CURRENT_TRANSFORM = parseInt((SWIPE_CARD as HTMLElement).style.transform.split('(')[1].split(')')[0]);

        // if the degree is less then 7 degree reset it back to 0
        if (Math.abs(CURRENT_TRANSFORM) < 22) {
            if (SWIPE_CARD) {
                SWIPE_CARD.style.transform = `rotate(0deg)`;
                
            }
            
            if (MAIN) {
                MAIN.style.backgroundColor = `hsl(0, 0%, 0%)`;
            }
        }

        cardHold = false;
    }

    MAIN.addEventListener('mouseup', function (e) {

        MAIN.removeEventListener('mousemove', observeMouseMove);

        registerSwipeEnd();
    });

    SWIPE_CARD.addEventListener('touchend', function () {

        registerSwipeEnd();
    });



});

const startDate = new Date();
// startDate.setDate(startDate.getDate() - 1);
startDate.setHours(startDate.getHours() - 35);
const dateEnd = new Date();
//dateEnd.setDate(dateEnd.getDate() + 2);
dateEnd.setHours(dateEnd.getHours() + 5);
function showTime() {


    const dateNow = new Date() as Date;
    const timeStamp = dateNow.getTime() as number;
    const timeStampEnd = dateEnd.getTime() as number;

    const diff = timeStampEnd - timeStamp as number;


    const secondsLeft = diff / MILLISECONDS as number;
    const minutesLeft = secondsLeft / SECONDS as number;
    const hoursLeft = minutesLeft / MINUTES as number;
    const daysLeft = hoursLeft / HOURS as number;

    const daysLeftInt = Math.floor(daysLeft) as number;
    const hoursLeftInt = Math.floor(hoursLeft % HOURS) as number;
    const minutesLeftInt = Math.floor(minutesLeft % MINUTES) as number;
    const secondsLeftInt = Math.floor(secondsLeft % SECONDS) as number;

    const secondsLeftString = secondsLeftInt < 10 ? '0' + secondsLeftInt : `${secondsLeftInt}` as string;
    const minutesLeftString = minutesLeftInt < 10 ? '0' + minutesLeftInt :  `${minutesLeftInt}` as string;
    const hoursLeftString = hoursLeftInt < 10 ? '0' + hoursLeftInt : `${hoursLeftInt}` as string;
    const daysLeftString = daysLeftInt < 10 ? '0' + daysLeftInt : `${daysLeftInt}` as string;

    const timeLeft = `${daysLeftString} days and ${hoursLeftString}:${minutesLeftString}:${secondsLeftString}`;


    const timeLeftElement = document.querySelector('time-left') as HTMLElement;
    if (!timeLeftElement) {
        throw new Error('Time left element not found');
    }
    timeLeftElement.innerText = timeLeft + ' left';


    // const elapsed = dateNow - startDate;
    // The left-hand side of an arithmetic operation must be of type 'any', 'number', 'bigint' or an enum type.
    const elapsed = dateNow.getTime() - startDate.getTime() as number;

    // const timeFrame = dateEnd - startDate;
    const timeFrame = dateEnd.getTime() - startDate.getTime() as number;


    const progress = elapsed / timeFrame as number;


    const footer = document.querySelector('footer') as HTMLElement;
    // Construct a left to right gradient
    footer.style.background = `linear-gradient(to right, #a00a ${progress * 100}%, #eee3 ${progress * 100}%)`;

}