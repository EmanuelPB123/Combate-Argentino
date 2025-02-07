export class Unidad {
    constructor(tipo, equipo, vida, ataque, defensa, movimiento, radio, especial, icono) {
        this.tipo = tipo;
        this.equipo = equipo;
        this.vida = vida;
        this.vidaMaxima = vida;
        this.ataque = ataque;    
        this.defensa = defensa;  
        this.movimiento = movimiento;  // Represents max movement spaces
        this.radio = radio;
        this.especial = especial;
        this.moralInicial = 1;
        this.viva = true;
        this.primerAtaque = true;
        this.icono = icono || '🎖️';
    }

    atacar(objetivo) {
        let danioBase = this.ataque;
        let reduccionDefensa = objetivo.defensa;
        
        // Bonus de Carga de Caballería solo en el primer ataque
        if (this.especial === 'Carga de Caballería' && this.primerAtaque) {
            danioBase += 2;
            this.primerAtaque = false;
        }
        
        const danioFinal = Math.max(0, Math.floor(
            (danioBase + Math.random() * 2) - reduccionDefensa
        ));
        
        objetivo.vida = Math.max(0, objetivo.vida - danioFinal);
        
        // Verificar si la unidad objetivo muere
        if (objetivo.vida <= 0) {
            objetivo.viva = false;
        }
        
        return {
            danioBase,
            reduccionDefensa,
            danioFinal,
            especial: this.especial
        };
    }

    calcularDefensaEspecial(unidadesAdyacentes) {
        if (this.especial === 'Formación en línea') {
            return this.defensa + unidadesAdyacentes;
        }
        return this.defensa;
    }
}