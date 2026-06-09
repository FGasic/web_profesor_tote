# SPEC: francogasic.com — Sitio Web Personal

## INSTRUCCIÓN PARA CLAUDE CODE
Construye este sitio web completo en una sola sesión. El usuario adjunta 5 imágenes.
Nómbralas internamente como `photo-1.png` a `photo-5.png` según el orden en que las sube.
**No hagas preguntas. Construye todo según este spec.**

---

## 1. Visión General

| Campo | Valor |
|---|---|
| Cliente | Franco Gasic Merino |
| Tipo | Sitio personal — entrenador de ajedrez |
| Arquitectura | Single-page, HTML5 / CSS3 / JS Vanilla |
| Idiomas | Español (default) + Inglés (toggle) |
| Hosting | Vercel / GitHub Pages — cero dependencias de servidor |
| Analytics | Google Analytics 4 (placeholder, ver sección 9) |
| Dominio sugerido | francogasic.com |

---

## 2. Estructura de Archivos

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── images/
    ├── photo-1.png   ← torneo, chaqueta gris (héroe principal / Sobre Mí)
    ├── photo-2.png   ← torneo vintage/sepia
    ├── photo-3.png   ← Campeonato Chile, camiseta blanca Chile
    ├── photo-4.png   ← torneo, camisa floral (@chess_takes1)
    └── photo-5.png   ← podio con trofeo
```

---

## 3. Sistema de Diseño

### 3.1 Paleta de Colores
Inspiración directa: **Age of Empires** (oscuro, épico, medieval, dorado).

```css
:root {
  /* Backgrounds */
  --bg:           #0C0A07;    /* negro cálido casi puro */
  --surface-1:    #16130D;    /* secciones alternas */
  --surface-2:    #1E1A12;    /* cards, tablas */
  --surface-3:    #26211A;    /* hover states */

  /* Gold (paleta principal) */
  --gold:         #C9983A;
  --gold-light:   #E8BE6A;
  --gold-dark:    #8B6A20;
  --gold-border:  rgba(201, 152, 58, 0.35);

  /* Texto */
  --text-primary: #E8DCC8;    /* blanco pergamino */
  --text-muted:   #A89878;    /* dorado apagado */
  --text-dim:     #6E5E48;    /* muy sutil */

  /* Acento */
  --red:          #7B2D2D;    /* rojo AoE profundo */

  /* Pergamino (lema scroll) */
  --parchment:    #F4E4C1;
  --parchment-2:  #E8D5A3;
  --parchment-ink:#3D2400;
  --parchment-border: #8B6520;
}
```

### 3.2 Tipografía
Cargar desde Google Fonts:
```html
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cinzel+Decorative:wght@400;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

| Uso | Fuente | Peso | Tamaño |
|---|---|---|---|
| Nombre hero (H1) | Cinzel | 700 | 72px desktop / 38px móvil |
| Títulos sección (H2) | Cinzel | 600 | 42px / 28px |
| Subtítulos (H3) | Cinzel | 400 | 20px |
| **Lema** | Cinzel Decorative | 400 italic | 26px / 20px |
| Cuerpo texto | Crimson Text | 400 | 18px / 16px |
| Nav, etiquetas, badges | Cinzel | 400 | 13px, letter-spacing 0.15em |
| Precios | Crimson Text | 600 | 32px |

### 3.3 Efectos Globales
- Bordes decorativos: `1px solid var(--gold-border)`
- Corner decorations en secciones: esquinas doradas CSS (::before / ::after con pseudo-elementos en forma de L dorada, 20px)
- Section divider: línea dorada horizontal con punto central (ornamento)
- Hover general en links: `color: var(--gold-light)`, transición 0.3s
- Cursor en botones principales: `cursor: pointer`

---

## 4. Navegación

### HTML
```
<nav id="main-nav">
  <div class="nav-logo">FRANCO GASIC MERINO</div>
  <ul class="nav-links">
    <li><a href="#sobre">Sobre mí</a></li>
    <li><a href="#clases">Clases</a></li>
    <li><a href="#repertorio">Repertorio</a></li>
    <li><a href="#contacto">Contacto</a></li>
  </ul>
  <button id="lang-toggle" aria-label="Cambiar idioma">ES / EN</button>
  <button id="menu-toggle" aria-label="Menú" class="hamburger">☰</button>
</nav>
```

