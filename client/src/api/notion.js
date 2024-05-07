import axios from 'axios';
import { config } from "../App";

// export async function getDatabaseList(access_token) {
export async function getDatabaseList(access_token) {

    // const api = `${config.endpoint}/notion/databaseList`;
    // console.log("2222222222222222222222222222222222222222222222")
    const api = `${config.endpoint}/notion/databaseList/${access_token}`;
    try {
        
        const response = await axios.get(api);
        // console.log("inside getDatabaseList start");
        // console.log(response.data.data)
        // console.log("inside getDatabaseList end");
        return Array.from(response.data.data)
        
    } catch (error) {
        console.log(error);
    }
    
};

export async function getPageList(access_token) {
    // export async function getPageList() {
        
    // console.log("44444444444444444444444444444444444444444444444444")
    const api = `${config.endpoint}/notion/pageList/${access_token}`;
    try {

        const response = await axios.get(api);
        // console.log(response.data.data);
        return Array.from(response.data.data)

    } catch (error) {
        console.log(error);
    }

};

export async function getContextsList(access_token) {
        
    const api = `${config.endpoint}/notion/context/${access_token}`;
    try {

        const response = await axios.get(api);
        console.log("contexts :" , response);
        return Array.from(response.data.data)

    } catch (error) {
        console.log(error);
    }

};

export async function postOauthCode(code) {
    const api = `${config.endpoint}/notion/createOauthToken`;
    console.log("4");
    console.log("code in notion.js is " + code);
    try {
        const response = await axios.post(api, { auth_code: code })
        console.log("response inside postOuthCode function start");
        console.log(response);
        console.log("response inside postOuthCode function end");
        return response;
    } catch (error) {
        console.log("Some error : ", error.message);
        // throw error; // Re-throw the error to handle it elsewhere if needed
    }
}

// export async function postSecretKey(token) {
//     const api = `${config.endpoint}/notion/token`;
//     try {
//         const response = await axios.post(api, { token: token })
//         console.log("response inside postSecretKey function start");
//         console.log(response);
//         console.log("response inside postSecretKey function end");
//         return response;
//     } catch (error) {
//         console.log("Some error : ", error.message);
//         // throw error; // Re-throw the error to handle it elsewhere if needed
//     }
// }

