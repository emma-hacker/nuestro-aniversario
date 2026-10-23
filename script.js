// ====== FECHA ESPECIAL ======
const FECHA_ESPECIAL = new Date(2024, 10, 1, 0, 0, 0); // 01/11/2024

// ====== CORAZONES DE FONDO ======
function crearCorazones() {
  const cont = document.getElementById('heartsBg');
  const emojis = ['❤️','💕','💖','💗','🌸','✨'];
  for (let i = 0; i < 22; i++) {
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.animationDuration = (8 + Math.random() * 10) + 's';
    s.style.animationDelay = (Math.random() * 6) + 's';
    s.style.fontSize = (14 + Math.random() * 18) + 'px';
    cont.appendChild(s);
  }
}
crearCorazones();

// ====== NAVEGACIÓN ENTRE PANTALLAS ======
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  document.getElementById(id).classList.add('activa');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ====== GENERAR RAMO ======
function generarRamo() {
  const contFlores = document.getElementById('ramoFlores');
  const contTallos = document.getElementById('ramoTallos');
  if (!contFlores || !contTallos) return;
  contFlores.innerHTML = '';
  contTallos.innerHTML = '';

  const paletas = [
    { p1: '#F8A5C2', p2: '#F06292' },
    { p1: '#FFAB91', p2: '#FF7043' },
    { p1: '#F48FB1', p2: '#EC407A' },
    { p1: '#CE93D8', p2: '#AB47BC' },
    { p1: '#FFB6C1', p2: '#F48FB1' }
  ];

  const capas = [
    { n: 1,  radioY: 0,   radioX: 0,   tamanoBase: 74, delayBase: 1.4 },
    { n: 8,  radioY: 35,  radioX: 55,  tamanoBase: 66, delayBase: 1.1 },
    { n: 15, radioY: 68,  radioX: 92,  tamanoBase: 58, delayBase: 0.8 }
  ];

  let index = 0;

  capas.forEach((capa, ci) => {
    for (let i = 0; i < capa.n; i++) {
      const angulo = capa.n === 1 ? 0 : (360 / capa.n) * i + (ci * 10);
      const rad = (angulo - 90) * Math.PI / 180;

      const x = Math.cos(rad) * capa.radioX;
      const y = Math.sin(rad) * capa.radioY;

      const jx = (Math.random() - 0.5) * 10;
      const jy = (Math.random() - 0.5) * 6;
      const tamano = capa.tamanoBase + (Math.random() - 0.5) * 8;
      const paleta = paletas[(index + ci) % paletas.length];

      // ----- FLOR -----
      const flor = document.createElement('div');
      flor.className = 'flor';
      flor.style.setProperty('--tamano', tamano + 'px');
      flor.style.setProperty('--color-petalo', paleta.p1);
      flor.style.setProperty('--color-petalo-2', paleta.p2);
      flor.style.setProperty('--delay', (capa.delayBase + i * 0.04) + 's');
      flor.style.left = `calc(50% + ${x + jx}px)`;
      flor.style.bottom = `calc(65% + ${y + jy}px)`;
      flor.style.zIndex = 10 + (2 - ci);
      contFlores.appendChild(flor);

      // ----- TALLO -----
      if (ci > 0) {
        const amarreX = 180;
        const amarreY = 320;
        const florCenterX = 180 + x + jx;
        const florCenterY = 380 - (380 * 0.65 + y + jy);

        const dx = florCenterX - amarreX;
        const dy = florCenterY - amarreY;
        const distancia = Math.sqrt(dx * dx + dy * dy);
        const anguloTallo = Math.atan2(dx, -dy) * (180 / Math.PI);

        const tallo = document.createElement('div');
        tallo.className = 'tallo';
        tallo.style.setProperty('--altura', distancia + 'px');
        tallo.style.setProperty('--delay-tallo', (capa.delayBase - 0.4 + i * 0.03) + 's');
        tallo.style.bottom = (380 - amarreY) + 'px';
        tallo.style.left = amarreX + 'px';
        tallo.style.transformOrigin = 'bottom center';
        tallo.style.transform = `translateX(-50%) rotate(${anguloTallo}deg)`;
        contTallos.appendChild(tallo);

        if (i % 3 === 0) {
          const hoja = document.createElement('div');
          hoja.className = 'hoja-tallo';
          hoja.style.bottom = '40%';
          hoja.style.left = (i % 2 === 0 ? '4px' : '-28px');
          hoja.style.transform = i % 2 === 0 ? 'rotate(-30deg)' : 'rotate(-150deg)';
          tallo.appendChild(hoja);
        }
      }
      index++;
    }
  });
  console.log(`Ramo generado con ${index} flores`);
}

