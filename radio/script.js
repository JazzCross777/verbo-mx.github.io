/* ═══════════════════════════════════════════════════════════════
   RADIO BELÉN — script.js
   Funcionalidades: Reproductor, Chat, Programación, Devocional,
   Eventos, Muro de Oración, Modo Oscuro, Mini Player, SEO helpers
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ═══════════════════════════════════════════════════════════════
   1. CONFIGURACIÓN — Edita aquí tus datos reales
   ═══════════════════════════════════════════════════════════════ */
const CONFIG = {
  /* ── URL del stream de audio ──────────────────────────────
     Formatos soportados:
     • Icecast/Shoutcast: 'http://tuservidor.com:8000/stream'
     • HLS (.m3u8):       'https://tuservidor.com/live.m3u8'
     • MP3 directo:       'https://tuservidor.com/live.mp3'
     ────────────────────────────────────────────────────────── */
  streamUrl: '',   // ← COLOCA TU URL DE STREAM AQUÍ

  /* ── Número de WhatsApp ───────────────────────────────────── */
  waNumber: '528717975096',

  /* ── Nombre de la radio ──────────────────────────────────── */
  radioName: 'Radio Belén',

  /* ── Animar contador de oyentes (rango realista) ─────────── */
  listenersMin: 980,
  listenersMax: 1580,
};


/* ═══════════════════════════════════════════════════════════════
   2. DATOS DE PROGRAMACIÓN
   ═══════════════════════════════════════════════════════════════ */
const SCHEDULE = {
  /* Días: 0=Lun, 1=Mar, ..., 6=Dom */
  0: [ // Lunes
    { time:'06:00', name:'Mañana de Alabanza',     host:'Equipo Radio Belén',   type:'music' },
    { time:'08:00', name:'Devocional Matutino',    host:'Pastor Gerardo Cruz',  type:'devo'  },
    { time:'09:00', name:'Música Cristiana',       host:'Automático',           type:'music' },
    { time:'12:00', name:'El Mediodía en Dios',    host:'Leticia Cruz',         type:'show'  },
    { time:'14:00', name:'Prédicas del Día',       host:'Archivo',              type:'preach'},
    { time:'17:00', name:'Tardes de Adoración',    host:'Damaris Cruz',         type:'music' },
    { time:'19:00', name:'La Hora de la Familia',  host:'Leticia Cruz',         type:'show'  },
    { time:'21:00', name:'Noche de Alabanza',      host:'Equipo Belén',         type:'music' },
  ],
  1: [ // Martes
    { time:'06:00', name:'Mañana de Alabanza',     host:'Equipo Radio Belén',   type:'music' },
    { time:'08:00', name:'Devocional Matutino',    host:'Pastor Gerardo Cruz',  type:'devo'  },
    { time:'10:00', name:'La Biblia en 5 Minutos', host:'Roberto Sánchez',      type:'bible' },
    { time:'12:00', name:'Ministerio al Mediodía', host:'Damaris Cruz',         type:'show'  },
    { time:'15:00', name:'Canciones de Fe',        host:'Automático',           type:'music' },
    { time:'19:00', name:'Tiempo de Reflexión',    host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'22:00', name:'Música Cristiana Noche', host:'Automático',           type:'music' },
  ],
  2: [ // Miércoles
    { time:'06:00', name:'Mañana de Alabanza',     host:'Equipo Radio Belén',   type:'music' },
    { time:'08:00', name:'Devocional Matutino',    host:'Pastor Gerardo Cruz',  type:'devo'  },
    { time:'11:00', name:'Hits Cristianos',        host:'Leticia Cruz',         type:'music' },
    { time:'14:00', name:'Palabra de Vida',        host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'17:00', name:'Kids en Belén',          host:'Equipo Kids',          type:'show'  },
    { time:'19:00', name:'Noche de Victoria',      host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'21:00', name:'Alabanza Continua',      host:'Automático',           type:'music' },
  ],
  3: [ // Jueves
    { time:'06:00', name:'Mañana de Alabanza',     host:'Equipo Radio Belén',   type:'music' },
    { time:'08:00', name:'Devocional Matutino',    host:'Leticia Cruz',         type:'devo'  },
    { time:'10:00', name:'Música de Restauración', host:'Automático',           type:'music' },
    { time:'13:00', name:'El Mediodía en Dios',    host:'Damaris Cruz',         type:'show'  },
    { time:'16:00', name:'Prédicas Clásicas',      host:'Archivo',              type:'preach'},
    { time:'20:00', name:'Noche de Adoración',     host:'Equipo Belén',         type:'music' },
  ],
  4: [ // Viernes
    { time:'06:00', name:'Mañana de Alabanza',     host:'Equipo Radio Belén',   type:'music' },
    { time:'08:00', name:'Devocional Matutino',    host:'Pastor Gerardo Cruz',  type:'devo'  },
    { time:'11:00', name:'Especial de Alabanza',   host:'Damaris Cruz',         type:'music' },
    { time:'14:00', name:'Jesús Sana y Libera',    host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'17:00', name:'Top 10 Cristiano',       host:'Leticia Cruz',         type:'music' },
    { time:'19:00', name:'Noche de Oración',       host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'22:00', name:'Alabanza Fin de Semana', host:'Automático',           type:'music' },
  ],
  5: [ // Sábado
    { time:'07:00', name:'Despertar en Adoración', host:'Damaris Cruz',         type:'music' },
    { time:'09:00', name:'Estudio Bíblico Sábado', host:'Roberto Sánchez',      type:'bible' },
    { time:'12:00', name:'Alabanza Sabatina',      host:'Leticia Cruz',         type:'music' },
    { time:'15:00', name:'Testimonios de Fe',      host:'Comunidad Belén',      type:'show'  },
    { time:'18:00', name:'Preparando el Domingo',  host:'Pastor Gerardo Cruz',  type:'devo'  },
    { time:'21:00', name:'Música Cristiana Noche', host:'Automático',           type:'music' },
  ],
  6: [ // Domingo
    { time:'08:00', name:'Música Dominical',       host:'Equipo Radio Belén',   type:'music' },
    { time:'10:00', name:'Pre-Servicio',           host:'Leticia Cruz',         type:'music' },
    { time:'12:00', name:'🔴 SERVICIO EN VIVO',    host:'Iglesia Cristiana Belén', type:'live'},
    { time:'14:00', name:'Post-Servicio Alabanza', host:'Damaris Cruz',         type:'music' },
    { time:'16:00', name:'Prédica Repetición',     host:'Pastor Gerardo Cruz',  type:'preach'},
    { time:'19:00', name:'Tarde Dominical',        host:'Equipo Belén',         type:'music' },
    { time:'21:00', name:'Cierre del Domingo',     host:'Pastor Gerardo Cruz',  type:'devo'  },
  ],
};

