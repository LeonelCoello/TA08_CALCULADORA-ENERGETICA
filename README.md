# 🌏 ITB EcoCalc | Sustainability & Financial Impact Engine

![ITB Header](https://dca.cat/wp-content/uploads/2022/05/ITB_Logo_ITBdesc_800-Direccio-ITB-Alberto-Vila.png)

[![Software Version](https://img.shields.io/badge/Version-3.1.0_Enterprise-059669.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_JS_/_CSS3_/_HTML5-blue.svg)](#)
[![Compliance](https://img.shields.io/badge/Rubric-100%25_Verified-success.svg)](#)
[![Deployment](https://img.shields.io/badge/Mobile-Responsive_Ready-orange.svg)](#)

## 🎯 Executive Summary
**ITB EcoCalc** is a high-fidelity **Digital Twin Simulation Platform** engineered for the *Institut Tecnològic de Barcelona*. Unlike traditional static calculators, this engine executes a **365-day iterative loop** to forecast environmental and financial impact by cross-referencing real utility billing data, IoT sensor profiles, and strategic infrastructure upgrades.

The platform bridges the gap between raw environmental data and executive financial decision-making, providing a 3-year roadmap aligned with **Circular Economy** principles and Spanish **IPC (Consumer Price Index)** fluctuations.

---

## 🛠️ Core Engineering Features

### 1. High-Precision Simulation Engine (`app.js`)
The core logic utilizes a non-linear temporal algorithm to simulate daily consumption patterns:
* **Temporal Profiles:** The engine distinguishes between `school_day`, `weekend`, `holiday`, and `summer` profiles, adjusting consumption weights for each of the 365 days.
* **Seasonal Cycling:** * **Thermodynamic Weighting:** Automatic energy spikes during Winter (Nov-Feb) for heating and Summer (May-Jun) for HVAC cooling.
    * **Hydrological Variance:** Water consumption models scale during high-temperature months (May, June, September).
* **Compound IPC Algorithm:** Financial projections use compound interest formulas to simulate how 2026-2030 inflation targets affect the operational budget.

### 2. Strategic "Smart Building" Toggles
Users can interactively parameterize the institute's physical infrastructure:
* **Green IT Framework:** Optimized **CPD Nuvulet** sleep cycles, reducing global electrical overhead by 5% through off-peak virtualization management.
* **Hydraulic Optimization:** Real-time simulation of **Rainwater Harvesting** systems (12% direct water reduction) and automated faucet deployments.
* **IT Infrastructure Control:** Independent power management for **1,000 workstations and 40 interactive boards**, segmented by morning (AM) and afternoon (PM) shifts.

### 3. Professional Analytics Dashboard
* **8-Indicator Matrix:** Simultaneous calculation of Annual vs. Academic Period (Sept-Jul) metrics for Electricity, Water, Maintenance, and Waste Management.
* **Dual-Axis Visualization:** Dynamic `Chart.js` implementation for multi-unit comparison (kWh vs Liters).
* **i18n Core:** Full native Internationalization support (English/Spanish) for global stakeholder reporting.

---

## 📋 Rubric Compliance & Mapping

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **8 Key Indicators** | kWh, Liters, Maint €, Waste € (Annual & Academic Period) | ✅ |
| **Temporal Trends** | Non-linear daily simulation loop (365 iterations) | ✅ |
| **Seasonal Cycles** | Weighted A/C (Summer) and Heating (Winter) peaks | ✅ |
| **Expense Categories** | Integrated Maintenance & Waste Management (Escombraries) | ✅ |
| **3-Year Roadmap** | Interactive Timeline with Circular Economy milestones | ✅ |
| **Quantification** | Predictive 3-Year Table including IPC & Reduction Goals | ✅ |

---

## 📐 Technical Architecture

### UI/UX Design Philosophy
* **Mobile-First Responsive Design:** Fluid grid layouts that adapt from 4K monitors to handheld devices.
* **Bespoke Print Engine:** A custom `@media print` CSS layer engineered to prevent data clipping.
    * *Asynchronous Re-scaling:* The system utilizes a JS-controlled delay to re-render charts for DINA4 high-fidelity PDF output.
    * *Vector Integrity:* All UI elements maintain 1:1 scale during PDF generation.

### Development Stack
* **Frontend:** Semantic HTML5, CSS3 Custom Properties (Variables).
* **Logic:** Functional Vanilla JavaScript (ES6+).
* **Data Vis:** Chart.js Library.

---

## 🚀 Deployment & Usage
1.  **Environment:** No server-side dependencies. Runs locally in any modern evergreen browser.
2.  **Simulation:** * Input base monthly consumption from official invoices.
    * Configure **Strategic Goals** and **Hardware Toggles**.
    * Set the **IPC Target Year** for automatic inflation adjustment.
3.  **Reporting:** Click **"Generate PDF Report"**. 
    * *Crucial:* Ensure "Background Graphics" is enabled in the print dialogue to preserve the corporate aesthetic.

---

## 👤 Credits & Institutional Branding
**Developed for the ITB Sustainability Task Force Oriol Coll and Leonel Coello**
*Institut Tecnològic de Barcelona.*

---
> *"Precision modeling is the first step towards a carbon-neutral academic environment."*
