import axios from "axios";

export default {
    getTags({ state, commit }, payload) {
        return axios
            .get("/api/tags", state.req)
            .then((res) => {
                if (res.status == 200) {
                    commit('GET_TAGS', res.data)
                }
            })
            .catch(function (err) { })
    },
    getDatas({ state, commit }, payload) {
        commit('SET_LOADING', true)
        return axios
            .post("/api/plugins", state.req)
            .then((res) => {
                if (res.status == 200) {
                    res.data.datas.forEach((i) => {
                        if (i.tag == "UI框架") {
                            console.log('002');
                            // i.tag = {
                            //     name: i,
                            //     class: "a_class",
                            // };
                            i.tag = "test !!"
                            i.test = "000"
                        }
                        if (i.tag == "动画库") {
                            i.tag = {
                                name: i,
                                class: "b_class",
                            };
                        }
                        if (i.tag == "JavaScript") {
                            i.tag = {
                                name: i,
                                class: "c_class",
                            };
                        }
                        if (i.tag == "轮播") {
                            i.tag = {
                                name: i,
                                class: "d_class",
                            };
                        }
                        if (i.tag == "Chrome") {
                            i.tag = {
                                name: i,
                                class: "e_class",
                            };
                        }
                    });
                    console.log('res.data.datas. ---',res.data.datas);
                    commit('GET_DATAS', res.data)
                }
            })
            .catch(function (err) { })
    },
}