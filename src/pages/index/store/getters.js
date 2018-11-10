export default {
    hasTab(state) {
        return name => {
            let index = state.tabs.findIndex(i => i.name == name)
            if (index > -1) {
                return true
            }
            return false
        }
    }
}