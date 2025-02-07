import { Unidad } from './unidad.js';

export class JuegoEstrategia {
  constructor(epoch = 'Guerra de Independencia (1810-1818)') {
    try {
      this.tamañoTablero = 12; 
      this.tablero = Array(this.tamañoTablero).fill().map(() => Array(this.tamañoTablero).fill(null));
      this.turnoJugador = true;
      this.unidadSeleccionada = null;
      
      // Updated epochs with precise unit details matching user's specifications
      this.epocas = {
        'Guerra de Independencia (1810-1818)': {
          patriota: [
            new Unidad('Granadero a Caballo', 'patriota', 80, 8, 6, 3, 1, 'Carga de Caballería', '🐎'),
            new Unidad('Soldado de Infantería', 'patriota', 60, 5, 4, 2, 2, 'Formación en línea', '🎖️')
          ],
          realista: [
            new Unidad('Húsar Real', 'realista', 75, 7, 5, 3, 1, 'Disciplina militar', '🏇')
          ]
        },
        'Guerra Civil (1828-1831)': {
          patriota: [
            new Unidad('Lancero Unitario', 'patriota', 70, 6, 4, 3, 1, 'Ataque de Caballería', '🐎')
          ],
          realista: [
            new Unidad('Montonero Federal', 'realista', 65, 5, 3, 4, 1, 'Movilidad Rápida', '🚩')
          ]
        },
        'Guerra del Paraguay (1864-1870)': {
          patriota: [
            new Unidad('Infantería de Línea', 'patriota', 85, 7, 6, 2, 2, 'Formación Defensiva', '🎖️')
          ],
          realista: [
            new Unidad('Infantería Paraguaya', 'realista', 80, 6, 7, 2, 2, 'Resistencia', '🇵🇾')
          ]
        },
        'Guerra de Malvinas (1982)': {
          patriota: [
            new Unidad('Soldado Conscripto', 'patriota', 70, 7, 5, 2, 2, 'Defensa del Territorio', '🎖️'),
            new Unidad('Comando', 'patriota', 85, 9, 6, 3, 2, 'Operaciones Especiales', '🏹')
          ],
          realista: [
            new Unidad('Royal Marine', 'realista', 90, 8, 7, 2, 2, 'Entrenamiento de Elite', '🇬🇧')
          ]
        }
      };

      // Similar structure to hold detailed unit information
      this.periodUnidadesDetalles = {
        'Guerra de Independencia (1810-1818)': {
          patriota: [
            { 
              tipo: 'Granadero a Caballo', 
              icono: '🐎', 
              detalles: { 
                movimiento: 3, 
                daño: 8, 
                radio: 1, 
                defensa: 6, 
                vida: 80,
                especial: 'Carga de Caballería'
              }
            },
            { 
              tipo: 'Soldado de Infantería', 
              icono: '🎖️', 
              detalles: { 
                movimiento: 2, 
                daño: 5, 
                radio: 2, 
                defensa: 4, 
                vida: 60,
                especial: 'Formación en línea'
              }
            }
          ],
          realista: [
            { 
              tipo: 'Húsar Real', 
              icono: '🏇', 
              detalles: { 
                movimiento: 3, 
                daño: 7, 
                radio: 1, 
                defensa: 5, 
                vida: 75,
                especial: 'Disciplina militar'
              }
            }
          ]
        },
        'Guerra Civil (1828-1831)': {
          patriota: [
            { 
              tipo: 'Lancero Unitario', 
              icono: '🐎', 
              detalles: { 
                movimiento: 3, 
                daño: 6, 
                radio: 1, 
                defensa: 4, 
                vida: 70,
                especial: 'Ataque de Caballería'
              }
            }
          ],
          realista: [
            { 
              tipo: 'Montonero Federal', 
              icono: '🚩', 
              detalles: { 
                movimiento: 4, 
                daño: 5, 
                radio: 1, 
                defensa: 3, 
                vida: 65,
                especial: 'Movilidad Rápida'
              }
            }
          ]
        },
        'Guerra del Paraguay (1864-1870)': {
          patriota: [
            { 
              tipo: 'Infantería de Línea', 
              icono: '🎖️', 
              detalles: { 
                movimiento: 2, 
                daño: 7, 
                radio: 2, 
                defensa: 6, 
                vida: 85,
                especial: 'Formación Defensiva'
              }
            }
          ],
          realista: [
            { 
              tipo: 'Infantería Paraguaya', 
              icono: '🇵🇾', 
              detalles: { 
                movimiento: 2, 
                daño: 6, 
                radio: 2, 
                defensa: 7, 
                vida: 80,
                especial: 'Resistencia'
              }
            }
          ]
        },
        'Guerra de Malvinas (1982)': {
          patriota: [
            { 
              tipo: 'Soldado Conscripto', 
              icono: '🎖️', 
              detalles: { 
                movimiento: 2, 
                daño: 7, 
                radio: 2, 
                defensa: 5, 
                vida: 70,
                especial: 'Defensa del Territorio'
              }
            },
            { 
              tipo: 'Comando', 
              icono: '🏹', 
              detalles: { 
                movimiento: 3, 
                daño: 9, 
                radio: 2, 
                defensa: 6, 
                vida: 85,
                especial: 'Operaciones Especiales'
              }
            }
          ],
          realista: [
            { 
              tipo: 'Royal Marine', 
              icono: '🇬🇧', 
              detalles: { 
                movimiento: 2, 
                daño: 8, 
                radio: 2, 
                defensa: 7, 
                vida: 90,
                especial: 'Entrenamiento de Elite'
              }
            }
          ]
        }
      };

      this.periodo = epoch;
      this.inicializar();
    } catch (error) {
      console.error('Error in JuegoEstrategia constructor:', error);
      alert('Error inicializando el juego. Recarga la página.');
    }
  }

