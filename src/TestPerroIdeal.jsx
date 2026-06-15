import { useState, useEffect } from "react";
import razas from "./razas.json";

const NO_IMPORTA = "no_importa";

// ─── Paleta RSCE ────────────────────────────────────────────────────────────
const C = {
  navy:       "#3179AB",
  navyDark:   "#3179AB",
  navyLight:  "#e8eef8",
  gold:       "#FFA019",
  goldLight:  "#f5efd4",
  goldDark:   "#8a7030",
  white:      "#ffffff",
  surface:    "#f7f6f3",
  pageBg:     "#e7eaf2",
  border:     "rgba(0,48,135,0.12)",
  text:       "#0d1f45",
  muted:      "#6b7a99",
};

// ─── SVG: perro a escala (persona + perro) ──────────────────────────────────
const DOG_SIZES = {
  mini:      { w: 28, h: 24 },
  pequeno:   { w: 36, h: 30 },
  mediano:   { w: 50, h: 42 },
  grande:    { w: 64, h: 54 },
  muygrande: { w: 80, h: 66 },
};

const DogSizeIllustration = ({ size, width = 80, height = 66 }) => {
  if (size === "noImporta") {
    return (
      <svg viewBox="0 0 80 66" width={width} height={height}>
        <text x="40" y="42" textAnchor="middle" fontSize="36">?</text>
      </svg>
    );
  }

  const s = DOG_SIZES[size] || DOG_SIZES.mediano;
  return (
    <img
      src="/perro.png"
      alt={size}
      style={{
        width: s.w,
        height: s.h,
        objectFit: "contain",
      }}
    />
  );
};

 

