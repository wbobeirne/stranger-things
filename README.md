# stranger-things
Intro of the show Stranger Things in CSS, because why not. You can find it over
at http://wbobeirne.com/stranger-things

## How to compile
There are three `npm run compile:*` commands that need to run:
* `npm run compile:js` runs babel over script.js
* `npm run compile:css` runs the scss through a sass compile
* `npm run compile:postcss` handles the vendor prefixing

## Known issues
### Iffy browser support
This comes from a myriad of issues that rule out other browsers:
* WebKit browsers are the only ones that suppoer the not-so-w3c
  -webkit-text-stroke property, ruling out IE, Edge, and Firefox
* Safari really doesn't have a good time mixing text-shadow and vmin / vw
  units, though in general I just run in to a lot of difficulty with Safari.
* Mobile browsers that I tested generally showed erratic behavior with
  positioning of elements, which again I'll attribute to the lesser-used vw and
  vmin units. Not to mention the worse performance of mobile hardware.

Chrome and Opera stuck it out like champs though, with the only notable issues
being how text-shadow behaves when scaled up to the incredible sizes used here.

### Stuttering performance
While there's nothing particularly intense going on in this demo, it looks like
browsers have to work pretty hard to render text as large as seen here. My
first iteration of this had the text being rendered at normal sizes, and only
scaled up using `transform: scale(X)`, but unfortunately some optimizations
made by browsers caused various issues with that, either not anti-aliasing the
text at all, or onoly ant-aliasing the text that was in the viewport initially,
so text that would slide in during the animation would look pixelated.

There's very little javascript at play here, so I'm guessing that performance
can only get better as browser vendors continue to optimize text rendering
and transforms.

## If I were to improve this...
### Ditch timeouts for requestAnimationFrame
One of the harder parts of this was testing a particular scene. I had come up
a few quick code edits to jump to a particular one, but if instead of doing
setTimeouts to show credits and scenes, I'd used requestAnimationFrame and just
counted how many seconds in I was based off of the delta, I could have done
some cooler things with being able to skip around, maybe even pause. But as
it stood, I ended up listening to the intro music... a lot.

### SVG letters
Part of this challenge was to see what I could do with CSS alone, but I pretty
quickly ran up against the limits of that. The original intro has beautiful
texture and lighting on the letters that I don't think I could have even
gotten remotely close to with CSS, but some [other
projects](http://makeitstranger.com/) show that SVG can provide a lot of cool
effects for dynamic text, with great browser compatibility to boot. But again,
for me that would have felt like cheating on this particular challenge.
