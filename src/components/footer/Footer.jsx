import React, { useEffect, useState } from 'react'
import './Footer.scss'
import API from '../../services/api'

function Footer() {
    const [kontak, setKontak] = useState({})

    function setAPI() {
        API.APINavbar()
            .then(res => {
                const results = res.data
                const address = results.filter(e => e.title === 'address')[0]
                const phone = results.filter(e => e.title === 'phone')[0]
                const medsos = results.filter(e => e.id === 'medsos-navbar')

                let newKontak = {}

                if (results.length > 0) {
                    newKontak.address = address.name
                    newKontak.phone = phone.name
                    newKontak.medsos = medsos

                    setTimeout(() => {
                        setKontak(newKontak)
                    }, 0);
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    return (
        <>
            <div className="wrapp-footer">
                <div className="container-footer">
                    
                </div>
            </div>
        </>
    )
}

export default Footer