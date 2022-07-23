import React, { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import { useParams } from 'react-router-dom'
import Template from '../../components/template/Template'
import address from '../../services/api/address'
import API from '../../services/api'
import { changePath } from '../../services/redux/navbar'

function Tentang() {
    const [data, setData] = useState({})
    const [page, setPage] = useState([])

    const params = useParams()
    const dispatch = useDispatch()

    function setAPI() {
        API.APITentang()
            .then(res => {
                const result = res.data
                const dataPage = result.filter(e => e.path === `/tentang/${params.id}`)

                let newPage = []
                if (dataPage.length > 0) {
                    newPage.push(
                        {
                            name: 'Home',
                            path: '/'
                        },
                        {
                            name: 'Tentang',
                            path: null
                        },
                        {
                            name: dataPage[0].header,
                            path: null
                        }
                    )
                }

                setData(dataPage[0])
                setPage(newPage)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        dispatch(changePath(`/tentang/${params.id}`))
        setAPI()
    }, [params])

    return (
        <>
            {data && data.id === 'selayang-pandang' ? (
                <Template
                    img={`${address}/${data && data.image}`}
                    page={page}
                    title={data && data.header}
                    paragraph={data && data.paragraphUtama + data && data.paragraphDetail}
                />
            ) : (
                <Template
                    img={`${address}/${data && data.image}`}
                    page={page}
                    title={data && data.header}
                    paragraph={data && data.paragraph}
                />
            )}
        </>
    )
}

export default Tentang