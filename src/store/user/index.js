const state = {
    userId: '',
    username: ''
}

const mutations = {
    getUser(state, {_id, username}) {
        state.userId = _id
        state.username = username
    }
}

export default {
    state,
    mutations,
    namespaced: true
}