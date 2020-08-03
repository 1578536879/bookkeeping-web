import Axios from 'axios'
import enviornment from '../common/enviornment'
import {encryption} from '../common/user'
import qs from 'qs'

export let register = function(data){
    let res = encryption({password:data.password})
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/register`,
        data: qs.stringify({
            email: data.email,
            password: res.password,
            username: data.username,
            code: data.code,
            pos: res.pos
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}

export let login = function(data){
    let res = encryption({password: data.password})
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/login`,
        data: qs.stringify({
            email: data.email,
            password: res.password,
            pos: res.pos
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}

export let resetPassword = function(data){
    let ores = encryption({password: data.oldPassword})
    let nres = encryption({password: data.newPassword})
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/resetPassword`,
        data: qs.stringify({
            password: ores.password,
            opos: ores.pos,
            newPassword: nres.password,
            nops: nres.pos
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let forgetPassword = function(data){
    let res = encryption({password: data.password})
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/forgetPassword`,
        data: qs.stringify({
            email: data.email,
            code: data.code,
            password: res.password,
            pos: res.pos
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    })
}

