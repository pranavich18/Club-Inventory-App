import instance from './api'

export async function getUserDashboard(){
    const resp = await instance.post('/members/getUserDashboard',{},{withCredentials:true});
    return resp.data;
}

export async function logout() {
    const resp = await instance.post('/users/logout',{},{withCredentials:true});
    return resp.data;
}