/* ═══════════════════════════════════════════════════════════════
   3. DEVOCIONALES
   ═══════════════════════════════════════════════════════════════ */
const DEVOTIONALS = [
  {
    verse: '"No os conforméis a este siglo, sino transformaos por medio de la renovación de vuestro entendimiento, para que comprobéis cuál sea la buena voluntad de Dios, agradable y perfecta."',
    ref: '— Romanos 12:2',
    text: 'Dios nos llama a una transformación profunda. No se trata de cambiar el exterior, sino de renovar la mente con la Palabra. Cada día es una oportunidad para pensar como Cristo piensa, ver como Él ve y amar como Él ama.',
  },
  {
    verse: '"Todo lo puedo en Cristo que me fortalece."',
    ref: '— Filipenses 4:13',
    text: 'No se trata de fuerza propia, sino de la que viene de Cristo. Cuando te sientas débil, recuerda que Su poder se perfecciona en tu debilidad. Declara esta verdad sobre tu vida hoy.',
  },
  {
    verse: '"Porque yo sé los pensamientos que tengo acerca de vosotros, dice Jehová, pensamientos de paz, y no de mal, para daros el fin que esperáis."',
    ref: '— Jeremías 29:11',
    text: 'Dios tiene planes extraordinarios para ti. En medio de la incertidumbre, confía en que Sus propósitos son buenos. Él conoce tu futuro y lo está preparando con cuidado.',
  },
  {
    verse: '"El Señor es mi pastor; nada me faltará."',
    ref: '— Salmo 23:1',
    text: 'Cuando tienes a Dios como tu pastor, no hay escasez que pueda derrotarte. Él provee, guía y protege a Sus ovejas. Descansa hoy en Su cuidado perfecto.',
  },
  {
    verse: '"Echa sobre Jehová tu carga, y él te sustentará; no dejará para siempre caído al justo."',
    ref: '— Salmo 55:22',
    text: '¿Qué peso estás cargando hoy? La invitación de Dios es clara: dáselo a Él. No fuiste diseñado para cargarlo solo. Su poder y amor son más que suficientes.',
  },
  {
    verse: '"Deléitate asimismo en Jehová, y él te concederá las peticiones de tu corazón."',
    ref: '— Salmo 37:4',
    text: 'El secreto de ver tus deseos cumplidos está en deleitarte en Dios. Cuando Él es tu mayor tesoro, tus deseos se alinean con los Suyos y nada es imposible.',
  },
  {
    verse: '"Mas buscad primeramente el reino de Dios y su justicia, y todas estas cosas os serán añadidas."',
    ref: '— Mateo 6:33',
    text: 'Las prioridades correctas producen resultados sobrenaturales. Cuando pones a Dios primero, todo lo demás encuentra su lugar. Hoy, ponlo a Él en el primer lugar de tu agenda.',
  },
];

