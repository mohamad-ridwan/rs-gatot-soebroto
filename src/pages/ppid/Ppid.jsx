import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from 'react-router-dom'
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
    const navigate = useNavigate()
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
                        let newIdxPage = null
                        result[0].data.map((e, i) => e.path === `/ppid/${params.path}` ? newIdxPage = i : undefined)

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
                        dispatch(changePath([7, newIdxPage]))
                        updateData(getDataOfPpidChild[0], newArr)
                    } else if (newGetDataChildOfPageChild.length > 0) {
                        let newIdxPage = null
                        getDataChildOfPageChild[0].data.map((e, i) => e.path === `/ppid/${params.id}/${params.pathTwo}` ? newIdxPage = i : undefined)

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
                        dispatch(changePath([7, 0, newIdxPage]))
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
                        dispatch(changePath([7]))
                        updateData(getDataOfMainPage, newArr)
                    }else{
                        navigate('/page-not-found')
                    }
                }
                setLoading(false)
                document.body.style.overflowY = 'scroll'
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
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