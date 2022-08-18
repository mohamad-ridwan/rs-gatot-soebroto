import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Search.scss'
import Template from '../../components/template/Template'
import { changeCurrentPage, changeFirstIdx, changeIdxPaginate, changeLastIdx, changePath, siblingCount } from '../../services/redux/navbar'
import API from '../../services/api'
import Card from '../../components/card/Card'
import Pagination from '../../components/pagination/Pagination'
import address from '../../services/api/address'
import headerSearch from '../../images/img-search.jpg'

function Search() {
    const [data, setData] = useState([])
    const [dataSearch, setDataSearch] = useState([])
    const [inputSearch, setInputSearch] = useState('')
    const [conditionResult, setConditionResult] = useState(false)
    const [resultInputSearch, setResultInputSearch] = useState('')
    const [hoverImg, setHoverImg] = useState(null)
    const [hoverTitle, setHoverTitle] = useState(null)
    const [contentPerPage] = useState(10)
    const [loading, setLoading] = useState(true)
    const [page] = useState([
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Search',
            path: null
        }
    ])

    // redux
    const dispatch = useDispatch()
    const currentPageStore = useSelector((state) => state.navbar.currentPage)

    const navigate = useNavigate()

    const newData = []

    function updatePaginate(data, contentPerPage) {
        const totalNumber = data && Math.ceil(data.length / contentPerPage)
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount
        dispatch(changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 }))
    }

    function getTentang() {
        return new Promise((resolve, reject) => {
            API.APITentang()
                .then(res => {
                    const result = res.data

                    if (result) {
                        result.map(e => newData.push(e))
                        resolve(newData)
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getLayanan() {
        return new Promise((resolve, reject) => {
            API.APILayanan()
                .then(res => {
                    const result = res.data

                    if (result) {
                        const pageHaveArrayData = result.filter(e => e && e.data.length > 0 && e.id !== 'jadwal-dokter')
                        const pageHaveArrayDataWithDoctorDate = result.filter(e => e && e.data.length > 0)
                        const pageNoHaveArrayData = result.filter(e => e && !e.data || e.data.length === 0)
                        if (pageHaveArrayData.length > 0) {
                            pageHaveArrayData.map(e => {
                                const data = e.data
                                data.map(e => newData.push(e))
                            })
                        }
                        if (pageHaveArrayDataWithDoctorDate.length > 0) {
                            pageHaveArrayDataWithDoctorDate.map(e => {
                                newData.push(e)
                            })
                        }
                        if (pageNoHaveArrayData.length > 0) {
                            pageNoHaveArrayData.map(e => {
                                newData.push(e)
                            })
                            resolve(newData)
                        }
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getBerita() {
        return new Promise((resolve, reject) => {
            API.APIBerita()
                .then(res => {
                    const result = res.data

                    if (result) {
                        newData.push(result[0])
                    }
                    return result
                })
                .then(res => {
                    if (res && res.length > 0) {
                        res[0].data.map(e => {
                            newData.push(e)
                        })
                        resolve(newData)
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getMedia() {
        return new Promise((resolve, reject) => {
            API.APIMedia()
                .then(res => {
                    const result = res.data

                    if (result) {
                        result.map(e => newData.push(e))
                    }
                    if (result) {
                        result.map(e => {
                            e.data.map(v => newData.push(v))
                        })
                        resolve(newData)
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getZonaIntegritas() {
        return new Promise((resolve, reject) => {
            API.APIZonaIntegritas()
                .then(res => {
                    const result = res.data

                    if (result) {
                        newData.push(result[0])
                        resolve(newData)
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getLayananPengaduanMasyarakat() {
        return new Promise((resolve, reject) => {
            API.APILayananPengaduan()
                .then(res => {
                    const result = res.data

                    if (result) {
                        newData.push(result[0])
                        resolve(newData)
                    }
                })
                .catch(err => reject(err))
        })
    }

    function getPPID() {
        return new Promise((resolve, reject) => {
            API.APIPpid()
                .then(res => {
                    const result = res.data

                    if (result) {
                        newData.push(result[0])
                        return result
                    }
                })
                .then(res => {
                    if (res && res.length > 0) {
                        const childPage = res[0].data
                        childPage.map(e => newData.push(e))
                    }
                    return res
                })
                .then(res => {
                    if (res && res.length > 0) {
                        const childOfChildPage = res[0].data[0].data
                        childOfChildPage.map(e => newData.push(e))
                    }
                    resolve(newData)
                })
                .catch(err => reject(err))
        })
    }

    function getKontak() {
        return new Promise((resolve, reject) => {
            API.APIKontak()
                .then(res => {
                    const result = res.data

                    if (result) {
                        newData.push(result[0])
                    }
                    resolve(newData)
                })
                .catch(err => reject(err))
        })
    }

    async function setAPI() {
        document.body.style.overflowY = 'hidden'

        await getTentang().catch(err => console.log(err))
        await getLayanan().catch(err => console.log(err))
        await getBerita().catch(err => console.log(err))
        await getMedia().catch(err => console.log(err))
        await getZonaIntegritas().catch(err => console.log(err))
        await getLayananPengaduanMasyarakat().catch(err => console.log(err))
        await getPPID().catch(err => console.log(err))
        await getKontak()
            .then(res => {
                if (res && res.length > 0) {
                    setData(newData)
                    dispatch(changeCurrentPage({ pageNow: 1 }))
                    dispatch(changeFirstIdx({ idx: siblingCount }))
                    dispatch(changeLastIdx({ idx: siblingCount }))
                    updatePaginate(dataSearch, contentPerPage)
                    setLoading(false)
                    document.body.style.overflowY = 'scroll'
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        navigate('/search')
        dispatch(changePath([9]))
        setAPI()
    }, [])

    function changeInput(v) {
        setInputSearch(v)
    }

    function removeValueInput() {
        setInputSearch('')
    }

    function filterSearch(v) {
        const newData = data.filter(e =>
            e.header && e.header !== undefined && e.header.toLowerCase().includes(v.toLowerCase()) ||
            e.paragraphDetail && e.paragraphDetail !== undefined && e.paragraphDetail.toLowerCase().includes(v.toLowerCase()) ||
            e.paragraph && e.paragraph !== undefined && e.paragraph.toLowerCase().includes(v.toLowerCase()) ||
            e.date && e.date !== undefined && e.date.toLowerCase().includes(v.toLowerCase())
        )

        setDataSearch(newData)
        dispatch(changeCurrentPage({ pageNow: 1 }))
        dispatch(changeFirstIdx({ idx: siblingCount }))
        dispatch(changeLastIdx({ idx: siblingCount }))
        updatePaginate(newData, contentPerPage)
    }

    function submitSearch() {
        if (inputSearch.length > 0 && inputSearch.trim()) {
            setConditionResult(true)
            setResultInputSearch(inputSearch)
            navigate(`/search?q=${inputSearch}`)
            filterSearch(inputSearch)
        }
    }

    const styleCard = {
        widthWrapp: '100%',
        fontSizeTitle: '16px',
        displayBtn: 'none',
        fontWeightTitle: 'bold',
        classWrapp: 'wrapp-card-search',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        bdrRadiusContainerImg: '5px',
        fontWeightParagraphOne: 'lighter',
        colorParagraphOne: '#000',
        cursorContainerImg: 'pointer',
        cursorTitle: 'pointer',
        marginWrapp: '0 0 40px 0',
    }

    function RenderElement({ p }) {
        return <p dangerouslySetInnerHTML={{ __html: p }}></p>
    }

    function mouseOverImg(i) {
        setHoverImg(i)
    }

    function mouseLeaveImg() {
        setHoverImg(null)
    }

    function mouseOverTitle(i) {
        setHoverTitle(i)
    }

    function mouseLeaveTitle() {
        setHoverTitle(null)
    }

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPage - contentPerPage;
        const endIndex = startIndex + contentPerPage;
        return dataSearch.slice(startIndex, endIndex)
    }

    const newDataCard = getPaginatedDataCard()

    function toPage(path, id) {
        if (path !== '/pdf') {
            return navigate(path)
        }
        const url = window.location.origin
        return window.open(`${url}/media/publikasi/pdf/${id}`)
    }

    const renderCard = newDataCard && newDataCard.length > 0 ? newDataCard.map((e, i) => {
        const removeElement = e.paragraphDetail !== undefined ? e.paragraphDetail.replace(/<\/?[^>]+(>|$)/g, "") : e.paragraph !== undefined && e.paragraph !== 'null' ? e.paragraph.replace(/<\/?[^>]+(>|$)/g, "") : ''
        const date = e && e.date
        const path = e.pathSearch !== undefined ? e.pathSearch : e.path
        const id = e.id !== undefined ? e.id : null

        return (
            <Card
                {...styleCard}
                title={e.header}
                img={`${address}/${e.image}`}
                date={date}
                paragraphOne={<RenderElement p={removeElement.length > 300 ? removeElement.substr(0, 300) + '...' : removeElement} />}
                displayDateCardSearch={date !== undefined ? 'flex' : 'none'}
                colorTitle={hoverTitle === i ? '#4d784e' : '#333'}
                transformImg={hoverImg === i ? 'scale(1.1)' : 'scale(1)'}
                opacityHoverImg={hoverImg === i ? '0.4' : '0'}
                mouseEnterImg={() => mouseOverImg(i)}
                mouseLeaveImg={mouseLeaveImg}
                mouseEnterTitle={() => mouseOverTitle(i)}
                mouseLeaveTitle={mouseLeaveTitle}
                clickImg={() => toPage(path, id)}
                clickTitle={() => toPage(path, id)}
            />
        )
    }) : (
        ''
    )

    const styleOnCardTemplate = {
        displayTxtShowing: 'none',
        justifyContentConPaginate: 'center',
        data: dataSearch,
        contentPerPage: contentPerPage,
        renderCard: renderCard
    }

    const renderSearch = <>
        <div className="wrapp-search">
            <p className="title-pencarian">
                Pencarian
            </p>

            {/* form */}
            <form onSubmit={(e) => {
                e.preventDefault()
                submitSearch()
            }} className="form-search">
                <div className="column-input-search-page">
                    <input type="text" className="input-search-page" placeholder='Mencari...' value={inputSearch} onChange={(e) => changeInput(e.target.value)} autoFocus />

                    <i className="fas fa-times remove-search-page" style={{
                        display: inputSearch.length > 0 ? 'flex' : 'none'
                    }}
                        onClick={removeValueInput}
                    ></i>
                </div>

                <button className="btn-search-page"
                    onClick={submitSearch}
                >
                    <i className="fas fa-search icon-search-page"></i>
                </button>
            </form>

            {/* txt result search */}
            <div className="container-hasil-pencarian" style={{
                display: conditionResult ? 'flex' : 'none'
            }}>
                <p className="txt-hasil-pencarian">
                    {dataSearch.length > 0 ? (
                        'Hasil pencarian untuk'
                    ) : (
                        'Tidak ada hasil pencarian untuk'
                    )}
                </p>
                <p className="txt-result-search">
                    {resultInputSearch}
                </p>
            </div>

            {/* card */}
            <div className="container-card-result-search" style={{
                display: conditionResult && dataSearch.length > 0 ? 'flex' : 'none',
            }}>
                <Pagination {...styleOnCardTemplate} />
            </div>
        </div>
    </>

    return (
        <Template
            page={page}
            title={'PENCARIAN'}
            img={headerSearch}
            barTitle={'Search | RSPAD Gatot Soebroto'}
            searchPage={renderSearch}
            loading={loading ? 'flex' : 'none'}
        />
    )
}

export default Search