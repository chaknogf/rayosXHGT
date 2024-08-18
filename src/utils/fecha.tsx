
export function formatoFecha(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Formatea la fecha en el formato 'dd-MM-yyyy'
    return `${dia} - ${mes} - ${anio}`;
}
  
export function fechaCarta(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Nombre del mes
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const nombreMes = meses[parseInt(mes) - 1];

    // Formatea la fecha en el formato 'dd de nombreMes de aaaa'
    return `${dia} de ${nombreMes} de ${anio}`;
}
  

export function fechaCorta(fecha: string): string {
    if (!fecha) return ''; // Manejo de fecha nula o vacía

    // Divide la fecha en año, mes y día
    const partes = fecha.split('-');
    if (partes.length !== 3) return fecha; // Comprueba si la fecha tiene el formato esperado

    const [anio, mes, dia] = partes;

    // Nombre del mes
    const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const nombreMes = meses[parseInt(mes) - 1];

    // Formatea la fecha en el formato 'dd de nombreMes de aaaa'
    return `${dia} ${nombreMes} ${anio}`;
  }