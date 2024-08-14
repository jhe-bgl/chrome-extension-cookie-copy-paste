import React, {useState, useEffect} from 'react'
import './index.css'
import { Box, Button, Container, Divider, FormLabel, Grid, IconButton, Switch, TextField, Tooltip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from 'react-router-dom'
import { Setting } from '../../dto/setting'

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

        chrome.storage.local.set({ "setting": JSON.stringify(setting) }, function(){
            backToMain()
        });
    }

    useEffect(() => {
        chrome.storage.local.get(["setting"], function(items){

            if(items['setting']){
                const savedSettings = JSON.parse(items['setting']) as Setting
                setAllCookies(savedSettings.allCookies)
                setCookieNames(savedSettings.cookieNames)
            }
        })
    }, [])


    return (
        <div className='align_left'>
            <Container>
                    <Typography variant="h6" component="h2">
                        Settings
                    </Typography>

                    <Divider></Divider>

                    <Box>
                        
                            <div>
                                    <FormLabel>All Cookies</FormLabel>   <span className='settings_item'><Switch checked={allCookies} onChange={handleAllCookiesChange}/></span>
                            </div>
                            {!allCookies && 
                                <div>
                                        <FormLabel>Cookie name</FormLabel>
                                        <span className='settings_item'>
                                            <TextField id="outlined-basic" variant="outlined" size="small" hiddenLabel
                                             value = {cookieNames}
                                             onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                setCookieNames(event.target.value)
                                              }}
                                            />
                                        </span>
                                        <Tooltip title="Please enter cookie names you want to copy. Separate by comma if multiple.">
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                </div>
                            }
                            <div className='end-container'>
                                    <Button variant="contained" size="small" onClick={save}>Save</Button>
                            </div>
                        
                    </Box>
            </Container>
        </div>
    )
}

export default React.memo(Settings)
