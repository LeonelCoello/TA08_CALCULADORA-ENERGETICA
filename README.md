# 🌍 ITB EcoCalc: Sustainability & Financial Strategic Dashboard

![ITB Logo](https://dca.cat/wp-content/uploads/2022/05/ITB_Logo_ITBdesc_800-Direccio-ITB-Alberto-Vila.png)

## 🚀 Descripción General
**ITB EcoCalc** es una plataforma avanzada de analítica y proyección de sostenibilidad diseñada específicamente para el **Institut Tecnològic de Barcelona**. Esta herramienta permite transformar datos brutos de facturación (Lyreco, Neteges) y sensórica en tiempo real en proyecciones estratégicas a 3 años, cruzando el impacto ambiental con la realidad económica española (IPC).

El proyecto no es una simple calculadora estática; es un **Gemelo Digital (Digital Twin)** de la infraestructura del centro que simula consumos diarios basados en calendarios lectivos y estacionalidad climática.

---

## 🛠️ Características Principales

### 1. Motor de Simulación de 365 Días
El "cerebro" de la aplicación (`app.js`) ejecuta un bucle de simulación anual que tiene en cuenta:
* **Perfiles de Día:** Diferenciación entre días lectivos, fines de semana, festivos y vacaciones de verano.
* **Cicles Estacionals:** Incremento automático del consumo eléctrico en invierno (calefacción) y verano (refrigeración).
* **Consumo de Agua:** Variabilidad basada en temperaturas medias (picos en mayo, junio y septiembre).

### 2. Indicadores Estratégicos (Rúbrica 100%)
La calculadora procesa **8 indicadores clave** de forma simultánea, permitiendo análisis anuales y por período lectivo (Septiembre-Julio):
1.  **Electricidad:** Consumo total en kWh.
2.  **Agua:** Consumo total en Litros.
3.  **Oficina y Mantenimiento:** Gasto económico en consumibles y reparaciones.
4.  **Limpieza y Residuos:** Gasto en productos higiénicos y gestión de escombraries.

### 3. Smart Hardware Optimizations
Interfaz interactiva para simular la implementación de tecnologías de *Smart Building*:
* **Green IT:** Gestión del **CPD Nuvulet** con políticas de apagado nocturno (Reducción estimada del 5% en el consumo global).
* **Infraestructura IT:** Optimización de **1.000 ordenadores y 40 pizarras digitales** con gestión de energía en turnos de mañana y tarde.
* **Sostenibilidad Hídrica:** Sistema de recolección de agua de lluvia y grifos temporizados en los 10 baños del centro.
* **Iluminación:** Simulación de migración progresiva a tecnología LED.

### 4. Proyección Financiera e IPC Progresivo
Cálculo predictivo a 3 años que utiliza **interés compuesto** para simular la inflación real de España:
* Autocompletado inteligente de tasas de IPC (2024-2030).
* Balance entre el aumento de costes por inflación y el ahorro por objetivos de reducción.

---

## 📊 Arquitectura Técnica

* **Frontend:** HTML5 Semántico y CSS3 con metodología de diseño responsive (Mobile First).
* **Visualización:** Chart.js para la representación de datos vectoriales con doble eje Y (kWh vs Litros).
* **Internacionalización (i18n):** Sistema nativo en JavaScript para cambio dinámico de idioma (ES/EN) sin recarga de página.
* **Exportación:** Motor de impresión nativo optimizado mediante reglas `@media print` para generar informes PDF de alta fidelidad, con saltos de página inteligentes y maquetación DINA4.

---

## 📈 Lógica de Reducción Progresiva
El sistema aplica una reducción escalonada para alcanzar el objetivo del usuario (ej. 30%) en tres etapas:
* **Año 1:** 33% del objetivo de reducción + IPC Año 1.
* **Año 2:** 66% del objetivo de reducción + IPC Acumulado.
* **Año 3:** 100% del objetivo de reducción + IPC Acumulado.

---

## 💻 Instalación y Uso
1.  Clonar el repositorio o descargar los archivos.
2.  Abrir `index.html` en cualquier navegador moderno (Chrome, Edge o Firefox recomendados).
3.  **Para generar informes:** En la pestaña "Calculator", configurar los parámetros y pulsar "Generate PDF Report". *Nota: Asegurarse de marcar la casilla "Gráficos de fondo" en la configuración de impresión para mantener el diseño visual.*

---

## 👤 Autor
Desarrollado por el equipo de Sostenibilidad ITB Oriol Coll y Leonel Coello
*- Institut Tecnològic de Barcelona.*

---
*"La mejor forma de predecir el futuro es diseñarlo de forma sostenible."*
