



function copyTextToClipboard(text) {

  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand('copy');
  copyFrom.blur();
  document.body.removeChild(copyFrom);
}

function getTextFromClipboard() {

  var pasteFrom = document.createElement("textarea")
  document.body.appendChild(pasteFrom)
  pasteFrom.select()
  document.execCommand('paste')
  var text =  pasteFrom.value
  document.body.removeChild(pasteFrom);
  return text
}


document.getElementById('copy-button').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  try {
    let cookie = await getSessionIdCookie(tab.url);
    if (cookie) {
      copyTextToClipboard(cookie.value )
      //chrome.runtime.sendMessage({ action: 'copyData', data: cookie.value });
    } else {
      alert('session_id cookie not found');
    }
  } catch (error) {
    console.error('Error retrieving cookie:', error);
    alert('Error retrieving cookie');
  }
});


async function getSessionIdCookie(url) {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url: url, name: 'JSESSIONID' }, (cookie) => {
      //alert( JSON.stringify(chrome.runtime.lastError))
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(cookie);
      }
    });
  });
}

function setCookieValue(url, name, cookieValue){
  chrome.cookies.set(
    { url: url,
      name: name,
      value: cookieValue,
      expirationDate: (Date.now()/1000) + (3600 * 24 *7),
      path: '/'
    }
    , (cookie) => {
      if (chrome.runtime.lastError) {
        console.error('Failed to set cookie:', chrome.runtime.lastError);
        alert('Failed to set cookie');
      } else {
        console.log('Cookie set successfully:', cookie);
      }
    })
}

async function setSessionIdCookie(url, cookieValue) {
  return new Promise((resolve, reject) => {

    setCookieValue(url, 'JSESSIONID', cookieValue)
    setCookieValue(url, 'sid', cookieValue)
  })
}


document.getElementById('paste-button').addEventListener('click', async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const text = getTextFromClipboard()

  setSessionIdCookie(tab.url, text).then(x=> console.log(x))
});

