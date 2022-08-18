import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import './Footer.scss'
import API from '../../services/api'
import Button from '../button/Button'

function Footer() {
    const [kontak, setKontak] = useState({})
    const [tentang, setTentang] = useState([])
    const [layanan, setLayanan] = useState([])
    const [copyRight, setCopyRight] = useState({})
    const [loadingSubmit, setLoadingSubmit] = useState(false)
    const [idxChoose, setIdxChoose] = useState(null)
    const [resultPolling, setResultPolling] = useState([])
    const [pendapat, setPendapat] = useState({
        pendapat: ''
    })
    const [idPolling, setIdPolling] = useState('')
    const [choosePolling] = useState([
        'Sangat Baik',
        'Baik',
        'Sedang',
        'Cukup',
    ])

    const navigate = useNavigate()

    ChartJS.register(ArcElement, Tooltip, Legend)
    ChartJS.defaults.color = '#fff'

    const keyResultPolling = localStorage.getItem('polling') || null
    const keyPengunjung = localStorage.getItem('id-pengunjung') || null

    function setAPI() {
        API.APINavbar()
            .then(res => {
                const results = res.data
                const address = results.filter(e => e.title === 'address')[0]
                const phone = results.filter(e => e.title === 'phone')[0]
                const medsos = results.filter(e => e.id === 'medsos-navbar')
                const page = results.filter(e => e.id === 'menu-page')
                const tentang = page.filter(e => e.name.toLowerCase() === 'tentang')
                const layanan = page.filter(e => e.name.toLowerCase() === 'layanan')
                const copyRight = results.filter(e => e.id === 'copy-right')
                const polling = results.filter(e => e.id === 'polling')

                let newKontak = {}

                if (results.length > 0) {
                    newKontak.address = address.name
                    newKontak.phone = phone.name
                    newKontak.medsos = medsos

                    setKontak(newKontak)
                    setTentang(tentang[0].menuCollapse)
                    setLayanan(layanan[0].menuCollapse)
                    setIdPolling(polling[0]._id)

                    // result polling
                    const sangatBaik = polling[0].dataPolling.filter(e => e.pendapat.toLowerCase() === 'sangat baik')
                    const baik = polling[0].dataPolling.filter(e => e.pendapat.toLowerCase() === 'baik')
                    const sedang = polling[0].dataPolling.filter(e => e.pendapat.toLowerCase() === 'sedang')
                    const cukup = polling[0].dataPolling.filter(e => e.pendapat.toLowerCase() === 'cukup')

                    setResultPolling([sangatBaik.length, baik.length, sedang.length, cukup.length])

                    // jumlah pengunjung
                    if (keyPengunjung === null) {
                        const time = new Date().getTime()
                        const data = {
                            jumlahPengunjung: parseInt(copyRight[0].jumlahPengunjung) + 1
                        }
                        API.APIPutCopyRight(copyRight[0]._id, data)
                            .then(res => {
                                localStorage.setItem('id-pengunjung', `${time}`)
                                setCopyRight(res.data)
                            })
                            .catch(err => console.log(err))
                    }else{
                        setCopyRight(copyRight[0])
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    function clickChoose(i) {
        setIdxChoose(i)
        setPendapat({ pendapat: choosePolling[i] })
    }

    function submitPolling() {
        const time = new Date().getTime()
        if (pendapat.pendapat.length > 0 && keyResultPolling === null && loadingSubmit === false) {
            setLoadingSubmit(true)
            
            API.APIPostPolling(idPolling, pendapat)
                .then(res => {
                    setIdxChoose(null)
                    setPendapat({ pendapat: '' })
                    localStorage.setItem('polling', `${time}`)
                    window.location.reload()

                    return res
                })
                .catch(err => console.log(err))
        }
    }

    function toPage(path) {
        if (!path.includes('https://')) {
            navigate(path)
        } else if (path.includes('https://')) {
            window.open(path)
        }
    }

    const dataDiagram = {
        labels: choosePolling,
        datasets: [
            {
                label: '# of Votes',
                data: resultPolling,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1
            },
        ],
    }

    return (
        <>
            <div className="wrapp-footer" id="wrappFooter">
                {/* list menu */}
                <div className="container-list-menu-footer">
                    {/* Kontak */}
                    <div className="kontak-footer list-footer-menu">
                        <p className="title title-footer">
                            Kontak
                        </p>
                        <div className="border-title"></div>

                        {kontak && Object.keys(kontak).length > 0 ? Object.entries(kontak).map((e, i) => {
                            const address = e[0] !== 'medsos'
                            const medsos = e[0] === 'medsos'
                            const phone = e[0] === 'phone'

                            return (
                                <>
                                    <p key={i} className="list">
                                        {phone ? 'P :' : ''} {address ? e[1] : ''}
                                    </p>
                                    {medsos ? e[1].map((e, i) => (
                                        <i key={i} className={e.icon}
                                            onClick={() => toPage(e.link)}
                                        ></i>
                                    )
                                    ) : (
                                        <></>
                                    )}
                                </>
                            )
                        }) : (
                            <></>
                        )}
                    </div>

                    {/* Tentang */}
                    <div className="tentang-footer list-footer-menu">
                        <p className="title title-footer">
                            Tentang
                        </p>
                        <div className="border-title"></div>

                        {tentang && tentang.length > 0 ? tentang.map((e, i) => {
                            return (
                                <p key={i} className="list-tentang list"
                                    onClick={() => toPage(e.path)}
                                >
                                    {e.name}
                                </p>
                            )
                        }) : (
                            <></>
                        )}
                    </div>

                    {/* Pelayanan Unggulan */}
                    <div className="pelayanan-unggulan list-footer-menu">
                        <p className="title title-footer">
                            Pelayanan Unggulan
                        </p>
                        <div className="border-title"></div>

                        {layanan && layanan.length > 0 ? layanan.map((e, i) => {
                            return (
                                <p key={i} className="list-layanan list"
                                    onClick={() => toPage(e.path)}
                                >
                                    {e.name}
                                </p>
                            )
                        }) : (
                            <></>
                        )}
                    </div>

                    {/* Polling */}
                    <div className="polling list-footer-menu">
                        <p className="title title-footer">
                            Polling
                        </p>
                        <div className="border-title"></div>

                        {/* form polling */}
                        <div className="container-form-polling" style={{
                            display: keyResultPolling !== null ? 'none' : 'flex'
                        }}>
                            <p className="list">
                                Bagaimana Kinerja Pelayanan Di Rumah Sakit Pusat Angkatan Darat Gatot Soebroto?
                            </p>

                            <form onSubmit={(e) => {
                                e.preventDefault()
                            }} className="input-polling">
                                <ul className="list-input-polling">
                                    {choosePolling.map((e, i) => {
                                        return (
                                            <li key={i} className="choose-polling"
                                                onClick={() => clickChoose(i)}
                                            >
                                                <div className="circle-choose" style={{
                                                    border: idxChoose === i ? '4px solid #2fa931' : '4px solid #fff'
                                                }}></div>
                                                <p className="name-choose">
                                                    {e}
                                                </p>
                                            </li>
                                        )
                                    })}
                                </ul>

                                <Button
                                    name={'Kirim'}
                                    paddingBtn={'10px 0'}
                                    bdrRadiusBtn={'5px'}
                                    displayIcon={'none'}
                                    bgColorBtn={'#2fa931'}
                                    colorDefault={'transparent'}
                                    colorChange={idxChoose !== null ? loadingSubmit ? 'none' : '#000' : 'none'}
                                    cursorBtn={idxChoose !== null ? loadingSubmit ? 'not-allowed' : 'pointer' : 'not-allowed'}
                                    bdrRadiusShadow={'5px'}
                                    click={submitPolling}
                                />
                            </form>
                        </div>

                        {/* result polling (diagram) */}
                        <div className="container-result-polling" style={{
                            display: keyResultPolling !== null ? 'flex' : 'none'
                        }}>
                            <Pie data={dataDiagram} />
                        </div>
                    </div>
                </div>

                {/* copy right */}
                <div className="container-copy-right">
                    <p className="txt-copy-right">
                        {copyRight && copyRight.copyRight}
                    </p>
                    <p className="txt-copy-right">
                        Jumlah Pengunjung : {copyRight && copyRight.jumlahPengunjung}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Footer