### Comportamiento
- Posición: `fixed`, top: 0, z-index: 1000, full width
- Inicial: `background: transparent`
- Al hacer scroll > 80px: `background: rgba(12, 10, 7, 0.95)`, `backdrop-filter: blur(8px)`, border-bottom dorado
- Transición suave: 0.4s
- Scroll suave a secciones: `scroll-behavior: smooth`, offset 80px para compensar nav fijo
- Móvil (<768px): ocultar nav-links, mostrar hamburger. Click hamburger → dropdown vertical con fondo `var(--surface-1)`

### Textos bilingüe nav
```
Sobre mí     / About
Clases       / Classes
Repertorio   / Repertoire
Contacto     / Contact
```

---

## 5. Sección HERO (Pantalla Completa)

### Layout
- `height: 100vh`, `min-height: 700px`
- Background: slideshow de las 5 fotos (ver componente)
- Overlay gradiente: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.65) 60%, rgba(12,10,7,0.98) 100%)`
- Contenido centrado: `display: flex; flex-direction: column; align-items: center; justify-content: center`

### Contenido Hero
```
[NOMBRE]
FRANCO GASIC MERINO
(Cinzel Bold, 72px, var(--text-primary), letter-spacing 0.08em)

[SEPARADOR: línea dorada decorativa 80px]

[RATINGS BADGES — 3 pills horizontales]
● 2238 STANDARD   ● 2213 RAPID   ● 2147 BLITZ
(fondo: rgba(201,152,58,0.15), borde: var(--gold-border), texto: var(--gold-light))
(Cinzel, 12px, letter-spacing 0.12em)

[ESPACIADO 40px]

[LEMA SCROLL — ver componente 5.2]
"Abrazar el Acontecer"

[ESPACIADO 50px]

[CTA BUTTONS — horizontal, gap 20px]
[CLASES] → filled, var(--gold), texto oscuro, hover: var(--gold-light)
[CONTACTO] → outline gold, hover: filled

[SCROLL INDICATOR — bottom center]
↓ (animación bounce suave)
```

### 5.1 Slideshow de Fotos
- Mostrar las 5 fotos (photo-1 a photo-5) en rotación automática
- Intervalo: 6 segundos por foto
- Transición: crossfade opacity 1.5s
- Efecto Ken Burns: escala de 1.0 a 1.08 con ligero pan durante los 6s (CSS animation)
- La foto activa ocupa `position: absolute; top:0; left:0; width:100%; height:100%; object-fit: cover`
- Stack de 5 `<img>` absolutos, z-index y opacity controlados por JS
- Primera foto activa: photo-1.png

### 5.2 Componente LEMA SCROLL
Aparece en: Hero, y como divisor visual entre sección Clases y Repertorio.

```css
.lema-scroll {
  background: linear-gradient(135deg, #F4E4C1 0%, #E8D5A3 40%, #F0E0B8 70%, #EDD9A8 100%);
  color: #3D2400;
  font-family: 'Cinzel Decorative', cursive;
  font-size: 26px;
  font-style: italic;
  padding: 18px 52px;
  border: 2px solid #8B6520;
  border-radius: 3px;
  position: relative;
  box-shadow:
    0 0 0 4px rgba(139,101,32,0.15),
    inset 0 1px 3px rgba(0,0,0,0.15),
    0 8px 32px rgba(0,0,0,0.6);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
  max-width: 480px;
  text-align: center;
}

/* Curl de pergamino — lados izquierdo y derecho */
.lema-scroll::before,
.lema-scroll::after {
  content: '';
  position: absolute;
  top: 0; bottom: 0;
  width: 18px;
  background: linear-gradient(to right, rgba(139,101,32,0.25), transparent);
  border-radius: 3px 0 0 3px;
}
.lema-scroll::before { left: 0; }
.lema-scroll::after {
  right: 0;
  background: linear-gradient(to left, rgba(139,101,32,0.25), transparent);
  border-radius: 0 3px 3px 0;
}

/* Manchas de "quemado" en las esquinas */
.lema-scroll .corner-burn {
  position: absolute;
  width: 28px; height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(80,40,10,0.35) 0%, transparent 70%);
}
/* Posicionar en las 4 esquinas */
```

El texto del lema es **siempre en español** aunque el sitio esté en inglés (es el lema personal de Franco).

---

## 6. Sección SOBRE MÍ

### Layout Desktop
Dos columnas: foto (40%) | texto (60%), gap 60px, `align-items: center`

### Foto
- Imagen: photo-1.png
- Frame estilo AoE: borde dorado + esquinas decorativas (L-shapes CSS doradas de 24px)
- `max-width: 380px`, `border: 1px solid var(--gold-border)`, `box-shadow: 0 0 40px rgba(0,0,0,0.8)`

### Texto
**ES:**
```
Soy Ingeniero Civil e Ingeniero Electrónico, Solutions Architect e IA Engineer.

