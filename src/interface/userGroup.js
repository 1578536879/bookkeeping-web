import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let getUserCreateGroup = function(data){
    return Axios({
        method: 'get',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/user/getGroups`,
        data: qs.stringify({
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let inviteUser = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/user/invite`,
        data: qs.stringify({
            email: data.email
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

export let inviteEffective = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/user/inviteEffective`,
        data: qs.stringify({
            email: data.email,
            id: data.id
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}