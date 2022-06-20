import React, { useEffect, useState } from 'react'
import './Footer.scss'
import API from '../../services/api'
import Button from '../button/Button'

function Footer() {
    const [kontak, setKontak] = useState({})
    const [tentang, setTentang] = useState([])
    const [layanan, setLayanan] = useState([])
    const [copyRight, setCopyRight] = useState({})
    const [idxChoose, setIdxChoose] = useState(null)
    const [choosePolling, setChoosePolling] = useState([
        { name: 'Sangat Baik' },
        { name: 'Baik' },
        { name: 'Sedang' },
        { name: 'Cukup' },
    ])

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

                let newKontak = {}

                if (results.length > 0) {
                    newKontak.address = address.name
                    newKontak.phone = phone.name
                    newKontak.medsos = medsos

                    setKontak(newKontak)
                    setTentang(tentang[0].menuCollapse)
                    setLayanan(layanan[0].menuCollapse)
                    setCopyRight(copyRight[0])
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    function clickChoose(i) {
        setIdxChoose(i)
    }

    return (
        <>
            <div className="wrapp-footer" id="wrappFooter">
                {/* list menu */}
                <div className="container-list-menu-footer">
                    <div className="kontak-footer list-footer-menu">
                        <p className="title">
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
                                        <i key={i} className="fas fa-user list"></i>
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
                    <div className="tentang-footer list-footer-menu">
                        <p className="title">
                            Tentang
                        </p>
                        <div className="border-title"></div>

                        {tentang && tentang.length > 0 ? tentang.map((e, i) => {
                            return (
                                <p key={i} className="list-tentang list">
                                    {e.name}
                                </p>
                            )
                        }) : (
                            <></>
                        )}
                    </div>
                    <div className="pelayanan-unggulan list-footer-menu">
                        <p className="title">
                            Pelayanan Unggulan
                        </p>
                        <div className="border-title"></div>

                        {layanan && layanan.length > 0 ? layanan.map((e, i) => {
                            return (
                                <p key={i} className="list-layanan list">
                                    {e.name}
                                </p>
                            )
                        }) : (
                            <></>
                        )}
                    </div>
                    <div className="polling list-footer-menu">
                        <p className="title">
                            Polling
                        </p>
                        <div className="border-title"></div>

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
                                                {e.name}
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
                                colorChange={'#000'}
                                bdrRadiusShadow={'5px'}
                            />
                        </form>
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