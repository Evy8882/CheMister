import './styles/App.css'
import Home from './pages/Home'
import PeriodicTable from './pages/PeriodicTable'
import MolarMassCalc from './pages/MolarMassCalc'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/periodic-table" element={<PeriodicTable/>} />
        <Route path="/molar-mass-calculator" element={<MolarMassCalc/>} />
      </Routes>
    </Router>
  )
}

export default App
