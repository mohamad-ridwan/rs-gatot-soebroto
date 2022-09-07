import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './NotFound.scss'
import Button from '../../components/button/Button'
import { changePath } from '../../services/redux/navbar'
import Loading from '../../components/loading/Loading'

function NotFound() {
    const [onLoading, setOnLoading] = useState(true)

    const navigate = useNavigate()

    // redux
    const dispatch = useDispatch()

    useEffect(() => {
        document.body.style.overflowY = 'hidden'
        dispatch(changePath([null]))

        setTimeout(() => {
            setOnLoading(false)
            document.body.style.overflowY = 'scroll'
        }, 2000)
    }, [])

    const btn = {
        name: 'HOMEPAGE',
        colorDefault: 'transparent',
        colorChange: '#000',
        displayIcon: 'none',
        click: () => goHome()
    }

    function goHome() {
        navigate('/')
    }

    return (
        <>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Page Not Found | RSPAD Gatot Soebroto</title>
            </Helmet>

            <div className="wrapp-page-not-found">
                <Loading display={onLoading ? 'flex' : 'none'} />

                <div className="container-page-not-found">
                    <p className="title-page-not-found">
                        Page Not Found
                    </p>
                    <p className="deskripsi-page-not-found">
                        We can't find the page you're looking for. Please contact Administrator or return to homepage to start over.
                    </p>
                    <Button {...btn} />
                </div>
            </div>
        </>
    )
}

export default NotFound