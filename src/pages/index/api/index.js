import util from '@libs/util'


let login = () => {
    return util.ajax.post('/auth/login')
}

let getSysMenuTree = () => {
    return util.ajax.get('/sys/menu/tree');
}

let getSysPrivList = () => {
    return util.ajax.get('/sys/priv/list');
}

let getSysUser = () => {
    return util.ajax.get('/sys/user');
}

export default {
    login,
    getSysMenuTree,
    getSysPrivList,
    getSysUser
}