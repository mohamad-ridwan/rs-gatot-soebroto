import GetBerita from "./berita/get"
import GetHome from "./home/get"
import GetLayanan from "./layanan/get"
import GetNavbar from "./navbar/get"
import GetTentang from "./tentang/get"

const APINavbar = ()=> GetNavbar('v1/navbar/get')
const APIHome = ()=> GetHome('v2/home/get')
const APITentang = ()=> GetTentang('v3/tentang/get')
const APILayanan = ()=>GetLayanan('v4/layanan/get')
const APIBerita = ()=> GetBerita('v5/berita/get')

const API = {
    APINavbar,
    APIHome,
    APITentang,
    APILayanan,
    APIBerita
}

export default API