/* ═══════════════════════════════════════════════════════════════
   4. EVENTOS PRÓXIMOS
   ═══════════════════════════════════════════════════════════════ */
const EVENTS = [
  { day:'20', month:'Sep', title:'Conferencia Aviva 2025', meta:'6:00 PM · Auditorio Principal · Torreón', tag:'Conferencia' },
  { day:'05', month:'Oct', title:'Día de la Familia Belén', meta:'10:00 AM · Explanada Iglesia · Entrada libre', tag:'Familia'  },
  { day:'12', month:'Oct', title:'Noche Generación Fuego', meta:'7:00 PM · Auditorio Jóvenes · Entrada libre', tag:'Jóvenes'  },
  { day:'18', month:'Oct', title:'Inicio Escuela Bíblica 2025-B', meta:'8:30 AM · Salón Educación · Inscripciones abiertas', tag:'Escuela'  },
  { day:'25', month:'Oct', title:'Maratón de Oración 24h', meta:'Todo el día · Capilla de Oración', tag:'Oración'  },
];

/* ═══════════════════════════════════════════════════════════════
   5. CHAT EN VIVO — Mensajes de ejemplo
   ═══════════════════════════════════════════════════════════════ */
const CHAT_SAMPLE = [
  { name:'María G.',   msg:'¡Bendiciones desde Monterrey! 🙏',         time:'10:24' },
  { name:'Carlos V.',  msg:'Esta música me llena el alma ✝',            time:'10:26' },
  { name:'Lupita M.',  msg:'Gracias Señor por otro día de vida ❤️',     time:'10:28' },
  { name:'José R.',    msg:'¡Viva Radio Belén! Escuchando desde CDMX',  time:'10:29' },
  { name:'Fer H.',     msg:'Me encanta el devocional de hoy 💛',        time:'10:31' },
  { name:'Ana P.',     msg:'¡Que Dios bendiga a toda la comunidad!',    time:'10:33' },
  { name:'Roberto S.', msg:'Alabado sea el Señor 🙌 Desde Saltillo',    time:'10:34' },
  { name:'Daniela F.', msg:'Hermosa transmisión esta mañana ☀️',        time:'10:36' },
];

/* ═══════════════════════════════════════════════════════════════
   6. MURO DE ORACIÓN — Peticiones de ejemplo
   ═══════════════════════════════════════════════════════════════ */
const PRAYER_SAMPLES = [
  { name:'Hermano R.',   text:'Oración por mi madre que está en el hospital. Gracias.',       time:'Hace 5 min'  },
  { name:'Familia M.',   text:'Por la restauración de nuestro matrimonio.',                   time:'Hace 12 min' },
  { name:'Anónimo',      text:'Señor, necesito trabajo urgente. Confío en Ti.',               time:'Hace 18 min' },
  { name:'Lupita V.',    text:'Por mi hijo que se alejó de Dios. Que regrese al Padre.',      time:'Hace 30 min' },
  { name:'Anónimo',      text:'Gracias Señor por sanarme. Testimonio de Su fidelidad 🙌',    time:'Hace 45 min' },
];

/* ═══════════════════════════════════════════════════════════════
   7. ESTADO GLOBAL DE LA APP
   ═══════════════════════════════════════════════════════════════ */