// ====== PANTALLA 1: BLOQUEO ======
const inputFecha = document.getElementById('inputFecha');
const btnEntrar = document.getElementById('btnEntrar');
const mensajeError = document.getElementById('mensajeError');

btnEntrar.addEventListener('click', () => {
  const valor = inputFecha.value;
  if (valor === '2024-11-01') {
    mensajeError.textContent = '';
    iniciarContador();
    escribirCarta();
    mostrarPantalla('pantallaCarta');
  } else {
    mensajeError.textContent = 'Casi, Amorchiii… inténtalo otra vez 😏 (pista: fue el día que todo empezó)';
  }
});

// ====== PANTALLA 2: CONTADOR ======
let intervaloContador = null;
function iniciarContador() {
  if (intervaloContador) return;
  actualizarContador();
  intervaloContador = setInterval(actualizarContador, 1000);

  const frases = [
    'Y cada segundo sigue valiendo la pena…',
    '10 mil horas y contando, Amorchiii ❤️',
    'Mi lugar seguro eres tú.',
    'Cada día a tu lado es mi favorito.',
    'Y esto apenas comienza…'
  ];
  let idx = 0;
  const fraseEl = document.getElementById('fraseContador');
  setInterval(() => {
    idx = (idx + 1) % frases.length;
    fraseEl.style.opacity = 0;
    setTimeout(() => {
      fraseEl.textContent = frases[idx];
      fraseEl.style.opacity = 1;
    }, 400);
  }, 5000);
}

function calcularDiferencia(desde, hasta) {
  let anios = hasta.getFullYear() - desde.getFullYear();
  let meses = hasta.getMonth() - desde.getMonth();
  let dias = hasta.getDate() - desde.getDate();
  let horas = hasta.getHours() - desde.getHours();
  let minutos = hasta.getMinutes() - desde.getMinutes();
  let segundos = hasta.getSeconds() - desde.getSeconds();

  if (segundos < 0) { segundos += 60; minutos--; }
  if (minutos < 0) { minutos += 60; horas--; }
  if (horas < 0) { horas += 24; dias--; }
  if (dias < 0) {
    const diasMesAnterior = new Date(hasta.getFullYear(), hasta.getMonth(), 0).getDate();
    dias += diasMesAnterior;
    meses--;
  }
  if (meses < 0) { meses += 12; anios--; }
  return { anios, meses, dias, horas, minutos, segundos };
}

function actualizarContador() {
  const ahora = new Date();
  const d = calcularDiferencia(FECHA_ESPECIAL, ahora);
  document.getElementById('anios').textContent = d.anios;
  document.getElementById('meses').textContent = d.meses;
  document.getElementById('dias').textContent = d.dias;
  document.getElementById('horas').textContent = String(d.horas).padStart(2,'0');
  document.getElementById('minutos').textContent = String(d.minutos).padStart(2,'0');
  document.getElementById('segundos').textContent = String(d.segundos).padStart(2,'0');
}

