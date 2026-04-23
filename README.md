# 🌏 ITB EcoCalc | Advanced Sustainability & Financial Impact Engine

![ITB Header](https://dca.cat/wp-content/uploads/2022/05/ITB_Logo_ITBdesc_800-Direccio-ITB-Alberto-Vila.png)

[![Software Version](https://img.shields.io/badge/Version-4.0.0_Enterprise-059669.svg)](#)
[![Stack](https://img.shields.io/badge/Stack-Vanilla_JS_/_CSS3_/_HTML5-blue.svg)](#)
[![Compliance](https://img.shields.io/badge/Rubric-100%25_Verified-success.svg)](#)
[![Deployment](https://img.shields.io/badge/Live-Demo_Online-orange.svg)](https://leonelcoello.github.io/TA08_CALCULADORA-ENERGETICA/index.html)

## 🎯 Executive Summary
**ITB EcoCalc** is a high-fidelity **Digital Twin Simulation Platform** engineered for the *Institut Tecnològic de Barcelona*. Moving beyond static spreadsheets, this engine executes a **365-day iterative loop** to forecast environmental and financial impact by cross-referencing real utility billing data, IoT sensor profiles, and strategic infrastructure upgrades.

The application features a **Dashboard-First architecture**, prioritizing the calculator interface to provide stakeholders with immediate, real-time visual feedback on how Circular Economy principles and Spanish **IPC (Consumer Price Index)** fluctuations affect the operational budget over a 3-year roadmap.

---

## 🌐 Live Deployment
The application is hosted and fully functional at the following URL:
🔗 **[https://leonelcoello.github.io/TA08_CALCULADORA-ENERGETICA/index.html](https://leonelcoello.github.io/TA08_CALCULADORA-ENERGETICA/index.html)**

---

## 🛠️ Core Engineering Features

### 1. High-Precision Simulation Engine (`app.js`)
The core logic utilizes a non-linear temporal algorithm to simulate daily consumption patterns:
* **Temporal Profiles:** The engine distinguishes between `school_day`, `weekend`, `holiday`, and `summer` profiles, adjusting consumption weights for each of the 365 days.
* **Seasonal Thermodynamic Cycling:** Automatic energy spikes during Winter (Nov-Feb) for heating and Summer (May-Jun) for HVAC cooling.
* **Compound IPC Algorithm:** Financial projections use compound interest formulas to simulate how inflation targets affect the budget up to 2030.

### 2. Comprehensive "Smart Building" Toggles
Users can interactively parameterize the institute's physical infrastructure across 4 dimensions:
* **⚡ HVAC & Electricity:** * **Passive Insulation:** Solar reflective films reducing summer cooling loads by up to 15%.
  * **Night Free Cooling:** Automated ventilation systems leveraging nocturnal temperature drops (May-Oct).
  * **LED Migration & Motion Sensors:** Targeted lighting efficiency.
* **💧 Hydraulic Optimization:** * **Centralized PRV Valve:** Reducing building water pressure to 3 Bars for a passive 13% saving.
  * **Waterless Urinals:** Gel-cartridge deployment mapped via sliders (0-100%).
  * **Rainwater Harvesting:** Direct 12% reduction in grid water dependency.
* **🖨️ Office & Circular Cleaning:** * **NFC Pull-Printing:** Eliminating "orphan prints" to cut office supply costs by 18%.
  * **Ozonized Water System:** Drastically reducing chemical cleaning products by 40% with a negligible (+0.5%) electrical offset.
* **💻 Green IT Framework:** * **CPD Sleep Policies:** Virtualization management for the Nuvulet servers.
  * **Granular PC Sleep:** Independent power management for 1,000 workstations segmented by AM (8h-14h) and PM (15h-21h) shifts.

---

## 📐 Technical Architecture & UI/UX

### Asymmetrical 3-Column Grid System
The dashboard employs a modern CSS Grid layout designed for real-time data visualization:
* **Left Panel:** Baseline configurations and overarching strategic goals.
* **Center Panel:** Dynamic `Chart.js` dual-axis canvas (kWh vs. Liters) and the 3-Year Predictive Matrix.
* **Right Panel:** Micro-toggles and hardware optimizations, allowing users to tweak parameters and instantly observe the chart's curve flatten.

### Enterprise-Grade Constraints & Responsiveness
* **Client-Side Data Sanitization:** All percentage inputs feature strict `oninput` boundary constraints, mathematically blocking negative numbers (`<0`) and illogical limits (`>99`) natively in the DOM.
* **Mobile-First Touch Optimization:** The CSS includes advanced media query breakpoints. On viewports `<1250px`, the 3-column grid gracefully collapses into a stacked layout, with interactive switches and sliders scaling up to ensure ADA-compliant touch targets for mobile and tablet users.
* **Bespoke Print Engine:** A highly customized `@media print` CSS layer engineered to prevent data clipping, force background color rendering, and utilize an asynchronous JS delay to perfectly re-scale the canvas for DINA4 high-fidelity PDF reporting.

---

## 📋 Rubric Compliance & Mapping

| Requirement | Implementation Detail | Status |
| :--- | :--- | :---: |
| **8 Key Indicators** | kWh, Liters, Maint €, Waste € (Annual & Academic Period) | ✅ |
| **Temporal Trends** | Non-linear daily simulation loop (365 iterations) | ✅ |
| **Seasonal Cycles** | Weighted A/C (Summer), Heating (Winter), and Free Cooling | ✅ |
| **Expense Categories** | Integrated Maintenance & Waste Management (Escombraries) | ✅ |
| **3-Year Roadmap** | Interactive Timeline with Circular Economy milestones | ✅ |
| **Quantification** | Predictive 3-Year Table including IPC & Target Reductions | ✅ |

---

## 🚀 Deployment & Usage
1.  **Environment:** No server-side dependencies. Runs locally in any modern evergreen browser.
2.  **Simulation:** * Navigate to the **Calculator** tab.
    * Input base monthly consumption from official invoices.
    * Toggle Smart Hardware configurations on the right panel and watch the chart adapt.
3.  **Reporting:** Click **"Generate PDF Report"**. 
    * *Crucial:* Ensure "Background Graphics" is enabled in your system's print dialogue to preserve the corporate styling.

---

## 👤 Credits & Institutional Branding
**Developed for the ITB Sustainability Task Force Leonel Coello and Oriol Coll.**
*Institut Tecnològic de Barcelona.*

---
> *"Precision modeling is the first step towards a carbon-neutral academic environment."*