Para mí, el ajedrez no es solo un juego — es un sistema de pensamiento donde la
precisión, la lógica y la estrategia convergen en el tablero.

Represento a Chile en competiciones internacionales y actualmente entreno en Barcelona,
donde comparto el conocimiento de un repertorio forjado en la alta competición.
```

**EN:**
```
I am a Civil Engineer and Electronic Engineer, Solutions Architect and AI Engineer.

For me, chess is not just a game — it is a system of thinking where precision,
logic, and strategy converge on the board.

I represent Chile in international competitions and currently train in Barcelona,
where I share knowledge from a repertoire forged in high-level competition.
```

### Ratings Block (bajo el texto)
Tres datos en línea horizontal con separadores dorados:

```
Estándar · 2238   |   Rápidas · 2213   |   Blitz · 2147
```
(pequeño, Cinzel 12px, var(--gold-light), enlace externo a https://ratings.fide.com/profile/3414370)
Añadir 🇨🇱 pequeño junto a "Chile" en el párrafo.

---

## 7. Sección CLASES

### Background
`var(--surface-1)` con sutil textura de ruido (CSS: `background-image: url("data:image/svg+xml,...")` o filter noise muy sutil)

### Títulos
- **ES:** CLASES / **EN:** CLASSES
- Subtítulo ES: "Nivel Intermedio – Avanzado · Requisito: querer competir"
- Subtítulo EN: "Intermediate – Advanced · Requirement: competitive drive"

### Cards de Modalidad (3 horizontales, responsive a 1 columna en móvil)

**Card 1 — Presencial**
- Icono: ♜ (unicode chess rook) o similar
- Título ES/EN: Presencial / In-Person
- Descripción ES: "Clases en persona, zona de Barcelona"
- Descripción EN: "In-person lessons, Barcelona area"

**Card 2 — Online**
- Icono: ⊡ o 💻
- Título ES/EN: Online / Online
- Descripción ES: "Google Meet + análisis en Lichess"
- Descripción EN: "Google Meet + Lichess analysis"

**Card 3 — Club**
- Icono: ♟
- Título ES/EN: Club de Escacs del Prat / Club de Escacs del Prat
- Descripción ES: "El Prat de Llobregat, Barcelona"
- Descripción EN: "El Prat de Llobregat, Barcelona"

Estilo cards: fondo `var(--surface-2)`, borde `var(--gold-border)`, hover → borde `var(--gold)` + leve `box-shadow` dorado.

### Tabla de Precios
Título ES/EN: Tarifas / Pricing

```
| ES Tipo                        | 1 hora | 2 horas |  EN Type                        | 1 hour | 2 hours |
|--------------------------------|--------|---------|  |-------------------------------|--------|---------|
| Clase Particular               |  25 €  |  35 €   |  Private Lesson               |  25 €  |  35 €   |
| Clase Grupal (por alumno)      |  10 €  |  15 €   |  Group Lesson (per student)   |  10 €  |  15 €   |
```

Estilo tabla: fondo `var(--surface-2)`, cabecera fondo `var(--surface-3)` con texto `var(--gold)`, filas alternadas, precios en Crimson Text 600 32px `var(--gold-light)`.

Nota bajo tabla:
- ES: "Consulta planes y bonos por mensaje."
- EN: "Ask about packages and bundles."

### CTA Final
Botón grande verde (WhatsApp): "📱 WhatsApp — +34 605 031 692"
Enlace: `https://wa.me/34605031692`
Abrir en nueva pestaña.

