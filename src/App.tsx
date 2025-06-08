import './styles/App.css'
import Home from './pages/Home'
import PeriodicTable from './pages/PeriodicTable'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/periodic-table" element={<PeriodicTable/>} />
      </Routes>
    </Router>
  )
}

export default App
