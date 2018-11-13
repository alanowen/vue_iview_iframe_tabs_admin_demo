const mock = require('mockjs')

let menuList = [
    {
        'menuLabel': '系统管理',
        'menuIcon': '',
        'menuId': 1,
        'menuName': 'sysManage',
        'parentMenuId': 0
    },
    {
        'menuLabel': '菜单管理',
        'menuIcon': '',
        'menuId': 2,
        'menuName': 'sysMenuManage',
        'menuUrl': 'sysMenuManage.html',
        'parentMenuId': 1
    },  {
        'menuLabel': '权限管理',
        'menuIcon': '',
        'menuId': 3,
        'menuName': 'sysPrivManage',
        'menuUrl': 'sysPrivManage.html',
        'parentMenuId': 1
    },  {
        'menuLabel': '用户管理',
        'menuIcon': '',
        'menuId': 4,
        'menuName': 'sysUserManage',
        'menuUrl': 'sysUserManage.html',
        'parentMenuId': 1
    }
]

function listToTree(list) {
    let parents = list.filter(i => i.parentMenuId == 0)
    let result = []
    for (let i of parents.values()) {
        let node = Object.assign({}, i, {children: []})
        result.push(node)
        list.filter(j => j.parentMenuId == i.menuId).forEach(j => node.children.push(Object.assign({}, j)))
    }
    return result
}

let menuTree = listToTree(menuList)

let loginUser = {
    token: 'token1234',
    user: {
        userName: '系统管理员',
        userType: 1,
        userId: 1
    }   
}

module.exports = {
    menuList,
    loginUser,
    menuTree
}