type ValorLabel = {
    value: number;
    label: string;
  };
  
export function crearObtenerEtiqueta<T extends ValorLabel>(datos: T[]) {
    return function obtenerEtiqueta(valor: number): string {
      const valorObtenido = datos.find(data => data.value === valor);
      return valorObtenido ? valorObtenido.label : '';
    };
  }
  
