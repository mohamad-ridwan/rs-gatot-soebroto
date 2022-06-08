import { createSlice } from "@reduxjs/toolkit"

export const siblingCount = 5

// NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.

export const navbar = createSlice({
    name: 'navbar',
    initialState: {
        path: '',
        dataTentang: {},
        pageTentang: [],
        dataLayanan: {},
        pageLayanan: [],
        currentPage: 1,
        idxPaginate: [],
        contentPerPageCard: 6,
        firstIdx: siblingCount,
        lastIdx: siblingCount,
        nowChoose: 10,
        activeMenuChoose: false,
        idxActiveChoose: 1,
        searchDoctor: '',
        activeChooseHeader: 'nama',
        onActiveChooseOfHeader: true
    },
    reducers: {
        changePath: (state, action) => {
            state.path = action.payload
        },
        loadPageTentang: (state, action) => {
            state.dataTentang = action.payload.data
            state.pageTentang = action.payload.page
            state.path = action.payload.path
        },
        loadPageLayanan: (state, action) => {
            state.dataLayanan = action.payload.data
            state.pageLayanan = action.payload.page
            state.path = action.payload.path
        },
        changeCurrentPage: (state, action) => {
            state.currentPage = action.payload.pageNow
        },
        changeIdxPaginate: (state, action) => {
            const countIdx = action.payload.countIdx
            const length = action.payload.length

            let newArr = []
            for (let i = countIdx; i < length; i++) {
                newArr.push(i)
            }
            state.idxPaginate = newArr
        },
        changeFirstIdx: (state, action) => {
            state.firstIdx = action.payload.idx
        },
        changeLastIdx: (state, action) => {
            state.lastIdx = action.payload.idx
        },
        changeContentPerPage:(state, action)=>{
            state.contentPerPageCard = action.payload.contentPerPage
        },
        changeNowChoose: (state, action)=>{
            state.nowChoose = action.payload.choose
        },
        changeActiveMenuChoose: (state, action)=>{
            state.activeMenuChoose = action.payload.activeStats
        },
        changeIdxActiveChoose: (state, action)=>{
            state.idxActiveChoose = action.payload.idx
        },
        changeSearchDoctor: (state, action)=>{
            state.searchDoctor = action.payload.input
        },
        changeActiveChooseHeader: (state, action)=>{
            state.activeChooseHeader = action.payload.nama
        },
        changeOnActiveChooseOfHeader : (state, action)=>{
            state.onActiveChooseOfHeader = action.payload.condition
        }
    }
})

export const { changePath, loadPageTentang, loadPageLayanan, changeCurrentPage, changeIdxPaginate, changeFirstIdx, changeLastIdx, changeContentPerPage, changeNowChoose, changeActiveMenuChoose, changeIdxActiveChoose, changeSearchDoctor, changeActiveChooseHeader, changeOnActiveChooseOfHeader } = navbar.actions

export default navbar.reducer