import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import '../detailmedia/DetailMedia.scss'
import Template from '../../../components/template/Template'
import API from '../../../services/api'
import address from '../../../services/api/address'
import ViewImage from '../../../components/viewimage/ViewImage'
import Card from '../../../components/card/Card'

function DetailMedia() {
    const [page, setPage] = useState([])
    const [data, setData] = useState({})
    const [galeri, setGaleri] = useState([])
    const [dataRekomendasi, setDataRekomendasi] = useState([])
    const [hover, setHover] = useState(null)
    const [idxActiveViewImg, setIdxActiveViewImg] = useState(null)
    const [viewImgActive, setViewImgActive] = useState(false)

    const params = useParams()
    const navigate = useNavigate()

    function setAPI(id, path) {
        API.APIMedia()
            .then(res => {
                window.scrollTo(0, 0)
                const result = res.data

                const getData = result.filter((e) => e.path === `/media/${id}`)

                let newId = ''
                const firstChar = id.split('')[0]
                const remainingChar = id.substr(1, id.length)
                newId = `${firstChar.toUpperCase()}${remainingChar}`

                let newPage = []
                if (getData.length > 0) {
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
                            name: newId,
                            path: `/media/${id}`
                        }
                    )
                    setPage(newPage)

                    const getNowPageData = getData[0].data.filter((e) => e.path === path)
                    setData(getNowPageData[0])
                    setGaleri(getNowPageData[0].galeri)

                    const removeData = getData[0].data.filter((e) => e.path !== path)

                    const dataRekomendasi = []
                    const idxRekomendasi = []

                    const getRandomIdxFirst = Math.floor(Math.random() * removeData.length)
                    const getRandomIdxTwo = Math.floor(Math.random() * removeData.length)
                    if (getRandomIdxFirst === getRandomIdxTwo && getRandomIdxTwo === removeData.length - 1) {
                        idxRekomendasi.push(getRandomIdxFirst, (removeData.length - 1) - getRandomIdxTwo + 2)
                    } else {
                        idxRekomendasi.push(getRandomIdxFirst, getRandomIdxFirst === getRandomIdxTwo ? getRandomIdxTwo + 1 : getRandomIdxTwo)
                    }

                    dataRekomendasi.push(removeData[idxRekomendasi[0]], removeData[idxRekomendasi[1]])

                    setDataRekomendasi(dataRekomendasi)
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI(params.id, params.path)
    }, [])

    const styleCard = {
        heightWrapp: '180px',
        widthWrapp: "100%",
        displayBtn: "none",
        bdrRadiusContainerImg: '5px',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        marginWrapp: '0 0px 25px 0',
        cursorContainerImg: 'pointer',
    }

    function mouseOverImgBerita(i) {
        setHover(i)
    }

    function mouseLeaveImgBerita() {
        setHover(null)
    }

    function onViewImg(idx) {
        setViewImgActive(true)
        setIdxActiveViewImg(idx)
        document.body.style.overflow = 'hidden'
    }

    const dataViewImg = {
        data: galeri,
        displayWrapp: viewImgActive ? 'flex' : 'none',
        idxActive: idxActiveViewImg,
        beforeImg: beforeImg,
        nextImg: nextImg,
        closeView: closeView
    }

    function closeView() {
        setViewImgActive(false)
        document.body.style.overflow = ''
    }

    function beforeImg() {
        if (idxActiveViewImg > 0) {
            setIdxActiveViewImg(idxActiveViewImg - 1)
        } else if (idxActiveViewImg === 0) {
            setIdxActiveViewImg(galeri.length - 1)
        }
    }

    function nextImg() {
        if (idxActiveViewImg < galeri.length - 1) {
            setIdxActiveViewImg(idxActiveViewImg + 1)
        } else if (idxActiveViewImg === galeri.length - 1) {
            setIdxActiveViewImg(0)
        }
    }

    function changeDetailBerita(path) {
        setAPI(params.id, path)
        navigate(`/media/${params.id}/${path}`)
    }

    function RenderCard() {
        return (
            <>
                <div className="wrapp-card-detail-galeri-foto">
                    {galeri && galeri.length > 0 ? galeri.map((e, i) => {
                        return (
                            <Card
                                {...styleCard}
                                key={i}
                                img={`${address}/${e.image}`}
                                transformImg={hover === i ? 'scale(1.1)' : 'scale(1)'}
                                opacityHoverImg={hover === i ? '0.4' : '0'}
                                mouseEnterImg={() => mouseOverImgBerita(i)}
                                mouseLeaveImg={mouseLeaveImgBerita}
                                clickImg={() => onViewImg(i)}
                            />
                        )
                    }) : (
                        <></>
                    )}
                </div>

                <ViewImage {...dataViewImg} />
            </>
        )
    }

    function RenderVideos() {
        return (
            <>
                {data && data.linkVideo && (
                    <iframe className='youtube-of-page-videos' src={data.linkVideo} frameborder="0" height='400'></iframe>
                )}
            </>
        )
    }

    return (
        <Template
            img={`${address}/${data && data.image}`}
            title={data && data.header}
            paragraph={data && data.paragraph}
            page={page}
            galeriFoto={<RenderCard />}
            dataRekomendasi={dataRekomendasi}
            changeDetailBerita={(path) => changeDetailBerita(path)}
            videos={<RenderVideos />}
        />
    )
}

export default DetailMedia