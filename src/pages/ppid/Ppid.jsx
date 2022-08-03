import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Template from "../../components/template/Template"
import API from "../../services/api"
import address from "../../services/api/address"
import { changePath } from "../../services/redux/navbar"

function Ppid() {
    const [data, setData] = useState({})
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const dispatch = useDispatch()

    function updateData(data, page) {
        let newPage = []
        newPage.push(page)

        setData(data)
        setPage(newPage[0])
    }

    function setAPI() {
        setLoading(true)
        document.body.style.overflowY = 'hidden'

        API.APIPpid()
            .then(res => {
                const result = res.data

                const locPath = window.location.pathname

                if (result) {
                    const getDataOfMainPage = result[0]
                    const getDataOfPpidChild = result[0].data.filter(e => e.path === `/ppid/${params.path}`)
                    const getDataChildOfPageChild = result[0].data.filter(e => e.path === `/ppid/${params.id}`)
                    const newGetDataChildOfPageChild = getDataChildOfPageChild.length > 0 ? getDataChildOfPageChild[0].data.filter(e => e.path === `/ppid/${params.id}/${params.pathTwo}`) : []

                    if (getDataOfPpidChild.length > 0) {
                        const newArr = [
                            {
                                name: 'Home',
                                path: '/'
                            },
                            {
                                name: 'PPID',
                                path: '/ppid'
                            },
                            {
                                name: getDataOfPpidChild[0].header,
                                path: null
                            },
                        ]
                        updateData(getDataOfPpidChild[0], newArr)
                    } else if (newGetDataChildOfPageChild.length > 0) {
                        const newArr = [
                            {
                                name: 'Home',
                                path: '/'
                            },
                            {
                                name: 'PPID',
                                path: '/ppid'
                            },
                            {
                                name: 'Tentang PPID',
                                path: '/ppid/tentang-ppid'
                            },
                            {
                                name: newGetDataChildOfPageChild[0].header,
                                path: null
                            },
                        ]
                        updateData(newGetDataChildOfPageChild[0], newArr)
                    } else if (locPath === '/ppid') {
                        const newArr = [
                            {
                                name: 'Home',
                                path: '/'
                            },
                            {
                                name: getDataOfMainPage.header,
                                path: null
                            },
                        ]
                        updateData(getDataOfMainPage, newArr)
                    }
                }
                setLoading(false)
                document.body.style.overflowY = 'scroll'
            })
            .catch(err => console.log(err))
    }

    function updateRoutePage() {
        if (params.path !== undefined) {
            dispatch(changePath(`/ppid/${params.path}`))
        } else if (params.id !== undefined && params.pathTwo !== undefined) {
            dispatch(changePath(`/ppid/${params.id}/${params.pathTwo}`))
        } else if (params && Object.keys(params).length === 0) {
            dispatch(changePath('/ppid'))
        }
    }

    useEffect(() => {
        updateRoutePage()
        setAPI()
    }, [params])

    return (
        <Template
            page={page}
            title={data && data.header}
            barTitle={`${data && data.header} | RSPAD Gatot Soebroto`}
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph}
            loading={loading ? 'flex' : 'none'}
        />
    )
}

export default Ppid