import Axios from 'axios'
import enviornment from '../common/enviornment'
import qs from 'qs'

export let createGroup = function(data){
    return Axios({
        method: 'post',
        url: `http://${enviornment.hostname}:${enviornment.port}/group/createGroup`,
        data: qs.stringify({
            name: data.name,
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            'token': data.token
        },
    })
}

// module.exports = {
//     createGroup: createGroup
// }