import { createSlice } from "@reduxjs/toolkit"

export const siblingCount = 5

// NOTE!! : state name of > contentPerPageCard jika nilainya dirubah harus tetap berupa integer, karna nilainya berupa jumlah data dokter yang di tampilkan dalam satu halaman.

export const navbar = createSlice({
    name: 'navbar',
    initialState: {
        path: '',
        currentPage: 1,
        idxPaginate: [],
        contentPerPageCard: 6,
        firstIdx: siblingCount,
        lastIdx: siblingCount,
        idxShowingDokter: {
            nowShow: 1,
            toShow: 10,
            ofShow: null,
            totalData: null
        }
    },
    reducers: {
        changePath: (state, action) => {
            state.path = action.payload
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
        changeIdxShowingDokter : (state, action)=>{
            state.idxShowingDokter.nowShow = action.payload.nowShow
            state.idxShowingDokter.toShow = action.payload.toShow
            state.idxShowingDokter.ofShow = action.payload.ofShow
            state.idxShowingDokter.totalData = action.payload.totalData
        }
    }
})

export const { changePath, changeCurrentPage, changeIdxPaginate, changeFirstIdx, changeLastIdx, changeContentPerPage, changeIdxShowingDokter } = navbar.actions

export default navbar.reducer