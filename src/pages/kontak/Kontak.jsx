import React, { useEffect, useState } from 'react'
import Form from '../../components/form/Form'
import Template from '../../components/template/Template'
import API from '../../services/api'
import address from '../../services/api/address'

function Kontak() {
    const [data, setData] = useState({})
    const [errMsg, setErrMsg] = useState({})
    const [inputValue, setInputValue] = useState({
        nama: '',
        email: '',
        pesan: '',
    })
    const [inputCard, setInputCard] = useState([
        {
            label: 'Nama',
            placeholder: 'Nama',
            name: 'nama',
            value: '',
            errorMessage: ''
        },
        {
            label: 'E-mail',
            placeholder: 'Alamat e-mail',
            name: 'email',
            value: '',
            errorMessage: ''
        }
    ])

    function setAPI() {
        API.APIKontak()
            .then(res => {
                const result = res.data

                if (result) {
                    setData(result[0])
                }
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        setAPI()
    }, [])

    const styleForm = {
        inputCard: inputCard,
        placeholder: 'Tuliskan pesan anda...',
        label: 'Pesan',
        stars: '*',
        name: 'pesan',
        nameBtnSubmit: 'KIRIM PESAN',
        displayInputFile: 'none',
        valueArea: inputValue.pesan,
        errInputArea: errMsg && errMsg.pesan,
        changeInput: (e, i) => changeInput(e, i),
        submit: submitData
    }

    function changeInput(e, i) {
        const value = e.target.value
        const name = e.target.name
        setInputCard((state) => state.map((el, idx) => idx === i ? { ...el, value: value } : el))

        setInputValue({ ...inputValue, [name]: value })

        if (Object.keys(errMsg).length > 0) {
            setErrMsg({ ...errMsg, [name]: '' })
            setInputCard((state) => state.map((el, idx) => idx === i ? { ...el, errorMessage: '' } : el))
        }
    }

    async function validateForm() {
        return await new Promise((resolve, reject) => {
            let err = {}

            const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

            const { nama, email, pesan } = { ...inputValue }

            if (nama.length === 0 || !nama.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 0 ? { ...el, errorMessage: 'Must be required' } : el))
                err.nama = 'Must be required'
            }
            if (email.length === 0 || !email.trim()) {
                setInputCard((state) => state.map((el, idx) => idx === 1 ? { ...el, errorMessage: 'Must be required' } : el))
                err.email = 'Must be required'
            } else if (!email.match(validRegex)) {
                setInputCard((state) => state.map((el, idx) => idx === 1 ? { ...el, errorMessage: 'Invalid email' } : el))
                err.email = 'Invalid email'
            }
            if (pesan.length === 0 || !pesan.trim()) {
                err.pesan = 'Must be required'
            }

            if (Object.keys(err).length > 0) {
                reject({ message: 'error' })
            } else if (Object.keys(err).length === 0) {
                resolve({ message: 'success' })
            }

            setErrMsg(err)
        })
    }

    function postDataToAPI(_id, data) {
        API.APIPostKontak(_id, data)
            .then(res => {
                if (res && res.data) {
                    alert('Anda telah berhasil mengirimkan data')
                    setErrMsg({})
                    setInputCard([
                        {
                            label: 'Nama',
                            placeholder: 'Nama',
                            name: 'nama',
                            value: '',
                            errorMessage: ''
                        },
                        {
                            label: 'E-mail',
                            placeholder: 'Alamat e-mail',
                            name: 'email',
                            value: '',
                            errorMessage: ''
                        }
                    ])
                    setInputValue({
                        nama: '',
                        email: '',
                        pesan: '',
                    })
                } else {
                    alert('Terjadi kesalahan server!\nMohon coba lagi nanti')
                }
            })
            .catch(err => {
                alert('Terjadi kesalahan server!\nMohon coba lagi nanti')
                console.log(err)
            })
    }

    function submitData() {
        validateForm()
            .then(res => {
                if (res && res.message === 'success') {
                    const nameDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
                    const nameMonth = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']

                    const years = new Date().getFullYear()
                    const dateNow = new Date().getDate()
                    const month = new Date().getMonth()
                    const day = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1

                    const getHours = new Date().getHours()
                    const hours = getHours.toString().length === 1 ? `0${getHours}` : getHours
                    const getMinute = new Date().getMinutes()
                    const minute = getMinute.toString().length === 1 ? `0${getMinute}` : getMinute

                    inputValue.date = `${nameDay[day]}, ${dateNow} ${nameMonth[month]} ${years} ${hours}:${minute}`

                    return postDataToAPI(data && data._id, inputValue)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <Template
            title={data && data.header}
            img={`${address}/${data && data.image}`}
            paragraph={data && data.paragraph}
            form={<Form {...styleForm} />}
        />
    )
}

export default Kontak