// ─── SVG: nivel de actividad ─────────────────────────────────────────────────
const ActivityIcon = ({ level }) => {
  if (level === "bajo") return (
    <svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="30" width="32" height="10" rx="3" fill={C.navyLight} stroke={C.navy} strokeWidth="1"/>
      <rect x="12" y="28" width="6" height="3" rx="1.5" fill={C.navy}/>
      <rect x="30" y="28" width="6" height="3" rx="1.5" fill={C.navy}/>
      <circle cx="24" cy="14" r="5" fill={C.navy}/>
      <rect x="20" y="20" width="8" height="10" rx="2" fill={C.navy}/>
      <rect x="16" y="20" width="4" height="2"  rx="1" fill={C.navy}/>
      <rect x="28" y="20" width="4" height="2"  rx="1" fill={C.navy}/>
      <path d="M21 30 L19 38 M27 30 L29 38" stroke={C.navy} strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M10 42 L15 38 L20 40 L28 38 L32 40 L38 38" stroke={C.gold} strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
    </svg>
  );
  if (level === "medio") return (
    <svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="9" r="5" fill={C.navy}/>
      <rect x="20" y="15" width="8" height="11" rx="2" fill={C.navy}/>
      <rect x="14" y="16" width="6" height="2"  rx="1" fill={C.navy}/>
      <rect x="28" y="16" width="6" height="2"  rx="1" fill={C.navy}/>
      <rect x="20" y="26" width="3.5" height="13" rx="1.5" fill={C.navy} transform="rotate(-8 21.7 32)"/>
      <rect x="24.5" y="26" width="3.5" height="13" rx="1.5" fill={C.navy} transform="rotate(8 26.2 32)"/>
      <circle cx="12" cy="34" r="3" fill={C.gold} opacity="0.7"/>
      <circle cx="24" cy="38" r="3" fill={C.gold} opacity="0.7"/>
      <circle cx="36" cy="34" r="3" fill={C.gold} opacity="0.7"/>
      <path d="M12 34 L24 38 L36 34" stroke={C.gold} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 48 48" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="7" r="5" fill={C.navy}/>
      <path d="M22 14 L34 16 L38 28 L30 25 L28 36 L20 26 L12 30 L18 14 Z" fill={C.navy}/>
      <path d="M20 32 L18 42" stroke={C.navy} strokeWidth="3" strokeLinecap="round"/>
      <path d="M28 32 L30 42" stroke={C.navy} strokeWidth="3" strokeLinecap="round"/>
      <path d="M6 38 L14 30 L22 35 L32 22 L42 28" stroke={C.gold} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

// ─── SVG: tipo de vivienda ───────────────────────────────────────────────────
const HouseIcon = ({ type }) => {
  if (type === "piso") return (
    <svg viewBox="0 0 56 56" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <rect x="6"  y="10" width="44" height="38" rx="2" fill={C.navy}/>
      <rect x="6"  y="22" width="44" height="2"  fill={C.navyDark} opacity="0.5"/>
      <rect x="6"  y="34" width="44" height="2"  fill={C.navyDark} opacity="0.5"/>
      <rect x="10" y="26" width="8"  height="10" rx="1" fill="white" opacity="0.3"/>
      <rect x="24" y="26" width="8"  height="10" rx="1" fill="white" opacity="0.3"/>
      <rect x="38" y="26" width="8"  height="10" rx="1" fill="white" opacity="0.3"/>
      <rect x="22" y="36" width="12" height="12" rx="1" fill="white" opacity="0.9"/>
      <rect x="26" y="40" width="4"  height="8"  rx="0.5" fill={C.navy} opacity="0.3"/>
      <line x1="6" y1="48" x2="50" y2="48" stroke={C.gold} strokeWidth="1.5"/>
    </svg>
  );
  if (type === "piso_con_terraza") return (
    <svg viewBox="0 0 56 56" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <polygon points="28,6 52,22 4,22" fill={C.navyDark}/>
      <rect x="8"  y="22" width="40" height="28" fill={C.navy}/>
      <rect x="22" y="32" width="12" height="18" rx="1" fill="white" opacity="0.9"/>
      <rect x="26" y="36" width="4"  height="14" rx="0.5" fill={C.navy} opacity="0.3"/>
      <rect x="10" y="24" width="8"  height="7"  rx="1" fill="white" opacity="0.3"/>
      <rect x="38" y="24" width="8"  height="7"  rx="1" fill="white" opacity="0.3"/>
      <rect x="4"  y="48" width="48" height="4"  rx="1" fill={C.gold} opacity="0.7"/>
      <rect x="8"  y="44" width="4"  height="4"  rx="0.5" fill={C.gold} opacity="0.5"/>
      <rect x="44" y="44" width="4"  height="4"  rx="0.5" fill={C.gold} opacity="0.5"/>
    </svg>
  );
  return (
    <svg viewBox="0 0 56 56" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
      <polygon points="28,4 54,20 2,20" fill={C.navyDark}/>
      <rect x="6"  y="20" width="44" height="28" fill={C.navy}/>
      <rect x="22" y="30" width="12" height="18" rx="1" fill="white" opacity="0.9"/>
      <rect x="26" y="34" width="4"  height="14" rx="0.5" fill={C.navy} opacity="0.3"/>
      <rect x="8"  y="22" width="8"  height="7"  rx="1" fill="white" opacity="0.3"/>
      <rect x="40" y="22" width="8"  height="7"  rx="1" fill="white" opacity="0.3"/>
      <circle cx="10" cy="50" r="5" fill="#4caf50" opacity="0.8"/>
      <circle cx="46" cy="50" r="5" fill="#4caf50" opacity="0.8"/>
      <circle cx="6"  cy="54" r="3" fill="#4caf50" opacity="0.6"/>
      <circle cx="50" cy="54" r="3" fill="#4caf50" opacity="0.6"/>
    </svg>
  );
};

// ─── Escalas y pesos ─────────────────────────────────────────────────────────
const ESCALA_ENERGIA      = ["bajo", "medio", "alto", "muy_alto"];
const ESCALA_TAMANO       = ["pequeño", "mediano", "grande", "muy_grande"];
const ESCALA_SOCIABILIDAD = ["poco_sociable", "reservado", "sociable", "muy_sociable"];
const ESCALA_PROTECCION   = ["no_comparte_nada", "comparte_poco", "comparte", "comparte_mucho"];
const ESCALA_ENTRENAMIENTO= ["nada", "bajo", "normal", "alto", "muy_alto"];
const ESCALA_ASEO         = ["mensual", "quincenal", "semanal", "frecuente", "diario"];
const ESCALA_MUDA         = ["sin_muda", "baja", "media", "alta"];

const PESOS = {
  tamano: 4, actividad: 5, ninos: 5, temperamento: 3,
  aseo: 3, salud: 2, entrenamiento: 2, otros_perros: 3,
  tuvo_perro: 1, vivienda: 4,
};

function puntajeEscala(escala, vU, vR) {
  if (!vU || vU === NO_IMPORTA || !vR) return null;
  const i = escala.indexOf(vU), j = escala.indexOf(vR);
  if (i === -1 || j === -1) return null;
  return 1 - Math.abs(i - j) / (escala.length - 1);
}

function calcularResultado(resp) {
  const maxPts = Object.entries(PESOS).reduce(
    (a, [k, p]) => (resp[k] === NO_IMPORTA ? a : a + p), 0
  );

  const resultados = razas.map((raza) => {
    let pts = 0;

    // Tamaño
    if (resp.tamano !== NO_IMPORTA) {
      if (raza.tamano === "indiferente") pts += PESOS.tamano;
      else { const p = puntajeEscala(ESCALA_TAMANO, resp.tamano, raza.tamano); if (p !== null) pts += p * PESOS.tamano; }
    }

    // Actividad
    const pEn = puntajeEscala(ESCALA_ENERGIA, resp.actividad, raza.energia);
    if (pEn !== null) pts += pEn * PESOS.actividad;

    // Niños
    if (resp.ninos === "convive_siempre") {
      if (raza.ninos === "muy_recomendado")   pts += PESOS.ninos;
      else if (raza.ninos === "recomendado")  pts += PESOS.ninos * 0.6;
      else if (raza.ninos === "poco_recomendado") pts -= PESOS.ninos * 0.5;
      else if (raza.ninos === "no_recomendado")   pts -= PESOS.ninos * 1.5;
    } else if (resp.ninos === "alguna_visita") {
      if (raza.ninos === "muy_recomendado" || raza.ninos === "recomendado") pts += PESOS.ninos * 0.7;
      else if (raza.ninos === "no_recomendado") pts -= PESOS.ninos * 0.5;
      else pts += PESOS.ninos * 0.3;
    } else {
      pts += PESOS.ninos * 0.3;
    }

    // Temperamento
    if (resp.temperamento === "amistoso") {
      const p = puntajeEscala(ESCALA_SOCIABILIDAD, "muy_sociable", raza.sociabilidad); if (p !== null) pts += p * PESOS.temperamento;
    } else if (resp.temperamento === "independiente") {
      const p = puntajeEscala(ESCALA_SOCIABILIDAD, "reservado", raza.sociabilidad); if (p !== null) pts += p * PESOS.temperamento;
    } else if (resp.temperamento === "protector") {
      const p = puntajeEscala(ESCALA_PROTECCION, "comparte_mucho", raza.proteccion); if (p !== null) pts += p * PESOS.temperamento;
    } else if (resp.temperamento === "timido") {
      const p = puntajeEscala(ESCALA_SOCIABILIDAD, "poco_sociable", raza.sociabilidad); if (p !== null) pts += p * PESOS.temperamento;
    }

    // Entrenamiento + experiencia
    const pAd = puntajeEscala(ESCALA_ENTRENAMIENTO, resp.entrenamiento, raza.entrenamiento);
    if (pAd !== null) pts += pAd * PESOS.entrenamiento;
    if (resp.tuvo_perro === "primerizo") {
      if (raza.entrenamiento === "muy_alto") pts -= PESOS.tuvo_perro * 2;
      else if (raza.entrenamiento === "alto") pts -= PESOS.tuvo_perro;
      else pts += PESOS.tuvo_perro * 0.5;
    } else {
      pts += PESOS.tuvo_perro * 0.5;
    }

    // Aseo
    const pAs = puntajeEscala(ESCALA_ASEO, resp.aseo, raza.aseo);
    if (pAs !== null) pts += pAs * PESOS.aseo;

    // Salud / muda
    if (resp.salud !== NO_IMPORTA) {
      if (resp.salud === "bajo") {
        const p = puntajeEscala(ESCALA_MUDA, "sin_muda", raza.mudaPelo); if (p !== null) pts += p * PESOS.salud;
      } else if (resp.salud === "alto") {
        pts += PESOS.salud * 0.5;
      } else {
        const p = puntajeEscala(ESCALA_MUDA, "media", raza.mudaPelo); if (p !== null) pts += p * PESOS.salud;
      }
    }

    // Otros perros
    if (resp.otros_perros === "si") {
      if (raza.otrasMascotas === "muy_recomendado")   pts += PESOS.otros_perros;
      else if (raza.otrasMascotas === "recomendado")  pts += PESOS.otros_perros * 0.6;
      else if (raza.otrasMascotas === "no_recomendado")   pts -= PESOS.otros_perros * 1.5;
      else if (raza.otrasMascotas === "poco_recomendado") pts -= PESOS.otros_perros * 0.5;
    }

    // Vivienda
    if (resp.vivienda !== NO_IMPORTA) {
      if (resp.vivienda === "piso" && (raza.tamano === "grande" || raza.tamano === "muy_grande")) pts -= PESOS.vivienda * 0.75;
      if (resp.vivienda === "piso" && raza.energia === "muy_alto") pts -= PESOS.vivienda * 0.5;
      if (raza.vivienda === resp.vivienda) pts += PESOS.vivienda;
      else if (raza.vivienda === "indiferente") pts += PESOS.vivienda * 0.6;
      else {
        const orden = ["piso", "piso_con_terraza", "casa_con_jardin"];
        const p = puntajeEscala(orden, resp.vivienda, raza.vivienda);
        if (p !== null) pts += p * PESOS.vivienda * 0.5;
      }
    }

    return {
      nombre: raza.nombre,
      pts,
      pct: maxPts > 0 ? Math.max(0, (pts / maxPts) * 100) : 0,
    };
  });

  const ord = resultados.sort((a, b) => b.pts - a.pts);
  const UMBRAL = 60;
  const mejor = ord[0];
  const compatibles = ord.filter((r) => r.pct >= UMBRAL);
  return {
    mejor,
    alternativas: compatibles.slice(1, 4),
    recomendarPeluche: !mejor || mejor.pct < UMBRAL,
  };
}

// ─── Contenido de preguntas ──────────────────────────────────────────────────
const ASIDE_TIPS = [
  "El tamaño no siempre determina el nivel de energía de un perro.",
  "La socialización temprana es clave para cualquier raza.",
  "Un perro activo en casa feliz es un perro feliz.",
  "El tiempo de aseo varía mucho según la raza y el tipo de pelo.",
  "La compatibilidad con niños depende también de la educación.",
  "Visitas regulares al veterinario alargan la vida de tu perro.",
  "Invertir en adiestramiento es invertir en convivencia.",
  "Conocer la raza ayuda a establecer expectativas realistas.",
  "La vivienda importa, pero el ejercicio diario importa más.",
  "La experiencia previa facilita la adaptación mutua.",
];

const PREGUNTAS = [
  {
    seccion: "Perfil",
    key: "tamano",
    titulo: "¿Qué tamaño de perro te gustaría tener?",
    desc: "El tamaño influye en el espacio que necesita, los costes de alimentación y veterinario, y su adaptación a tu vivienda.",
    hasIcon: true,
    cols: 3,
    opciones: [
      { label: "Miniatura", sub: "Menos de 4 kg",  value: "pequeño",    icon: <DogSizeIllustration size="mini" /> },
      { label: "Mini",      sub: "De 4 a 10 kg",   value: "pequeño",    icon: <DogSizeIllustration size="pequeno" /> },
      { label: "Mediano",   sub: "De 11 a 25 kg",  value: "mediano",    icon: <DogSizeIllustration size="mediano" /> },
      { label: "Maxi",      sub: "De 26 a 44 kg",  value: "grande",     icon: <DogSizeIllustration size="grande" /> },
      { label: "Gigante",   sub: "Más de 45 kg",   value: "muy_grande", icon: <DogSizeIllustration size="muygrande" /> },
      { label: "No importa",sub: "Cualquier tamaño", value: NO_IMPORTA, icon: <DogSizeIllustration size="noImporta" /> },
    ],
  },
  {
    seccion: "Perfil",
    key: "actividad",
    titulo: "¿Cuánta actividad física quieres compartir con tu perro?",
    desc: "Cada raza tiene necesidades de ejercicio distintas. Elegir bien evitará frustración en ambos.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Tranquilo",   sub: "~1 h/día · Paseos cortos y vida en casa",       value: "bajo",  icon: <ActivityIcon level="bajo" /> },
      { label: "Moderado",    sub: "1–3 h/día · Paseos largos y salidas",            value: "medio", icon: <ActivityIcon level="medio" /> },
      { label: "Muy activo",  sub: "+3 h/día · Deporte y aventura al aire libre",   value: "alto",  icon: <ActivityIcon level="alto" /> },
    ],
  },
  {
    seccion: "Temperamento",
    key: "ninos",
    titulo: "¿Hay niños en casa o los habrá próximamente?",
    desc: "Algunas razas muestran una paciencia y afecto excepcional con los más pequeños.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Sí, viven en casa",                                                            value: "convive_siempre" },
      { label: "Probablemente en los próximos años",                                           value: "alguna_visita" },
      { label: "No",                                                                            value: "sin_ninos" },
    ],
  },
  {
    seccion: "Temperamento",
    key: "temperamento",
    titulo: "¿Qué temperamento buscas en tu perro?",
    desc: "El carácter de la raza influirá en la convivencia diaria y en cómo interactúa con tu entorno.",
    hasIcon: false,
    cols: 2,
    opciones: [
      { label: "Amistoso y sociable",   sub: "Abierto con todo el mundo",                     value: "amistoso" },
      { label: "Independiente",         sub: "Sin necesidad constante de atención",            value: "independiente" },
      { label: "Protector",             sub: "Leal y vigilante con su familia",               value: "protector" },
      { label: "Tímido o reservado",    sub: "Selectivo con las personas",                    value: "timido" },
    ],
  },
  {
    seccion: "Cuidados",
    key: "entrenamiento",
    titulo: "¿Cuánto tiempo dedicarás al adiestramiento?",
    desc: "El nivel de entrenamiento influye directamente en la convivencia y el bienestar del perro.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Básico",      sub: "Órdenes esenciales del día a día",                        value: "bajo" },
      { label: "Intermedio",  sub: "Obediencia avanzada, con ayuda profesional si hace falta", value: "alto" },
      { label: "Avanzado",    sub: "Entrenamiento intensivo y deportes caninos",              value: "muy_alto" },
    ],
  },
  {
    seccion: "Cuidados",
    key: "aseo",
    titulo: "¿Cuánto tiempo puedes dedicar al aseo?",
    desc: "El pelo, las orejas y las uñas requieren atención regular que varía según la raza.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Mínimo",     sub: "Cepillado mensual, sin peluquería frecuente",              value: "mensual" },
      { label: "Moderado",   sub: "Cepillado semanal y visitas ocasionales al peluquero",     value: "semanal" },
      { label: "Intensivo",  sub: "Cepillado diario y peluquería cada 2–4 meses",            value: "diario" },
    ],
  },
  {
    seccion: "Cuidados",
    key: "salud",
    titulo: "¿Cuántos cuidados veterinarios puedes proporcionar?",
    desc: "Algunas razas tienen predisposiciones genéticas que requieren seguimiento más frecuente.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Básico",    sub: "Vacunaciones y revisión anual",                             value: "bajo" },
      { label: "Moderado",  sub: "Revisiones semestrales y cuidados mensuales en casa",       value: "medio" },
      { label: "Alto",      sub: "Visitas frecuentes y cuidados semanales en casa",           value: "alto" },
    ],
  },
  {
    seccion: "Cuidados",
    key: "otros_perros",
    titulo: "¿Es importante que tu perro se lleve bien con otros perros?",
    desc: "Si ya tienes o frecuentas otros perros, la compatibilidad social es fundamental.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Sí, es importante",   value: "si" },
      { label: "No es prioritario",   value: NO_IMPORTA },
    ],
  },
  {
    seccion: "Acerca de ti",
    key: "tuvo_perro",
    titulo: "¿Tienes experiencia como propietario de perro?",
    desc: "Tu experiencia previa determina qué razas te resultarán más cómodas de gestionar.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Sí, tengo experiencia",  sub: "He convivido con perros como propietario principal",                   value: "experimentado" },
      { label: "Primera vez",             sub: "Nunca he tenido o solo convivía con el perro de la familia",          value: "primerizo" },
    ],
  },
  {
    seccion: "Acerca de ti",
    key: "vivienda",
    titulo: "¿A qué tipo de espacio exterior tendrá acceso tu perro?",
    desc: "El espacio disponible condiciona el bienestar de muchas razas, especialmente las más activas.",
    hasIcon: false,
    cols: 1,
    opciones: [
      { label: "Piso sin jardín",           sub: "Solo paseos para el ejercicio",              value: "piso",              icon: <HouseIcon type="piso" /> },
      { label: "Casa con jardín pequeño",   sub: "Espacio para tomar el sol y jugar",          value: "piso_con_terraza",  icon: <HouseIcon type="piso_con_terraza" /> },
      { label: "Casa con jardín amplio",    sub: "Terreno de juego libre",                     value: "casa_con_jardin",   icon: <HouseIcon type="casa_con_jardin" /> },
    ],
  },
];

