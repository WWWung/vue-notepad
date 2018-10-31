import axios from "axios"
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

const invoke = (URL, method, data) => {
    return new Promise((resolve, reject) => {
        var d = {};
        if (data instanceof Object) {
            d = Object.assign({ m: encodeURIComponent(method) }, data)
        } else {
            d = {
                m: encodeURIComponent(method),
                data: data
            }
        }
        axios.post(URL, d).then(rsl => {
            if (rsl.status === 200) {
                resolve(rsl.data)
            }
        }).catch(err => {
            reject(err)
        })
    })
}

export default invoke