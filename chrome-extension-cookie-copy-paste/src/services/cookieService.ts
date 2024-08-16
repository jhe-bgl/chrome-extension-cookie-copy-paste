import { CookieItem } from "../dto/cookie";
import { Setting } from "../dto/setting";
import { BROWSER } from "./constant";


const copyTextToClipboard = (text: string) => {

  var copyFrom = document.createElement("textarea")
  copyFrom.textContent = text
  document.body.appendChild(copyFrom)
  copyFrom.select()
  document.execCommand('copy')
  copyFrom.blur()
  document.body.removeChild(copyFrom)

}


const getTextFromClipboard = () :string => {

  var pasteFrom = document.createElement("textarea")
  document.body.appendChild(pasteFrom)
  pasteFrom.select()
  document.execCommand('paste')
  var text =  pasteFrom.value
  document.body.removeChild(pasteFrom)
  return text
}


export const getSessionIdCookie = (url : string) =>{

  return new Promise((resolve, reject) => {
    chrome.cookies.get({ url: url, name: 'JSESSIONID' }, (cookie) => {
      //alert( JSON.stringify(chrome.runtime.lastError))
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(cookie);
      }
    })
  })
}



export const getAllCookies = (url : string) : Promise<any> =>{

  return new Promise((resolve, reject) => {
    chrome.cookies.getAll({ url: url }, (cookies: chrome.cookies.Cookie[]) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(cookies)
      }
    })
  })
}


const toSettingNamesArray = (cookieNames : string |undefined) : string[] =>{
  if(cookieNames){
    return cookieNames.split(',').map(item => item.trim())
  }
  return []
}


export const copyCookie = async (setting : Setting) : Promise<number> =>{
  if(BROWSER !== "chrome"){
    return new Promise((resolve, reject) => {
      resolve(8)
    })
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

  const target : chrome.cookies.Cookie[] = []
  if(tab.url){
      const cookies : chrome.cookies.Cookie[] = await getAllCookies(tab.url)
      const selectedCookieNames: string[] = toSettingNamesArray(setting.cookieNames)
      cookies.forEach((x : chrome.cookies.Cookie)=>{
        
        if(setting.allCookies){
          target.push(x)
        }
        else{
          if(selectedCookieNames.find(y => x.name.trim() === y)){
            target.push(x)
          }
        }
      })
  }

  const cookieItems: CookieItem[]= target.map(x => {
    return {
      name: x.name,
      value: x.value,
    }
  })

  copyTextToClipboard(JSON.stringify(cookieItems))

  return new Promise((resolve, reject) => {
    resolve(cookieItems.length)
  })
}

const setCookieValue = (url: string, name: string, cookieValue: string): Promise<string> => {
  
  return new Promise((resolve, reject) =>{

    chrome.cookies.set(
      { url: url,
        name: name,
        value: cookieValue,
        expirationDate: (Date.now()/1000) + (3600 * 24 *7),
        path: '/'
      }
      , (cookie) => {
        if (chrome.runtime.lastError) {
          reject('Failed to set cookie:' + chrome.runtime.lastError)
        } else {
          resolve('Cookie set successfully')
        }
      })
  })
}

const handlePromise = (promise: Promise<any>) =>
  promise.then(result => ({ status: 'fulfilled', result }))
         .catch(error => ({ status: 'rejected', error }));


const setCookieValues = async (tabUrl :string, cookieItems: CookieItem[]) : Promise<number> =>{
  const allPromisesResults = cookieItems.map(x=> setCookieValue(tabUrl, x.name, x.value)).map(x=>handlePromise(x))
  const allResults = await Promise.all(allPromisesResults)
  
  return allResults.filter(result => result.status === 'fulfilled').length
}

export const pasteCookie = async (): Promise<number> =>{

  if(BROWSER !== "chrome"){
    return new Promise((resolve, reject) => {
      resolve(8)
    })
  }

  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  return new Promise((resolve, reject) => {

    if(tab.url){
      const text = getTextFromClipboard()
      let obj;
      try {
        obj = JSON.parse(text);
      } catch (e) {
        reject("Invalid copied cookie. Please copy again.")
        return
      }
      const cookieItems = obj as CookieItem[]

      if(cookieItems.length === 0 ){
        reject("Invalid copied cookie. Please copy again.")
      }

      setCookieValues(tab.url!, cookieItems).then(x=> resolve(x))
    }
    else{
      reject("Not on any tab")
    }
    
  })
 
}