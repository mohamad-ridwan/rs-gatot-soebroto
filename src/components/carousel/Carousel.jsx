import React, { useEffect } from 'react'
import './Carousel.scss'
import address from '../../services/api/address'
import Card from '../card/Card';

function Carousel({ data, displayInner, displayIndikator, dataTestimoni, bdrRadiusWrapp, marginTopWrapp, idxActiveCarousel, pauseSlide, mouseOverCarousel, mouseLeaveCarousel, btnLeftCarousel, btnRightCarousel, btnIndikatorCarouselImg, displayBtnTestimoni, btnLeftTestimoni, btnRightTestimoni }) {

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

    return (
        <>
            <div className="wrapp-carousel" style={{
                borderRadius: bdrRadiusWrapp,
                marginTop: marginTopWrapp
            }}
                onMouseEnter={mouseOverCarousel}
                onMouseLeave={mouseLeaveCarousel}
            >
                <div className="container-btn-testimoni" style={{
                    display: displayBtnTestimoni
                }}>
                    <button onClick={btnLeftTestimoni}>
                        <i className="fas fa-angle-left"></i>
                    </button>
                    <button onClick={btnRightTestimoni}>
                        <i className="fas fa-angle-right"></i>
                    </button>
                </div>

                <div className="inner-carousel" style={{
                    display: displayInner,
                    transform: `translateX(-${idxActiveCarousel * 100}%)`,
                }}>
                    {data && data.length > 0 ? data.map((e, i) => {
                        return (
                            <img key={i} src={`${address}/${e.image}`} alt="" className="item"/>
                        )
                    }) : (
                        <></>
                    )}

                    {dataTestimoni && dataTestimoni.length > 0 ? dataTestimoni.map((e, i) => {
                        return (
                            <Card
                                key={i}
                                title={e.message}
                                paragraphOne={e.name}
                                paragraphTwo={e.country}
                                widthWrapp={'50%'}
                                displayWrapp={'inline-block'}
                                whiteSpaceDeskripsi={'normal'}
                                textAlignDeskripsi={'start'}
                                paddingCircleIcon={'20px 0 0 20px'}
                                minHeightTitle={'200px'}
                                fontSizeTitle={'14px'}
                                bgColorDeskripsi={'#fff'}
                                bgColorWrapp={'transparent'}
                                marginDeskripsi={'0 30px 0 0'}
                                bdrRadiusDeskripsi={'5px'}
                                paddingParagraphOne={'10px 0 0 20px'}
                                paddingParagraphTwo={'0 0 20px 20px'}
                                fontSizeParagraphOne={'18px'}
                                displayBtn={'none'}
                                colorParagraphOne={'#4d784e'}
                                fontWeightParagraphOne={'bold'}
                                fontSizeParagraphTwo={'12px'}
                                colorParagraphTwo={'#777'}
                                displayCircleIcon={'flex'}
                                colorTitle={'#333'}
                                bdrTopParagraphOne={'1px solid #ddd'}
                                iconCirle={'fas fa-quote-left'}
                                colorCircleIcon={'#4d784e'}
                                marginTitle={'20px 80px 0 80px'}
                                justifyContentCircleIcon={'flex-start'}
                                fontSizeIcon={'30px'}
                            />
                        )
                    }) : (
                        <></>
                    )}
                </div>

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