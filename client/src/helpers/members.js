import instance from './api'
import qs from 'querystring'

export async function getMemberDashboard() {
    const resp = await instance.post('/members/dashboard',{},{withCredentials:true});
    return resp.data;
}

export async function requestNewItem(data){
    const resp = await instance.post('/members/requestItem',qs.stringify(data),{withCredentials:true});
    return resp.data;
}