  inicializar() {
    try {
      const tableroEl = document.getElementById('tablero');
      
      // Verificar si el tablero existe
      if (!tableroEl) {
        console.error('Elemento de tablero no encontrado');
        return;
      }

      // Limpiar tablero
      tableroEl.innerHTML = '';
      tableroEl.style.gridTemplateColumns = `repeat(${this.tamañoTablero}, 1fr)`;
      
      // Verificar si el período existe en epocas
      const periodData = this.epocas[this.periodo];
      if (!periodData) {
        console.error(`Período no encontrado: ${this.periodo}`);
        return;
      }

      const unidadesPatriota = periodData.patriota;
      const unidadesRealista = periodData.realista;
      
      // Validar unidades
      if (!unidadesPatriota || !unidadesRealista) {
        console.error('Unidades no definidas para este período');
        return;
      }
      
      // Colocar unidades en posiciones aleatorias
      this.colocarUnidadesAleatoriamente(unidadesPatriota, 'patriota');
      this.colocarUnidadesAleatoriamente(unidadesRealista, 'realista');
      
      // Crear celdas del tablero
      for (let i = 0; i < this.tamañoTablero; i++) {
        for (let j = 0; j < this.tamañoTablero; j++) {
          const celda = document.createElement('button');
          celda.className = 'celda';
          celda.dataset.fila = i;
          celda.dataset.columna = j;
          celda.addEventListener('click', () => this.manejarClick(i, j));
          tableroEl.appendChild(celda);
        }
      }
      
      this.mostrarDetallesUnidades();
      this.actualizarTablero();
      this.actualizarEstado();
      this.mostrarTutorial();
    } catch (error) {
      console.error('Error en inicializar:', error);
      alert('Error al inicializar el juego. Recarga la página.');
    }
  }

  colocarUnidadesAleatoriamente(unidades, equipo) {
    const zonaDespliege = equipo === 'patriota' 
      ? { filaInicio: 0, filaFin: Math.floor(this.tamañoTablero / 3) }  
      : { filaInicio: this.tamañoTablero - Math.floor(this.tamañoTablero / 3) - 1, filaFin: this.tamañoTablero - 1 };  

    unidades.forEach(unidad => {
      let colocada = false;
      while (!colocada) {
        const fila = Math.floor(Math.random() * (zonaDespliege.filaFin - zonaDespliege.filaInicio + 1)) + zonaDespliege.filaInicio;
        const columna = Math.floor(Math.random() * this.tamañoTablero);
        
        if (!this.tablero[fila][columna]) {
          this.tablero[fila][columna] = unidad;
          colocada = true;
        }
      }
    });
  }

