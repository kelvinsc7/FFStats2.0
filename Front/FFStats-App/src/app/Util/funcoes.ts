export class funcoes {
    static converteToTimeHora(seconds: number): string {
      const hours = Math.floor(seconds / 3600); // Calcula as horas
      const minutes = Math.floor((seconds % 3600) / 60); // Calcula os minutos restantes
      const remainingSeconds = seconds % 60; // Calcula os segundos restantes
      
      return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(remainingSeconds)}`;
    }
  
    static converteToTime(seconds: number): string {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${this.padZero(minutes)}:${this.padZero(Number(remainingSeconds.toFixed(0)))}`;
    }
  
    private static padZero(num: number): string {
        return num < 10 ? `0${num}` : `${num}`;
      }
  }