import md5 from 'js-md5'

export let encryption = function(data){
    let password = data.password
    let pos = Math.floor(Math.random()*password.length)
    password = password.substr(0, pos) + md5('BookKeeping') + password.substr(pos, password.length - pos)
    password = btoa(password)
    return {
        password: password,
        pos: pos
    }
}