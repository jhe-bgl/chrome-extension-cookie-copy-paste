import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom'

import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications'
import { Box, Button, Container, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material'

import './index.css'
import { Setting } from '../../dto/setting';
import { defaultSetting, readSettings, settingDisplay } from '../../services/settingService'

function Main(props: {}) {

    const navigate = useNavigate()

    const [settings, setSettings] = useState< Setting>(defaultSetting)

    const goSettings = ()=>{
        navigate(
          {
              pathname: '/settings'
          }
        )
    }

    useEffect(() => {
      readSettings((settings: Setting)=>{
        setSettings(settings)
      })
    }, [])

    return (

      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <div className='align_left'>
        <Typography variant="h6" component="h2">
            <Grid container spacing={2}>
              <Grid item xs={11}>
                <span>Copy and Paste {settingDisplay(settings)}</span>
              </Grid>
              <Grid item xs={1}>
                <span className="end-container">
                  <Tooltip title="Change what to copy">
                    <IconButton color="primary" aria-label="add to shopping cart" onClick={goSettings}>
                        <SettingsApplicationsIcon/>
                      </IconButton>
                  </Tooltip>
                </span>
              </Grid>
            </Grid>
        </Typography>
      </div>
      <Divider></Divider>
        <Container className='element_row'>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button variant="contained">Copy</Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained">Paste</Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    )
}

export default React.memo(Main)