import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import '../detailberita/DetailBerita.scss'
import Template from '../../../components/template/Template'
import API from '../../../services/api'
import address from '../../../services/api/address'
import Card from '../../../components/card/Card'
import ViewImage from '../../../components/viewimage/ViewImage'

function DetailBerita() {
    const [hover, setHover] = useState(null)
    const [viewImgActive, setViewImgActive] = useState(false)
    const [idxActiveViewImg, setIdxActiveViewImg] = useState(null)
    const [data, setData] = useState({})
    const [galeriFoto, setGaleriFoto] = useState([])
    const [dataRekomendasi, setDataRekomendasi] = useState([])
    const [page] = useState([
        {
            name: 'Home',
            path: '/'
        },
        {
            name: 'Berita',
            path: '/entries'
        },
    ])

    const params = useParams()
    const navigate = useNavigate()

    function setAPI(path) {
        API.APIBerita()
            .then(res => {
                const respons = res.data[0].data
                const getData = respons.filter((e) => e.path === path)[0]

                const removeData = respons.filter((e) => e.path !== path)

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
                setData(getData)
                setGaleriFoto(getData.galeriFoto)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI(params.path)
    }, [])

    const styleCard = {
        widthWrapp: "100%",
        displayBtn: "none",
        bdrRadiusContainerImg: '5px',
        bdrTopLeftRadiusContainerImg: '5px',
        bdrTopRightRadiusContainerImg: '5px',
        marginWrapp: '0 0px 25px 0',
        cursorContainerImg: 'pointer',
    }

    const dataViewImg = {
        data: galeriFoto,
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
            setIdxActiveViewImg(galeriFoto.length - 1)
        }
    }

    function nextImg() {
        if (idxActiveViewImg < galeriFoto.length - 1) {
            setIdxActiveViewImg(idxActiveViewImg + 1)
        } else if (idxActiveViewImg === galeriFoto.length - 1) {
            setIdxActiveViewImg(0)
        }
    }

    function mouseOverImgBerita(i) {
        setHover(i)
    }

    function mouseLeaveImgBerita() {
        setHover(null)
    }

    function changeDetailBerita(path) {
        setAPI(path)
        navigate(`/entry/${path}`)
    }

    function onViewImg(idx) {
        setViewImgActive(true)
        setIdxActiveViewImg(idx)
        document.body.style.overflow = 'hidden'
    }

    const renderGaleriFoto = <>
        <p className="title-galeri-foto title-detail-berita">
            GALERI FOTO
        </p>

        <div className="wrapp-card-galeri-foto">
            {galeriFoto && galeriFoto.length > 0 ? galeriFoto.map((e, i) => {
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

    return (
        <Template
            img={`${address}/${data && data.image}`}
            page={page}
            title={data && data.header}
            paragraph={data && data.paragraph}
            galeriFoto={renderGaleriFoto}
            dataRekomendasi={dataRekomendasi}
            changeDetailBerita={(path) => changeDetailBerita(path)}
            displayDateCard={'flex'}
            date={data && data.date}
            admin={data && data.author}
        />
    )
}

export default DetailBerita