  mostrarTutorial() {
    const tutorialEl = document.getElementById('tutorial');
    tutorialEl.innerHTML = `
      <h2>Tutorial de Juego Histórico: ${this.periodo}</h2>
      <div class="tutorial-seccion">
        <h3>🎮 Sistema de Combate</h3>
        <p>Cada unidad tiene características únicas que reflejan su contexto histórico:</p>
        <ul>
          <li>🎲 Daño: Basado en ataque de la unidad + variación aleatoria</li>
          <li>🛡️ Defensa: Reduce el daño recibido</li>
          <li>💥 Especiales: Habilidades únicas que dan ventaja táctica</li>
        </ul>
      </div>
      <div class="tutorial-seccion">
        <h3>🏹 Unidades en este Período</h3>
        <h4>Patriotas</h4>
        <ul>
          <li>🐎 Granadero a Caballo
            <br>Especial: Carga de Caballería (+2 daño primer ataque)
          </li>
          <li>🎖️ Soldado de Infantería
            <br>Especial: Formación en línea (+1 defensa por aliado adyacente)
          </li>
        </ul>
        <h4>Realistas</h4>
        <ul>
          <li>🏇 Húsar Real
            <br>Especial: Disciplina militar (+1 moral)
          </li>
        </ul>
      </div>
      <div class="tutorial-seccion">
        <h3>🚶 Movimiento</h3>
        <ul>
          <li>Cada unidad tiene movimiento y radio de ataque distintos</li>
          <li>Muévete en casillas adyacentes</li>
          <li>Ataca unidades enemigas cercanas</li>
        </ul>
      </div>
    `;
  }

  encontrarUnidadMasCercana(filaOrigen, colOrigen, equipoObjetivo) {
    let mejorDistancia = Infinity;
    let mejorPosicion = null;

    for (let i = 0; i < this.tamañoTablero; i++) {
      for (let j = 0; j < this.tamañoTablero; j++) {
        const unidad = this.tablero[i][j];
        if (unidad && unidad.equipo === equipoObjetivo) {
          const distancia = Math.abs(filaOrigen - i) + Math.abs(colOrigen - j);
          if (distancia < mejorDistancia) {
            mejorDistancia = distancia;
            mejorPosicion = [i, j];
          }
        }
      }
    }

    return mejorPosicion;
  }

  obtenerMejorMovimiento(filaOrigen, colOrigen, filaDestino, colDestino) {
    const movimientos = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],          [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    let mejorMovimiento = null;
    let mejorDistancia = Infinity;

    for (const [dFila, dCol] of movimientos) {
      const nuevaFila = filaOrigen + dFila;
      const nuevaCol = colOrigen + dCol;

      if (nuevaFila >= 0 && nuevaFila < this.tamañoTablero && 
          nuevaCol >= 0 && nuevaCol < this.tamañoTablero && 
          !this.tablero[nuevaFila][nuevaCol]) {
        
        const distancia = Math.abs(nuevaFila - filaDestino) + 
                        Math.abs(nuevaCol - colDestino);
        
        if (distancia < mejorDistancia) {
          mejorDistancia = distancia;
          mejorMovimiento = [nuevaFila, nuevaCol];
        }
      }
    }

    return mejorMovimiento;
  }

  turnoIA() {
    // Encontrar una unidad IA al azar
    const unidadesIA = [];
    for (let i = 0; i < this.tamañoTablero; i++) {
      for (let j = 0; j < this.tamañoTablero; j++) {
        if (this.tablero[i][j]?.equipo === 'realista') {
          unidadesIA.push([i, j]);
        }
      }
    }

    if (unidadesIA.length === 0) {
      this.finJuego('patriota');
      return;
    }

    const [filaIA, colIA] = unidadesIA[Math.floor(Math.random() * unidadesIA.length)];
    const unidadIA = this.tablero[filaIA][colIA];

    // Encontrar la unidad del jugador más cercana
    const posicionJugador = this.encontrarUnidadMasCercana(filaIA, colIA, 'patriota');

    if (!posicionJugador) {
      this.finJuego('realista');
      return;
    }

    const [filaJugador, colJugador] = posicionJugador;

    // Si está adyacente, atacar
    if (this.esAdyacente(filaIA, colIA, filaJugador, colJugador)) {
      const unidadJugador = this.tablero[filaJugador][colJugador];
      const resultado = unidadIA.atacar(unidadJugador);
      document.getElementById('estado').textContent = 
          `¡La IA atacó causando ${resultado.danioFinal} de daño!`;

      if (unidadJugador.vida <= 0) {
        this.tablero[filaJugador][colJugador] = null;
      }
    } else {
      // Mover estratégicamente hacia el jugador
      const mejorMovimiento = this.obtenerMejorMovimiento(
          filaIA, colIA, filaJugador, colJugador
      );

      if (mejorMovimiento) {
        const [nuevaFila, nuevaCol] = mejorMovimiento;
        this.tablero[nuevaFila][nuevaCol] = unidadIA;
        this.tablero[filaIA][colIA] = null;
      }
    }

    this.turnoJugador = true;
    this.actualizarTablero();
    this.verificarFinJuego();
  }