---

## 8. DIVISOR LEMA SCROLL
Entre sección Clases y Repertorio, centrado, fondo oscuro, el componente `.lema-scroll` centrado.
"Abrazar el Acontecer"

---

## 9. Sección REPERTORIO MAGISTRAL

### Títulos
- **ES:** REPERTORIO MAGISTRAL
- **EN:** MASTER REPERTOIRE

Subtítulo ES: "Las aperturas y defensas que enseño"
Subtítulo EN: "The openings and defenses I teach"

### Layout: Dos columnas
**Columna Izquierda — Con Blancas / With White**
Subtítulo: "BLANCAS" / "WHITE"
Lista de aperturas (badges/pills):
- Apertura Catalana
- Trompowsky
- Sistema Keymer

**Columna Derecha — Con Negras / With Black**
Subtítulo: "NEGRAS" / "BLACK"
Lista de defensas (badges/pills):
- Escandinava Portuguesa
- Siciliana Najdorf
- Siciliana Kalashnikov
- India de Rey
- Grünfeld
- Gambito Volga

**Estilo badges:**
```css
.opening-badge {
  display: inline-block;
  background: var(--surface-2);
  border: 1px solid var(--gold-border);
  color: var(--text-primary);
  font-family: 'Cinzel', serif;
  font-size: 13px;
  letter-spacing: 0.08em;
  padding: 8px 18px;
  margin: 6px 4px;
  border-radius: 2px;
  transition: border-color 0.3s, background 0.3s;
}
.opening-badge:hover {
  border-color: var(--gold);
  background: var(--surface-3);
}
```

Los nombres de aperturas NO se traducen (nomenclatura universal del ajedrez).

---

## 10. Sección CONTACTO

### Título
ES: CONTACTO / EN: CONTACT

Texto:
- ES: "¿Listo para llevar tu ajedrez al siguiente nivel?"
- EN: "Ready to take your chess to the next level?"

### Elementos de Contacto (verticales, centrados)

