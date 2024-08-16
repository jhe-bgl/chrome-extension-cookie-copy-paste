import { Setting } from "../dto/setting"
import { localStoreGet, localStoreSet } from "./browserAdapter"


export const defaultSetting : Setting = {
    allCookies: true,
    cookieNames: ''
}

export const readSettings = (callback: (s :Setting) => void) => {

    localStoreGet("setting",  function(items){

      if(items['setting']){
          const savedSettings = JSON.parse(items['setting']) as Setting
          if(savedSettings.cookieNames === undefined || savedSettings.cookieNames.length === 0){
            savedSettings.allCookies = true
          }
          callback(savedSettings)
      }
      else{
        callback(defaultSetting)
      }
    })
}

const trimString = (input: string, limit: number): string =>{
  if (input.length > limit) {
      return input.slice(0, limit) + '...';
  }
  return input;
}

export const settingDisplay = (s: Setting):string => {
  if(s.allCookies){
    return "All Cookies"
  }
  else{
    return trimString("Cookie: "+ s.cookieNames, 25)
  }
}


export const writeSettings = (setting: Setting, callback: () => void) =>{

  localStoreSet("setting", JSON.stringify(setting),  function(){
    callback()
  })
}
