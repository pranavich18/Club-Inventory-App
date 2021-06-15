import instance from './api'
import qs from 'querystring'

export async function getAdminDashboard() {
    const resp = await instance.post('/admins/dashboard',{},{withCredentials:true});
    return resp.data;
}

export async function changeconvenerRole(role, id){
    const data = qs.stringify({
        role: role.toLowerCase(),
        convenerID: id
    });
    const resp = await instance.post('/admins/convenerRole',data,{withCredentials:true});
    return resp.data;
}

export async function changememberRole(role, id){
    const data = qs.stringify({
        role: role.toLowerCase(),
        memberID: id
    });
    const resp = await instance.post('/admins/memberRole',data,{withCredentials:true});
    return resp.data;
}

export async function addNewUser(userid, userClub){
    const data = qs.stringify({
        uID : userid,
        clbName: userClub
    });
    const resp = await instance.post('/admins/newUser', data, {withCredentials:true});
    return resp.data;
}

export async function addNewClub(data){
    const resp = await instance.post('/admins/addClub',qs.stringify(data),{withCredentials:true});
    return resp.data;
}