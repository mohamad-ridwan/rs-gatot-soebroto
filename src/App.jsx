import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import './App.css'
import store from './services/redux/store'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Tentang from './pages/tentang/Tentang'
import Layanan from './pages/layanan/Layanan'
import Berita from './pages/berita/Berita'
import DetailBerita from './pages/berita/detailberita/DetailBerita'
import Media from './pages/media/Media'
import DetailMedia from './pages/media/detailmedia/DetailMedia'
import Pdf from './pages/pdf/Pdf'
import ZonaIntegritas from './pages/zonaintegritas/ZonaIntegritas'
import LayananPengaduan from './pages/layananpengaduan/LayananPengaduan'
import Kontak from './pages/kontak/Kontak'
import Ppid from './pages/ppid/Ppid'
import Search from './pages/search/Search'
import DetailLayanan from './pages/layanan/detaillayanan/DetailLayanan'
import NavbarMobile from './components/navbarmobile/NavbarMobile'
import NotFound from './pages/notfound/NotFound'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Router versi terbaru */}
        <BrowserRouter>
          <Navbar />
          <NavbarMobile />
          <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='/kontak' element={<Kontak />} />
            <Route path='/ppid' element={<Ppid />}>
              <Route path='/ppid/:path' element={<Ppid />} />
              <Route path='/ppid/:id/:pathTwo' element={<Ppid />} />
            </Route>
            <Route path='/layanan-pengaduan-masyarakat' element={<LayananPengaduan />} />
            <Route path='/whistle-blowing-system' element={<ZonaIntegritas />} />
            <Route path='/media/publikasi/pdf/:idPdf' element={<Pdf />} />
            <Route path='/media/:id/:path' element={<DetailMedia />} />
            <Route path='/media/:id' element={<Media />} />
            <Route path='/entry/:path' element={<DetailBerita />} />
            <Route path='/entries' element={<Berita />} />
            <Route path='/layanan/:id/:path' element={<DetailLayanan />} />
            <Route path='/layanan/:id' element={<Layanan />} />
            <Route path='/tentang/:id' element={<Tentang />} />
            <Route path='/' element={<Home />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
