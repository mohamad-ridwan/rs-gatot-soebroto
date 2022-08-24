import React, { useEffect } from 'react'
import {useSwipeable} from 'react-swipeable'
import './Carousel.scss'
import address from '../../services/api/address'
import Card from '../card/Card';

function Carousel({ data, displayInner, displayIndikator, dataTestimoni, bdrRadiusWrapp, marginTopWrapp, idxActiveCarousel, pauseSlide, mouseOverCarousel, mouseLeaveCarousel, btnLeftCarousel, btnRightCarousel, btnIndikatorCarouselImg, displayBtnTestimoni, btnLeftTestimoni, btnRightTestimoni, btnLeftTestimoniMobile, btnRightTestimoniMobile, classTestimoni, displayBtnTestimoniMobile, dataTestimoniMobile }) {

    useEffect(() => {
        const interval = setInterval(() => {
            if (pauseSlide) {
                btnRightCarousel(idxActiveCarousel + 1)
            }
        }, 3000);

        return () => {
            if (interval) {
                clearInterval(interval)
            }
        }
    })

    const handlers = useSwipeable({
        onSwipedLeft: ()=>btnRightCarousel(idxActiveCarousel + 1),
        onSwipedRight: ()=>btnLeftCarousel(idxActiveCarousel - 1)
    })

    const styleCard = {
        classWrapp: classTestimoni,
        whiteSpaceDeskripsi: 'normal',
        textAlignDeskripsi: 'start',
        paddingCircleIcon: '20px 0 0 20px',
        maxHeightTitle: '200px',
        minHeightTitle: '200px',
        overflowXTitle: 'auto',
        fontSizeTitle: '14px',
        bgColorDeskripsi: '#fff',
        bgColorWrapp: 'transparent',
        marginDeskripsi: '0 30px 0 0',
        bdrRadiusDeskripsi: '5px',
        paddingParagraphOne: '10px 0 0 20px',
        paddingParagraphTwo: '0 0 20px 20px',
        fontSizeParagraphOne: '18px',
        displayBtn: 'none',
        colorParagraphOne: '#4d784e',
        fontWeightParagraphOne: 'bold',
        fontSizeParagraphTwo: '12px',
        colorParagraphTwo: '#777',
        displayCircleIcon: 'flex',
        colorTitle: '#333',
        bdrTopParagraphOne: '1px solid #ddd',
        iconCirle: 'fas fa-quote-left',
        colorCircleIcon: '#4d784e',
        justifyContentCircleIcon: 'flex-start',
        fontSizeIcon: '30px',
    }

    return (
        <>
            <div className="wrapp-carousel" style={{
                borderRadius: bdrRadiusWrapp,
                marginTop: marginTopWrapp
            }}>
                <div {...handlers} className="container-carousel"
                    onMouseEnter={mouseOverCarousel}
                    onMouseLeave={mouseLeaveCarousel}
                >
                    {/* Desktop */}
                    <div className="container-btn-testimoni" style={{
                        display: displayBtnTestimoni
                    }}>
                        <button onClick={btnLeftTestimoni} className="btn-testimoni-desktop">
                            <i className="fas fa-angle-left"></i>
                        </button>
                        <button onClick={btnRightTestimoni} className="btn-testimoni-desktop">
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>

                    {/* Mobile */}
                    <div className="container-btn-testimoni-mobile"
                        style={{
                            display: displayBtnTestimoniMobile
                        }}
                    >
                        <button onClick={btnLeftTestimoniMobile}
                            className="btn-testimoni-mobile">
                            <i className="fas fa-angle-left"></i>
                        </button>
                        <button onClick={btnRightTestimoniMobile}
                            className="btn-testimoni-mobile">
                            <i className="fas fa-angle-right"></i>
                        </button>
                    </div>

                    {/* desktop */}
                    <div className="inner-carousel" style={{
                        display: displayInner,
                        transform: `translateX(-${idxActiveCarousel * 100}%)`,
                    }}>
                        {data && data.length > 0 ? data.map((e, i) => {
                            return (
                                <img key={i} src={`${address}/${e.image}`} alt="" className="item" />
                            )
                        }) : (
                            <></>
                        )}

                        {dataTestimoni && dataTestimoni.length > 0 ? dataTestimoni.map((e, i) => {
                            return (
                                <Card
                                    key={i}
                                    {...styleCard}
                                    title={e.message}
                                    paragraphOne={e.name}
                                    paragraphTwo={e.country}
                                />
                            )
                        }) : (
                            <></>
                        )}

                        {dataTestimoniMobile && dataTestimoniMobile.length > 0 ? dataTestimoniMobile.map((e, i) => {
                            return (
                                <Card
                                    key={i}
                                    {...styleCard}
                                    title={e.message}
                                    paragraphOne={e.name}
                                    paragraphTwo={e.country}
                                />
                            )
                        }) : (
                            <></>
                        )}
                    </div>
                </div>

                {/* btn carousel top home */}
                <div className="btn-carousel" style={{
                    display: displayIndikator
                }}>
                    <i className="fas fa-angle-left" onClick={() => {
                        btnLeftCarousel(idxActiveCarousel - 1)
                    }}></i>
                    {data && data.length > 0 ? data.map((e, i) => {
                        return (
                            <button key={i} className="indikator" style={{
                                background: idxActiveCarousel === i ? '#4d784e' : 'none'
                            }} onClick={() => btnIndikatorCarouselImg(i)}>
                            </button>
                        )
                    }) : (
                        <></>
                    )}
                    <i className="fas fa-angle-right" style={{
                        marginLeft: '15px'
                    }}
                        onClick={() => {
                            btnRightCarousel(idxActiveCarousel + 1)
                        }}
                    ></i>
                </div>
            </div>
        </>
    )
}

export default Carousel