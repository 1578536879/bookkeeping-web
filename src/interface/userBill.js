import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let getUserBill = function(data){
    return Axios({
        method: 'get',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/get`,
        data: qs.stringify({
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let insertUserBill = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/insert`,
        data: qs.stringify({
            content: data.content,
            date: data.date,
            price: data.price,
            type: data.type,
            path: data.path
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let deleteUserBill = function(data){
    return Axios({
        method: 'delete',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/delete`,
        data: qs.stringify({
            BID: data.BID,
            path: data.path
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let userBillStatistics = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/statistics`,
        data: qs.stringify({
            time: data.data,
            datePicker: data.datePicker
        },
        { indices: false }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let findUserBill = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/find`,
        data: qs.stringify({
            name: data.name
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let queryUserBill = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/user/bill/query`,
        data: qs.stringify({
            startTime: data.startTime,
            endTime: data.endTime,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}