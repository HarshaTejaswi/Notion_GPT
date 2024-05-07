import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import LoadingButton from '@mui/lab/LoadingButton';
import { getDatabaseList, getPageList, getContextsList } from '../api/notion';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios';
import { config } from '../App';
import { useSelector } from 'react-redux';
import CustomButton from '../components/CustomButton';
import { logOut } from '../utilities/helperFunctions';
import { useSnackbar } from 'notistack'

// const templateList = [
//     'carrerCoach'
// ]

export function ComboBox({ databaseList, database, setDatabase }) {
    const handleChange = (event, value) => {
        const selectedDatabase = databaseList.find(item => item.databaseTitle === value);
        if (selectedDatabase) {
            const plainId = selectedDatabase.databaseId.replace(/-/g, '');
            setDatabase(plainId);
        }
    };

    return (
        <Box width="100%">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={databaseList.map(item => item.databaseTitle)}
                sx={{ width: '100%' }}
                value={databaseList.find(item => item.databaseId === database)?.databaseTitle || ''}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="Databases" />}
            />
        </Box>
    );
}


export function ComboBoxForPages({ pageList, page, setPage }) {
    const handleChange = (event, value) => {
        const selectedPage = pageList.find(item => item.pageTitle === value);
        if (selectedPage) {
            const plainId = selectedPage.pageId.replace(/-/g, '');
            setPage(plainId);
        }
    };

    const filteredPages = pageList.filter(item => item.pageTitle !== 'undefinedPageTitle');
    const pageTitles = filteredPages.map(item => item.pageTitle);

    return (
        <Box width="100%">
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={pageTitles}
                sx={{ width: '100%' }}
                value={pageList.find(item => item.pageId === page)?.pageTitle || ''}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} label="pages" />}
            />
        </Box>
    );
}


export function ComboBoxChooseTemplate({ templateList, template, setTemplate, setContext, contextFullData}) {
    return (
        <Box width="100%">
            <Autocomplete
                disablePortal
                id="combo-box-template"
                options={templateList}
                sx={{ width: '100%', marginBottom: 3 }}
                value={template}
                onChange={(event, value) => {
                    setTemplate(value);
                    console.log( contextFullData.filter( (data)=>data.title === value )[0]?.data ) 
                    setContext(contextFullData.filter( (data)=>data.title === value )[0]?.data)
                }}
                renderInput={(params) => <TextField {...params} label="Choose context" />}
            />
        </Box>
    );
}


export default function Gpt() {

    const [databaseList, setDatabaseList] = useState([]);
    const [pageList, setPageList] = useState([]);
    const [templateList, setTemplateList] = useState([])
    const [contextFullData, setContextFullData] = useState([])
    const [database, setDatabase] = useState('')
    const [page, setPage] = useState('')
    const [gptQuery, setGptQuery] = useState('')
    const [title, setTitle] = useState('')
    const [template, setTemplate] = useState('')
    const [context, setContext] = useState('')

    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(false);

    const accessToken = useSelector((state) => state.localStorageReducer.access_token) || localStorage.getItem('access_token');


    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("111111111111111111111111111111111111");
                const databaseListData = await getDatabaseList(accessToken);
                // console.log("333333333333333333333333333333333333");
                const pageListData = await getPageList(accessToken);
                const contextsData = await getContextsList(accessToken);
                // console.log("555555555555555555555555555555555555");

                // console.log("----------------------------------------------------------");
                // console.log("----------------------------------------------------------");
                console.log( databaseListData )
                console.log( pageListData )
                console.log( contextsData )
                
                databaseListData.forEach( ( data ) => {
                    console.log(`Database ID = ${ data.databaseId } `)
                    console.log(  pageListData.filter(function( obj ) {
                        return obj.ParentDatabaseId === data.databaseId;
                    }) );
                })
                // console.log("----------------------------------------------------------");
                // console.log("----------------------------------------------------------");
                
                setDatabaseList(databaseListData);
                setPageList(pageListData);
                setContextFullData(contextsData)
                setTemplateList(contextsData.map((val)=>val.title));
            } catch (error) {
                console.error('Error fetching database/page list:', error);
            }
        };

        fetchData();
    }, [])

    console.log("accessToken inside Gpt.js : ", accessToken);

    const handleCreateTemplate = async (event) => {

        const api = `${config.endpoint}/notion/template`;
        try {
            const body = {
                database,
                page,
                title,
                gptQuery,
                context,
                accessToken
            }
            console.log("context ",context);
            setLoading(true)
            const response = await axios.post(api, body);

            if (response.status === 200) {
                enqueueSnackbar("Template Created successfully", { variant: "success" })
                setLoading(false)
            }
            else{
                enqueueSnackbar("couldn't create Template", { variant: "error" })
                setLoading(false)
            }

            console.log("response");
            console.log(response);
            setDatabase('');
            setPage('');
            setGptQuery('');
            setTitle('');
            setTemplate('');

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
                <Typography variant='h5' gutterBottom >
                    Work with ChatGpt
                </Typography>

                <CustomButton ButtonName="Logout" onclickfunction={logOut} />
            </Box>

            {/* {databaseList && (
                <>
                    <ComboBox database={database} setDatabase={setDatabase} databaseList={databaseList} />
                    <br />
                </>
            )} */}
            <TextField
                id="outlined-multiline-static"
                label="Enter Title of the page"
                multiline
                fullWidth
                rows={1}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{marginBottom:20}}
                />
            {templateList && (
                <>
                    <ComboBoxChooseTemplate template={template} setTemplate={setTemplate} setContext={setContext} templateList={templateList} contextFullData={contextFullData} />
                    <br />
                </>
            )}    

            <TextField
                id="outlined-multiline-static"
                label="Query chatGpt"
                multiline
                fullWidth
                rows={3}
                value={gptQuery}
                onChange={(e) => setGptQuery(e.target.value)}
                style={{marginBottom:20}}
            />
            {pageList && (
                <>
                    <ComboBoxForPages page={page} setPage={setPage} pageList={pageList} />
                    <br />
                </>
            )}
            
            <br />
            <br />
            

            <br />
            {/* <Button variant="contained" color="secondary" sx={{ height: 50 }} onClick={handleCreateTemplate} >Create Template</Button> */}

            <LoadingButton
                sx={{ height: 50 , width: "15em" }}
                color="secondary"
                onClick={handleCreateTemplate}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                <span>Create Template</span>
            </LoadingButton>

        </>
    );

}