const STATE = {
  isPlaying:       false,
  isDark:          true,
  currentDevo:     0,
  currentDayIndex: 0,
  volume:          0.8,
};

/* ═══════════════════════════════════════════════════════════════
   8. REFERENCIAS DOM
   ═══════════════════════════════════════════════════════════════ */
const $ = id => document.getElementById(id);
const audio         = $('radio-audio');
const mainPlayBtn   = $('main-play-btn');
const playIcon      = $('play-icon');
const volSlider     = $('volume-slider');
const miniPlayer    = $('mini-player');
const miniPlayBtn   = $('mini-play-btn');
const miniIcon      = $('mini-icon');
const miniVol       = $('mini-vol');
const visualizer    = $('visualizer');
const artwork       = document.querySelector('.artwork-inner');

/* ═══════════════════════════════════════════════════════════════
   9. REPRODUCTOR DE RADIO
   ═══════════════════════════════════════════════════════════════ */

/** Aplicar URL del stream y arrancar */
function applyStream() {
  const url = $('stream-url').value.trim();
  if (!url) { alert('Ingresa una URL de stream válida.'); return; }
  CONFIG.streamUrl = url;
  const src = $('radio-source');
  src.src = url;
  audio.load();
  togglePlay();
}

/** Play / Pause principal */
function togglePlay() {
  if (!CONFIG.streamUrl && !audio.src) {
    alert('⚠️ Configura primero la URL de tu stream en el campo de arriba.');
    return;
  }
  if (STATE.isPlaying) {
    audio.pause();
    setPlayState(false);
  } else {
    if (!audio.src || audio.src === window.location.href) {
      audio.src = CONFIG.streamUrl;
      $('radio-source').src = CONFIG.streamUrl;
    }
    audio.volume = STATE.volume;
    audio.play().catch(() => {
      alert('No se pudo conectar al stream. Verifica la URL.');
      setPlayState(false);
    });
  }
}

function setPlayState(playing) {
  STATE.isPlaying = playing;
  const icon = playing ? '⏸' : '▶';
  playIcon.textContent    = icon;
  miniIcon.textContent    = icon;
  if (artwork) artwork.classList.toggle('spinning', playing);
  visualizer.classList.toggle('paused', !playing);
  miniPlayer.classList.toggle('paused', !playing);
  $('current-track').textContent = playing ? 'Transmisión en vivo' : 'Presiona ▶ para escuchar';
}

audio.addEventListener('playing', () => setPlayState(true));
audio.addEventListener('pause',   () => setPlayState(false));
audio.addEventListener('error',   () => {
  setPlayState(false);
  console.warn('Radio: Error de stream.');
});

/** Control de volumen */
function syncVolume(v) {
  STATE.volume     = parseFloat(v);
  audio.volume     = STATE.volume;
  volSlider.value  = STATE.volume;
  if (miniVol) miniVol.value = STATE.volume;
}
volSlider?.addEventListener('input', e => syncVolume(e.target.value));
miniVol?.addEventListener('input',   e => syncVolume(e.target.value));

/** Compartir la radio */
function shareRadio() {
  const data = {
    title: 'Radio Belén — Radio Cristiana en Vivo',
    text:  'Escucha Radio Belén, música cristiana y prédicas las 24 horas.',
    url:   window.location.href,
  };
  if (navigator.share) {
    navigator.share(data).catch(() => {});
  } else {
    navigator.clipboard?.writeText(window.location.href)
      .then(() => alert('¡Link copiado al portapapeles!'));
  }
}

/** Aplicar stream desde la URL del campo */
window.applyStream  = applyStream;
window.togglePlay   = togglePlay;
window.shareRadio   = shareRadio;

/* ═══════════════════════════════════════════════════════════════
   10. MINI REPRODUCTOR
   ═══════════════════════════════════════════════════════════════ */

/** Mostrar el mini player al hacer scroll pasado el reproductor principal */
function initMiniPlayer() {
  const playerSection = document.querySelector('.player-section');
  if (!playerSection || !miniPlayer) return;

  const observer = new IntersectionObserver(entries => {
    const outOfView = !entries[0].isIntersecting;
    miniPlayer.hidden = !outOfView;
  }, { threshold: 0 });

  observer.observe(playerSection);

  $('mini-play-btn')?.addEventListener('click', togglePlay);
  $('mini-close')?.addEventListener('click', () => {
    miniPlayer.hidden = true;
  });
  miniPlayer.hidden = true;
}

