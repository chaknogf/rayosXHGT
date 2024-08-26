import { crearObtenerEtiqueta } from "@/utils/obtenerEtiqueta";
export interface Referencia {
    value: number;
    label: string;
  }
  
export const referencia: Referencia[] = [
  { value: 1, label: 'Hospital General San Juan De Dios - Guatemala' },
  { value: 2, label: 'Hospital Roosevelt - Guatemala' },
  { value: 3, label: 'Hospital Villa Nueva - Guatemala' },
  { value: 4, label: 'Hospital Regional De Amatitlán - Guatemala' },
  { value: 5, label: 'Hospital Nacional Pedro De Bethancourt - Sacatepequez' },
  { value: 6, label: 'Hospital Nacional Chimaltenango - Chimaltenango' },
  { value: 7, label: 'Hospital Distrital De Tiquisate - Escuintla' },
  { value: 8, label: 'Hospital Regional De Escuitla - Escuintal' },
  { value: 9, label: 'Hospital Intregado El Progreso - El Progreso' },
  { value: 10, label: 'Hospital Regional De Cuilapa - Santa Rosa' },
  { value: 11, label: 'Hospital Nacional Juan De Dios Rodas - Sololá' },
  { value: 12, label: 'Hospital Nacional Dr Jose Felipe Flores-  Totonicapán' },
  { value: 13, label: 'Hospital Nacional Dr Juan Jose Ortega - Quetzaltenango' },
  { value: 14, label: 'Hospital Regional De Occidente San Juan De Dios - Quetzaltenango' },
  { value: 15, label: 'Hospital Antituberculoso Dr Rodolfo Robles - Quetzaltenango' },
  { value: 16, label: 'Hospital Nacional De Mazatenango - Suchitepequez' },
  { value: 17, label: 'Hospital Nacional de Retalhuleu - Retalhuleu' },
  { value: 18, label: 'Hospital Distrital De Malacatán - San Marcos' },
  { value: 19, label: 'Hospital Nacional De San Marcos - San Marcos' },
  { value: 20, label: 'Hospital Distrital De Joyabaj - Quiché' },
  { value: 21, label: 'Hospital Distrital Uspantán - Quiché' },
  { value: 22, label: 'Hospital Nacional Santa Elena - Qiché' },
  { value: 23, label: 'Hospital Nacional De Salamá - Baja Verapaz' },
  { value: 24, label: 'Hospital Distrital Fray Bartolome De Las Casas - Alta Verapaz' },
  { value: 25, label: 'Hospital Nacional Hellen Lossi De Laugerud - Alta Verapaz' },
  { value: 26, label: 'Hospital Distrital La Tinta - Alta Verapaz' },
  { value: 27, label: 'Hospital Regional Dr Antonio Penado - Petén' },
  { value: 28, label: 'Hospital Distrital Melchor De Mencos - Petén' },
  { value: 29, label: 'Hospital Distrital De Sayaxché - Petén' },
  { value: 30, label: 'Hospital Distrital De Poptún - Petén' },
  { value: 31, label: 'Hospital Infantil Elisa Mrtinez - Izabal' },
  { value: 32, label: 'Hospital Nacional De La Amistad Guatemala Japon  - Izabal' },
  { value: 33, label: 'Hospital Regional De Zaacapa - Zacapa' },
  { value: 34, label: 'Hospital Modular Carlos Arana Osorio - Chiquimula' },
  { value: 35, label: 'Hospital Nacional Nicolasa Cruz - Jalapa' },
  { value: 36, label: 'Hospital Nacional Ernestina Viuda De Recinos - Jutiapa' },
  { value: 37, label: 'Hospital Distrital Nebaj - Qiché' },
  { value: 38, label: 'Hospital Antituberculoso San Vicente - Guatemala' },
  { value: 39, label: 'Hospital Infantil de Infectología y Rehabilitación - Guatemala' },
  { value: 40, label: 'Hospital de Salud Mental Dr Federico Mora - Guatemala' },
  { value: 41, label: 'Hospital de Ortopedia y Rehabilitación Dr Jorge V - Guatemala' },
  { value: 42, label: 'IGSS - especificar en notas' },
  { value: 43, label: 'Privado - especificar en notas' },
];

export const obtenerReferencia = crearObtenerEtiqueta(referencia);

