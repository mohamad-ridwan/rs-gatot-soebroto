import React, {useEffect, useState} from 'react'
import Template from '../../components/template/Template'
import API from '../../services/api'
import address from '../../services/api/address'

function ZonaIntegritas(){
    const [data, setData] = useState({})

    function setAPI(){
        API.APIZonaIntegritas()
        .then(res=>{
            const result = res.data
            console.log(result)

            if(result){
                setData(result[0])
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(()=>{
        setAPI()
    }, [])

    return(
        <Template
            title={data && data.header}
            img={`${address}/${data && data.image}`}
        />
    )
}

export default ZonaIntegritas