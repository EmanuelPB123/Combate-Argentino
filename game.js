import { JuegoEstrategia } from './juegoEstrategia.js';

let juego = new JuegoEstrategia();

function actualizarDetallesUnidades(periodo) {
  juego = new JuegoEstrategia(periodo);
}

document.getElementById('nivel-seleccion').addEventListener('change', (event) => {
  const selectedPeriod = event.target.value;
  actualizarDetallesUnidades(selectedPeriod);
});