import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Card from '../../components/card/Card'
import Pagination from '../../components/pagination/Pagination'
import Template from '../../components/template/Template'
import API from '../../services/api'
import address from '../../services/api/address'
import { changeCurrentPage, changeFirstIdx, changeIdxPaginate, changeLastIdx, changePath, siblingCount } from '../../services/redux/navbar'

function Berita() {
    const [dataPage, setDataPage] = useState({})
    const [dataCard, setDataCard] = useState([])
    const [hoverImgBerita, setHoverImgBerita] = useState(null)
    const [hoverTitleBerita, setHoverTitleBerita] = useState(null)
    const [contentPerPage] = useState(6)
    const [loading, setLoading] = useState(true)
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
    const params = useParams()

    // masing2 page memiliki struktur data yang berbeda, jadi perlu di periksa kembali untuk copy paste function ini
    function updatePaginate(data, contentPerPage) {
        const totalNumber = data && Math.ceil(data.length / contentPerPage)
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount
        dispatch(changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 }))
    }

    function setAPI() {
        setLoading(true)
        document.body.style.overflowY = 'hidden'

        API.APIBerita()
            .then(res => {
                const respons = res.data[0]
                const resDataCard = res.data[0].data
                setDataPage(respons)
                setDataCard(resDataCard)

                // update paginate
                dispatch(changeCurrentPage({ pageNow: 1 }))
                dispatch(changeFirstIdx({ idx: siblingCount }))
                dispatch(changeLastIdx({ idx: siblingCount }))

                updatePaginate(resDataCard, 6)
                setLoading(false)
                document.body.style.overflowY = 'scroll'
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(changePath([3]))
        setAPI()
    }, [params])

    const getPaginatedDataCard = () => {
        const startIndex = currentPageStore * contentPerPage - contentPerPage;
        const endIndex = startIndex + contentPerPage;
        return dataCard.slice(startIndex, endIndex);
    };

    function RenderHTML({ e }) {
        return <p dangerouslySetInnerHTML={{ __html: e }}></p>;
    }

    const styleCard = {
        widthWrapp: '100%',
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

    const renderCard = data && data.length > 0 ? (
        <div className="container-card-berita-page">
            {data.map((e, i) => {
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
            })}
        </div>
    ) : (
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
            barTitle={`${dataPage && dataPage.header} | RSPAD Gatot Soebroto`}
            img={`${address}/${dataPage && dataPage.image}`}
            loading={loading ? 'flex' : 'none'}
        />
    )
}

export default Berita