import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WebViewer from '@pdftron/pdfjs-express-viewer'
import '../pdf/Pdf.scss'
import API from '../../services/api'
import address from '../../services/api/address'
import Loading from '../../components/loading/Loading'

// File / Page ini untuk semua tampilan pdf dari masing2 page yang ada, jadi single page PDF.
function Pdf() {
    const [loading, setLoading] = useState(true)
    const viewer = useRef(null)
    const navigate = useNavigate()

    const corsOrigin = 'https://cors-anywhere.herokuapp.com'

    function setAPI() {
        document.body.style.overflowY = 'hidden'

        API.APIMedia()
            .then(res => {
                const result = res.data

                const location = window.location.pathname.split('/')

                const getData = result.filter((e) => e.id === location[2])

                if (getData.length > 0) {
                    const getDataPdf = getData[0].data.filter((e) => e.id === location[4])

                    if (getDataPdf.length > 0) {
                        const wrappNav = document.getElementById('wrappNav')
                        const wrappNavMobile = document.getElementById('wrapp-nav-mobile')
                        const wrappFooter = document.getElementById('wrappFooter')
                        if (wrappNav) {
                            wrappNav.style.display = 'none'
                            wrappNavMobile.style.display = 'none'
                            wrappFooter.style.display = 'none'
                        }

                        setTimeout(() => {
                            const pdfUrl = getDataPdf[0].galeri[0].image

                            WebViewer({
                                path: '/webviewer/lib',
                                initialDoc: `${corsOrigin}/${pdfUrl}`,
                                licenseKey: 'bOGKW9KzNMtKYo44Egro'
                            }, viewer.current)
                                .then((instance) => {
                                    const { Core } = instance
                                })
                            setLoading(false)
                        }, 0)
                    } else {
                        navigate('/page-not-found')
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    return (
        <>
            <Loading display={loading ? 'flex' : 'none'} />

            <div className="wrapp-pdf-content">
                <div className="webviewer" id='viewer' ref={viewer}>

                </div>
            </div>
        </>
    )
}

export default Pdf