**1. Botón WhatsApp (principal)**
```html
<a href="https://wa.me/34605031692" target="_blank" class="btn-whatsapp">
  📱 WhatsApp
  <span>+34 605 031 692</span>
</a>
```
Verde WhatsApp (#25D366), grande, con ícono.

**2. Email**
```html
<a href="mailto:francogasic2026@gmail.com" class="contact-email">
  francogasic2026@gmail.com
</a>
```
Con botón "copiar" (clipboard API). Al copiar: texto cambia a "✓ Copiado" por 2s.

**3. Perfil FIDE**
```html
<a href="https://ratings.fide.com/profile/3414370" target="_blank" class="contact-fide">
  Ver perfil FIDE ↗
</a>
```

---

## 11. FOOTER

```
[Ornamento decorativo — línea dorada]

FRANCO GASIC MERINO
♟ Abrazar el Acontecer

[línea separadora]

© 2025 · francogasic2026@gmail.com · FIDE: 3414370
```

Fondo: `var(--bg)` o ligeramente más oscuro.
Todo centrado, texto `var(--text-muted)` y `var(--gold)` para el lema.

---

## 12. Sistema Bilingüe (JS)

### Implementación
Cada elemento de texto tiene atributos `data-es` y `data-en`:
```html
<h2 data-es="Sobre Mí" data-en="About">Sobre Mí</h2>
```

### JavaScript (main.js)
```javascript
// Language toggle
const langBtn = document.getElementById('lang-toggle');
let currentLang = localStorage.getItem('lang') || 'es';

function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.querySelectorAll('[data-es][data-en]').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  // Update lang button indicator
  langBtn.textContent = lang === 'es' ? 'EN' : 'ES';
  document.documentElement.lang = lang;
}

langBtn.addEventListener('click', () => {
  setLanguage(currentLang === 'es' ? 'en' : 'es');
});

// Init
setLanguage(currentLang);
```

**Nota:** el lema "Abrazar el Acontecer" NO se traduce en ningún idioma. Se mantiene siempre en español.

---

## 13. Animaciones y Comportamientos JS

### Scroll Reveal (IntersectionObserver)
Todas las secciones y cards entran con: `opacity: 0; transform: translateY(30px)` → al intersectar viewport: `opacity: 1; transform: translateY(0)`, transición 0.6s ease.

### Nav Scroll
```javascript
window.addEventListener('scroll', () => {
  const nav = document.getElementById('main-nav');
  nav.classList.toggle('scrolled', window.scrollY > 80);
});
```

### Slideshow Hero
```javascript
// Rotar entre 5 fotos con Ken Burns + crossfade
const slides = document.querySelectorAll('.hero-slide');
let current = 0;

function nextSlide() {
  slides[current].classList.remove('active');
  current = (current + 1) % slides.length;
  slides[current].classList.add('active');
}

setInterval(nextSlide, 6000);
```

### Email Clipboard
```javascript
document.querySelector('.btn-copy-email').addEventListener('click', () => {
  navigator.clipboard.writeText('francogasic2026@gmail.com');
  // Feedback visual
});
```

### Smooth Scroll
```javascript
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

---

## 14. Google Analytics 4

En el `<head>` de index.html, añadir placeholder:

```html
<!-- Google Analytics 4 — reemplazar G-XXXXXXXXXX con el Measurement ID real -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

**El usuario debe:**
1. Crear cuenta en https://analytics.google.com
2. Crear propiedad → obtener Measurement ID (formato G-XXXXXXXXXX)
3. Reemplazar el placeholder en el HTML

---

## 15. SEO y Meta Tags

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Franco Gasic Merino — Clases de Ajedrez en Barcelona</title>
<meta name="description" content="Clases de ajedrez de nivel Intermedio-Avanzado en Barcelona y online. Presencial, online (Google Meet + Lichess) y Club de Escacs del Prat.">
<meta property="og:title" content="Franco Gasic Merino — Clases de Ajedrez">
<meta property="og:description" content="Clases de ajedrez de nivel Intermedio-Avanzado en Barcelona y online.">
<meta property="og:type" content="website">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 16. Responsive

| Breakpoint | Ajustes |
|---|---|
| > 1200px | Layout completo |
| 768–1199px | Columnas se reducen, fuentes 85% |
| < 768px | Todo 1 columna, nav hamburger, H1 38px, lema 20px |

Grids: CSS Grid / Flexbox nativo. No frameworks CSS.

---

## 17. Notas de Implementación

1. **No usar** jQuery, Bootstrap, ni ningún framework CSS.
2. **No mencionar** ningún título FIDE (ni FM, ni CM, ni ningún otro). Solo mostrar las cifras de rating.
3. El nombre del club se escribe exactamente: **Club de Escacs del Prat** (en catalán, no traducir).
4. El lema **"Abrazar el Acontecer"** aparece en español en todo el sitio, incluso en modo inglés.
5. Los nombres de las aperturas de ajedrez **no se traducen**.
6. Las 5 fotos forman el slideshow del hero. photo-1 también se usa como imagen estática en Sobre Mí.
7. Abrir WhatsApp y FIDE en `target="_blank"`.
8. El proyecto debe ser **100% deployable en Vercel** sin configuración adicional (solo subir los archivos).
9. Incluir `vercel.json` mínimo si fuera necesario, o asegurarse de que el `index.html` en raíz sea suficiente.

---

## 18. Entregables

- `/index.html`
- `/css/styles.css`
- `/js/main.js`
- `/images/` (el usuario aporta las fotos)
- (opcional) `/vercel.json`

---

## FIN DEL SPEC
