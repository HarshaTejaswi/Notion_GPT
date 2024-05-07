import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import NotionAppLogo from '../assets/images/Notion_app_logo.png'
import rightArrow from '../assets/images/right_arrow.png'
import { config } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    padding: theme.spacing(1),
    textAlign: 'center',
}));

export function AlreadyLoggedIn() {
    console.log("Inside AlreadyLoggedIn component");
    const navigate = useNavigate()
    useEffect(() => {
        navigate("/home")
    })
    return
}

export default function Login() {

    async function APIHIT() {

        const api = `${config.endpoint}/notion/`
        try {

            const response = await axios.get(api);
            console.log(response.data)

        } catch (error) {
            console.log(error);
        }
    }
    APIHIT()
    const ProjectName = 'NotionGPT'

    const theme = useTheme();
    const isMdScreen = useMediaQuery(theme.breakpoints.up('md'));

    const backgroundImageStyleNotionLogo = {
        backgroundImage: `url(${NotionAppLogo})`, // Replace 'path_to_your_image.jpg' with your image file path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        top: '-0.75rem',
        width: '5rem',
        // height: '5rem'
    };

    const backgroundImageStyleRightArrow = {
        backgroundImage: `url(${rightArrow})`, // Replace 'path_to_your_image.jpg' with your image file path
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '10rem',
        height: '3rem'
    };

    return (
        <>
            <main>
                <Box sx={{ display: 'flex', justifyContent: 'center', fontSize: 0 }}>
                    <Box>
                        <Typography variant={isMdScreen ? "h4" : "h6"} gutterBottom sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                            Welcome to {ProjectName}
                        </Typography>
                        <br />
                        <Typography variant="overline" sx={{ textTransform: 'none', fontWeight: 400, fontSize: '0.875rem', lineHeight: 1.43, letterSpacing: '0.01071em', color: 'rgba(0, 0, 0, 0.6)' }}>
                            {/* Redefine your productivity */}
                        </Typography>
                    </Box>
                </Box>
                <Box sx={{ display: 'flex', marginTop: '2rem', justifyContent: 'center' }}>

                    <Box style={backgroundImageStyleNotionLogo}>
                    </Box>
                    <Box style={backgroundImageStyleRightArrow}>
                    </Box>
                    <Typography variant={isMdScreen ? "h3" : "h6"} gutterBottom sx={{ marginLeft: '2rem' }}>
                        {ProjectName}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }} >
                    {/* Make Sure you don't use Secret Links Like this; because onHover on the button anyone can view the link */}
                    <Button
                        href="https://api.notion.com/v1/oauth/authorize?client_id=ae25a9cf-e9b7-4fce-b658-51b042236527&response_type=code&owner=user&state=ae25a9cf-e9b7-4fce-b658-51b042236527&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fhome%2F"
                    >
                        Connect
                    </Button>
                    <Typography variant='body1' gutterBottom sx={{ marginLeft: '2rem', position: 'relative', left: '-25px', top: '5px' }}>
                        your Notion app with {ProjectName}
                    </Typography>
                </Box>
            </main >
        </>
    )
}
