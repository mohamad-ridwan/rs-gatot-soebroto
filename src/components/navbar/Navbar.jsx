import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'
import { loadPageTentang, loadPageLayanan, changeCurrentPage, changeFirstIdx, changeLastIdx, siblingCount, changeIdxPaginate, changeContentPerPage, changeActiveMenuChoose, changeIdxActiveChoose, changeNowChoose, changeSearchDoctor, changeActiveChooseHeader, changeOnActiveChooseOfHeader, changeIdxShowingDokter, loadPageMedia } from '../../services/redux/navbar'
import API from '../../services/api'
import address from '../../services/api/address'

function Navbar() {
    const [contact, setContact] = useState([])
    const [medsos, setMedsos] = useState([])
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])
    const [txtMarquee, setTxtMarquee] = useState({})
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [language, setLanguage] = useState('BAHASA <b>ID</b>')
    const [activeMenuCollapse, setActiveMenuCollapse] = useState(null)

    // redux
    const navbarStore = useSelector((state) => state.navbar.path)
    const dispatch = useDispatch()

    // router
    const navigate = useNavigate()

    function setAPI() {
        API.APINavbar()
            .then(res => {
                const result = res.data
                const contact = result.filter(e => e.id === 'contact-navbar')
                const medsos = result.filter(e => e.id === 'medsos-navbar')
                const logo = result.filter(e => e.id === 'logo-web')[0]
                const page = result.filter(e => e.id === 'menu-page')
                const txtMarquee = result.filter(e => e.id === 'text-marquee')

                setContact(contact)
                setMedsos(medsos)
                setLogoWeb(logo)
                setMenuPage(page)
                setTxtMarquee(txtMarquee[0])
            })
            .catch(err => console.log(err))
    }

    function getDataPageTentang(path) {
        API.APITentang()
            .then(res => {
                const result = res.data
                const dataPage = result.filter(e => e.path === path)

                let newPage = []
                if (dataPage.length > 0) {
                    newPage.push(
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Tentang',
                            path: null
                        },
                        {
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }

                dispatch(loadPageTentang({ data: dataPage[0], page: newPage, path: path }))
            })
            .catch(err => console.log(err))
    }

    function toLoadPageTentang(pathParm) {
        const path = window.location.pathname

        if (pathParm !== undefined) {
            getDataPageTentang(pathParm)
        } else if (path.split('/')[1] === 'tentang') {
            getDataPageTentang(path)
        }

        return;
    }

    function updatePaginate(data, contentPerPage) {
        const totalNumber = data && Math.ceil(data[0].data.length / contentPerPage)
        const showNumberPaginate = totalNumber < siblingCount ? totalNumber : siblingCount
        dispatch(changeIdxPaginate({ countIdx: 1, length: showNumberPaginate + 1 }))
    }

    function getDataPageLayanan(path) {
        // update for page doctor
        dispatch(changeActiveMenuChoose({ activeStats: false }))
        dispatch(changeIdxActiveChoose({ idx: 1 }))
        dispatch(changeNowChoose({ choose: 10 }))
        dispatch(changeSearchDoctor({ input: '' }))
        dispatch(changeActiveChooseHeader({ nama: 'nama' }))
        dispatch(changeOnActiveChooseOfHeader({ condition: true }))

        API.APILayanan()
            .then(res => {
                const result = res.data
                const dataPage = result.filter(e => e.path === path)

                let newPage = []
                if (dataPage.length > 0) {
                    newPage.push(
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Layanan',
                            path: null
                        },
                        {
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }

                dispatch(changeCurrentPage({ pageNow: 1 }))
                dispatch(changeFirstIdx({ idx: siblingCount }))
                dispatch(changeLastIdx({ idx: siblingCount }))
                dispatch(loadPageLayanan({ data: dataPage[0], page: newPage, path: path }))

                if (dataPage.length > 0 && dataPage[0].id !== 'jadwal-dokter') {
                    updatePaginate(dataPage, 6)
                    dispatch(changeContentPerPage({ contentPerPage: 6 }))
                }
                if (dataPage.length > 0 && dataPage[0].id === 'jadwal-dokter') {
                    updatePaginate(dataPage, 10)
                    dispatch(changeContentPerPage({ contentPerPage: 10 }))
                    dispatch(changeIdxShowingDokter({ nowShow: 1, toShow: 10, ofShow: dataPage[0].data.length, totalData: dataPage[0].data.length }))
                }
            })
            .catch(err => console.log(err))
    }

    function toLoadPageLayanan(pathParm) {
        const path = window.location.pathname

        if (pathParm !== undefined) {
            getDataPageLayanan(pathParm)
        } else if (path.split('/')[1] === 'layanan') {
            getDataPageLayanan(path)
        }

        return;
    }

    function getDataPageMedia(path) {
        API.APIMedia()
            .then(res => {
                const result = res.data

                const dataPage = result.filter((e) => e.path === path)

                let newPage = []
                if (dataPage.length > 0) {
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
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }

                dispatch(changeCurrentPage({ pageNow: 1 }))
                dispatch(changeFirstIdx({ idx: siblingCount }))
                dispatch(changeLastIdx({ idx: siblingCount }))
                dispatch(loadPageMedia({page: newPage, data: dataPage[0], path: path}))
                updatePaginate(dataPage, 6)
            })
            .catch(err => console.log(err))
    }

    function toLoadPageMedia(pathParm) {
        const path = window.location.pathname

        if (pathParm !== undefined) {
            getDataPageMedia(pathParm)
        } else if (path.split('/')[1] === 'media') {
            getDataPageMedia(path)
        }

        return;
    }

    useEffect(() => {
        setAPI()
        toLoadPageTentang()
        toLoadPageLayanan()
        toLoadPageMedia()
    }, [])

    function RenderHTML({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function btnMedsos(path) {
        window.open(path)
    }

    function btnLanguage(path) {
        setActiveDropdown(!activeDropdown)

        if (path !== undefined) {
            setLanguage(path)
        }
    }

    function onCollapse(idx) {
        setActiveMenuCollapse(idx)
    }

    function clickMenuPage(path) {
        if (path !== 'null') {
            navigate(path)
            window.scrollTo(0, 0)

            toLoadPageTentang(path)
            toLoadPageLayanan(path)
            toLoadPageMedia(path)
        }
    }

    const styleColorNavGrey = {
        color: navbarStore !== '/' ? '#333' : '#fff'
    }
    const styleColorNavGreen = {
        color: navbarStore !== '/' ? '#4d784e' : '#fff'
    }

    return (
        <>
            <div className="wrapp-nav" id="wrappNav" style={{
                backgroundColor: navbarStore !== '/' ? '#fff' : 'transparent',
            }}>
                {/* kontak */}
                <div className="contact-nav">
                    <div className="address-nav">
                        {contact && contact.length > 0 ? contact.map((e, i) => {
                            return (
                                <div key={i} className="address">
                                    <i className="fas fa-user" style={styleColorNavGreen}></i>
                                    <p className="txt-address" style={styleColorNavGrey}>
                                        {e.name}
                                    </p>
                                </div>
                            )
                        }) : (
                            <div></div>
                        )}
                    </div>
                    <div className="medsos-nav">
                        {medsos && medsos.length > 0 ? medsos.map((e, i) => {
                            return (
                                <i key={i} className="fas fa-user" style={styleColorNavGreen}
                                    onClick={() => btnMedsos(e.link)}></i>
                            )
                        }) : (
                            <div></div>
                        )}
                        <button className="change-language" style={styleColorNavGreen}
                            onClick={(e) => {
                                e.stopPropagation()
                                btnLanguage()
                            }}>
                            <RenderHTML txt={language} /> <i className="fas fa-angle-down" style={styleColorNavGreen}></i>

                            <div className="dropdown" style={{
                                display: activeDropdown ? 'flex' : 'none'
                            }}>
                                <button className="language" onClick={() => btnLanguage('BAHASA <b>ID</b>')}>
                                    BAHASA INDONESIA (ID)
                                </button>
                                <button className="language" onClick={() => btnLanguage('ENGLISH <b>EN</b>')}>
                                    ENGLISH (EN)
                                </button>
                            </div>
                        </button>
                    </div>
                </div>

                <div className="line-grey"></div>

                {/* page */}
                <div className="page-nav">
                    {logoWeb && Object.keys(logoWeb).length > 0 ? (
                        <img src={`${address}/${logoWeb.image}`} alt="" className="logo-web"
                            onClick={() => clickMenuPage('/')}
                        />
                    ) : (
                        <div></div>
                    )}

                    <ul className="list-menu-page">
                        {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                            const menuCollapse = e.menuCollapse

                            return (
                                <li key={i} className="menu-page" style={styleColorNavGrey}
                                    onMouseOver={() => onCollapse(i)}
                                    onMouseLeave={() => onCollapse(null)}
                                    onClick={() => clickMenuPage(e.path)}
                                >
                                    {e.name} {menuCollapse.length > 0 ? (
                                        <i className="fas fa-angle-down" style={styleColorNavGrey}></i>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    <ul className="wrapp-menu-collapse" style={{
                                        display: activeMenuCollapse === i && menuCollapse.length > 0 ? 'flex' : 'none'
                                    }}>
                                        <div className="menu-collapse">
                                            {menuCollapse.length > 0 ? menuCollapse.map((e, i) => {
                                                return (
                                                    <li key={i} className="page-collapse" onClick={() => clickMenuPage(e.path)}>
                                                        {e.name.toUpperCase()}
                                                    </li>
                                                )
                                            }) : (
                                                <></>
                                            )}
                                        </div>
                                    </ul>
                                </li>
                            )
                        }) : (
                            <div></div>
                        )}
                        <i className="fas fa-search btn-search" style={styleColorNavGrey}></i>
                    </ul>
                </div>

                {/* text walk */}
                {txtMarquee && Object.keys(txtMarquee).length > 0 ? (
                    <>
                        {navbarStore !== '/' ? (
                            <div className="text-walk">
                                <marquee behavior="" direction="">{<RenderHTML txt={txtMarquee.text} />}</marquee>
                            </div>
                        ) : (
                            <></>
                        )}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </>
    )
}

export default Navbar