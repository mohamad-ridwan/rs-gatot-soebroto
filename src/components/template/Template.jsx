import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Template.scss'
import Card from '../card/Card'
import address from '../../services/api/address'

function Template({ img, page, paragraph, title, card, galeriFoto, dataRekomendasi, changeDetailBerita, displayDateCard, date, admin, videos }) {
    const [hoverPage, setHoverPage] = useState(null)
    const [hoverImgBerita, setHoverImgBerita] = useState(null)
    const [hoverTitleBerita, setHoverTitleBerita] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function RenderHTML({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    const styleCardRekomendasi = {
        widthWrapp: "calc(96%/2)",
        displayBtn: "none",
        bdrRadiusContainerImg: '5px',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        cursorContainerImg: 'pointer',
        heightImg: '200px',
        paddingDeskripsi: '20px 0 0 0',
        displayDateCard: 'flex',
        cursorTitle: 'pointer',
        fontWeightTitle: 'bold',
        fontSizeTitle: '18px',
        lineHeightDeskripsi: '1.5',
        bdrRadiusHoverImg: '0',
    }

    function RenderRekomendasiContent() {
        return (
            <>
                <p className="title-rekomendasi title-detail-berita">
                    REKOMENDASI
                </p>
                Rekomendasi untuk Anda

                <div className="wrapp-rekomendasi-berita">
                    {dataRekomendasi && dataRekomendasi.length > 0 ? dataRekomendasi.map((e, i) => {
                        return (
                            <Card
                                {...styleCardRekomendasi}
                                key={i}
                                title={e.header}
                                img={`${address}/${e.image}`}
                                date={e.date}
                                admin={e.author}
                                colorTitle={hoverTitleBerita === i ? '#4d784e' : '#333'}
                                transformImg={hoverImgBerita === i ? 'scale(1.1)' : 'scale(1)'}
                                opacityHoverImg={hoverImgBerita === i ? '0.4' : '0'}
                                mouseEnterImg={() => mouseOverRekomendasiImg(i)}
                                mouseLeaveImg={mouseLeaveRekomendasiImg}
                                mouseEnterTitle={() => mouseOverTitleBerita(i)}
                                mouseLeaveTitle={mouseLeaveTitleBerita}
                                clickImg={() => changeDetailBerita(e.path)}
                                clickTitle={() => changeDetailBerita(e.path)}
                            />
                        )
                    }) : (
                        <></>
                    )}
                </div>
            </>
        )
    }

    const styleDateCard ={ 
        display: displayDateCard
    }

    function mouseOverRekomendasiImg(i) {
        setHoverImgBerita(i)
    }

    function mouseLeaveRekomendasiImg() {
        setHoverImgBerita(null)
    }

    function mouseOverTitleBerita(i) {
        setHoverTitleBerita(i)
    }

    function mouseLeaveTitleBerita() {
        setHoverTitleBerita(null)
    }

    function mouseOverPage(i, path) {
        if (path !== null) {
            setHoverPage(i)
        }
    }

    function mouseLeavePage(i) {
        setHoverPage(i)
    }

    function clickPage(path) {
        if (path !== null) {
            navigate(path)
        }
    }

    return (
        <>
            <div className="wrapp-template">
                {/* banner page */}
                <div className="container-banner-page">
                    <img src={img} alt="" className="banner-page" />

                    <div className="shadow-banner"></div>
                </div>

                {/* blog content */}
                <div className="container-blog-content">
                    <div className="header-page">
                        {/* header green */}
                        <div className="header-green">
                            <div className="list-link-page">
                                {page && page.length > 0 ? page.map((e, i) => {
                                    return (
                                        <button className="link-page" style={{
                                            color: hoverPage === i ? '#ddd' : '#fff',
                                            cursor: hoverPage === i ? 'pointer' : 'default'
                                        }}
                                            onMouseOver={() => mouseOverPage(i, e.path)}
                                            onMouseLeave={mouseLeavePage}
                                            onClick={() => clickPage(e.path)}
                                        >
                                            {e.name} <div className="garis-miring" style={{
                                                display: i < page.length - 1 ? 'flex' : 'none'
                                            }}>/</div>
                                        </button>
                                    )
                                }) : (
                                    <></>
                                )}
                            </div>

                            <p className="title-page">
                                {title && title.toUpperCase()}
                            </p>

                            <div className="date-card" style={styleDateCard}>
                                <p><i className="fas fa-calendar-alt icon-date"></i>{date}</p>
                                <p><i className="fas fa-user icon-date"></i>{admin}</p>
                            </div>
                        </div>

                        <div className="container-content-white">
                            <p className="content-blog">
                                {videos}
                                {paragraph !== undefined ? (
                                    <RenderHTML txt={paragraph} />
                                ) : (
                                    <></>
                                )}
                                {card}
                                {galeriFoto}
                                {dataRekomendasi !== undefined && dataRekomendasi.length > 0 ? (
                                    <RenderRekomendasiContent />
                                ) : (
                                    <></>
                                )}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Template