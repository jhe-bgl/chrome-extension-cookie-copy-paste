
import { BROWSER } from "./constant"


export const localStoreGet = (key: string, callback: (s :any) => void) => {

  if(BROWSER === "chrome"){
      //const items = {'setting': undefined}
      chrome.storage.local.get([key], function(items){
        callback(items)
      })
  }
  else{

    let value = localStorage.getItem(key)
    const res :  { [key: string]: string } = {}
    res[key] = value? value : ''
    callback(res)
  }
}



export const localStoreSet = (key: string, value : string, callback: () => void) => {

  if(BROWSER === "chrome"){

      const objToSet :  { [key: string]: string } = {}
      objToSet[key] = value

      chrome.storage.local.set(objToSet, function(){
        callback()
      })
  }
  else{

    localStorage.setItem(key, value)
    callback()
  }
}