/* ═══════════════════════════════════════════════════════════════
   11. PROGRAMACIÓN SEMANAL
   ═══════════════════════════════════════════════════════════════ */

function renderSchedule(dayIndex) {
  const grid   = $('prog-grid');
  const items  = SCHEDULE[dayIndex] || [];
  const now    = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();

  // Encontrar programa actual
  let currentIdx = -1;
  const today = (new Date().getDay() + 6) % 7; // 0=Lun
  if (dayIndex === today) {
    for (let i = 0; i < items.length; i++) {
      const [h, m] = items[i].time.split(':').map(Number);
      const startMin = h * 60 + m;
      const nextMin  = i < items.length - 1
        ? parseInt(items[i+1].time) * 60 + parseInt(items[i+1].time.split(':')[1])
        : 1440;
      if (nowMin >= startMin && nowMin < nextMin) { currentIdx = i; break; }
    }
  }

  grid.innerHTML = items.map((item, i) => {
    const isNow  = i === currentIdx;
    const isNext = i === currentIdx + 1;
    const badge  = isNow ? '<span class="prog-item__badge live">● En vivo</span>'
                 : isNext ? '<span class="prog-item__badge next">Siguiente</span>'
                 : '';
    return `
      <div class="prog-item ${isNow ? 'now-playing' : ''}">
        <div class="prog-item__time">${item.time}</div>
        <div class="prog-item__info">
          <div class="prog-item__name">${item.name}</div>
          <div class="prog-item__host">${item.host}</div>
        </div>
        ${badge}
      </div>`;
  }).join('');
}

function initSchedule() {
  const tabs = document.querySelectorAll('.prog-tab');
  const todayIdx = (new Date().getDay() + 6) % 7;

  tabs.forEach((tab, i) => {
    if (i === todayIdx) {
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    }
    tab.addEventListener('click', () => {
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected','false'); });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      renderSchedule(parseInt(tab.dataset.day));
    });
  });

  renderSchedule(todayIdx);
}

/* ═══════════════════════════════════════════════════════════════
   12. DEVOCIONAL DEL DÍA
   ═══════════════════════════════════════════════════════════════ */

function renderDevocional(index) {
  const devo   = DEVOTIONALS[index % DEVOTIONALS.length];
  const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  const now    = new Date();
  $('devo-date').textContent      = `${now.getDate()} de ${months[now.getMonth()]}, ${now.getFullYear()}`;
  $('devo-verse-text').textContent = devo.verse;
  $('devo-verse-ref').textContent  = devo.ref;
  $('devo-text').textContent       = devo.text;
  $('mini-title').textContent      = 'Radio Belén · En Vivo';
}

function nextDevocional() {
  STATE.currentDevo = (STATE.currentDevo + 1) % DEVOTIONALS.length;
  renderDevocional(STATE.currentDevo);
}

