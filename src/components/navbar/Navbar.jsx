import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './Navbar.scss'
import API from '../../services/api'
import address from '../../services/api/address'

function Navbar() {
    const [contact, setContact] = useState([])
    const [medsos, setMedsos] = useState([])
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])
    const [txtMarquee, setTxtMarquee] = useState({})
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [activeIconNav, setActiveIconNav] = useState(null)
    const [language, setLanguage] = useState('BAHASA <b>ID</b>')
    const [activeMenuCollapse, setActiveMenuCollapse] = useState(null)

    // redux
    const navbarStore = useSelector((state) => state.navbar.path)
    
    const storageLang = localStorage.getItem('wglang') || 'id'

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
                setTxtMarquee(txtMarquee[0])
                setMenuPage(page)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
        if (storageLang === 'en') {
            setLanguage('LANGUAGE <b>EN</b>')
        } else {
            setLanguage('BAHASA <b>ID</b>')
        }
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
            const newPath = path.includes('EN') ? 'en' : 'id'
            localStorage.setItem('wglang', newPath)
            window.location.reload()
        }
    }

    function onCollapse(idx) {
        setActiveMenuCollapse(idx)
    }

    function clickMenuPage(path) {
        if (path !== 'null' && !path.includes('https://')) {
            navigate(path)
            window.scrollTo(0, 0)
        } else if (path.includes('https://')) {
            window.open(path)
        }
    }

    function mouseOverActiveIconNav(i) {
        setActiveIconNav(i)
    }

    function mouseLeaveActiveIconNav() {
        setActiveIconNav(null)
    }

    const styleColorNavGrey = {
        color: navbarStore[0] !== 0 ? '#333' : '#fff'
    }
    const styleColorNavGreen = {
        color: navbarStore[0] !== 0 ? '#4d784e' : '#fff'
    }

    return (
        <>
            <div className="wrapp-nav" id="wrappNav" style={{
                backgroundColor: navbarStore[0] !== 0 ? '#fff' : 'transparent',
            }}>
                {/* kontak */}
                <div className="contact-nav">
                    <div className="address-nav">
                        {contact && contact.length > 0 ? contact.map((e, i) => {
                            return (
                                <div key={i} className="address">
                                    <i className={e.icon} style={styleColorNavGreen}></i>
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
                                <i key={i} className={navbarStore[0] !== 0 ? `${e.icon} icon-medsos-nav active-medsos-nav` : `${e.icon} icon-medsos-nav`}
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
                                <button id='btn-indo' className={language.includes('ID') ? 'language active-language' : 'language'} onClick={() => btnLanguage('BAHASA <b>ID</b>')}>
                                    INDONESIAN (ID)
                                </button>
                                <button className={language.includes('EN') ? 'language active-language' : 'language'}  onClick={() => btnLanguage('LANGUAGE <b>EN</b>')}>
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
                                <li key={i} className={navbarStore[0] !== 0 ? navbarStore[0] === i ? 'active-menu-page menu-page color-page-not-home' : 'menu-page color-page-not-home' : navbarStore[0] === i ? 'active-menu-page menu-page' : 'menu-page'}
                                    onMouseOver={() => onCollapse(i)}
                                    onMouseLeave={() => onCollapse(null)}
                                    onClick={() => clickMenuPage(e.path)}
                                >
                                    {e.name} {menuCollapse.length > 0 ? (
                                        <i className="fas fa-angle-down"></i>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    {/* Child page */}
                                    < ul className="wrapp-menu-collapse" style={{
                                        display: activeMenuCollapse === i && menuCollapse.length > 0 ? 'flex' : 'none'
                                    }
                                    }>
                                        <div className="menu-collapse">
                                            {menuCollapse.length > 0 ? menuCollapse.map((e, p) => {
                                                const menuChild = e.menuChild

                                                return (
                                                    <li key={p} className={navbarStore[0] === i && navbarStore[1] === p ? 'active-page-collapse page-collapse' : 'page-collapse'}
                                                        onClick={(p) => {
                                                            p.stopPropagation()
                                                            clickMenuPage(e.path)
                                                        }}
                                                        onMouseOver={() => mouseOverActiveIconNav(p)}
                                                        onMouseLeave={mouseLeaveActiveIconNav}
                                                    >
                                                        {e.name} {menuChild.length > 0 ? (
                                                            <i className="fas fa-angle-down"></i>
                                                        ) : (
                                                            <>
                                                            </>
                                                        )}

                                                        {/* Child page of child */}
                                                        <ul className="wrapp-menu-of-menu-collapse" style={{
                                                            display: menuChild.length > 0 && activeIconNav === p ? 'flex' : 'none'
                                                        }}>
                                                            {menuChild && menuChild.length > 0 ? menuChild.map((e, idx) => {
                                                                return (
                                                                    <li key={idx} className={navbarStore[0] === i && navbarStore[1] === p && navbarStore[2] === idx ? 'name-menu-of-menu-collapse active-name-menu-of-menu-collapse' : 'name-menu-of-menu-collapse'}
                                                                        onClick={() => clickMenuPage(e.path)}
                                                                    >{e.name}</li>
                                                                )
                                                            }) : (
                                                                <></>
                                                            )}
                                                        </ul>
                                                    </li>
                                                )
                                            }) : (
                                                <></>
                                            )}
                                        </div>
                                    </ul >
                                </li>
                            )
                        }) : (
                            <div></div>
                        )}
                        <i className={navbarStore[0] !== 0 ? navbarStore[0] === 9 ? 'fas fa-search btn-search active-page-search' : 'fas fa-search btn-search' : navbarStore[0] === 9 ? 'fas fa-search btn-search' : 'fas fa-search btn-search-home'}
                            onClick={() => clickMenuPage('/search')}></i>
                    </ul>
                </div>

                {/* text walk */}
                {txtMarquee && Object.keys(txtMarquee).length > 0 ? (
                    <>
                        {navbarStore[0] !== 0 ? (
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