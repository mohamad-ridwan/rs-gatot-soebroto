import GetBerita from "./berita/get"
import GetHome from "./home/get"
import GetLayanan from "./layanan/get"
import GetMedia from "./media/get"
import GetNavbar from "./navbar/get"
import GetTentang from "./tentang/get"
import GetZonaIntegritas from "./zonaintegritas/get"

const APINavbar = () => GetNavbar('v1/navbar/get')
const APIHome = () => GetHome('v2/home/get')
const APITentang = () => GetTentang('v3/tentang/get')
const APILayanan = () => GetLayanan('v4/layanan/get')
const APIBerita = () => GetBerita('v5/berita/get')
const APIMedia = () => GetMedia('v6/media/get')
const APIZonaIntegritas = () => GetZonaIntegritas('v7/zona-integritas/get')

const API = {
    APINavbar,
    APIHome,
    APITentang,
    APILayanan,
    APIBerita,
    APIMedia,
    APIZonaIntegritas
}

export default API