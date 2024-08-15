import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import { Alert, Box, Button, Container, Grid, IconButton, Tooltip, Typography } from '@mui/material'
import CookieIcon from '@mui/icons-material/Cookie';
import CheckIcon from '@mui/icons-material/Check';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';

import './index.css'
import { Setting } from '../../dto/setting';
import { defaultSetting, readSettings, settingDisplay } from '../../services/settingService'
import { copyCookie, pasteCookie } from '../../services/cookieService'
import buttonSx from '../../Styles/button';

function Main(props: {}) {

    const navigate = useNavigate()

    const [settings, setSettings] = useState< Setting>(defaultSetting)
    const [message, setMessage] = useState<string>('')
    const [errorMessage, setErrorMessage] = useState<string>('')

    const goSettings = ()=>{
        navigate(
          {
              pathname: '/settings'
          }
        )
    }

    const handleCopyCookie = ()=>{
        setMessage('')
        setErrorMessage('')
        const p: Promise<number> = copyCookie(settings)
        p.then(num=>{
          setMessage(num + " copied")
        })
    }

    const handlePasteCookie = ()=>{
      setMessage('')
      setErrorMessage('')
      const p: Promise<number> = pasteCookie()
      p.then(num=>{
        setMessage(num + " pasted")
      })
      .catch(err=>{
        setErrorMessage(err)
      })
    }

    useEffect(() => {
      readSettings((settings: Setting)=>{
        setSettings(settings)
      })
    }, [])

    return (
      <Box>
          <Card sx={{ maxWidth: 345,  boxShadow: 0  }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#e8c374' }} aria-label="recipe">
                    <CookieIcon/>
                  </Avatar>
                }
                action={
                  <Tooltip title="Change what to copy">
                            <IconButton aria-label="add to shopping cart" onClick={goSettings}>
                                <SettingsApplicationsIcon/>
                              </IconButton>
                  </Tooltip>
                }
                title="Copy / Paste current tab cookies"
                subheader={settingDisplay(settings)}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <Container className='element_row'>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Button variant="contained" size="small" sx={buttonSx} onClick={handleCopyCookie}>Copy</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" size="small" sx={buttonSx} onClick={handlePasteCookie}>Paste</Button>
                      </Grid>
                    </Grid>
                  </Container>
                </Typography>
              </CardContent>
          </Card>

          {message && message.length>0 && 
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              {message}
          </Alert>
          }

          {errorMessage && errorMessage.length>0 && 
            <Alert severity="error">
              {errorMessage}
            </Alert>
          }

      </Box>
    )
}

export default React.memo(Main)