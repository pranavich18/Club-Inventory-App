import instance,{imageInstance} from './api'
import qs from 'querystring'

export async function getConvenerDashboard() {
    const resp = await instance.post('/conveners/dashboard',{},{withCredentials:true});
    return resp.data;
}

export async function addNewItem(data, formData){
    const respImg = await imageInstance.post('/upload/single',formData,{withCredentials:true});
    var imageId = respImg.data && respImg.data.data ? respImg.data.data : null;
    data.imageId = imageId;
    const resp = await instance.post('/conveners/addItem',qs.stringify(data),{withCredentials:true});
    return resp.data;
}

export async function acceptMemberRequest(requestID, itemID, quantity){
    const data = qs.stringify({
        requestid: requestID,
        itemid: itemID,
        quantity: quantity
    });
    const resp = await instance.post('/conveners/acceptRequest',data, {withCredentials:true});
    return resp.data;
}

export async function denyMemberRequest(requestID){
    const data = qs.stringify({
        requestid: requestID
    });
    const resp = await instance.post('/conveners/denyRequest',data,{withCredentials:true});
    return resp.data;
}