import React, {useState, useEffect} from 'react'
import './index.css'
import {  Button, FormLabel, Switch, TextField, Tooltip} from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom'
import { Setting } from '../../dto/setting'
import { readSettings, writeSettings } from '../../services/settingService';
import buttonSx, { buttonOutlineSx } from '../../Styles/button';
import { formLabelSx } from '../../Styles/formLabel';

function Settings(props: {}) {

    const navigate = useNavigate()

    const [allCookies, setAllCookies] = useState< boolean>(true)
    const [cookieNames, setCookieNames] = useState< string>('')

    const backToMain = ()=>{
        navigate(
          {
              pathname: '/'
          }
        )
    }

    const handleAllCookiesChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean)=>{
        setAllCookies(checked)
    }

    const save = ()=>{

        const setting : Setting ={
            allCookies: allCookies,
            cookieNames: cookieNames
        }

        writeSettings(setting, ()=> backToMain())
    }

    const handleCancel = ()=>{
        backToMain()
    }

    useEffect(() => {
        readSettings((savedSettings: Setting)=>{
            setAllCookies(savedSettings.allCookies)
            setCookieNames(savedSettings.cookieNames)
        })
    }, [])


    return (
        <div className='align_left'>
            
            <Card sx={{ maxWidth: 345, boxShadow: 0 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#e8c374' }} aria-label="recipe">
                    <CookieIcon/>
                  </Avatar>
                }
                title="Settings"
                subheader=""
              >
              </CardHeader>
              <CardContent>
                
            
                            <div>
                                    <FormLabel sx={formLabelSx}>All Cookies</FormLabel>   <span className='settings_item'><Switch checked={allCookies} onChange={handleAllCookiesChange}/></span>
                            </div>
                            {!allCookies && 
                                <div className='element_row'>
                                        <FormLabel sx={formLabelSx}>Cookie names</FormLabel>
                                        <span className='settings_item'>
                                            <Tooltip title="Please enter the cookie names you want to copy. Separate multiple names with a comma(,)." placement="top">
                                            <TextField id="outlined-basic" variant="outlined" size="small" hiddenLabel
                                             sx={{
                                                '.MuiInputBase-input': { fontSize: '0.7rem' },
                                                width: 220
                                             }}
                                             value = {cookieNames}
                                             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setCookieNames(event.target.value)
                                              }}
                                            />
                                            </Tooltip>            
                                        </span>
                                                                  
                                </div>
                            }
                            <div className='settings_item element_row end-container'>
                                    <Button variant="contained" size="small" sx={buttonOutlineSx} onClick={handleCancel}>Cancel</Button>
                                    <span className='button_gap'>
                                        <Button variant="contained" size="small" sx={buttonSx} onClick={save}>Save</Button>
                                    </span>
                            </div>
                 
               
              </CardContent>
            </Card> 
        </div>
    )
}

export default React.memo(Settings)
