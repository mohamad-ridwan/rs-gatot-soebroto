import React from 'react'
import { useSelector } from 'react-redux'
import Template from '../../components/template/Template'
import address from '../../services/api/address'

function Tentang() {
    // redux
    const data = useSelector((state) => state.navbar.dataTentang)
    const page = useSelector((state) => state.navbar.pageTentang)

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