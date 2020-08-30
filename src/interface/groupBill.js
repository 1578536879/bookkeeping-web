import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let getGroupBill = function(data){
    return Axios({
        method: 'get',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/bill/get`,
        data: qs.stringify({
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            token: data.token
        },
    })
}

export let insertGroupBill = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/bill/insert`,
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

export let deleteGroupBill = function(data){
    return Axios({
        method: 'delete',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/bill/delete`,
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

export let groupBillStatistics = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/bill/statistics`,
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