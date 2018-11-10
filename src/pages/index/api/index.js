import util from '@libs/util'


let login = () => {
    return util.ajax.post('/auth/login')
}

let getSysMenuList = () => {
    return util.ajax.get('/sys/menu/list');
}

let getSysPrivList = () => {
    return util.ajax.get('/sys/priv/list');
}

let getSysUser = () => {
    return util.ajax.get('/sys/user');
}

export default {
    login,
    getSysMenuList,
    getSysPrivList,
    getSysUser
}