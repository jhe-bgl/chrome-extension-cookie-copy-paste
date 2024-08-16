const fs = require('fs');

const browser = process.env.BROWSER_TYPE

let fileName = "manifest-chrome.json"
if(browser === 'firefox'){
    fileName = "manifest-firefox.json"
}

fs.copyFile(fileName, 'public/manifest.json', (err) => {
    if (err) {
        console.log("Error Found:", err);
    }
});
