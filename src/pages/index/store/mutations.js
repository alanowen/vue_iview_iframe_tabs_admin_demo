export default {
    menuList(state, data) {
        state.menuList = data
    },

    privList(state, data) {
        state.privList = data
    },

    token(state, data) {
        state.token = data
        window.sessionStorage.setItem('token', data)
    },

    currentUser(state, { userName, useType, userId }) {
        state.currentUser = { userName, useType, userId }
    }
}