import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { url } from './constant';

const getToken = async()=>{
    return AsyncStorage.getItem('token');
}

export const PUTJSON = (data, embededURL) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.put(`${url}${embededURL}`, {
        data
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});

export const GETJSON = (embededURL) => new Promise( async(resolve, reject)=> {
    const token = await getToken();
    axios.get(`${url}${embededURL}`,{
        headers:{
            // 'Authorization':`Bearer ${token}`,
        }
    })
        .then(response => {
            // alert(JSON.stringify(response))
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});


export const POSTJSON = (data, embededURL) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.post(`${url}${embededURL}`, {
        data
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});


export const DELETEJSON = (embededURL) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.delete(`${url}${embededURL}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});


