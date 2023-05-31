import axios from "axios";

class baseApi {
    constructor({ contentType }) {
        this.instance = axios.create({
            baseURL: import.meta.env.VITE_BASE_URL,
            timeout: 5000,
            headers: {
                'Content-Type': contentType,
            }
        })

        this.instance.interceptors.request.use((request)=> {
            return request
        }, (error)=> {
            return error
        })

        this.instance.interceptors.response.use((response)=> {
            return response
        }, (error)=> {
            return error
        })
    }
    
    static request(url, method, data, type = 'json') {
        return new Promise((resolve, reject)=> {
            const contentTypeMap = {
                'json': 'application/json',
                'form': 'multipart/form-data'
            }
            
            const contentType = contentTypeMap[type]

            const api = new baseApi({ contentType })

            api.instance[method](url, data).then((response)=> {
                resolve(response.data)
            }).catch((error)=> {
                reject(error)
            })
        })
    }
}

export default baseApi