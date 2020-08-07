import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let updateBillImage = function(data){
    return Axios.post(
        `http://${enviornment.hostname}:${enviornment.port}/image/bill/update`,
        data.file,{
            headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        }}
    )
}

export let deleteBillImage = function(data){
    return Axios({
        method: 'delete',
        url: `http://${enviornment.hostname}:${enviornment.port}/image/bill/delete`,
        data: qs.stringify({
            path: data.path
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}