  manejarClick(fila, columna) {
    const unidad = this.tablero[fila][columna];
    
    if (unidad && !unidad.viva) {
      return;
    }

    if (!this.turnoJugador) return;

    if (this.unidadSeleccionada) {
      const [filaOrigen, colOrigen] = this.unidadSeleccionada;
      const unidadSeleccionada = this.tablero[filaOrigen][colOrigen];
      
      const distanciaHorizontal = Math.abs(filaOrigen - fila);
      const distanciaVertical = Math.abs(colOrigen - columna);
      const distanciaTotal = distanciaHorizontal + distanciaVertical;
      
      if (unidad && unidad.equipo === 'realista' && 
          this.esAdyacente(filaOrigen, colOrigen, fila, columna)) {
        // Atacar
        const resultado = unidadSeleccionada.atacar(unidad);
        
        document.getElementById('estado').innerHTML = 
            `Tu ${unidadSeleccionada.tipo} atacó causando ${resultado.danioFinal} de daño!<br>` ;
            /* `(Ataque: ${resultado.danioBase}, Defensa reducida: ${resultado.reduccionDefensa})`; */
        
        if (unidad.vida <= 0) {
          this.tablero[fila][columna] = null;
        }
        
        this.finalizarTurno();
        return;
      }
      
      if (!unidad && distanciaTotal <= unidadSeleccionada.movimiento) {
        // Mover
        this.tablero[fila][columna] = this.tablero[filaOrigen][colOrigen];
        this.tablero[filaOrigen][colOrigen] = null;
        this.finalizarTurno();
        return;
      }
    }
    
    if (unidad && unidad.equipo === 'patriota') {
      this.unidadSeleccionada = [fila, columna];
      this.mostrarMovimientosPosibles(fila, columna);
    } else {
      this.unidadSeleccionada = null;
    }
    
    this.actualizarTablero();
  }

  finalizarTurno() {
    this.unidadSeleccionada = null;
    this.turnoJugador = false;
    this.actualizarTablero();
    if (!this.verificarFinJuego()) {
      setTimeout(() => this.turnoIA(), 1000);
    }
  }

  esAdyacente(fila1, col1, fila2, col2) {
    return Math.abs(fila1 - fila2) <= 1 && Math.abs(col1 - col2) <= 1;
  }

  mostrarMovimientosPosibles(fila, columna) {
    const celdas = document.querySelectorAll('.celda');
    const unidad = this.tablero[fila][columna];
    
    // Clear previous possible movements
    celdas.forEach(celda => {
      celda.classList.remove('posible-movimiento');
      celda.classList.remove('rango-movimiento');
      celda.classList.remove('movimiento-margen');
    });

    // Find all possible movement cells based on unit's movement range
    celdas.forEach(celda => {
      const i = parseInt(celda.dataset.fila);
      const j = parseInt(celda.dataset.columna);
      
      // Calculate diagonal, horizontal, and vertical distances
      const distanciaHorizontal = Math.abs(fila - i);
      const distanciaVertical = Math.abs(columna - j);
      const distanciaMaxima = Math.max(distanciaHorizontal, distanciaVertical);
      
      // Check if the cell is within movement range
      if (distanciaMaxima <= unidad.movimiento && 
          (this.tablero[i][j] === null || 
           (this.tablero[i][j] && this.tablero[i][j].equipo === 'realista'))) {
        
        // Highlight movement range
        celda.classList.add('rango-movimiento');
        
        // Highlight movement margin
        if (distanciaMaxima === unidad.movimiento) {
          celda.classList.add('movimiento-margen');
        }
        
        // Highlight adjacent cells for attack
        if (Math.abs(fila - i) <= 1 && Math.abs(columna - j) <= 1) {
          celda.classList.add('posible-movimiento');
        }
      }
    });
  }

  mostrarDetallesUnidades() {
    const unidadesDetallesEl = document.getElementById('unidades-detalles');
    const periodData = this.periodUnidadesDetalles[this.periodo];

    let contenidoHTML = `
      <h2>Unidades en ${this.periodo}</h2>
      <div class="unidades-grid">
    `;

    // Patriotas
    contenidoHTML += `
      <div class="unidades-equipo patriota">
        <h3> Unidades Argentinas</h3>
    `;
    periodData.patriota.forEach(unidad => {
      contenidoHTML += this.generarDetalleUnidad(unidad);
    });
    contenidoHTML += `</div>`;

    // Realistas
    contenidoHTML += `
      <div class="unidades-equipo realista">
        <h3> Unidades Enemigas</h3>
    `;
    periodData.realista.forEach(unidad => {
      contenidoHTML += this.generarDetalleUnidad(unidad);
    });
    contenidoHTML += `</div>`;

    contenidoHTML += `</div>`;
    unidadesDetallesEl.innerHTML = contenidoHTML;
  }

