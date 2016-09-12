// Real quick add another modernizr check foooor...
Modernizr.addTest('textstroke', function() {
  var h1 = document.createElement('h1');
  if (!('webkitTextStroke' in h1.style) && !('textStroke' in h1.style)) {
    return false;
  }
  else {
    return true;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let bind = false;
  let text = null;

  // Must-haves
  if (!Modernizr.audio || !Modernizr.cssanimations || !Modernizr.textshadow) {
    text = document.getElementsByClassName("intro-text--cant")[0];
  }
  // Should-haves
  else if (!Modernizr.textstroke) {
    bind = true;
    text = document.getElementsByClassName("intro-text--shouldnt")[0];
  }
  // All good!
  else {
    bind = true;
    text = document.getElementsByClassName("intro-text--can")[0];
  }

  text.className += " intro-text--show";

  if (bind) {
    const btns = document.querySelectorAll("[data-play]");
    for (let i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", () => {
        start();
      });
    }
  }
});

// Fade out intro, start music and animation
let started = false;
function start() {
  if (started) {
    return;
  }
  started = true;

  const intro = document.getElementsByClassName("intro")[0];
  
  const music = new Audio("./assets/music.mp3");

  intro.className += " intro--hide";

  music.addEventListener("canplay", () => {
    setTimeout(() => {
      startAnimation();
      setTimeout(() => {
        music.play();
      }, 200);
    }, 1500);
  });
}

// Kick off the animation
function startAnimation() {
  // In milliseconds, how long each one is
  const creditsMs = 3000;
  const scenesMs = [
    creditsMs,
    creditsMs * 2,
    creditsMs,
    creditsMs,
    creditsMs,
    creditsMs,
    creditsMs * 2,
    19500,
  ];

  // Elements
  const viewport = document.getElementsByClassName("viewport")[0];
  const letterbox = document.getElementsByClassName("letterbox")[0];
  const scenes = document.getElementsByClassName("title--scene");
  const fullTitle = document.getElementsByClassName("title--full")[0];
  const credits = document.getElementsByClassName("credits-group");
  const finalCredit = document.getElementsByClassName("credits-final")[0];

  viewport.className += " viewport--show";
  letterbox.className += " letterbox--show";

  // Set up credits to show every interval
  let activeCredits = null;
  for (let i = 0; i < credits.length; i++) {
    setTimeout(() => {
      if (credits[i - 1]) {
        credits[i - 1].className = "credits-group";
      }
      credits[i].className = "credits-group credits-group--show";
    }, i * creditsMs);

    if (!credits[i + 1]) {
      setTimeout(() => {
        credits[i].className="credits-group";
      }, i * creditsMs + creditsMs);
    }
  }

  // Set up scenes to show after each interval
  let offset = 0;
  for (let i = 0; i < scenes.length; i++) {
    setTimeout(() => {
      if (scenes[i - 1]) {
        scenes[i - 1].className = scenes[i - 1]
          .className.replace("title--show", "");
      }
      scenes[i].className += " title--show";
    }, offset);

    offset += scenesMs[i];

    if (!scenes[i + 1]) {
      // Show the last scene
      setTimeout(() => {
        scenes[i].className = scenes[i].className.replace("title--show", "");
        fullTitle.className += " title--show";
      }, offset);

      // Show the final credits
      setTimeout(() => {
        finalCredit.className += " credits-group--show";
      }, offset + scenesMs[i + 1] + 1500);
    }
  }
}
