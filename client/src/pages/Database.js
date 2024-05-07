import React from 'react'
import { Button, Typography } from '@mui/material'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

function CustomTypography({ value }) {
    return (
        <>
            <Typography variant='button' gutterBottom sx={{ textAlign: 'center' }}>
                {value}
            </Typography>
        </>
    )
};

function CustomTextField({ value }) {
    return (
        <>
            <TextField
                sx={{ marginTop: 2, marginBottom: 2, width: '45rem', background: 'white' }}
                required
                id="outlined-required"
                label={value}
            // helperText="Enter the new Database name here"
            />
        </>
    )
};

const CustomPaper = styled(Paper)(({ theme }) => ({
    width: '90%',
    // height: 120,
    padding: theme.spacing(1),
    ...theme.typography.body2,
    // textAlign: 'center',
    background: '#e8e8e8'
}));

export default function Database() {
    return (
        <>
            <Box>

                <CustomTypography value={"1. Create a new Database"} />
                <br />

                <Box sx={{ position: 'relative', left: 50, top:20 }}>

                    <CustomPaper variant="elevation">

                        <CustomTextField value="Database Name" />
                        <br />
                        <Button variant="contained" color="secondary" sx={{ height: 50 }} >Add Database</Button>

                    </CustomPaper>
                </Box>

            </Box>

            <Box sx={{ marginTop: 5 }} >
                <CustomTypography value={"2. Add a page to the database"} />
                <br />

                <Box sx={{ position: 'relative', left: 50, top:20 }}>

                    <CustomPaper variant="elevation">

                        <CustomTextField value="Parent DB ID" />
                        <br />
                        <CustomTextField value="Page Name" />
                        <br />
                        <CustomTextField value="Header Name" />
                        <br />

                        <Button variant="contained" color="secondary" sx={{ height: 50 }} >Add Page</Button>

                    </CustomPaper>
                </Box>


            </Box>
        </>
    )
}
