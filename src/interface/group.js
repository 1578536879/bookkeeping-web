import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let createGroup = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/create`,
        data: qs.stringify({
            name: data.name,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let stopUsingGroup = function(data){
    return Axios({
        method: 'delete',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/stopUsing`,
        data: qs.stringify({
            data: data.GID
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let startUsingGroup = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/startUsing`,
        data: qs.stringify({
            data: data.GID
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let renameGroup = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/rename`,
        data: qs.stringify({
            name: data.name,
            GID: data.GID
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}