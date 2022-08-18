import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './NavbarMobile.scss'
import API from '../../services/api'
import address from '../../services/api/address'

function NavbarMobile() {
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])
    const [activeMenuCollapse, setActiveMenuCollapse] = useState(null)
    const [activeMenuChildOfCollapse, setActiveMenuChildOfCollapse] = useState(null)
    const [activeMenuLanguage, setActiveMenuLanguage] = useState(false)
    const [heightNav, setHeightNav] = useState(false)

    // redux
    const navbarStore = useSelector((state) => state.navbar.path)

    const storageLang = localStorage.getItem('wglang') || 'id'

    const navigate = useNavigate()

    function setAPI() {
        API.APINavbar()
            .then(res => {
                const result = res.data
                const logo = result.filter(e => e.id === 'logo-web')[0]
                const page = result.filter(e => e.id === 'menu-page')

                setLogoWeb(logo)
                setMenuPage(page)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    function clickMenuPage(path, onCollapse, idx) {
        if (path !== 'null' && !path.includes('https://')) {
            setHeightNav(false)
            setActiveMenuCollapse(null)
            setActiveMenuChildOfCollapse(null)
            setActiveMenuLanguage(false)
            navigate(path)
            window.scrollTo(0, 0)
        } else if (path.includes('https://')) {
            setHeightNav(false)
            setActiveMenuCollapse(null)
            setActiveMenuChildOfCollapse(null)
            setActiveMenuLanguage(false)
            window.open(path)
        } else if (onCollapse === 'main-page') {
            if (activeMenuCollapse === idx) {
                setActiveMenuCollapse(null)
                setActiveMenuLanguage(false)
            } else {
                setActiveMenuCollapse(idx)
                setActiveMenuLanguage(false)
            }
            setActiveMenuChildOfCollapse(null)
        } else if (onCollapse === 'page-collapse') {
            if (activeMenuChildOfCollapse === idx) {
                setActiveMenuChildOfCollapse(null)
                setActiveMenuLanguage(false)
            } else {
                setActiveMenuChildOfCollapse(idx)
                setActiveMenuLanguage(false)
            }
        }
    }

    function clickBar() {
        setHeightNav(!heightNav)
        setActiveMenuCollapse(null)
        setActiveMenuChildOfCollapse(null)
        setActiveMenuLanguage(false)
    }

    function clickLanguage(key) {
        localStorage.setItem('wglang', key)
        window.location.reload()
    }

    function toShowLanguage() {
        setActiveMenuCollapse(null)
        setActiveMenuChildOfCollapse(null)
        setActiveMenuLanguage(!activeMenuLanguage)
    }

    return (
        <div className="wrapp-navbar-mobile" id='wrapp-nav-mobile'>
            {/* column bar */}
            <div className="column-bar-nav">
                {Object.keys(logoWeb).length > 0 ? (
                    <img src={`${address}/${logoWeb.image}`} alt="" className="logo-web-mobile"
                        onClick={() => clickMenuPage('/')}
                    />
                ) : (
                    <div></div>
                )}

                <i className="fa fa-bars" onClick={clickBar}></i>
            </div>

            {/* menu page */}
            <div className="container-menu-page-mobile">
                <ul className="column-menu-page-mobile" style={{
                    height: heightNav ? '200px' : '0px',
                    marginTop: heightNav ? '20px' : '0'
                }}>
                    {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                        const menuCollapse = e.menuCollapse

                        return (
                            <li key={i} className={navbarStore[0] === i ? activeMenuCollapse === i && menuCollapse.length > 0 ?  'menu-page-mobile active-menu-page-mobile' : 'menu-page-mobile active-menu-page-mobile' : activeMenuCollapse === i && menuCollapse.length > 0 ? 'menu-page-mobile active-menu-page-mobile' : 'menu-page-mobile'}
                                onClick={(p) => {
                                    p.stopPropagation()
                                    clickMenuPage(e.path, 'main-page', i)
                                }}
                            >
                                {e.name} {menuCollapse.length > 0 ? (
                                    <i className="fas fa-angle-down" style={{
                                        margin: '0 0 0 3px',
                                        padding: 0
                                    }}></i>
                                ) : (
                                    <>
                                    </>
                                )}

                                {/* child page */}
                                <div className="wrapp-menu-collapse-mobile" style={{
                                    display: activeMenuCollapse === i && menuCollapse.length > 0 ? 'flex' : 'none'
                                }}>
                                    <ul className="menu-collapse-mobile">
                                        {menuCollapse.length > 0 ? menuCollapse.map((e, p) => {
                                            const menuChild = e.menuChild

                                            return (
                                                <li key={p} className={navbarStore[0] === i && navbarStore[1] === p ? menuChild.length > 0 && activeMenuChildOfCollapse === i ? 'page-collapse-mobile active-page-collapse-mobile' : 'page-collapse-mobile active-page-collapse-mobile' : menuChild.length > 0 && activeMenuChildOfCollapse === i ? 'page-collapse-mobile active-page-collapse-mobile' : 'page-collapse-mobile'}
                                                    onClick={(p) => {
                                                        p.stopPropagation()
                                                        clickMenuPage(e.path, 'page-collapse', i)
                                                    }}
                                                >
                                                    {e.name} {menuChild.length > 0 ? (
                                                        <i className="fas fa-angle-down"></i>
                                                    ) : (
                                                        <>
                                                        </>
                                                    )}

                                                    {/* child page of child */}
                                                    <ul className="wrapp-menu-of-menu-collapse-mobile" style={{
                                                        display: menuChild.length > 0 && activeMenuChildOfCollapse === i ? 'flex' : 'none'
                                                    }}>
                                                        {menuChild && menuChild.length > 0 ? menuChild.map((e, idx) => {
                                                            return (
                                                                <li className={navbarStore[0] === i && navbarStore[1] === p && navbarStore[2] === idx ? 'name-menu-of-menu-collapse-mobile active-name-menu-of-menu-collapse-mobile' : 'name-menu-of-menu-collapse-mobile'} key={idx}
                                                                    onClick={() => clickMenuPage(e.path)}
                                                                >
                                                                    {e.name}
                                                                </li>
                                                            )
                                                        }) : (
                                                            <div></div>
                                                        )}
                                                    </ul>
                                                </li>
                                            )
                                        }) : (
                                            <div></div>
                                        )}
                                    </ul>
                                </div>
                            </li>
                        )
                    }) : (
                        <div></div>
                    )}

                    {/* btn language */}
                    <li className={activeMenuLanguage ? 'menu-page-mobile active-menu-page-mobile' : 'menu-page-mobile'}
                        onClick={toShowLanguage}
                    >
                        BAHASA <i className="fas fa-angle-down" style={{
                            margin: '0 0 0 3px',
                            padding: 0
                        }}></i>

                        <div className="wrapp-menu-collapse-mobile" style={{
                            display: activeMenuLanguage ? 'flex' : 'none'
                        }}>
                            <ul className="menu-collapse-mobile">
                                <li id='btn-indo' className={storageLang === 'id' ? 'page-collapse-mobile active-page-collapse-mobile' : 'page-collapse-mobile'}
                                    onClick={(p) => {
                                        p.stopPropagation()
                                        clickLanguage('id')
                                    }}
                                >
                                    BAHASA INDONESIA (ID)
                                </li>
                                <li className={storageLang === 'en' ? 'page-collapse-mobile active-page-collapse-mobile' : 'page-collapse-mobile'}
                                    onClick={(p) => {
                                        p.stopPropagation()
                                        clickLanguage('en')
                                    }}
                                >
                                    ENGLISH (EN)
                                </li>
                            </ul>
                        </div>
                    </li>

                    {/* btn search */}
                    <p className={navbarStore[0] === 9 ? 'btn-search-nav-mobile active-btn-search-nav-mobile' : 'btn-search-nav-mobile'}
                        onClick={() => clickMenuPage('/search')}
                    >
                        <i className="fas fa-search">
                        </i>
                        PENCARIAN
                    </p>
                </ul>
            </div>
        </div>
    )
}

export default NavbarMobile