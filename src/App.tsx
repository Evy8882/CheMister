import './styles/App.css'
import Home from './pages/Home'
import PeriodicTable from './pages/PeriodicTable'
import MolarMassCalc from './pages/MolarMassCalc'
import EquationBalancer from './pages/EquationBalancer'
import PhSimulator from './pages/PhSimulator'
import CalculadorSolubilidade from './pages/CalculadoraSolubilidade'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/periodic-table" element={<PeriodicTable/>} />
        <Route path="/molar-mass-calculator" element={<MolarMassCalc/>} />
        <Route path="/equation-balancer" element={<EquationBalancer/>} />
        <Route path="/ph-simulator" element={<PhSimulator/>} />
        <Route path="/CalculadorSolubilidade" element={<CalculadorSolubilidade/>} />
      </Routes>
    </Router>
  )
}

export default App
