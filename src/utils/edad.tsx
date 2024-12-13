import "@/utils/utils.css";
// edad

// Función para calcular la edad a partir de una fecha de nacimiento
export function calcularEdad(nacimiento: string): string {
  const hoy = new Date();
  const fechaNac = new Date(nacimiento);

  let años = hoy.getFullYear() - fechaNac.getFullYear();
  let meses = hoy.getMonth() - fechaNac.getMonth();
  let dias = hoy.getDate() - fechaNac.getDate();
  if (meses < 0 || (meses === 0 && dias < 0)) {
    años--;
    meses += 12;
    if (dias < 0) {
      meses--;
      dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
    }
  } else if (dias < 0) {
    meses--;
    dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }

  return `${años} años ${meses} meses ${dias} días`;
}

export function calcularAños(nacimiento: string): string {
  const hoy = new Date();
  const fechaNac = new Date(nacimiento);

  let años = hoy.getFullYear() - fechaNac.getFullYear();
  let meses = hoy.getMonth() - fechaNac.getMonth();
  let dias = hoy.getDate() - fechaNac.getDate();
  if (meses < 0 || (meses === 0 && dias < 0)) {
    años--;
    meses += 12;
    if (dias < 0) {
      meses--;
      dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
    }
  } else if (dias < 0) {
    meses--;
    dias += new Date(hoy.getFullYear(), hoy.getMonth(), 0).getDate();
  }

  return `${años}`;
}
