# 🚀 Quantum Hub - El Futuro de los Computadores Cuánticos

[![React](https://img.shields.io/badge/Frontend-React%2BVite-blue.svg?style=flat-square&logo=react)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%2BExpress-green.svg?style=flat-square&logo=nodedotjs)](https://nodejs.org)
[![Vercel](https://img.shields.io/badge/Deployment-Vercel-black.svg?style=flat-square&logo=vercel)](https://vercel.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

Un repositorio optimizado y estructurado enfocado en la divulgación científica sobre la computación cuántica, sus oportunidades tecnológicas y sus riesgos de ciberseguridad.

Este proyecto ha evolucionado de ser un sitio web estático tradicional a una **Aplicación Full-Stack** moderna (Monorepo), implementando las mejores prácticas de desarrollo web interactivo y arquitectura Serverless en la nube.

---

## 🎯 Propósito del Proyecto
Crear una plataforma educativa altamente interactiva y de diseño premium. El proyecto demuestra la integración exitosa de un frontend fluido (React) con una API RESTful robusta (Express), ambos optimizados para ser desplegados como aplicaciones y funciones Serverless independientes en la nube, garantizando un rendimiento y escalabilidad excepcionales.

---

## ✨ Características Principales

*   **Arquitectura Full-Stack Monorepo:** Separación limpia de responsabilidades entre el cliente (`frontend/`) y el servidor (`backend/`), facilitando la mantenibilidad, escalabilidad y los despliegues independientes en Vercel.
*   **Frontend Interactivo (React + Vite):** Interfaz de usuario dinámica basada en componentes. Una SPA (Single Page Application) rápida que consume datos centralizados de la API evitando recargas innecesarias en el navegador.
*   **API RESTful Segura (Node.js + Express):** Backend estructurado con rutas modulares, controladores y middlewares de protección de grado de producción (Helmet para cabeceras HTTP, Rate Limiting para prevenir abusos y configuración estricta de CORS).
*   **Despliegue Serverless Optimizado:** El servidor Node.js no requiere estar encendido 24/7. Fue adaptado (exportando la app de Express) para que Vercel lo envuelva como Funciones Serverless ("bajo demanda"), reduciendo costos e infraestructura.
*   **Experiencia de Usuario Premium:** Temas adaptativos (Modo oscuro/claro), componentes interactivos para explicar conceptos cuánticos y un diseño moderno enfocado en la legibilidad científica.

---

## 📁 Estructura del Repositorio

El proyecto sigue una estructura de **Monorepo**, conteniendo ambos entornos aislados pero conviviendo bajo el mismo control de versiones:

```
Quantum-info-hub/
├── frontend/                     # Aplicación cliente (React + Vite)
│   ├── src/                      # Código fuente (Componentes, API Client)
│   ├── public/                   # Archivos y assets estáticos
│   ├── package.json              # Dependencias de React y Vite
│   └── vite.config.js            # Configuración del empaquetador
│
├── backend/                      # API RESTful (Node.js + Express)
│   ├── routes/                   # Definición de endpoints (/api/concepts, etc)
│   ├── config/                   # Configuración de CORS y Seguridad
│   ├── server.js                 # Entry point (Adaptado para Vercel Serverless)
│   ├── vercel.json               # Configuración de enrutamiento Serverless
│   └── package.json              # Dependencias del servidor Express
│
├── README.md                     # Documentación técnica
└── LICENSE                       # Licencia MIT del proyecto
```

---

## 🛠️ Cómo Ejecutar el Proyecto Localmente

Para correr este proyecto en tu máquina, necesitarás [Node.js](https://nodejs.org/) instalado. Al ser un monorepo, debes iniciar el backend y el frontend por separado en dos consolas distintas.

### 1. Iniciar la API (Backend)
```bash
cd backend
npm install
npm run dev   # Arranca el servidor Express (por defecto en http://localhost:4000)
```

### 2. Iniciar la Interfaz (Frontend)
Abre una nueva terminal en la raíz del proyecto:
```bash
cd frontend
npm install
npm run dev   # Arranca el servidor Vite (por defecto en http://localhost:5173)
```

### 3. Conexión de Variables (.env)
Para el desarrollo local, asegúrate de que el frontend apunte al servidor local correcto. 
Crea un archivo `.env` dentro de la carpeta `frontend/` con:
`VITE_API_URL=http://localhost:4000/api`

---

## 🌐 Despliegue en Producción (Vercel)

Este repositorio está preparado para funcionar sin problemas en el entorno de Vercel creando dos "Proyectos" distintos que apuntan al mismo repositorio:

1.  **Para el Frontend:** Se debe establecer el *Root Directory* como `frontend`. Vercel auto-detectará a Vite. Las peticiones a la base de datos se configuran agregando la variable `VITE_API_URL` en el panel web.
2.  **Para el Backend:** Se debe establecer el *Root Directory* como `backend`. Gracias a las configuraciones en `backend/vercel.json` y a `module.exports = app`, Vercel despliega automáticamente la API como funciones Serverless. Las solicitudes externas se permiten configurando el `FRONTEND_URL` en las variables de entorno de Vercel para autorizar el CORS.

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
