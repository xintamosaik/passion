(() => {
  // src/game.ts
  var MILLISECONDS = 1e3;
  var SECONDS = 60;
  var MINUTES = 60;
  var HOURS = 24;
  var DEVICE_WIDTH = window.innerWidth;
  var DEVICE_HEIGHT = window.innerHeight;
  var holdPosition = 0;
  var cardHold = false;
  var MAX_ROTATION = 33;
  var MAX_DISTANCE = DEVICE_WIDTH / 2;
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM is ready");
    const FOOTER = document.querySelector("footer");
    setInterval(showTime, 1e3);
    const MAIN = document.querySelector("main");
    if (!MAIN) {
      throw new Error("Main element not found");
    }
    MAIN.style.backgroundColor = `hsl(0, 0%, 0%)`;
    const SWIPE_CARD = document.querySelector("#swipe-card");
    if (!SWIPE_CARD) {
      throw new Error("Swipe card element not found");
    }
    function registerSwipeStart(positionX) {
      holdPosition = positionX;
      cardHold = true;
    }
    SWIPE_CARD.addEventListener("touchstart", function(e) {
      registerSwipeStart(e.touches[0].clientX);
    });
    function observeMouseMove(e) {
      if (!cardHold) {
        return;
      }
      observeSwipe(e.clientX);
    }
    SWIPE_CARD.addEventListener("mousedown", function(e) {
      MAIN.addEventListener("mousemove", observeMouseMove);
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
      if (SWIPE_CARD) {
        SWIPE_CARD.style.transform = `rotate(${CARD_ROTATION}deg)`;
      }
      const HUE = CARD_ROTATION / MAX_ROTATION * 60 - 60;
      const SATURATION = Math.abs(CARD_ROTATION / MAX_ROTATION * 50);
      const LIGHTNESS = Math.abs(CARD_ROTATION / MAX_ROTATION * 25);
      if (MAIN) {
        MAIN.style.backgroundColor = `hsl(${HUE}, ${SATURATION}%, ${LIGHTNESS}%)`;
      }
    }
    SWIPE_CARD.addEventListener("touchmove", function(e) {
      observeSwipe(e.touches[0].clientX);
    });
    function registerSwipeEnd() {
      cardHold = false;
      if (!SWIPE_CARD) {
        return;
      }
      const CURRENT_TRANSFORM = parseInt(SWIPE_CARD.style.transform.split("(")[1].split(")")[0]);
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
    MAIN.addEventListener("mouseup", function(e) {
      MAIN.removeEventListener("mousemove", observeMouseMove);
      registerSwipeEnd();
    });
    SWIPE_CARD.addEventListener("touchend", function() {
      registerSwipeEnd();
    });
    function showTime() {
      const dateNow = /* @__PURE__ */ new Date();
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
      const secondsLeftString = secondsLeftInt < 10 ? "0" + secondsLeftInt : `${secondsLeftInt}`;
      const minutesLeftString = minutesLeftInt < 10 ? "0" + minutesLeftInt : `${minutesLeftInt}`;
      const hoursLeftString = hoursLeftInt < 10 ? "0" + hoursLeftInt : `${hoursLeftInt}`;
      const daysLeftString = daysLeftInt < 10 ? "0" + daysLeftInt : `${daysLeftInt}`;
      const timeLeft = `${daysLeftString} days and ${hoursLeftString}:${minutesLeftString}:${secondsLeftString}`;
      const timeLeftElement = document.querySelector("#time-left");
      if (!timeLeftElement) {
        throw new Error("Time left element not found");
      }
      timeLeftElement.innerText = timeLeft + " left";
      const elapsed = dateNow.getTime() - startDate.getTime();
      const timeFrame = dateEnd.getTime() - startDate.getTime();
      const progress = elapsed / timeFrame;
      FOOTER.style.background = `linear-gradient(to right, #a00a ${progress * 100}%, #eee3 ${progress * 100}%)`;
    }
  });
  var startDate = /* @__PURE__ */ new Date();
  startDate.setHours(startDate.getHours() - 35);
  var dateEnd = /* @__PURE__ */ new Date();
  dateEnd.setHours(dateEnd.getHours() + 5);
})();