// ====== PANTALLA 2: CARTA ======
const TEXTO_CARTA = `Son 2 años, 24 meses, 730 días y más de 10 mil horas juntos, viviendo momentos felices y dolorosos. Reímos, lloramos, nos mentamos la madre y, en varias ocasiones, amenazamos con terminar esta relación.

Amor, son más de 10 mil horas que he pasado a tu lado y no quiero que terminen. No soy perfecto y tampoco el mejor hombre que pudiste encontrar, pero sí soy un loco desquiciado que está a las 3 a.m. dando vueltas en la cama por ver cómo solucionar cada problema que tuvimos en el día y previniendo los conflictos que vengan.

Te amo con el alma, mi vida 🥹`;

let cartaEscrita = false;
function escribirCarta() {
  if (cartaEscrita) return;
  cartaEscrita = true;
  const el = document.getElementById('textoCarta');
  const btn = document.getElementById('btnSiguienteCarta');
  let i = 0;
  function escribir() {
    if (i < TEXTO_CARTA.length) {
      el.textContent += TEXTO_CARTA.charAt(i);
      i++;
      setTimeout(escribir, 40);
    } else {
      btn.classList.remove('oculto');
    }
  }
  escribir();
}

document.getElementById('btnSiguienteCarta').addEventListener('click', () => {
  mostrarPantalla('pantallaQuiz');
  cargarPregunta();
});

// ====== PANTALLA 3: QUIZ ======
const PREGUNTAS = [
  { pregunta: '¿Dónde fue nuestro primer beso?', opciones: ['En el cine', 'En Walmart', 'En una fiesta'], correcta: 1, feedback: '¡Ese día no me lo saco ni de la cabeza! 😏' },
  { pregunta: '¿Cuál es mi mayor sueño contigo?', opciones: ['Viajar por el mundo', 'Casarnos y tener esa familia que tanto soñamos', 'Comprar una casa'], correcta: 1, feedback: 'Sí, mi amor. Esa familia que tanto soñamos es mi meta contigo 💍' },
  { pregunta: '¿De qué flores era el primer ramo que te compré?', opciones: ['Rosas rojas', 'Lilis', 'Girasoles'], correcta: 1, feedback: 'Nunca se me va a olvidar ese día 🌷' },
  { pregunta: '¿Cuáles son las 3 razones por las que sigo a tu lado?', opciones: ['Porque te amo, eres mi lugar seguro y soy feliz a tu lado', 'Porque eres bonita y ya', 'Por costumbre'], correcta: 0, feedback: 'Así es. Te amo, eres mi lugar seguro y soy feliz a tu lado ❤️' },
  { pregunta: '¿Cuál es mi viaje soñado contigo?', opciones: ['Un crucero por el Caribe', 'Un viaje en moto por carretera', 'Un viaje a París'], correcta: 1, feedback: '¡Un viaje en moto por carretera, mi amor! Solos tú y yo, sin nada que nos moleste 🏍️' }
];

let indicePregunta = 0;
let aciertos = 0;

function cargarPregunta() {
  const p = PREGUNTAS[indicePregunta];
  document.getElementById('progresoQuiz').textContent = `Pregunta ${indicePregunta + 1} de ${PREGUNTAS.length}`;
  document.getElementById('preguntaTexto').textContent = p.pregunta;
  const cont = document.getElementById('opciones');
  cont.innerHTML = '';
  document.getElementById('feedbackQuiz').textContent = '';
  document.getElementById('btnSiguientePregunta').classList.add('oculto');

  p.opciones.forEach((op, i) => {
    const btn = document.createElement('button');
    btn.className = 'opcion';
    btn.textContent = op;
    btn.addEventListener('click', () => responder(i, btn));
    cont.appendChild(btn);
  });
}