function shareDevocional() {
  const devo = DEVOTIONALS[STATE.currentDevo];
  const text = `${devo.verse}\n${devo.ref}\n\nEscúchalo en Radio Belén → ${window.location.href}`;
  if (navigator.share) {
    navigator.share({ title:'Devocional Radio Belén', text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard?.writeText(text).then(() => alert('Devocional copiado ✓'));
  }
}

window.nextDevocional  = nextDevocional;
window.shareDevocional = shareDevocional;

/* ═══════════════════════════════════════════════════════════════
   13. EVENTOS
   ═══════════════════════════════════════════════════════════════ */

function renderEvents() {
  const list = $('eventos-list');
  if (!list) return;
  list.innerHTML = EVENTS.map(ev => `
    <div class="evento-item reveal">
      <div class="evento-item__date">
        <span>${ev.day}</span>${ev.month}
      </div>
      <div class="evento-item__info">
        <div class="evento-item__title">${ev.title}</div>
        <div class="evento-item__meta">📍 ${ev.meta}</div>
      </div>
      <span class="evento-item__tag">${ev.tag}</span>
    </div>
  `).join('');
}

/* ═══════════════════════════════════════════════════════════════
   14. CHAT EN VIVO
   ═══════════════════════════════════════════════════════════════ */

function renderChat() {
  const ul = $('chat-messages');
  if (!ul) return;
  ul.innerHTML = CHAT_SAMPLE.map(m => `
    <li class="chat-msg">
      <div class="chat-msg__header">
        <span class="chat-msg__name">${m.name}</span>
        <span class="chat-msg__time">${m.time}</span>
      </div>
      <div class="chat-msg__bubble">${escapeHtml(m.msg)}</div>
    </li>
  `).join('');
  ul.scrollTop = ul.scrollHeight;
}

/** Enviar mensaje del usuario */
function sendChatMessage(e) {
  e.preventDefault();
  const input = $('chat-input');
  const text  = input.value.trim();
  if (!text) return;

  const ul  = $('chat-messages');
  const now = new Date();
  const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const li  = document.createElement('li');
  li.className = 'chat-msg own';
  li.innerHTML = `
    <div class="chat-msg__header">
      <span class="chat-msg__name">Tú</span>
      <span class="chat-msg__time">${time}</span>
    </div>
    <div class="chat-msg__bubble">${escapeHtml(text)}</div>`;
  ul.appendChild(li);
  ul.scrollTop = ul.scrollHeight;
  input.value = '';

  // Respuesta automática simulada
  setTimeout(() => {
    addAutoReply(ul);
  }, 2500 + Math.random() * 2000);
}

window.sendChatMessage = sendChatMessage;

const AUTO_REPLIES = [
  { name:'Moderador Belén', msg:'¡Dios te bendiga! Gracias por sintonizarnos 🙏' },
  { name:'Leticia C.',      msg:'Amén hermano/a ❤️ que el Señor te llene hoy' },
  { name:'Carlos V.',       msg:'¡Gloria a Dios! Que bueno tenerte aquí 🙌' },
  { name:'María G.',        msg:'Bendecido por escuchar Radio Belén ✝' },
];

function addAutoReply(ul) {
  const reply = AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)];
  const now   = new Date();
  const time  = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  const li    = document.createElement('li');
  li.className = 'chat-msg';
  li.innerHTML = `
    <div class="chat-msg__header">
      <span class="chat-msg__name">${reply.name}</span>
      <span class="chat-msg__time">${time}</span>
    </div>
    <div class="chat-msg__bubble">${reply.msg}</div>`;
  ul.appendChild(li);
  ul.scrollTop = ul.scrollHeight;
}

/** Contador de oyentes simulado */
function initListeners() {
  const el = $('listeners-count');
  if (!el) return;
  setInterval(() => {
    const n = CONFIG.listenersMin + Math.floor(Math.random() * (CONFIG.listenersMax - CONFIG.listenersMin));
    el.textContent = n.toLocaleString('es-MX');
  }, 8000);
}

/** Contador de chat activos simulado */
function initChatCount() {
  const el = $('chat-count');
  if (!el) return;
  setInterval(() => {
    const n = 28 + Math.floor(Math.random() * 20);
    el.textContent = `${n} activos`;
  }, 12000);
}

/* ═══════════════════════════════════════════════════════════════
   15. MURO DE ORACIÓN
   ═══════════════════════════════════════════════════════════════ */

function renderPrayerWall() {
  const wall = $('prayer-wall');
  if (!wall) return;
  wall.innerHTML = PRAYER_SAMPLES.map(p => prayerItemHTML(p)).join('');
}

function prayerItemHTML(p) {
  return `
    <li class="prayer-item">
      <div class="prayer-item__header">
        <span class="prayer-item__name">🙏 ${p.name}</span>
        <span class="prayer-item__time">${p.time}</span>
      </div>
      <p>${escapeHtml(p.text)}</p>
      <div class="prayer-item__pray" onclick="this.textContent = '✓ Oré por esto'">
        🙏 Orar por esto
      </div>
    </li>`;
}

