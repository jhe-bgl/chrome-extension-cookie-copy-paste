import { Setting } from "../dto/setting"


export const defaultSetting : Setting = {
    allCookies: true,
    cookieNames: ''
}

export const readSettings = (callback: (s :Setting) => void) => {

    const items = {'setting': undefined}
    //chrome.storage.local.get(["setting"], function(items){

      if(items['setting']){
          const savedSettings = JSON.parse(items['setting']) as Setting
          callback(savedSettings)
      }
      else{
        callback(defaultSetting)
      }
  //})
}

export const settingDisplay = (s: Setting):string => {
  if(s.allCookies){
    return "All Cookies"
  }
  else{
    return "Cookie of: "+ s.cookieNames
  }
}