function responder(indice, btn) {
  const p = PREGUNTAS[indicePregunta];
  const botones = document.querySelectorAll('.opcion');
  botones.forEach(b => b.disabled = true);

  if (indice === p.correcta) {
    btn.classList.add('correcta');
    aciertos++;
    document.getElementById('feedbackQuiz').textContent = p.feedback;
  } else {
    btn.classList.add('incorrecta');
    botones[p.correcta].classList.add('correcta');
    document.getElementById('feedbackQuiz').textContent = 'Uy… era la otra, Amorchiii 😅 Igual te amo.';
  }

  const btnSig = document.getElementById('btnSiguientePregunta');
  btnSig.classList.remove('oculto');
  btnSig.textContent = indicePregunta === PREGUNTAS.length - 1 ? 'Ver resultado 💖' : 'Siguiente ➡️';
}

document.getElementById('btnSiguientePregunta').addEventListener('click', () => {
  indicePregunta++;
  if (indicePregunta < PREGUNTAS.length) {
    cargarPregunta();
  } else {
    mostrarResultadoFinal();
  }
});

// ====== PANTALLA 4: FINAL ======
function mostrarResultadoFinal() {
  document.getElementById('puntajeFinal').textContent = `${aciertos} / ${PREGUNTAS.length}`;
  let msg = '';
  if (aciertos === 5) msg = 'Eres oficialmente la persona que más me conoce. Te amo, Amorchiii.';
  else if (aciertos >= 3) msg = 'Casi perfecto, Amorchiii. Pero igual te amo aunque falles 😏';
  else msg = 'Uy… tendremos que repasar nuestra historia, mi amor. Igual te amo muchísimo.';
  document.getElementById('mensajeFinalQuiz').textContent = msg;
  mostrarPantalla('pantallaFinal');
  setTimeout(generarRamo, 150);
}

// ====== VOLVER AL INICIO ======
document.getElementById('btnVolverInicio').addEventListener('click', () => {
  indicePregunta = 0;
  aciertos = 0;
  cartaEscrita = false;
  document.getElementById('textoCarta').textContent = '';
  document.getElementById('btnSiguienteCarta').classList.add('oculto');
  mostrarPantalla('pantallaBloqueo');
});

// ====== PWA: SERVICE WORKER + INSTALACIÓN ======
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  });
}

let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
});

document.getElementById('btnInstalar').addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') deferredPrompt = null;
    return;
  }

  const esIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const modal = document.createElement('div');
  modal.className = 'modal-instrucciones';
  
  if (esIOS) {
    modal.innerHTML = `
      <div class="modal-contenido">
        <h3>Para guardar en tu iPhone 📱</h3>
        <span class="icono-paso">1️⃣</span>
        <p>Toca el botón de <b>Compartir</b> en la barra de abajo de Safari (el cuadrito con la flecha hacia arriba ⬆️).</p>
        <span class="icono-paso">2️⃣</span>
        <p>Desliza hacia abajo y toca <b>"Añadir a pantalla de inicio"</b>.</p>
        <span class="icono-paso">3️⃣</span>
        <p>Toca <b>"Añadir"</b> arriba a la derecha. ¡Listo, ya tienes tu app!</p>
        <button class="btn-cerrar-modal">Entendido ❤️</button>
      </div>
    `;
  } else {
    modal.innerHTML = `
      <div class="modal-contenido">
        <h3>Para guardar en tu Android 🤖</h3>
        <span class="icono-paso">1️⃣</span>
        <p>Toca los <b>tres puntos</b> arriba a la derecha en tu navegador Chrome.</p>
        <span class="icono-paso">2️⃣</span>
        <p>Busca y toca <b>"Instalar aplicación"</b> o <b>"Añadir a pantalla de inicio"</b>.</p>
        <span class="icono-paso">3️⃣</span>
        <p>Confirma tocando <b>"Instalar"</b>. ¡Ya está en tu celular!</p>
        <button class="btn-cerrar-modal">Entendido ❤️</button>
      </div>
    `;
  }

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('activo'), 10);

  const cerrarModal = () => {
    modal.classList.remove('activo');
    setTimeout(() => document.body.removeChild(modal), 300);
  };
  
  modal.querySelector('.btn-cerrar-modal').addEventListener('click', cerrarModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) cerrarModal(); });
});
