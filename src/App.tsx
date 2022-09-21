import './styles/main.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Main'
import About from './pages/About'
import GameAds from './pages/GameAds'

function App() {
    return (
        <Router>
            <div className='App'>
                {/* <ul>
                    <li> <Link to='/'>Home</Link> </li>
                    <li> <Link to='/about'>About</Link> </li>
                    <li> <Link to='/user/meunome'>User</Link> </li>
                </ul> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='about' element={<About />} />
                    <Route path='*' element={<h1>Not Found</h1>} />
                    <Route path='game/:id' element={<GameAds />} >
                        <Route path='edit' element={<h1>Editar perfil</h1>} />
                        <Route path='Order' element={<h1>Meus Pedidos</h1>} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;