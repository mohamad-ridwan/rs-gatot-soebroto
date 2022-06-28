import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from "../../components/card/Card"
import Pagination from "../../components/pagination/Pagination"
import Template from "../../components/template/Template"
import API from "../../services/api"
import address from "../../services/api/address"
import { changeCurrentPage, changeFirstIdx, changeIdxPaginate, changeLastIdx, loadPageMedia, siblingCount } from "../../services/redux/navbar"

function Media() {
    const [hoverImgBerita, setHoverImgBerita] = useState(null)
    const [hoverTitleBerita, setHoverTitleBerita] = useState(null)
    const [contentPerPage] = useState(6)

    const dispatch = useDispatch()
    const page = useSelector((state) => state.navbar.dataOfMedia.pageMedia)
    const data = useSelector((state) => state.navbar.dataOfMedia.dataMedia)
    const currentPageStore = useSelector((state) => state.navbar.currentPage)

    const navigate = useNavigate()
    const params = useParams()

    const dataCard = data !== undefined && Object.keys(data).length > 0 ? data && data.data : []

    function updatePaginate(data, contentPerPage) {
        const totalNumber = data && Math.ceil(data[0].data.length / contentPerPage)
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount
        dispatch(changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 }))
    }

    function setAPI(path) {
        API.APIMedia()
            .then(res => {
                const result = res.data

                const dataPage = result.filter((e) => e.path === `/media/${path}`)

                let newPage = []
                if (dataPage.length > 0) {
                    newPage.push(
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Media',
                            path: null
                        },
                        {
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }

                dispatch(changeCurrentPage({ pageNow: 1 }))
                dispatch(changeFirstIdx({ idx: siblingCount }))
                dispatch(changeLastIdx({ idx: siblingCount }))
                dispatch(loadPageMedia({ page: newPage, data: dataPage[0], path: path }))
                updatePaginate(dataPage, 6)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI(params.id)
    }, [])

    const styleCard = {
        widthWrapp: 'calc(96%/3)',
        paddingDeskripsi: '20px 0 0 0',
        fontSizeTitle: '18px',
        displayBtn: 'none',
        fontWeightTitle: 'bold',
        lineHeightDeskripsi: '1.5',
        textAlignTitle: 'start',
        marginWrapp: '0 0 40px 0',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        bdrRadiusContainerImg: '5px',
        bdrRadiusHoverImg: '0',
        heightImg: params.id === 'publications' ? '300px' : '150px',
        cursorContainerImg: 'pointer',
        displayDateCard: 'flex',
        cursorTitle: 'pointer'
    }

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPage - contentPerPage;
        const endIndex = startIndex + contentPerPage;
        return dataCard.slice(startIndex, endIndex)
    }

    function toDetailBerita(path, id) {
        if (params.id !== 'publications') {
            const id = window.location.pathname.split('/')[2]
            navigate(`/media/${id}/${path}`)
        } else if (params.id === 'publications') {
            const url = window.location.origin
            window.open(`${url}/media/publikasi/pdf/${id}`)
        }
    }

    const newDataCard = getPaginatedDataCard()

    const renderCard = newDataCard.length > 0 && newDataCard.map((e, i) => {
        return (
            <Card
                {...styleCard}
                key={i}
                title={e.header}
                img={`${address}/${e.image}`}
                date={e.date}
                admin={e.author}
                clickImg={() => toDetailBerita(e.path, e.id)}
                clickTitle={() => toDetailBerita(e.path, e.id)}
                colorTitle={hoverTitleBerita === i ? '#4d784e' : '#333'}
                transformImg={hoverImgBerita === i ? 'scale(1.1)' : 'scale(1)'}
                opacityHoverImg={hoverImgBerita === i ? '0.4' : '0'}
                mouseEnterImg={() => mouseOverImgBerita(i)}
                mouseLeaveImg={mouseLeaveImgBerita}
                mouseEnterTitle={() => mouseOverTitleBerita(i)}
                mouseLeaveTitle={mouseLeaveTitleBerita}
            />
        )
    })

    function mouseOverImgBerita(i) {
        setHoverImgBerita(i)
    }

    function mouseLeaveImgBerita() {
        setHoverImgBerita(null)
    }

    function mouseOverTitleBerita(i) {
        setHoverTitleBerita(i)
    }

    function mouseLeaveTitleBerita() {
        setHoverTitleBerita(null)
    }

    const styleOnCardTemplate = {
        displayTxtShowing: 'none',
        justifyContentConPaginate: 'center',
        data: dataCard,
        contentPerPage: contentPerPage,
        renderCard: renderCard
    }

    return (
        <Template
            page={page}
            img={`${address}/${data && data.image}`}
            title={data && data.header}
            card={<Pagination {...styleOnCardTemplate} />}
        />
    )
}

export default Media