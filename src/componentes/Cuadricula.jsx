// eslint-disable-next-line react/prop-types
export const Cuadricula = ({ children, actualizarTabla, indices, className, esSeleccionado }) => {

    const seleccioando = `${className} 
        ${esSeleccionado ? 'turno-abajo-seleccionado' : ''}`;
  
    //metodo click si hacemos click y es el array
    const clickCuadricula = () => {
      if (indices !== undefined && indices !== null) {
        actualizarTabla(indices);
      }
  
    }
  
    return (
      <div onClick={clickCuadricula} className={seleccioando}>
        {children}
      </div>
    )
  }