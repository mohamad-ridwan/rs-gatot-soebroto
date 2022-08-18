import React, { useState, useEffect } from "react"
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Template from "../../../components/template/Template"
import API from "../../../services/api"
import address from "../../../services/api/address"
import { changePath } from "../../../services/redux/navbar"

function DetailLayanan() {
    const [data, setData] = useState({})
    const [page, setPage] = useState([])
    const [loading, setLoading] = useState(true)

    const params = useParams()
    const dispatch = useDispatch()

    function setAPI() {
        document.body.style.overflowY = 'hidden'

        API.APILayanan()
            .then(res => {
                const result = res.data

                if (result) {
                    const getFirstPage = result.filter(e => e.path === `/layanan/${params.id}`)

                    if (getFirstPage.length > 0) {
                        const getNowPage = getFirstPage[0].data.filter(e => e.path === params.path)
                        const headerPage = getNowPage[0].header.split('/').join('')

                        if (getNowPage.length > 0) {
                            const newPage = []

                            let newIdxPage = null
                            const idxPage = result.map((e, i) => e.path === `/layanan/${params.id}` ? newIdxPage = i : undefined)

                            newPage.push(
                                {
                                    name: 'Home',
                                    path: '/'
                                },
                                {
                                    name: 'Layanan',
                                    path: null
                                },
                                {
                                    name: getFirstPage[0].header,
                                    path: getFirstPage[0].path
                                },
                                {
                                    name: headerPage,
                                    path: null
                                }
                            )
                            
                            dispatch(changePath([2, newIdxPage]))
                            setPage(newPage)
                            setData(getNowPage[0])

                            setLoading(false)
                            document.body.style.overflowY = 'scroll'

                            return idxPage
                        }
                    }
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

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

export default DetailLayanan