  generarDetalleUnidad(unidad) {
    const { tipo, icono, detalles } = unidad;
    return `
      <div class="unidad-detalle">
        <h4>${icono} ${tipo}</h4>
        <div class="unidad-stats">
          <span>🏃 Movimiento: ${detalles.movimiento}</span>
          <span>⚔️ Daño: ${detalles.daño}</span>
          <span>🎯 Radio: ${detalles.radio}</span>
          <span>🛡️ Defensa: ${detalles.defensa}</span>
          <span>❤️ Vida: ${detalles.vida}</span>
          <span>⚡ Especial: ${detalles.especial}</span>
        </div>
      </div>
    `;
  }

  finJuego(ganador) {
    const mensaje = ganador === 'patriota' ? '¡Has ganado!' : '¡La IA ha ganado!';
    document.getElementById('estado').textContent = mensaje;
    this.turnoJugador = false;
  }

  verificarFinJuego() {
    let unidadesPatriota = 0;
    let unidadesRealista = 0;

    for (let i = 0; i < this.tamañoTablero; i++) {
      for (let j = 0; j < this.tamañoTablero; j++) {
        const unidad = this.tablero[i][j];
        if (unidad && unidad.vida > 0) {  
          if (unidad.equipo === 'patriota') unidadesPatriota++;
          else unidadesRealista++;
        }
      }
    }

    if (unidadesPatriota === 0) {
      this.finJuego('realista');
      return true;
    }
    if (unidadesRealista === 0) {
      this.finJuego('patriota');
      return true;
    }
    return false;
  }

  actualizarEstado() {
    const estadoEl = document.getElementById('estado');
    const mensaje = this.turnoJugador 
      ? 'Selecciona y mueve tus unidades' 
      : '🚩 Turno de Realistas: La IA está planeando su movimiento';
    estadoEl.innerHTML = `
      <div class="estado-turno">
        <span class="turno-icono">${this.turnoJugador ? '🇦🇷' : '🚩'}</span>
        ${mensaje}
      </div>
    `;
  }

  actualizarTablero() {
    const celdas = document.querySelectorAll('.celda');
    
    celdas.forEach(celda => {
      const i = parseInt(celda.dataset.fila);
      const j = parseInt(celda.dataset.columna);
      const unidad = this.tablero[i][j];
      
      celda.className = 'celda';
      celda.innerHTML = '';
      
      if (unidad && unidad.viva) {
        celda.classList.add(unidad.equipo === 'patriota' ? 'jugador' : 'ia');
        celda.innerHTML = `
          <div class="unidad-tipo">${unidad.icono} ${unidad.tipo}</div>
          <div class="vida-container">
            <div class="vida-bar" style="width: ${(unidad.vida / unidad.vidaMaxima) * 100}%"></div>
            <span class="vida-text">❤️ ${unidad.vida}/${unidad.vidaMaxima}</span>
          </div>
        `;
      }
    });
  }

  mostrarTutorial() {
    const tutorialEl = document.getElementById('tutorial');
    tutorialEl.innerHTML = `
      <h2>Tutorial de Juego Histórico: ${this.periodo}</h2>
      <div class="tutorial-seccion">
        <h3>🎮 Sistema de Combate</h3>
        <p>Cada unidad tiene características únicas que reflejan su contexto histórico:</p>
        <ul>
          <li>🎲 Daño: Basado en ataque de la unidad + variación aleatoria</li>
          <li>🛡️ Defensa: Reduce el daño recibido</li>
          <li>💥 Especiales: Habilidades únicas que dan ventaja táctica</li>
        </ul>
      </div>
      <div class="tutorial-seccion">
        <h3>🏹 Unidades en este Período</h3>
        <h4>Patriotas</h4>
        <ul>
          <li>🐎 Granadero a Caballo
            <br>Especial: Carga de Caballería (+2 daño primer ataque)
          </li>
          <li>🎖️ Soldado de Infantería
            <br>Especial: Formación en línea (+1 defensa por aliado adyacente)
          </li>
        </ul>
        <h4>Realistas</h4>
        <ul>
          <li>🏇 Húsar Real
            <br>Especial: Disciplina militar (+1 moral)
          </li>
        </ul>
      </div>
      <div class="tutorial-seccion">
        <h3>🚶 Movimiento</h3>
        <ul>
          <li>Cada unidad tiene movimiento y radio de ataque distintos</li>
          <li>Muévete en casillas adyacentes</li>
          <li>Ataca unidades enemigas cercanas</li>
        </ul>
      </div>
    `;
  }
}