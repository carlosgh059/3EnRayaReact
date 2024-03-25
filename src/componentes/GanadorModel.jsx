 // eslint-disable-next-line react/prop-types
 export function GanadorModal ({ganador, resetear}){

if(ganador==null)return
const winnerText = ganador !== 'Empate' ? 'Ganador' : '';
    return(
                <section className='winner'>
                  <div className='text'>
                    <h2>
                      {winnerText}
                    </h2>
          
                    <header className='win grande'>
                      {ganador}
                    </header>
          
                    <footer>
                      <button onClick={resetear}>Empezar de nuevo</button>
                    </footer>
                  </div>
                </section>  
            )
}
    
   
