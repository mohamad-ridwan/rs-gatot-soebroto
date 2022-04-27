import React, { useEffect, useState } from 'react'
import './Navbar.scss'
import API from '../../services/api'
import address from '../../services/api/address'

function Navbar() {
    const [contact, setContact] = useState([])
    const [medsos, setMedsos] = useState([])
    const [logoWeb, setLogoWeb] = useState({})
    const [menuPage, setMenuPage] = useState([])
    const [activeDropdown, setActiveDropdown] = useState(false)
    const [language, setLanguage] = useState('BAHASA <b>ID</b>')
    const [activeMenuCollapse, setActiveMenuCollapse] = useState(null)

    function setAPI() {
        API.APINavbar()
            .then(res => {
                const result = res.data
                const contact = result.filter(e => e.id === 'contact-navbar')
                const medsos = result.filter(e => e.id === 'medsos-navbar')
                const logo = result.filter(e => e.id === 'logo-web')[0]
                const page = result.filter(e => e.id === 'menu-page')

                setContact(contact)
                setMedsos(medsos)
                setLogoWeb(logo)
                setMenuPage(page)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
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

    return (
        <>
            <div className="wrapp-nav">
                <div className="contact-nav">
                    <div className="address-nav">
                        {contact && contact.length > 0 ? contact.map((e, i) => {
                            return (
                                <div key={i} className="address">
                                    <i className="fas fa-user"></i>
                                    <p className="txt-address">
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
                                <i key={i} className="fas fa-user" onClick={() => btnMedsos(e.link)}></i>
                            )
                        }) : (
                            <div></div>
                        )}
                        <button className="change-language" onClick={(e) => {
                            e.stopPropagation()
                            btnLanguage()
                        }}>
                            <RenderHTML txt={language} /> <i className="fas fa-angle-down"></i>

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
                <div className="page-nav">
                    {logoWeb && Object.keys(logoWeb).length > 0 ? (
                        <img src={`${address}/${logoWeb.image}`} alt="" className="logo-web" />
                    ) : (
                        <div></div>
                    )}

                    <ul className="list-menu-page">
                        {menuPage && menuPage.length > 0 ? menuPage.map((e, i) => {
                            const menuCollapse = e.menuCollapse

                            return (
                                <li key={i} className="menu-page"
                                    onMouseOver={() => onCollapse(i)}
                                    onMouseLeave={() => onCollapse(null)}
                                >
                                    {e.name} {menuCollapse.length > 0 ? (
                                        <i className="fas fa-angle-down"></i>
                                    ) : (
                                        <>
                                        </>
                                    )}

                                    <ul className="wrapp-menu-collapse" style={{
                                        display: activeMenuCollapse === i ? 'flex' : 'none'
                                    }}>
                                        <div className="menu-collapse">
                                            {menuCollapse.length > 0 ? menuCollapse.map((e, i) => {
                                                return (
                                                    <li key={i} className="page-collapse">
                                                        {e.name}
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
                        <i className="fas fa-search btn-search"></i>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navbar