# Envy Front

Este proyecto es el **frontend** de una solución para la gestión de cotización, generación y rastreo de envíos en tiempo real para una empresa de logística. Está desarrollado en **React + TypeScript** usando Vite, y sigue principios de arquitectura limpia y modularidad.

---

## Tabla de Contenidos

- [Características principales](#características-principales)
- [Requisitos técnicos cubiertos](#requisitos-técnicos-cubiertos)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación y ejecución](#instalación-y-ejecución)
- [Scripts disponibles](#scripts-disponibles)
- [Pruebas](#pruebas)
- [Arquitectura y patrones](#arquitectura-y-patrones)
- [Notas y consideraciones](#notas-y-consideraciones)

---

## Características principales

- **Registro y autenticación de usuarios** con JWT.
- **Cotización de envíos** según peso, dimensiones, origen y destino.
- **Creación de órdenes de envío** a partir de una cotización.
- **Seguimiento en tiempo real** del estado de los envíos (polling).
- **Interfaz moderna** con Material-UI.
- **Gestión de estado global** con Context API y Zustand.
- **Pruebas unitarias y de integración** con Jest y React Testing Library.

---

## Requisitos técnicos cubiertos

| Requisito                                    | ¿Cumplido? | Detalle                                                                 |
|-----------------------------------------------|:----------:|-------------------------------------------------------------------------|
| React + TypeScript                           |     ✅     | Proyecto creado con Vite, React 19 y TypeScript                         |
| Arquitectura modular (Clean Architecture)     |     ✅     | Separación en servicios, repositorios, interfaces y hooks                |
| Material-UI                                  |     ✅     | Uso de `@mui/material` y `@emotion`                                     |
| Estado global (Redux/Context API/Zustand)     |     ✅     | Uso de Context API y Zustand                                            |
| Autenticación JWT                            |     ✅     | Manejo de token en localStorage, validación y refresco                  |
| Pruebas (Jest/React Testing Library)          |     ✅     | Carpetas `__tests__` y pruebas de integración                           |
| Microfrontends                               |     ❌     | No implementado (estructura monolítica)                                 |
| Seguimiento en tiempo real (WebSocket/polling)|  Parcial   | Se usa **polling** (actualización periódica), no WebSockets             |
| Documentación                                |     ✅     | Este README y comentarios en el código                                  |

---

## Estructura del proyecto

```
src/
  api/                # Configuración de Axios para llamadas HTTP
  components/         # Componentes UI reutilizables
  features/           # Módulos funcionales (auth, dashboard, home, quotation, shipments)
    auth/             # Autenticación y registro
      repositories/   # Acceso a datos (API)
      services/       # Lógica de negocio y validaciones
      store/          # Estado global (Zustand)
      hooks/          # Hooks personalizados
      interfaces/     # Tipos e interfaces
    dashboard/        # Panel de usuario y estadísticas
    home/             # Página principal y formulario de tracking
    quotation/        # Cotización de envíos
    shipments/        # Creación y seguimiento de envíos
  hooks/              # Hooks generales
  assets/             # Imágenes y recursos estáticos
  index.css           # Estilos globales
  main.tsx            # Punto de entrada de la app
  routes/             # Definición de rutas 
```

---

## Instalación y ejecución

### **Requisitos previos**
- Node.js >= 18.x
- npm >= 9.x

### **Instalación**

```bash
git clone <REPO_URL>
cd envy-front
npm install
```

### **Ejecución en desarrollo**

```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:5173](http://localhost:5173).

### **Build para producción**

```bash
npm run build
```

### **Previsualización del build**

```bash
npm run preview
```

---

## Scripts disponibles

- `npm run dev` – Inicia el servidor de desarrollo con Vite.
- `npm run build` – Compila el proyecto para producción.
- `npm run preview` – Previsualiza el build de producción.
- `npm run lint` – Ejecuta ESLint para análisis de código.

---

## Pruebas

El proyecto incluye pruebas unitarias y de integración usando **Jest** y **React Testing Library**.

- Las pruebas se encuentran en las carpetas `src/__tests__/`, `src/features/*/__tests__/`, etc.
- Para ejecutar las pruebas (si tienes configurado Jest):

```bash
npm test
```

---

## Arquitectura y patrones

- **Clean Architecture (adaptada a frontend):**
  - **Servicios**: Lógica de negocio y validaciones.
  - **Repositorios**: Acceso a datos externos (API REST).
  - **Interfaces**: Contratos y tipos TypeScript.
  - **Hooks y Stores**: Manejo de estado y lógica de presentación.
- **Material-UI**: Para componentes visuales y estilos.
- **Context API y Zustand**: Para manejo de estado global.
- **Axios**: Para llamadas HTTP.
- **Polling**: Para actualización periódica del estado de los envíos (cada 30 segundos por defecto).

---

## Notas y consideraciones

- **Microfrontends**:  
  Actualmente la app es monolítica. Si necesitas microfrontends, se debe reestructurar usando Webpack Module Federation o Single SPA.
- **WebSockets**:  
  El seguimiento de envíos se realiza mediante polling. Para WebSockets, se debe modificar el backend y el hook de tracking.
- **Backend**:  
  Este repositorio es solo el frontend. El backend debe implementarse por separado (Express/Fastify, JWT, MySQL/PostgreSQL, Redis, Swagger, etc.).
- **Video explicativo**:  
  No incluido en el repositorio. Debe grabarse aparte mostrando la funcionalidad y arquitectura.

---

