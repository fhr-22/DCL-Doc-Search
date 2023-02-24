// types of documents that are supported
const docTypes = ["image", "video", "audio", "pdf", "other"]

const defaultFilter = {
    "title": "",
    "desc": "",
    "regex": false,
    "start": null,
    "end": null,
    "categories": [...docTypes]
}

// Example list shown in Details popup
const exampleList = `[
 {
  "title": "Relaxing Cat",
  "desc": "Cat with closed eyes sitting illuminated by bright sunlight.",
  "date": "2022-02-21",
  "category": "image",
  "path": "https://i.redd.it/kllot4v0nlfa1.jpg"
 },
 {
  "title": "Hidden Cat",
  "desc": "Cat sleeping in a flower pot, hidden by a plant",
  "date": "2015-01-15",
  "category": "image",
  "path": "https://i.redd.it/h1evtu2ycl9a1.jpg"
 },
 {
    "title": "Pest Control Cat",
    "desc": "Cat with a job and an official ID card. Helps with hunting down pests and rodents.",
    "date": "2018-05-10",
    "category": "image",
    "path": "https://i.redd.it/iadblydu2fr91.jpg"
   },
 {
  "title": "Blue Flowers",
  "desc": "A stalk of blue flowers.",
  "date": "2015-01-15",
  "category": "image",
  "path": "https://source.unsplash.com/LA3CPWy6Vx8/650x450"
 }, 
 {
  "title": "Cat Feeding System",
  "desc": "Cat food dispenser that requires the cat to fetch ping pong balls.",
  "date": "2010-01-20",
  "category": "video",
  "path": "https://i.imgur.com/YV8DNtr.mp4"
 },
 {
  "title": "Startled Cat",
  "desc": "Brown cat confused by a flower dropped on it's face.",
  "date": "2022-02-05",
  "category": "video",
  "path": "https://i.imgur.com/fqd9uUj.mp4"
 },
 {
  "title": "Curious Kitten",
  "desc": "Kitten trying to play with a cherry.",
  "date": "2022-01-25",
  "category": "video",
  "path": "https://i.imgur.com/KWvtdg0.mp4"
 },
 {
  "title": "Bird Song - 1",
  "desc": "Sound clip of an Asian Koel singing.",
  "date": "2012-02-20",
  "category": "audio",
  "path": "https://upload.wikimedia.org/wikipedia/commons/5/5c/Asian_Koel.wav"
 },
 {
  "title": "Bird Song - 2",
  "desc": "Sound clip of sparrows singing.",
  "date": "2005-01-30",
  "category": "audio",
  "path": "https://upload.wikimedia.org/wikipedia/commons/0/01/House_Sparrow.ogg"
 },
 {
  "title": "WikiMedia Resources",
  "desc": "Document showcasing the different types of data available on Wikimedia that can be used for research purposes.",
  "date": "2018-10-01",
  "category": "pdf",
  "path": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Wikimedia_Public_Research_Resources.pdf"
 }
]`

// adapted from github.com/sindresorhus/copy-text-to-clipboard
function copyExampleToClipboard({ target = document.body } = {}) {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;

    element.value = exampleList;

    // Prevent keyboard from showing on mobile
    element.setAttribute('readonly', '');

    element.style.contain = 'strict';
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.fontSize = '12pt'; // Prevent zooming on iOS

    const selection = document.getSelection();
    const originalRange = selection.rangeCount > 0 && selection.getRangeAt(0);

    target.append(element);
    element.select();

    // Explicit selection workaround for iOS
    element.selectionStart = 0;
    element.selectionEnd = exampleList.length;

    let isSuccess = false;
    try {
        isSuccess = document.execCommand('copy');
    } catch { }

    element.remove();

    if (originalRange) {
        selection.removeAllRanges();
        selection.addRange(originalRange);
    }

    // Get the focus back on the previously focused element, if any
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }

    return isSuccess;
}

export { docTypes, defaultFilter, exampleList, copyExampleToClipboard }