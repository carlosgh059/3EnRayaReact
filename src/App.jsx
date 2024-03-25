import { useState } from 'react'
import './App.css'
import confetti from 'canvas-confetti'
import { Cuadricula } from './componentes/Cuadricula.jsx'
import {TURNOS}  from './constantes.js'
import { GanadorModal } from './componentes/GanadorModel'

//----------------------------COMPONENTE TABLERO-----------------------------
//componente 2
const Tablero = () => {

  const [cuadricula, setCuadricula] = useState(()=>{
    const localCuadricula=window.localStorage.getItem('cuadricula')
    return localCuadricula ? JSON.parse(localCuadricula) : new Array(9).fill(null)
  });

  const [turno, setTurnos] = useState(()=>{
    const localTurno = window.localStorage.getItem('turno')
    return localTurno ? localTurno : TURNOS.X
  });
  const [ganador, setGanador] = useState(null)


  const actualizarTablero = (indices) => {
    //comprobamos si hay ganador
    //comprobamos si ya hay espacio para colocar X o O
    if (cuadricula[indices] || ganador)
      return
  
    //actualizamos la cuadricula
    const nuevaCuadricula = [...cuadricula]
    nuevaCuadricula[indices] = turno
    setCuadricula(nuevaCuadricula);
    //actualizamos el turno y actualizamos el ganador
    const nuevoTurno = turno == TURNOS.X ? TURNOS.O : TURNOS.X
    setTurnos(nuevoTurno)

    //aqui guardamos la partida LocalStorage
    window.localStorage.setItem('cuadricula', JSON.stringify(nuevaCuadricula))
    window.localStorage.setItem('turno', nuevoTurno)

    setGanador(verificarGanador(nuevaCuadricula))
    
  }

  const resetearJuego = () =>{
    setCuadricula(new Array(9).fill(null))
    setTurnos(TURNOS.X)
    setGanador(null)

    window.localStorage.removeItem('cuadricula')
    window.localStorage.removeItem('turno')
  }


  return (
    <>
      <div className='centrar'>
        <button onClick={resetearJuego} >Resetear juego</button>
      </div>
      <section className='cuadricula'>
        {cuadricula.map((numero, index) => {
          return (
            <Cuadricula actualizarTabla={actualizarTablero} className='grande cuadricula-borde'
              key={index} indices={index}>
              {numero}
            </Cuadricula>
          )
        })}
      </section>

      <section className='turno'>
        <Cuadricula esSeleccionado={turno == TURNOS.X} className='turno-abajo grande'>
          {TURNOS.X}
        </Cuadricula>
        <Cuadricula esSeleccionado={turno == TURNOS.O} className='turno-abajo grande'>
          {TURNOS.O}
        </Cuadricula>
      </section>

      <GanadorModal ganador={ganador} resetear={resetearJuego}></GanadorModal>

    </>
  )
}

function verificarGanador(cuadricula) {

  // Verificar filas
  for (let i = 0; i < 3; i++) {
    if (cuadricula[i * 3] === cuadricula[i * 3 + 1] && cuadricula[i * 3] === cuadricula[i * 3 + 2] && cuadricula[i * 3] !== null) {
      confetti()
      return cuadricula[i * 3]; // Hay un ganador en esta fila
    }
  }

  // Verificar columnas
  for (let i = 0; i < 3; i++) {
    if (cuadricula[i] === cuadricula[i + 3] && cuadricula[i] === cuadricula[i + 6] && cuadricula[i] !== null) {
      confetti()
      return cuadricula[i]; // Hay un ganador en esta columna
    }
  }

  // Verificar diagonales
  if (cuadricula[0] === cuadricula[4] && cuadricula[0] === cuadricula[8] && cuadricula[0] !== null) {
    confetti()
    return cuadricula[0]; // Hay un ganador en la diagonal principal
  }
  if (cuadricula[2] === cuadricula[4] && cuadricula[2] === cuadricula[6] && cuadricula[2] !== null) {
    confetti()
    return cuadricula[2]; // Hay un ganador en la diagonal secundaria
  }



  if (cuadricula.every(posicion => posicion !== null)) {
    return 'Empate';
  }
  return null;
}



//componente 3
export default function App() {

  return (
    <>
      <h1>3 en raya</h1>
      <Tablero></Tablero>
    </>

  )
}

