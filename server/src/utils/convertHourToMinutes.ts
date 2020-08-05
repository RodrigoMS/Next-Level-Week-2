/* Converte horas em minutos. */

export default function convertHourToMinutes(time: string): number {
  /* split - Apartir de um caracter específico no caso ":", divide a
     string em um array numérico atravez do map. Desistruturando em
     duas variáveis "hour" e "minutes" */
  const [hour, minutes] = time.split(':').map(Number);
  
  const timeInMinutes = (hour * 60) + minutes;

  return timeInMinutes;
}