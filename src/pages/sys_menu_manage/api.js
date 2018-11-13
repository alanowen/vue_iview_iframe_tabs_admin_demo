import util from '@libs/util'

const sysMenumanage = {
    getSysMenuList() {
        return util.ajax.get('/sys/menu/list')
    }
}

export default sysMenumanage