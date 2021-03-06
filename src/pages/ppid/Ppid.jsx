import React, { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import Template from "../../components/template/Template"
import API from "../../services/api"
import address from "../../services/api/address"

function Ppid() {
    const [data, setData] = useState({})
    const [page, setPage] = useState([])

    const params = useParams()

    function updateData(data, page) {
        let newPage = []
        newPage.push(page)

        setData(data)
        setPage(newPage[0])
    }

    function setAPI() {
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
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph}
        />
    )
}

export default Ppid