import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import { getDatabaseList, getPageList } from '../api/notion';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../App';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { logOut } from '../utilities/helperFunctions';
import { useSnackbar } from 'notistack'

export default function StoreContext() {
    const [contextTitle, setContextTitle] = useState('')
    const [contextData, setContextData] = useState('')
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const accessToken = useSelector((state) => state.localStorageReducer.access_token) || localStorage.getItem('access_token');

    const handleSaveContext = async () => {
        if ( contextData === '' ){
            enqueueSnackbar('context can not be null', {variant:"error"});
            return
        }
        console.log("Hiiiiiiiiiiiiiiiiiiiiiii")
        const api = `${config.endpoint}/notion/context`;
        try {
            console.log("Access_tokennnnnnn : ",accessToken)
            const body = { contextTitle, contextData, accessToken }
            setLoading(true)
            const response = await axios.post(api, body);

            if (response.status === 200) {
                enqueueSnackbar("Saved context successfully", { variant: "success" })
                setLoading(false)
            }
            else {
                enqueueSnackbar("couldn't save Context", { variant: "error" })
                setLoading(false)
            }

            console.log("response");
            console.log(response);
            setContextTitle('');
            setContextData('');

        } catch (error) {
            console.log(error);
        }

    }

    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                <Typography variant='h5' gutterBottom >
                    Save the context for future reference while querying.
                </Typography>

                <CustomButton ButtonName="Logout" onclickfunction={logOut} />
            </Box>

            <TextField
                id="outlined-multiline-static"
                label="Context Title"
                multiline
                fullWidth
                rows={1}
                value={contextTitle}
                onChange={(e) => setContextTitle(e.target.value)}
                style={{ marginBottom: 20, marginTop:10 }}
            />

            <TextField
                id="outlined-multiline-static"
                label="Enter the context"
                multiline
                fullWidth
                rows={3}
                value={contextData}
                onChange={(e) => setContextData(e.target.value)}
                style={{ marginBottom: 20 }}
            />

            <LoadingButton
                sx={{ height: 50, width: "15em" }}
                color="secondary"
                onClick={handleSaveContext}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                <span>Save Context</span>
            </LoadingButton>

        </>
    )
}
