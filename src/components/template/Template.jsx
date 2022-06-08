import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Template.scss'

function Template({ img, page, paragraph, title, card }) {
    const [hoverPage, setHoverPage] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    function RenderHTML({ txt }) {
        return (
            <p dangerouslySetInnerHTML={{ __html: txt }}></p>
        )
    }

    function mouseOverPage(i, path) {
        if (path !== null) {
            setHoverPage(i)
        }
    }

    function mouseLeavePage(i) {
        setHoverPage(i)
    }

    function clickPage(path) {
        if (path !== null) {
            navigate(path)
        }
    }

    return (
        <>
            <div className="wrapp-template">
                {/* banner page */}
                <div className="container-banner-page">
                    <img src={img} alt="" className="banner-page" />

                    <div className="shadow-banner"></div>
                </div>

                {/* blog content */}
                <div className="container-blog-content">
                    <div className="header-page">
                        {/* header green */}
                        <div className="header-green">
                            <div className="list-link-page">
                                {page && page.length > 0 ? page.map((e, i) => {
                                    return (
                                        <button className="link-page" style={{
                                            color: hoverPage === i ? '#ddd' : '#fff',
                                            cursor: hoverPage === i ? 'pointer' : 'default'
                                        }}
                                            onMouseOver={() => mouseOverPage(i, e.path)}
                                            onMouseLeave={mouseLeavePage}
                                            onClick={() => clickPage(e.path)}
                                        >
                                            {e.name} <div className="garis-miring" style={{
                                                display: i < page.length - 1 ? 'flex' : 'none'
                                            }}>/</div>
                                        </button>
                                    )
                                }) : (
                                    <></>
                                )}
                            </div>

                            <p className="title-page">
                                {title && title.toUpperCase()}
                            </p>
                        </div>

                        <div className="container-content-white">
                            <p className="content-blog">
                                {paragraph !== undefined ? (
                                    <RenderHTML txt={paragraph} />
                                ) : (
                                    <></>
                                )}
                                {card}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Template