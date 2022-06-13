import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import './App.css';
import store from './services/redux/store'
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Tentang from './pages/tentang/Tentang';
import Layanan from './pages/layanan/Layanan';
import Berita from './pages/berita/Berita';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        {/* Router versi terbaru */}
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/entries' element={<Berita />} />
            <Route path='/layanan/:id' element={<Layanan />} />
            <Route path='/tentang/:id' element={<Tentang />} />
            <Route path='/' element={<Home />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
