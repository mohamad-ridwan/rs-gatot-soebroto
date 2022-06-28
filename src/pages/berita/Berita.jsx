import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Card from '../../components/card/Card'
import Pagination from '../../components/pagination/Pagination'
import Template from '../../components/template/Template'
import API from '../../services/api'
import address from '../../services/api/address'
import { changeCurrentPage, changeFirstIdx, changeLastIdx, changePath, siblingCount } from '../../services/redux/navbar'

function Berita() {
    const [dataPage, setDataPage] = useState({})
    const [dataCard, setDataCard] = useState([])
    const [hoverImgBerita, setHoverImgBerita] = useState(null)
    const [hoverTitleBerita, setHoverTitleBerita] = useState(null)
    const [contentPerPage] = useState(6)
    const [page] = useState([
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Berita',
            path: null
        }
    ])

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const currentPageStore = useSelector((state) => state.navbar.currentPage)

    function setAPI() {
        API.APIBerita()
            .then(res => {
                const respons = res.data[0]
                const resDataCard = res.data[0].data
                setDataPage(respons)
                setDataCard(resDataCard)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        // update paginate
        dispatch(changeCurrentPage({ pageNow: 1 }))
        dispatch(changeFirstIdx({ idx: siblingCount }))
        dispatch(changeLastIdx({ idx: siblingCount }))

        dispatch(changePath('/entries'))
        setAPI()
    }, [])

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPage - contentPerPage;
        const endIndex = startIndex + contentPerPage;
        return dataCard.slice(startIndex, endIndex);
    };

    function RenderHTML({ e }) {
        return <p dangerouslySetInnerHTML={{ __html: e }}></p>;
    }

    const styleCard = {
        widthWrapp: 'calc(96%/2)',
        paddingDeskripsi: '20px 0 0 0',
        fontSizeTitle: '18px',
        displayBtn: 'none',
        fontWeightTitle: 'bold',
        lineHeightDeskripsi: '1.5',
        textAlignTitle: 'start',
        marginWrapp: '0 0 40px 0',
        marginTitle: '0 0 10px 0',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        bdrRadiusContainerImg: '5px',
        bdrRadiusHoverImg: '0',
        heightImg: '200px',
        cursorContainerImg: 'pointer',
        displayDateCard: 'flex',
        cursorTitle: 'pointer'
    }

    function toDetailBerita(path) {
        navigate(`/entry/${path}`)
    }

    const data = getPaginatedDataCard()

    const renderCard = data && data.length > 0 ? data.map((e, i) => {
        const removeElement = e.paragraph.replace(/<\/?[^>]+(>|$)/g, "")

        return (
            <Card
                {...styleCard}
                key={i}
                title={e.header}
                img={`${address}/${e.image}`}
                date={e.date}
                admin={e.author}
                clickImg={() => toDetailBerita(e.path)}
                clickTitle={() => toDetailBerita(e.path)}
                paragraphOne={<RenderHTML e={removeElement.length > 0 ? removeElement.substr(0, 200) + '...' : removeElement} />}
                colorTitle={hoverTitleBerita === i ? '#4d784e' : '#333'}
                transformImg={hoverImgBerita === i ? 'scale(1.1)' : 'scale(1)'}
                opacityHoverImg={hoverImgBerita === i ? '0.4' : '0'}
                mouseEnterImg={() => mouseOverImgBerita(i)}
                mouseLeaveImg={mouseLeaveImgBerita}
                mouseEnterTitle={() => mouseOverTitleBerita(i)}
                mouseLeaveTitle={mouseLeaveTitleBerita}
            />
        )
    }) : (
        <></>
    )

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
        contentPerPage: 6,
        renderCard: renderCard
    }

    return (
        <Template
            page={page}
            card={<Pagination {...styleOnCardTemplate} />}
            title={dataPage && dataPage.header}
            img={`${address}/${dataPage && dataPage.image}`}
        />
    )
}

export default Berita