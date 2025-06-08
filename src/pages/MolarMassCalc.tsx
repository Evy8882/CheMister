import Header from '../components/Header';
import { useState } from 'react';
import elements from '../data/elements.json';

function MolarMassCalc(){
    const [mol, setMol] = useState<string>("");

    function calc(mol: string): string[] {
        // let totalMass = 0;
        const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
        let nmol: string[] = upperLetters.reduce((acc, letter) => { return acc.replace(`${letter}`, ` ${letter}`); }, mol).split(" ").filter((e) => e !== "");	
        console.log(nmol);
        return nmol;
    }

    return (
        <div className="molar-mass-calc-page">
            <Header/>
            <h1>Calculadora de Massa Molar</h1>
            <input type="text" className="mol-input" value={mol} onChange={(e)=>{setMol(e.target.value);}} />
            {mol}<br/>
            {calc(mol)}
        </div>
    )
}
export default MolarMassCalc;