/** Enviar petición de oración */
function submitPrayer(e) {
  e.preventDefault();
  const name    = $('prayer-name').value.trim() || 'Anónimo';
  const request = $('prayer-request').value.trim();
  const pub     = $('prayer-public').checked;

  if (!request) {
    $('prayer-request').focus();
    return;
  }

  if (pub) {
    const wall = $('prayer-wall');
    const li   = document.createElement('li');
    li.innerHTML = prayerItemHTML({ name, text: request, time: 'Ahora mismo' });
    wall.firstChild
      ? wall.insertBefore(li.firstElementChild, wall.firstChild)
      : wall.appendChild(li.firstElementChild);
  }

  // Redirigir a WhatsApp si NO es pública
  if (!pub) {
    const msg = encodeURIComponent(`🙏 Petición de oración:\n\nNombre: ${name}\n\n${request}`);
    window.open(`https://wa.me/${CONFIG.waNumber}?text=${msg}`, '_blank', 'noopener');
  }

  // Reset form
  e.target.reset();
  $('prayer-char-count').textContent = '0 / 500';
  alert(`✅ Petición enviada. Oraremos por ti, ${name}.`);
}

window.submitPrayer = submitPrayer;

/** Contador de caracteres */
$('prayer-request')?.addEventListener('input', function() {
  $('prayer-char-count').textContent = `${this.value.length} / 500`;
});

/* ═══════════════════════════════════════════════════════════════
   16. MODO OSCURO / CLARO
   ═══════════════════════════════════════════════════════════════ */

function initTheme() {
  const saved = localStorage.getItem('radioTheme');
  if (saved === 'light') {
    document.body.classList.remove('dark-mode');
    STATE.isDark = false;
    $('theme-icon').textContent = '🌙';
  }
}

function toggleTheme() {
  STATE.isDark = !STATE.isDark;
  document.body.classList.toggle('dark-mode', STATE.isDark);
  $('theme-icon').textContent = STATE.isDark ? '☀️' : '🌙';
  localStorage.setItem('radioTheme', STATE.isDark ? 'dark' : 'light');
}

$('theme-toggle')?.addEventListener('click', toggleTheme);

/* ═══════════════════════════════════════════════════════════════
   17. NAVBAR
   ═══════════════════════════════════════════════════════════════ */

function initNavbar() {
  const header    = $('site-header');
  const hamburger = $('hamburger');
  const mobileNav = $('mobile-nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
    $('back-top').classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  hamburger?.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
    mobileNav.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Active link en scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let cur = '';
    sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) cur = s.id; });
    document.querySelectorAll('.nav__links a').forEach(a => {
      a.classList.toggle('active', a.getAttribute('href') === `#${cur}`);
    });
  }, { passive: true });
}

/* ═══════════════════════════════════════════════════════════════
   18. SCROLL REVEAL
   ═══════════════════════════════════════════════════════════════ */

function initScrollReveal() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ═══════════════════════════════════════════════════════════════
   19. LAZY LOAD DE IFRAMES (videos)
   ═══════════════════════════════════════════════════════════════ */

window.loadVideo = function(placeholder) {
  const videoId = placeholder.dataset.video;
  if (!videoId || videoId.includes('YOUTUBE_VIDEO_ID')) {
    alert('Reemplaza YOUTUBE_VIDEO_ID con el ID real de tu video de YouTube.');
    return;
  }
  const iframe = placeholder.previousElementSibling;
  iframe.src   = iframe.dataset.src;
  placeholder.style.display = 'none';
};

/* ═══════════════════════════════════════════════════════════════
   20. UTILIDADES
   ═══════════════════════════════════════════════════════════════ */

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* Año en el footer */
const footerYear = $('footer-year');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* Cierre con Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    $('mobile-nav')?.classList.remove('open');
    $('hamburger')?.classList.remove('open');
    document.body.style.overflow = '';
  }
});

/* ═══════════════════════════════════════════════════════════════
   21. INICIALIZACIÓN
   ═══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initSchedule();
  renderDevocional(STATE.currentDevo);
  renderEvents();
  renderChat();
  renderPrayerWall();
  initMiniPlayer();
  initListeners();
  initChatCount();

  /* Scroll reveal (incluye elementos generados dinámicamente) */
  setTimeout(initScrollReveal, 100);

  /* Aplicar stream desde CONFIG si ya está definido */
  if (CONFIG.streamUrl) {
    const src   = $('radio-source');
    src.src     = CONFIG.streamUrl;
    audio.load();
    /* Ocultar el campo de configuración en producción */
    const cfg = $('stream-config');
    if (cfg) cfg.style.display = 'none';
  }

  console.log(`%c📻 ${CONFIG.radioName} — Script cargado correctamente`, 'color:#C9A84C;font-weight:bold;font-size:14px');
});
