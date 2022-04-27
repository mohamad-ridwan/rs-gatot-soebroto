import React, { useState, useEffect } from 'react'
import './Home.scss'
import API from '../../services/api'
import Carousel from '../../components/carousel/Carousel'
import address from '../../services/api/address'
import Button from '../../components/button/Button'
import Card from '../../components/card/Card'

function Home() {
    const [bannerVideo, setBannerVideo] = useState({})
    const [carousel, setCarousel] = useState([])
    const [selayangPandang, setSelayangPandang] = useState({})
    const [jajaranPimpinan, setJajaranPimpinan] = useState({})
    const [layananUnggulan, setLayananUnggulan] = useState({})
    const [berita, setBerita] = useState({})
    const [blogBerita, setBlogBerita] = useState([])
    const [testimoni, setTestimoni] = useState({})
    const [media, setMedia] = useState([])
    const [textMarquee, setTextMarquee] = useState({})
    const [idxActiveCarousel, setIdxActiveCarousel] = useState(0)
    const [idxActiveTestimoni, setIdxActiveTestimoni] = useState(0)
    const [pauseSlide, setPauseSlide] = useState(true)
    const [hoverImgLead, setHoverImgLead] = useState(false)
    const [hoverImgOther, setHoverImgOther] = useState(null)
    const [hoverLayanan, setHoverLayanan] = useState(null)
    const [hoverImgBerita, setHoverImgBerita] = useState(null)
    const [hoverTitleBerita, setHoverTitleBerita] = useState(null)
    const [hoverTitleMedia, setHoverTitleMedia] = useState(null)
    const [hoverImgMedia, setHoverImgMedia] = useState(null)

    function setAPI() {
        API.APIHome()
            .then(res => {
                const result = res.data
                const banner = result.filter(e => e.id === 'banner-video')[0]
                const carousel = result.filter(e => e.id === 'carousel')
                const pimpinan = result.filter(e => e.id === 'jajaran-pimpinan')[0]
                const testimoni = result.filter(e => e.id === 'testimoni')[0]
                const media = result.filter(e => e.id === 'media-home')

                setBannerVideo(banner)
                setCarousel(carousel)
                setJajaranPimpinan(pimpinan)
                setTestimoni(testimoni)
                setMedia(media)
            })
            .catch(err => console.log(err))
        API.APINavbar()
            .then(res => {
                const results = res.data
                const textMarquee = results.filter(e => e.id === 'text-marquee')[0]

                setTextMarquee(textMarquee)
            })
            .catch(err => console.log(err))

        API.APITentang()
            .then(res => {
                const result = res.data
                const selayangPandang = result.filter(e => e.id === 'selayang-pandang')

                setSelayangPandang(selayangPandang[0])
            })
            .catch(err => console.log(err))

        API.APILayanan()
            .then(res => {
                const result = res.data
                const layananUnggulan = result.filter(e => e.id === 'layanan-unggulan')[0]

                setLayananUnggulan(layananUnggulan)
            })
            .catch(err => console.log(err))

        API.APIBerita()
            .then(res => {
                const result = res.data
                setBerita(result[0])

                if (result) {
                    let newArr = []
                    for (let i = 0; i < 6; i++) {
                        newArr.push(result[0].data[i])
                        setBlogBerita(newArr)
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    function RenderHTML({ e }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: e }}></p>
        )
    }

    function btnLeftCarousel(i) {
        if (i > 0) {
            setIdxActiveCarousel(i)
        } else if (i === 0) {
            setIdxActiveCarousel(i)
        } else {
            setIdxActiveCarousel(carousel.length - 1)
        }
    }

    function btnRightCarousel(i) {
        if (i === carousel.length) {
            setIdxActiveCarousel(0)
        } else {
            setIdxActiveCarousel(i)
        }
    }

    function btnIndikatorCarouselImg(i) {
        setIdxActiveCarousel(i)
    }

    function mouseOverCarousel() {
        setPauseSlide(false)
    }

    function mouseLeaveCarousel() {
        setPauseSlide(true)
    }

    function btnLeftTestimoni(i) {
        if (i < 0) {
            setIdxActiveTestimoni((testimoni.komentar.length / 2) - 1)
        } else {
            setIdxActiveTestimoni(i)
        }
    }

    function btnRightTestimoni(i) {
        if (i < testimoni.komentar.length / 2) {
            setIdxActiveTestimoni(i)
        } else {
            setIdxActiveTestimoni(0)
        }
    }

    function mouseOverImgLead() {
        setHoverImgLead(true)
    }

    function mouseLeaveImgLead() {
        setHoverImgLead(false)
    }

    function mouseOverImgOther(i) {
        setHoverImgOther(i)
    }

    function mouseLeaveImgOther() {
        setHoverImgOther(null)
    }

    function mouseOverLayanan(i) {
        setHoverLayanan(i)
    }

    function mouseLeaveLayanan() {
        setHoverLayanan(null)
    }

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

    function mouseEnterTitleMedia(i) {
        setHoverTitleMedia(i)
    }

    function mouseLeaveTitleMedia() {
        setHoverTitleMedia(null)
    }

    function mouseEnterImgMedia(i) {
        setHoverImgMedia(i)
    }

    function mouseLeaveImgMedia() {
        setHoverImgMedia(null)
    }

    return (
        <>
            <div className="wrapp-home">
                {/* banner video */}
                <div className="banner-video">
                    {bannerVideo && Object.keys(bannerVideo).length > 0 ? (
                        <iframe src={`${bannerVideo.link}
                        ?iv_load_policy=3&modestbranding=0&autoplay=1&controls=0&showinfo=0&wmode=transparent&branding=0&autohide=0&fs=0&disablekb=1&loop=1&rel=0`} className='video'></iframe>
                    ) : (
                        <></>
                    )}

                    {textMarquee && Object.keys(textMarquee).length > 0 ? (
                        <div className="txt-move">
                            <marquee behavior="" direction=""><RenderHTML e={textMarquee.text} /></marquee>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="wrapp-content-home">
                    <div className="content-home">
                        <Carousel
                            displayInner={'flex'}
                            data={carousel}
                            idxActiveCarousel={idxActiveCarousel}
                            pauseSlide={pauseSlide}
                            btnLeftCarousel={(i) => btnLeftCarousel(i)}
                            btnRightCarousel={(i) => btnRightCarousel(i)}
                            btnIndikatorCarouselImg={(i) => btnIndikatorCarouselImg(i)}
                            mouseOverCarousel={mouseOverCarousel}
                            mouseLeaveCarousel={mouseLeaveCarousel}
                        />

                        <div className="container-blog-home">
                            {/* selayang pandang */}
                            {selayangPandang && Object.keys(selayangPandang).length > 0 ? (
                                <div className="selayang-pandang-home">
                                    <img src={`${address}/${selayangPandang.image}`} alt="" className="img-selayang-pandang" />

                                    <div className="paragraph-selayang-pandang">
                                        <p className="title-selayang-pandang">
                                            {selayangPandang.header.toUpperCase()}
                                        </p>

                                        <p className="deskripsi-selayang-pandang">
                                            <RenderHTML e={selayangPandang.paragraphUtama} />
                                        </p>

                                        <Button
                                            name={'SELENGKAPNYA'}
                                            colorDefault={'transparent'}
                                            colorChange={'#000'}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* jajaran pimpinan */}
                            {jajaranPimpinan && Object.keys(jajaranPimpinan).length > 0 ? (
                                <div className="jajaran-pimpinan col-group">
                                    <p className="title title-group">
                                        {jajaranPimpinan.title}
                                    </p>
                                    <p className="deskripsi deskripsi-group">
                                        {jajaranPimpinan.paragraph}
                                    </p>

                                    <div className="struktur-pimpinan">
                                        {jajaranPimpinan.dataPimpinan && Object.keys(jajaranPimpinan.dataPimpinan[0]).length > 0 ? (
                                            <Card
                                                img={`${address}/${jajaranPimpinan.dataPimpinan[0].image}`}
                                                title={jajaranPimpinan.dataPimpinan[0].jabatan}
                                                paragraphOne={jajaranPimpinan.dataPimpinan[0].pangkat}
                                                paragraphTwo={jajaranPimpinan.dataPimpinan[0].gelar}
                                                widthWrapp={'calc(95%/3)'}
                                                paddingDeskripsi={'20px'}
                                                fontSizeTitle={'14px'}
                                                fontWeightTitle={'500'}
                                                fontSizeParagraphOne={'14px'}
                                                fontSizeParagraphTwo={'14px'}
                                                colorParagraphOne={'#333'}
                                                colorParagraphTwo={'#333'}
                                                bdrRadiusWrapp={'10px'}
                                                displayBtn={'none'}
                                                opacityHoverImg={hoverImgLead ? '0.4' : '0'}
                                                transformImg={hoverImgLead ? 'scale(1.1)' : 'scale(1)'}
                                                mouseEnterImg={mouseOverImgLead}
                                                mouseLeaveImg={mouseLeaveImgLead}
                                            />
                                        ) : (
                                            <></>
                                        )}

                                        <div className="tiga-pimpinan-lainnya col-card">
                                            {jajaranPimpinan.dataPimpinan.length > 0 ? jajaranPimpinan.dataPimpinan.map((e, i) => {
                                                return (
                                                    <Card
                                                        key={i}
                                                        displayWrapp={i !== 0 ? 'flex' : 'none'}
                                                        img={`${address}/${e.image}`}
                                                        title={e.jabatan}
                                                        paragraphOne={e.pangkat}
                                                        paragraphTwo={e.gelar}
                                                        widthWrapp={'calc(95%/3)'}
                                                        paddingDeskripsi={'20px'}
                                                        fontSizeTitle={'14px'}
                                                        fontWeightTitle={'500'}
                                                        displayBtn={'none'}
                                                        fontSizeParagraphOne={'14px'}
                                                        fontSizeParagraphTwo={'14px'}
                                                        colorParagraphOne={'#333'}
                                                        colorParagraphTwo={'#333'}
                                                        bdrRadiusWrapp={'10px'}
                                                        transformImg={hoverImgOther === i ? 'scale(1.1)' : 'scale(1)'}
                                                        opacityHoverImg={hoverImgOther === i ? '0.4' : '0'}
                                                        mouseEnterImg={() => mouseOverImgOther(i)}
                                                        mouseLeaveImg={mouseLeaveImgOther}
                                                    />
                                                )
                                            }) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* layanan unggulan */}
                            {layananUnggulan && Object.keys(layananUnggulan).length > 0 ? (
                                <div className="layanan-unggulan col-group">
                                    <p className="title title-group">
                                        {layananUnggulan.header.toUpperCase()}
                                    </p>

                                    <p className="deskripsi deskripsi-group">
                                        {layananUnggulan.paragraph}
                                    </p>

                                    <div className="blog-layanan-unggulan col-card">
                                        {layananUnggulan.data.length > 0 ? layananUnggulan.data.map((e, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    displayCircleIcon={'flex'}
                                                    iconCirle="fas fa-user"
                                                    title={e.header}
                                                    paragraphOne={<RenderHTML e={`${e.paragraph.substr(1, 100)} ...`} />}
                                                    widthWrapp={'calc(95%/3)'}
                                                    fontSizeTitle={'18px'}
                                                    fontSizeParagraphOne={'14px'}
                                                    fontWeightTitle={'bold'}
                                                    displayBtn={'none'}
                                                    colorTitle={hoverLayanan === i ? '#fff' : '#4d784e'}
                                                    textAlignTitle={'start'}
                                                    textAlignParagraphOne={'start'}
                                                    heightCircleIcon={'60px'}
                                                    widthCircleIcon={'60px'}
                                                    bgColorCircleIcon={hoverLayanan === i ? '#fff' : '#4d784e'}
                                                    colorCircleIcon={hoverLayanan === i ? '#4d784e' : '#fff'}
                                                    paddingDeskripsi={'30px'}
                                                    marginWrapp={'0 0 25px 0'}
                                                    bdrRadiusWrapp={'5px'}
                                                    lineHeightDeskripsi={'1.5'}
                                                    marginTitle={'30px 0 10px 0'}
                                                    cursorWrapp={'pointer'}
                                                    colorParagraphOne={hoverLayanan === i ? '#fff' : '#333'}
                                                    mouseEnterWrapp={() => mouseOverLayanan(i)}
                                                    mouseLeaveWrapp={mouseLeaveLayanan}
                                                    bgColorWrapp={hoverLayanan === i ? '#4d784e' : '#fff'}
                                                />
                                            )
                                        }) : (
                                            <></>
                                        )}
                                    </div>

                                    <div className="container-btn">
                                        <Button
                                            name={'SELENGKAPNYA'}
                                            colorDefault={'transparent'}
                                            colorChange={'#000'}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* berita */}
                            {berita && Object.keys(berita).length > 0 ? (
                                <div className="berita-home col-group">
                                    <p className="title title-group">
                                        {berita.header.toUpperCase()}
                                    </p>

                                    <p className="deskripsi deskripsi-group">
                                        {berita.paragraph}
                                    </p>

                                    <div className="container-blog-berita col-card">
                                        {blogBerita && blogBerita.length > 0 ? blogBerita.map((e, i) => {
                                            return (
                                                <Card
                                                    key={i}
                                                    img={`${address}/${e.image}`}
                                                    title={e.header}
                                                    date={e.date}
                                                    admin={e.author}
                                                    widthWrapp={'calc(95%/3)'}
                                                    paddingDeskripsi={'20px'}
                                                    fontSizeTitle={'18px'}
                                                    displayBtn={'none'}
                                                    fontWeightTitle={'bold'}
                                                    bdrRadiusWrapp={'5px'}
                                                    lineHeightDeskripsi={'1.2'}
                                                    textAlignTitle={'start'}
                                                    colorTitle={hoverTitleBerita === i ? '#4d784e' : '#333'}
                                                    marginWrapp={'0 0 25px 0'}
                                                    bdrTopLeftRadiusImg={'5px'}
                                                    bdrTopRightRadiusImg={'5px'}
                                                    heightImg={'150px'}
                                                    cursorContainerImg={'pointer'}
                                                    displayDateCard={'flex'}
                                                    cursorTitle={'pointer'}
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
                                        )}
                                    </div>

                                    <div className="container-btn">
                                        <Button
                                            name={'SELENGKAPNYA'}
                                            colorDefault={'transparent'}
                                            colorChange={'#000'}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* testimoni */}
                            {testimoni && Object.keys(testimoni).length > 0 ? (
                                <div className="testimoni col-group">
                                    <p className="title title-group">
                                        {testimoni.title}
                                    </p>

                                    <p className="deskripsi deskripsi-group">
                                        {testimoni.paragraph}
                                    </p>

                                    <Carousel
                                        displayIndikator={'none'}
                                        dataTestimoni={testimoni.komentar}
                                        bdrRadiusWrapp={'0'}
                                        marginTopWrapp={'40px'}
                                        idxActiveCarousel={idxActiveTestimoni}
                                        displayBtnTestimoni={'flex'}
                                        btnLeftTestimoni={() => btnLeftTestimoni(idxActiveTestimoni - 1)}
                                        btnRightTestimoni={() => btnRightTestimoni(idxActiveTestimoni + 1)}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}

                            {/* media */}
                            <div className="media">
                                {media && media.length > 0 ? media.map((e, i) => {
                                    return (
                                        <Card
                                            key={i}
                                            img={`${address}/${e.image}`}
                                            title={e.title}
                                            paragraphOne={e.paragraph}
                                            positionDeskripsi={'absolute'}
                                            opacityHoverImg={hoverImgMedia === i ? '0.4' : '0.6'}
                                            transformImg={hoverImgMedia === i ? 'scale(1.1)' : 'scale(1)'}
                                            bdrRadiusHoverImg={'0'}
                                            colorTitle={hoverTitleMedia === i ? '#F6E8B1' : '#fff'}
                                            colorParagraphOne={'#fff'}
                                            fontSizeTitle={'20px'}
                                            fontWeightTitle={'bold'}
                                            paddingParagraphOne={'0 0 15px 0'}
                                            fontSizeParagraphOne={'14px'}
                                            textAlignDeskripsi={'start'}
                                            paddingDeskripsi={'40px 30px'}
                                            cursorTitle={'pointer'}
                                            mouseEnterTitle={() => mouseEnterTitleMedia(i)}
                                            mouseLeaveTitle={mouseLeaveTitleMedia}
                                            mouseEnterWrapp={() => mouseEnterImgMedia(i)}
                                            mouseLeaveWrapp={mouseLeaveImgMedia}
                                        />
                                    )
                                }) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home