const SECCIONES = ["Perfil", "Temperamento", "Cuidados", "Acerca de ti"];

// ─── Estilos ─────────────────────────────────────────────────────────────────
const S = {
  // Layout
  wrapper: { 
    width: "100%",                  // Changed from 1920 to take full viewport width
    minHeight: "100vh",             // Changed from height: 1080 to dynamically scale vertically
    background: C.pageBg, 
    fontFamily: "'Segoe UI', system-ui, Arial, sans-serif", 
    color: C.text, 
    overflowX: "hidden",            // Prevents accidental horizontal side-scrolls
    boxSizing: "border-box", 
    display: "flex", 
    flexDirection: "column" 
  },
  page: { 
    maxWidth: 1080, 
    width: "calc(100% - 48px)", 
    margin: "32px auto",            // The "auto" on the left/right forces it to center perfectly
    borderRadius: 14, 
    overflow: "hidden", 
    boxShadow: "0 10px 30px rgba(13,31,69,0.10)" 
  },
  // Header
  siteHeader: { 
      background: C.navy, 
      padding: "0 24px",            // Reduced padding so it doesn't clip on small screens
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between", 
      height: 64, 
      borderBottom: `3px solid ${C.gold}`,
      width: "100%",                // Ensures it spans across the viewport cleanly
      boxSizing: "border-box"
    },  
  logoArea:   { display: "flex", alignItems: "center", gap: 14 },
  logoText:   { color: C.white },
  acronym:    { fontSize: 15, fontWeight: 700, letterSpacing: "0.18em", color: C.gold, display: "block", lineHeight: 1 },
  fullName:   { fontSize: 9.5, color: "rgba(255,255,255,0.6)", letterSpacing: "0.06em", textTransform: "uppercase" },
  headerTag:  { fontSize: 11, color: "rgba(255,255,255,0.45)", textTransform: "uppercase", letterSpacing: "0.12em" },
  // Hero
  hero:        { background: C.white, borderBottom: `1px solid ${C.border}`, padding: "40px 56px 36px", textAlign: "center" },
  heroEyebrow: { fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", color: C.goldDark, textTransform: "uppercase", marginBottom: 10 },
  heroTitle:   { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 30, fontWeight: 700, color: C.navyDark, lineHeight: 1.25, marginBottom: 10, margin: "0 0 10px" },
  heroDesc: { fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 480, margin: "0 auto" },
  // Progress rail
  progressRail:   { background: C.white, borderBottom: `1px solid ${C.border}` },
  sectionTabs:    { display: "flex" },
  sectionTab:     (active, done) => ({
    flex: 1, padding: "14px 0 12px", textAlign: "center", fontSize: 11.5, fontWeight: 600,
    letterSpacing: "0.04em", borderBottom: `3px solid ${done ? C.gold : active ? C.navy : "transparent"}`,
    color: done ? C.goldDark : active ? C.navy : C.muted, cursor: "default",
  }),
  progressDots:   { display: "flex", gap: 4, padding: "8px 56px 10px", justifyContent: "center" },
  pdot:           (state) => ({
    width: 6, height: 6, borderRadius: "50%",
    background: state === "done" ? C.gold : state === "current" ? C.navy : C.border,
  }),
  // Question layout
  qLayout:   { display: "flex", minHeight: 380 },
  qLeft:     { flex: 1, padding: "40px 56px 36px", background: C.white },
  qAside:    { width: 260, background: C.navyDark, padding: "36px 28px", display: "flex", flexDirection: "column", gap: 16 },
  qBadge:    { fontSize: 10, fontWeight: 700, letterSpacing: "0.14em", color: C.gold, textTransform: "uppercase", marginBottom: 6 },
  qTitle:    { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 20, fontWeight: 700, color: C.navyDark, lineHeight: 1.35, margin: "0 0 10px" },
  qDesc:     { fontSize: 13, color: C.muted, lineHeight: 1.65, margin: "0 0 24px" },
  // Options grid
  optsGrid:  (cols) => ({
    display: "grid",
    gridTemplateColumns: cols === 3 ? "1fr 1fr 1fr" : cols === 2 ? "1fr 1fr" : "1fr",
    gap: 14,
    marginBottom: 8,
  }),
  optBtn:    (selected) => ({
    background: selected ? C.navyLight : C.white,
    border: `1.5px solid ${selected ? C.navy : C.border}`,
    borderRadius: 10,
    padding: "14px 16px",
    cursor: "pointer",
    textAlign: "left",
    display: "flex",
    alignItems: "flex-start",
    gap: 12,
    outline: "none",
    boxShadow: selected ? `0 0 0 3px rgba(0,48,135,0.1)` : "none",
    transition: "border-color 0.15s, background 0.15s",
  }),
  optIconWrap: { flexShrink: 0, width: 52, height: 52, display: "flex", alignItems: "center", justifyContent: "center" },
  optLabel:    { fontSize: 13.5, fontWeight: 700, color: C.navyDark, display: "block", marginBottom: 2 },
  optSub:      { fontSize: 11.5, color: C.muted, display: "block", lineHeight: 1.4 },
  optRadio:    (selected) => ({
    width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 2,
    border: `1.5px solid ${selected ? C.navy : C.border}`,
    background: selected ? C.navy : C.white,
    display: "flex", alignItems: "center", justifyContent: "center",
  }),
  // Nav
  qNav:       { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 56px 24px", background: C.white, borderTop: `1px solid ${C.border}` },
  qCounter:   { fontSize: 12, color: C.muted },
  btnBack:    { fontSize: 13, fontWeight: 600, color: C.navy, background: "none", border: `1.5px solid ${C.border}`, borderRadius: 7, padding: "8px 18px", cursor: "pointer" },
  // Aside
  asideTip:   { background: "rgba(201,169,75,0.12)", borderLeft: `3px solid ${C.gold}`, borderRadius: "0 6px 6px 0", padding: "12px 14px" },
  asideTipP:  { fontSize: 12, color: "rgba(255,255,255,0.65)", lineHeight: 1.55, margin: 0 },
  asideStat:  { textAlign: "center", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.1)" },
  asideNum:   { fontFamily: "Georgia,serif", fontSize: 28, fontWeight: 700, color: C.gold, display: "block" },
  asideLbl:   { fontSize: 11, color: "rgba(255,255,255,0.45)", letterSpacing: "0.06em", textTransform: "uppercase" },
  // Result
  resultHero:    { background: C.navy, padding: "52px 56px 44px", textAlign: "center" },
  resultEyebrow: { fontSize: 11, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 },
  resultBreed:   { fontFamily: "Georgia,serif", fontSize: 36, fontWeight: 700, color: C.white, marginBottom: 10, margin: "0 0 10px" },
  compatPill:    { display: "inline-flex", alignItems: "center", gap: 8, background: C.gold, color: C.navyDark, fontSize: 13, fontWeight: 700, padding: "6px 20px", borderRadius: 20 },
  resultBody: { background: C.white, padding: "36px 56px", textAlign: "center" },
  resultLabel:   { fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", color: C.muted, textTransform: "uppercase", marginBottom: 16, display: "block" },
  altRow:        { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 16px", border: `1px solid ${C.border}`, borderRadius: 8, marginBottom: 4 },
  altName:       { fontSize: 14, fontWeight: 700, color: C.navyDark },
  altPct:        { fontSize: 13, color: C.muted },
  pctBar:        { height: 4, background: C.navyLight, borderRadius: 2, marginBottom: 10 },
  pctFill:       (w) => ({ height: 4, background: C.gold, borderRadius: 2, width: `${w}%` }),
  btnPrimary:    { background: C.navy, color: C.white, border: "none", borderRadius: 8, padding: "12px 32px", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.03em", marginTop: 24, display: "block", margin: "24px auto 0" },
  // Peluche
  peluche:    { textAlign: "center", padding: "60px 56px", background: C.white },
  pelucheH2:  { fontFamily: "Georgia,serif", fontSize: 22, color: C.navyDark, margin: "16px 0 10px" },
  pelucheP:   { fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 380, margin: "0 auto 24px" },
  // Landing / pantalla de inicio
  landing: { 
      flex: 1, 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",     // Added to center both columns as a unit
      gap: 40,                      // Slightly reduced gap so columns don't overflow your monitor
      padding: "40px 24px",         // Responsive padding
      background: C.white,
      maxWidth: 1200,               // Sets a boundary for ultra-wide monitors
      margin: "0 auto",             // Forces the whole landing block to sit dead center
      width: "100%",
      boxSizing: "border-box"
    },  landingLeft:    { flex: 1, maxWidth: 560 },
  landingEyebrow: { fontSize: 12, fontWeight: 700, letterSpacing: "0.18em", color: C.goldDark, textTransform: "uppercase", marginBottom: 18 },
  landingTitle:   { fontFamily: "Georgia, 'Times New Roman', serif", fontSize: 60, fontWeight: 700, color: C.navyDark, lineHeight: 1.15, margin: "0 0 22px" },
  landingDesc:    { fontSize: 16, color: C.muted, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 460 },
  landingSteps:   { listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: 18 },
  landingStep:    { display: "flex", alignItems: "center", gap: 16, fontSize: 15, color: C.text, fontWeight: 500 },
  landingStepNum: { width: 32, height: 32, borderRadius: "50%", background: C.gold, color: C.navyDark, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  landingBtn:     { background: C.navy, color: C.white, border: "none", borderRadius: 8, padding: "16px 42px", fontSize: 15, fontWeight: 700, letterSpacing: "0.03em", cursor: "pointer" },
  landingRight:   { flex: 1, height: 560, display: "flex", gap: 14, alignItems: "stretch" },
  filmPanel:      { flex: 1, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  filmPanelActive:{ flex: 2.4, border: `2px solid ${C.gold}`, background: C.navyLight, boxShadow: "0 10px 24px rgba(0,48,135,0.10)" },
};

// ─── Componente principal ────────────────────────────────────────────────────
export default function TestPerroIdeal() {
  const [step, setStep]           = useState(0);
  const [respuestas, setRespuestas] = useState({});
  const [resultado, setResultado] = useState(null);
  const [hovered, setHovered]     = useState(null);
  const [mostrarInicio, setMostrarInicio] = useState(() => {
    if (typeof window === "undefined") return true;
    return new URLSearchParams(window.location.search).get("start") !== "test";
  });

  const irAlTest = () => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("start", "test");
    window.open(url.toString(), "_blank");
  };

  const pregunta = !resultado ? PREGUNTAS[step] : null;

  const seccionInfo = () =>
    SECCIONES.map((s) => {
      const qs       = PREGUNTAS.filter((p) => p.seccion === s);
      const total    = qs.length;
      const resp     = qs.filter((p) => respuestas[p.key] !== undefined).length;
      const idxFirst = PREGUNTAS.findIndex((p) => p.seccion === s);
      const done     = step > idxFirst + total - 1;
      const active   = step >= idxFirst && step <= idxFirst + total - 1;
      return { s, total, resp, done, active, idxFirst };
    });

  const seleccionar = (value) => {
    const nueva = { ...respuestas, [pregunta.key]: value };
    setRespuestas(nueva);
    if (step + 1 < PREGUNTAS.length) {
      setStep(step + 1);
    } else {
      setResultado(calcularResultado(nueva));
    }
  };

  const reiniciar = () => { setStep(0); setRespuestas({}); setResultado(null); };

  // ── Render: progress rail ──
  const ProgressRail = () => (
    <div style={S.progressRail}>
      <div style={S.sectionTabs}>
        {seccionInfo().map(({ s, done, active }) => (
          <div key={s} style={S.sectionTab(active, done)}>
            {done && <span style={{ marginRight: 4 }}>✓</span>}
            {s}
          </div>
        ))}
      </div>
      <div style={S.progressDots}>
        {PREGUNTAS.map((_, i) => (
          <div key={i} style={S.pdot(i < step ? "done" : i === step ? "current" : "idle")} />
        ))}
      </div>
    </div>
  );

  // ── Render: landing (pantalla de inicio) ──
  const Landing = () => (
    <div style={S.landing}>
      <div style={S.landingLeft}>
        <div style={S.landingEyebrow}>RSCE · Test de razas</div>
        <h1 style={S.landingTitle}>Encuentra la<br />raza perfecta</h1>
        <p style={S.landingDesc}>
          Responde {PREGUNTAS.length} preguntas sobre tu estilo de vida y descubre
          qué raza de perro se adapta mejor a ti y a tu hogar.
        </p>
        <ol style={S.landingSteps}>
          <li style={S.landingStep}><span style={S.landingStepNum}>1</span><span>Responde a preguntas sobre tu estilo de vida</span></li>
          <li style={S.landingStep}><span style={S.landingStepNum}>2</span><span>Descubre la raza más adecuada para ti</span></li>
          <li style={S.landingStep}><span style={S.landingStepNum}>3</span><span>Accede a contenido detallado sobre tu raza favorita</span></li>
        </ol>
        <button style={S.landingBtn} onClick={irAlTest}>Realizar el test</button>
      </div>
      <div style={S.landingRight}>
    <div style={S.filmPanel}><DogSizeIllustration size="mini" width={64} height={53} /></div>
    <div style={{ ...S.filmPanel, ...S.filmPanelActive }}>
      <DogSizeIllustration size="mediano" width={170} height={140} />
    </div>
    <div style={S.filmPanel}><DogSizeIllustration size="grande" width={64} height={53} /></div>
    <div style={S.filmPanel}><DogSizeIllustration size="muygrande" width={64} height={53} /></div>
  </div>
    </div>
  );

  // ── Render: hero ──
  const Hero = () => (
    <div style={S.hero}>
      <div style={S.heroEyebrow}>Test de compatibilidad de razas</div>
      <h1 style={S.heroTitle}>Encuentra la raza de perro<br />más adecuada para ti</h1>
      <p style={S.heroDesc}>
        Responde {PREGUNTAS.length} preguntas sobre tu estilo de vida y te recomendaremos
        la raza que mejor encaja con tu personalidad y circunstancias.
      </p>
    </div>
  );

  // ── Render: question ──
  const Question = () => {
    const tip = ASIDE_TIPS[step % ASIDE_TIPS.length];
    return (
      <>
        <ProgressRail />
        <div style={S.qLayout}>
          {/* Columna izquierda */}
          <div style={S.qLeft}>
            <div style={S.qBadge}>{pregunta.seccion} · Pregunta {step + 1} de {PREGUNTAS.length}</div>
            <h2 style={S.qTitle}>{pregunta.titulo}</h2>
            <p style={S.qDesc}>{pregunta.desc}</p>

            <div style={S.optsGrid(pregunta.cols)}>
              {pregunta.opciones.map((op, idx) => {
                const sel = respuestas[pregunta.key] === op.value;
                const hov = hovered === `${step}-${idx}`;
                return (
                  <button
                    key={idx}
                    onClick={() => seleccionar(op.value)}
                    onMouseEnter={() => setHovered(`${step}-${idx}`)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      ...S.optBtn(sel),
                      ...(hov && !sel ? { borderColor: C.navy, background: C.navyLight } : {}),
                    }}
                  >
                    {pregunta.hasIcon && op.icon && (
                      <div style={S.optIconWrap}>{op.icon}</div>
                    )}
                    {!pregunta.hasIcon && (
                      <div style={S.optRadio(sel)}>
                        {sel && (
                          <svg viewBox="0 0 12 12" width="8" height="8">
                            <circle cx="6" cy="6" r="3.5" fill="white" />
                          </svg>
                        )}
                      </div>
                    )}
                    <div>
                      <span style={S.optLabel}>{op.label}</span>
                      {op.sub && <span style={S.optSub}>{op.sub}</span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel lateral */}
          <div style={S.qAside}>
            <div style={{ textAlign: "center", marginBottom: 8 }}>
              <svg viewBox="0 0 40 40" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" stroke={C.gold} strokeWidth="1.5" fill="none" />
                <circle cx="20" cy="20" r="14" stroke={C.gold} strokeWidth="0.5" opacity="0.4" fill="none" />
                <text x="20" y="26" textAnchor="middle" fontSize="18" fontWeight="700"
                      fill={C.gold} fontFamily="Georgia,serif">R</text>
              </svg>
            </div>
            <div style={S.asideTip}>
              <p style={S.asideTipP}>{tip}</p>
            </div>
            <div style={S.asideStat}>
              <span style={S.asideNum}>{razas.length}</span>
              <span style={S.asideLbl}>Razas analizadas</span>
            </div>
            <div style={S.asideStat}>
              <span style={S.asideNum}>{Math.round((step / PREGUNTAS.length) * 100)}%</span>
              <span style={S.asideLbl}>Completado</span>
            </div>
          </div>
        </div>

        {/* Navegación */}
        <div style={S.qNav}>
          {step > 0 ? (
            <button style={S.btnBack} onClick={() => setStep(step - 1)}>← Anterior</button>
          ) : (
            <span />
          )}
          <span style={S.qCounter}>Selecciona una opción para continuar</span>
        </div>
      </>
    );
  };

  // ── Render: resultado ──
  const Resultado = () => {
    const [dogImage, setDogImage] = useState(null);
    useEffect(() => {
  const breed = resultado.mejor.nombre;
  const mapped = BREED_NAME_MAP[breed];
  const query = mapped || breed.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
  
  fetch(`https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(query)}&prop=pageimages&format=json&pithumbsize=400&origin=*`)
    .then(r => r.json())
    .then(data => {
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      console.log("Result:", page);
      if (page?.thumbnail?.source) setDogImage(page.thumbnail.source);
    })
    .catch(err => console.log("Error:", err));
}, []);
    if (resultado.recomendarPeluche) {
      return (
        <div style={S.peluche}>
          <div style={{ fontSize: 56 }}>🧸</div>
          <h2 style={S.pelucheH2}>Ninguna raza encaja del todo</h2>
          <p style={S.pelucheP}>
            Según tus respuestas, no encontramos una raza con compatibilidad suficiente.
            Quizás un perro de peluche sea la opción más sensata por ahora.
          </p>
          <button style={S.btnPrimary} onClick={reiniciar}>Repetir el test</button>
        </div>
      );
    }

    const { mejor, alternativas } = resultado;
    return (
      <>
        <div style={S.resultHero}>
          {dogImage && (
    <img
      src={dogImage}
      alt={resultado.mejor.nombre}
      style={{ width: 220, height: 220, objectFit: "contain", borderRadius: 12, border: `3px solid ${C.gold}`, marginBottom: 16 }}
    />
  )}
          <div style={S.resultEyebrow}>Tu mejor opción</div>
          <div style={S.resultBreed}>{mejor.nombre}</div>
          <div style={S.compatPill}>
            <svg viewBox="0 0 20 20" width="14" height="14" fill={C.navyDark} xmlns="http://www.w3.org/2000/svg">
              <circle cx="5"   cy="5"  r="2.5" />
              <circle cx="15"  cy="5"  r="2.5" />
              <circle cx="2.5" cy="10" r="2"   />
              <circle cx="17.5"cy="10" r="2"   />
              <ellipse cx="10" cy="14" rx="5"  ry="4.5" />
            </svg>
            {mejor.pct >= 80 ? "Excelente compatibilidad" : "Buena compatibilidad"} · {Math.round(mejor.pct)}%
          </div>
        </div>

        <div style={S.resultBody}>
          {alternativas.length > 0 && (
            <>
              <span style={S.resultLabel}>Otras buenas opciones</span>
              {alternativas.map((p, i) => (
                <div key={i}>
                  <div style={S.altRow}>
                    <span style={S.altName}>{p.nombre}</span>
                    <span style={S.altPct}>{Math.round(p.pct)}% compatibilidad</span>
                  </div>
                  <div style={S.pctBar}>
                    <div style={S.pctFill(Math.round(p.pct))} />
                  </div>
                </div>
              ))}
            </>
          )}
          <button style={S.btnPrimary} onClick={reiniciar}>Repetir el test</button>
        </div>
      </>
    );
  };

  // ── Render principal ──
 // ── Render principal ────────────────────────────────────────────────────
  return (
    <div 
      style={{
        ...S.wrapper,
        // DYNAMIC LAYOUT: If we are on the intro page, use a layout optimized to center the two large columns.
        // If we are in the quiz, switch to a perfectly clean vertical stack.
        justifyContent: mostrarInicio ? "center" : "flex-start",
        alignItems: "center",
      }}
    >
      {/* CONDITIONAL HEADER: This removes the top institucional header 
        after the initial page so the quiz elements have maximum space to center.
      */}
      {mostrarInicio && (
        <header style={S.siteHeader}>
          <div style={S.logoArea}>
            <svg viewBox="0 0 38 38" width="38" height="38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="19" cy="19" r="18" stroke={C.gold} strokeWidth="1.5" />
              <circle cx="19" cy="19" r="14" stroke={C.gold} strokeWidth="0.5" opacity="0.4" />
              <text x="19" y="25" textAnchor="middle" fontSize="18" fontWeight="700"
                    fill={C.gold} fontFamily="Georgia,serif">R</text>
            </svg>
            <div style={S.logoText}>
              <span style={S.acronym}>RSCE</span>
              <span style={S.fullName}>Real Sociedad Canina de España</span>
            </div>
          </div>
          <span style={S.headerTag}>Test de razas · Edición 2026</span>
        </header>
      )}

      {/* Cuerpo */}
      {mostrarInicio ? (
        <Landing />
      ) : (
        <div style={{ ...S.page, margin: "40px auto" }}>
          {resultado ? (
            <>
              <Hero />
              <Resultado />
            </>
          ) : (
            <>
              {step === 0 && <Hero />}
              <Question />
            </>
          )}
        </div>
      )}
    </div>
  );
}