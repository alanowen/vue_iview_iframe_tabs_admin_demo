import axios from 'axios'
import env from '../config/env'

let util = {

}


const ajaxUrl = env === 'development' ? 'http://127.0.0.1:5000' : 'http://127.0.0.1:5000'


let ajax = axios.create({
    baseURL: ajaxUrl,
    paramsSerializer: function (params) {
        return JSON.parse(JSON.stringify(params))
    },

})

util.ajax = ajax
util.ajaxUrl = ajaxUrl

util.findIframeByName = name => {
    return Array.from(window.frames).find(item => item.name == name)
}

export default util