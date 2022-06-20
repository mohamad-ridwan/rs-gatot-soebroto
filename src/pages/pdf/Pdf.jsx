import React, { useEffect, useRef } from 'react'
import WebViewer from '@pdftron/pdfjs-express-viewer'
import '../pdf/Pdf.scss'
import API from '../../services/api'
import address from '../../services/api/address'

// File / Page ini untuk semua tampilan pdf dari masing2 page yang ada, jadi single page PDF.
function Pdf() {
    const viewer = useRef(null)

    function setAPI() {
        API.APIMedia()
            .then(res => {
                const result = res.data

                const location = window.location.pathname.split('/')

                const getData = result.filter((e) => e.id === location[2])

                if (getData.length > 0) {
                    const getDataPdf = getData[0].data.filter((e) => e.id === location[4])
                    const pdfUrl = getDataPdf[0].galeri[0].image

                    WebViewer({
                        path: '/webviewer/lib',
                        initialDoc: `${address}/${pdfUrl}`,
                        licenseKey: 'bOGKW9KzNMtKYo44Egro'
                    }, viewer.current)
                    .then((instance)=>{
                        const {Core} = instance
                    })
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()

        const wrappNav = document.getElementById('wrappNav')
        const wrappFooter = document.getElementById('wrappFooter')
        if (wrappNav) {
            const displayNav = wrappNav.style.display = 'none'
            const displayFooter = wrappFooter.style.display = 'none'

            return { displayNav, displayFooter }
        }
    }, [])

    return (
        <div className="wrapp-pdf-content">
            <div className="webviewer" id='viewer' ref={viewer}>

            </div>
        </div>
    )
}

export default Pdf