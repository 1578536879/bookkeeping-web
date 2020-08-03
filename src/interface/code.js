import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let getRegisterCode = function(data){
    return Axios({
        method: 'get',
        url: `http://${enviornment.hostname}:${enviornment.port}/code/registerCode`,
        params: qs.stringify({
            email: data.email
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}

export let getForgetPasswordCode = function(data){
    return Axios({
        method: 'get',
        url: `http://${enviornment.hostname}:${enviornment.port}/code/forgetPassword`,
        params: qs.stringify({
            email: data.email
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}