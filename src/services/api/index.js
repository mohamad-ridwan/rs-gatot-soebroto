import GetBerita from "./berita/get"
import GetHome from "./home/get"
import GetKontak from "./kontak/get"
import PostKontak from "./kontak/post"
import GetLayanan from "./layanan/get"
import GetLayananPengaduan from "./layananpengaduan/get"
import PostLayananPengaduan from "./layananpengaduan/post"
import GetMedia from "./media/get"
import GetNavbar from "./navbar/get"
import PostPolling from "./navbar/post"
import GetPpid from "./ppid/get"
import GetTentang from "./tentang/get"
import GetZonaIntegritas from "./zonaintegritas/get"
import PostZonaIntegritas from "./zonaintegritas/post"

const APINavbar = () => GetNavbar('v1/navbar/get')
const APIPostPolling = (_id, data) => PostPolling(`v1/navbar/post/polling/data-polling/${_id}`, data)
const APIHome = () => GetHome('v2/home/get')
const APITentang = () => GetTentang('v3/tentang/get')
const APILayanan = () => GetLayanan('v4/layanan/get')
const APIBerita = () => GetBerita('v5/berita/get')
const APIMedia = () => GetMedia('v6/media/get')
const APIZonaIntegritas = () => GetZonaIntegritas('v7/zona-integritas/get')
const APIPostZonaIntegritas = (_id, data) => PostZonaIntegritas(`v7/zona-integritas/post/data-laporan/${_id}`, data)
const APILayananPengaduan = () => GetLayananPengaduan('v8/layanan-pengaduan-masyarakat/get')
const APIPostLayananPengaduan = (_id, data) => PostLayananPengaduan(`v8/layanan-pengaduan-masyarakat/post/data-laporan/${_id}`, data)
const APIPpid = () => GetPpid('v9/ppid/get')
const APIKontak = () => GetKontak('v10/kontak/get')
const APIPostKontak = (_id, data) => PostKontak(`v10/kontak/post/data/${_id}`, data)

const API = {
    APINavbar,
    APIPostPolling,
    APIHome,
    APITentang,
    APILayanan,
    APIBerita,
    APIMedia,
    APIZonaIntegritas,
    APIPostZonaIntegritas,
    APILayananPengaduan,
    APIPostLayananPengaduan,
    APIPpid,
    APIKontak,
    APIPostKontak
}

export default API