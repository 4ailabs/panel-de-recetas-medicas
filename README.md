# Panel de Recetas Médicas

Una aplicación web para generar y gestionar recetas médicas con funcionalidad de exportación a PDF.

## Características

- ✅ Interfaz intuitiva para crear recetas médicas
- ✅ Generación automática de códigos QR
- ✅ Exportación a PDF
- ✅ Diseño responsivo
- ✅ Integración con Airtable para almacenamiento de datos

## Tecnologías

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **PDF Generation**: jsPDF + html2canvas
- **QR Codes**: qrcode library
- **Database**: Airtable

## Instalación Local

1. Clona el repositorio:
```bash
git clone <tu-repositorio-url>
cd panel-de-recetas-médicas
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta el servidor de desarrollo:
```bash
npm run dev
```

## Despliegue en Vercel

### Opción 1: Desde GitHub (Recomendado)

1. Sube tu código a GitHub:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repositorio.git
git push -u origin main
```

2. Ve a [Vercel](https://vercel.com) y conecta tu repositorio de GitHub

### Opción 2: Vercel CLI

1. Instala Vercel CLI:
```bash
npm i -g vercel
```

2. Despliega:
```bash
vercel
```

## Scripts Disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run preview` - Preview del build

## Estructura del Proyecto

```
├── components/          # Componentes React
│   ├── icons/          # Iconos SVG
│   ├── Button.tsx
│   ├── MedicationInput.tsx
│   ├── PrescriptionForm.tsx
│   └── PrescriptionPreview.tsx
├── services/           # Servicios y APIs
│   ├── airtableService.ts
│   └── pdfService.ts
├── App.tsx            # Componente principal
├── index.tsx          # Punto de entrada
├── types.ts           # Definiciones de tipos
└── vercel.json        # Configuración de Vercel
```

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT.
