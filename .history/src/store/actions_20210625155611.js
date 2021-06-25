import axios from "axios";

export default {
    getTags({ state, commit }, payload) {
        return axios({ method: 'post', baseURL: 'http://127.0.0.1/' }).then((res) => {
            console.log('res --',res);
            
            if (res.status == 200) {
                commit('GET_TAGS', res.data)
            }
            console.log('getTags ----', res.data);
        })
            .catch(function (err) { console.log('err',err);
             })
        // return axios
        //     .post("/api/tags", state.req )
        //     .then((res) => {
        //         if(res.status==200){
        //             commit('GET_TAGS', res.data) 
        //         }
        //         console.log('getTags ----',res.data);
        //     })
        //     .catch(function (err) { })
    },
    getDatas({ state, commit }, payload) {
        commit('SET_LOADING', true)
        return axios
            .post("/api/plugins", state.req)
            .then((res) => {
                if (res.status == 200) {
                    commit('GET_DATAS', res.data)
                }
                console.log('getArticles ----', state.req);
            })
            .catch(function (err) { })
    },
}