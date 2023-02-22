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
  "title": "Lion Roaring",
  "desc": "A powerful lion roars in the savannah",
  "date": "2022-02-01",
  "category": "video",
  "path": "https://i.imgur.com/ZigXHzX.mp4"
 },
 {
  "title": "Cheetah Running",
  "desc": "A cheetah sprints across the grasslands",
  "date": "2022-01-15",
  "category": "video",
  "path": "https://i.imgur.com/KWvtdg0.mp4"
 },
 {
  "title": "Elephant Family",
  "desc": "A family of elephants plays in the water",
  "date": "2022-02-10",
  "category": "image",
  "path": "https://i.imgur.com/Uschheg.jpeg"
 },
 {
  "title": "Gorilla Portrait",
  "desc": "A majestic gorilla poses for the camera",
  "date": "2022-01-20",
  "category": "image",
  "path": "https://i.imgur.com/Uschheg.jpeg"
 },
 {
  "title": "Tiger Close-up",
  "desc": "A close-up of a tiger's face",
  "date": "2022-02-05",
  "category": "image",
  "path": "https://i.imgur.com/Uschheg.jpeg"
 },
 {
  "title": "Zebra Herd",
  "desc": "A large herd of zebras graze in the grasslands",
  "date": "2022-01-25",
  "category": "image",
  "path": "https://i.imgur.com/Uschheg.jpeg"
 },
 {
  "title": "Monkey Chatter",
  "desc": "A group of monkeys chatter in the trees",
  "date": "2022-02-08",
  "category": "pdf",
  "path": "https://www.africau.edu/images/default/sample.pdf"
 },
 {
  "title": "Bird Song",
  "desc": "The melodic song of a bird",
  "date": "2022-01-30",
  "category": "audio",
  "path": "https://example.com/audio/bird-song.mp3"
 },
 {
  "title": "Kangaroo Hopping",
  "desc": "A kangaroo hops through the outback",
  "date": "2022-02-03",
  "category": "video",
  "path": "https://example.com/videos/kangaroo-hopping.mp4"
 },
 {
  "title": "Octopus Underwater",
  "desc": "An octopus swims in the depths of the ocean",
  "date": "2022-01-18",
  "category": "video",
  "path": "https://example.com/videos/octopus-underwater.mp4"
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