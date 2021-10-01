import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { url, url2 } from './constant';

const getToken = async()=>{
    return AsyncStorage.getItem('token');
}

export const PUTJSON = (data, embededURL, mode = 0) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.put(`${mode == 0 ? url : url2}${embededURL}`, {
        data
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${token}`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});

export const GETJSON = (embededURL, mode = 0) => new Promise( async(resolve, reject)=> {
    const token = await getToken();
    axios.get(`${mode == 0 ? url : url2}${embededURL}`,{
        headers:{
            'Authorization':`Token ${token}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            // alert(JSON.stringify(response))
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});


export const POSTJSON = (data, embededURL, token_ = null, mode = 0) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    // resolve({data, embededURL, token_});
    axios.post(`${mode == 0 ? url : url2}${embededURL}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${token_ == null ? token : token_}`
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject({error})
        })
});


export const DELETEJSON = (embededURL, mode = 0) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.delete(`${mode == 0 ? url : url2}${embededURL}`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${token}`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});



export const PATCHJSON = (data, embededURL, mode = 0) => new Promise(async (resolve, reject) =>{
    const token = await getToken();
    axios.patch(`${mode == 0 ? url : url2}${embededURL}`, data, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization':`Token ${token}`,
            'X-CSRFToken':`3bsBVgmFfZZs4aQ6Hb7lhmmkjSLzy7PHhVl0r4tMbrl2n2rp5NYwO1pRqHdjOpiJ`,
        }
    })
        .then(response => {
            resolve(response);
        }).catch(error => {
            reject(error)
        })
});

