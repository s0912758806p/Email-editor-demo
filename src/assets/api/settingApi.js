import baseApi from "./baseApi";

class settingApi extends baseApi {
    constructor() {
        super()
    }

    /**
     * login
     * @param {*} params 
     * @returns 
     */
    static async login(params = {}) {
        return await this.request('bm/Login', 'post', params)
    }
}

export default settingApi