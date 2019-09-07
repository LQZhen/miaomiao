const state = {
    cityInfo: {
        nm: localStorage.getItem('cityName')||'北京',
        id: localStorage.getItem('cityId')||1
    }
}

const mutations = {
    changeCity(state, {nm, id}) {
        localStorage.setItem('cityName',nm)
        localStorage.setItem('cityId',id)
        state.cityInfo.nm = nm
        state.cityInfo.id = id
    }
}

export default {
    state,
    mutations,
    namespaced:true
}