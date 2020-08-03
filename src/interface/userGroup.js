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