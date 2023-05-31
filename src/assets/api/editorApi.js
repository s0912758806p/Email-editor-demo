import baseApi from "./baseApi";

class editorApi extends baseApi {
    constructor() {
        super()
    }

    /**
     * Email editor image upload
     * @param {*} params 
     * @returns 
     */
    static async imageUpload(params = {}) {
        const formData = new FormData()
        Object.keys(params).forEach((key)=> {
            if(params[key]) {
                formData.append(key, params[key])
            }
        })

        return await this.request('bm/image/upload', 'post', formData, 'form')
    }
}

export default editorApi