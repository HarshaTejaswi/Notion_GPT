import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postOauthCode, postSecretKey } from '../api/notion';
import { addAccessTokenToLocalStorage } from '../redux/slice';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { logOut } from '../utilities/helperFunctions';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(6),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    cursor: 'pointer',
    textTransform: 'uppercase'
}));

export default function Home() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const accessToken = useSelector((state) => state.localStorageReducer.access_token) || localStorage.getItem('access_token')

    const search = useLocation().search;
    const code = new URLSearchParams(search).get('code');
    // console.log("code == ");
    // console.log(code);
    const state = new URLSearchParams(search).get('state');
    const error = new URLSearchParams(search).get('error');

    const [ranOnce, setRanOnce] = useState(false);

    useEffect(() => {
        // if ( (accessToken !== '' || accessToken !=='null') && !ranOnce && code) {
        console.log("1");
        console.log("localstorage : " + localStorage.getItem('access_token'));
        if (localStorage.getItem('access_token') === '' || localStorage.getItem('access_token') === null) {
            console.log("2");
            console.log("ranOnce " + ranOnce);
            console.log("code " + code);
            if (!ranOnce && code) {
                console.log("3");
                postOauthCode(code)
                    .then(response => {
                        console.log("response === ");
                        console.log(response.data.data.access_token);
                        console.log("End response === ");

                        if (response.data.data.access_token !== null) {
                            dispatch(
                                addAccessTokenToLocalStorage({
                                    access_token: response.data.data.access_token,
                                })
                            );

                            //     postSecretKey(response.data.data.access_token)
                            //         .then(response => {
                            //             console.log("postSecretKey response");
                            //             console.log(response);
                            //             console.log("ENDpostSecretKey response");
                            //         })
                            //         .catch(err => {
                            //             console.log(err);
                            //         });
                            // }
                        }
                        localStorage.setItem("access_token", response.data.data.access_token);
                        setRanOnce(true); // Set the flag to prevent multiple executions
                    })
                    .catch(error => {
                        console.error("Error occurred while processing OAuth code:", error);
                    });
            }
            else if (ranOnce) {
                dispatch(
                    addAccessTokenToLocalStorage({
                        access_token: localStorage.getItem("access_token")
                    })
                );
            }
        }
        else {
            dispatch(
                addAccessTokenToLocalStorage({
                    access_token: localStorage.getItem("access_token")
                })
            );
        }

        // return ()=> {
        //     localStorage.removeItem("access_token");
        // }
    }, []);

    console.log("accessToken inside Home.js : ", accessToken);

    const features = [
        // { title: 'Database', 'navigateTo': 'database' },
        // { title: 'Page', 'navigateTo': 'page' },
        { title: 'ChatGPT', 'navigateTo': 'chatgpt' },
        { title: 'Store Context', 'navigateTo': 'storeContext' }
    ]

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant='h5' gutterBottom sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                    NotionGPT
                </Typography>

                <CustomButton ButtonName="Logout" onclickfunction={logOut} />
            </Box>

            <Box sx={{ flexGrow: 1, marginTop: 3 }}>
                <Grid container rowSpacing={2} columnSpacing={4}>
                    {
                        features.map((value, key) => {
                            return (
                                <>
                                    <Grid item lg={6} md={6} sm={4} xs={2}>
                                        <Item elevation={6} onClick={() => navigate(value.navigateTo)}>
                                            {value.title}
                                        </Item>
                                    </Grid>
                                </>
                            )
                        })
                    }
                </Grid>
            </Box>
        </>
    )
}
