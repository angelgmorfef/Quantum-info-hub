# 🚀 Quantum Hub - El Futuro de los Computadores Cuánticos

[![HTML5](https://img.shields.io/badge/HTML5-Semántico-orange.svg?style=flat-square&logo=html5)](https://developer.mozilla.org/es/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Moderno-blue.svg?style=flat-square&logo=css3)](https://developer.mozilla.org/es/docs/Web/CSS)
[![JSES6+](https://img.shields.io/badge/JavaScript-ES6%2B-yellow.svg?style=flat-square&logo=javascript)](https://developer.mozilla.org/es/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

Un repositorio optimizado y estructurado como una **experiencia de aprendizaje significativa**, enfocado en la divulgación científica sobre la computación cuántica, sus oportunidades tecnológicas y sus riesgos de ciberseguridad.

Este proyecto fue refactorizado y optimizado aplicando los recursos, patrones de diseño y estándares del bootcamp [JSCamp](https://www.jscamp.dev/).

---

## 🎯 Propósito del Proyecto
Demostrar el poder de la **Web Nativa** (HTML, CSS y JS puro, sin frameworks pesados ni dependencias externas) para crear una interfaz de usuario fluida, accesible, responsiva y con una estética visual premium que mejore la experiencia del lector.

---

## ✨ Características Principales

*   **HTML5 Altamente Semántico & Accesibilidad (a11y):** Estructura robusta mediante etiquetas semánticas (`<article>`, `<section>`, `<aside>`), navegación rápida mediante teclado (`skip-link`) y soporte para lectores de pantalla mediante roles ARIA.
*   **Estética Visual Premium Adaptativa:** Diseño moderno inspirado en la paleta de JSCamp (fondo oscuro sofisticado con gradientes de acento en violeta y cian cuántico).
*   **Fondo de Partículas Cuánticas Interactivas:** Animación en tiempo real programada sobre `HTML5 Canvas API` que simula qubits entrelazándose en superposición de estados ($|0\rangle$ o $|1\rangle$).
*   **Modo Claro / Oscuro Persistente:** Tema de color adaptativo que se sincroniza con las preferencias del sistema o se selecciona manualmente, guardando la configuración en `localStorage`.
*   **Barra de Lectura y Estimaciones Activas:** Cálculo en tiempo real del tiempo de lectura estimado del artículo y barra superior de progreso que responde dinámicamente al scroll.
*   **Menú Lateral de Contenidos Activo (TOC):** Seguimiento inteligente mediante la API `IntersectionObserver` que resalta la sección que el usuario está leyendo actualmente, además de un efecto de parpadeo (`flash-highlight`) al pulsar un enlace.
*   **Formulario de Contacto Validado:** Validaciones nativas robustas de campos obligatorios, patrones de entrada de datos y tipos de inputs HTML5.

---

## 📁 Estructura del Repositorio

```
Quantum-info-hub/
├── index.html                    # Artículo principal sobre computadores cuánticos
├── devo.html                     # Biografía y evolución del proyecto (Sobre DEVo)
├── contacto.html                 # Formulario de contacto
├── README.md                     # Documentación técnica
├── LICENSE                       # Licencia MIT del proyecto
├── .gitignore                    # Archivos ignorados por Git
└── asset/
    ├── css/
    │   ├── reset.css             # Normalización CSS moderna
    │   ├── index.css             # Tokens de diseño y variables globales
    │   └── components.css        # Estilos aislados de componentes interactivos
    ├── js/
    │   ├── index.js              # Entry point modular
    │   └── modules/
    │       ├── theme-toggle.js   # Gestión de tema claro/oscuro
    │       ├── scroll-observer.js # Intersection Observers y scroll
    │       ├── reading-progress.js # Estimación y barra de progreso
    │       └── quantum-particles.js # Simulación Canvas de qubits
    └── img/
        ├── favicon.png           # Ícono del sitio
        └── [imágenes de soporte optimizadas]
```

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

1.  Clona este repositorio:
    ```bash
    git clone https://github.com/angelgmorfef/Quantum-info-hub.git
    ```
2.  Accede a la carpeta del proyecto:
    ```bash
    cd Quantum-info-hub
    ```
3.  Abre el archivo `index.html` en tu navegador. 
    *   *Recomendación:* Utiliza una extensión de servidor local como **Live Server** en VS Code para que las importaciones de ES Modules (`import/export`) funcionen correctamente y disfrutes de Live Reload.

---

## 📚 Módulos JSCamp Aplicados

Este proyecto implementa y demuestra competencias clave de los siguientes módulos del temario de [JSCamp](https://www.jscamp.dev/):
*   **Módulo 02 (HTML & CSS):** Maquetación semántica, responsive design mobile-first con Custom Properties, efectos de blur y transiciones fluidas.
*   **Módulo 03 (JavaScript):** Modularización con ES Modules, manejo del DOM asíncrono, eventos personalizados, APIs nativas del navegador (`IntersectionObserver`, `Canvas`, `localStorage`).

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
