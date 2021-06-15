import instance from './api'
import qs from 'querystring'

export async function login(email,password){
    const data =qs.stringify({
        'email' : email,
        'password': password
    });
    const resp = await instance.post('users/login', data, {withCredentials:true});
    return resp.data;
}

export async function signup(data){
    const memberData = qs.stringify({
        name: data.firstName + ' ' + data.lastName,
        email: data.email,
        password: data.password
    });
    const resp = await instance.post('/users/signup', memberData,{withCredentials:true});
    return resp.data;
}

