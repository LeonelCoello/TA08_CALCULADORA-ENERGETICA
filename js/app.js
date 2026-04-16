let currentLang = 'en';

const officialIPC = {
    2023: 3.1, 2024: 3.2, 2025: 2.4, 2026: 3.4,
    2027: 2.5, 2028: 2.1, 2029: 2.0, 2030: 2.0
};

function autoFillIPC(index) {
    const yearValue = parseInt(document.getElementById('year' + index).value);
    const ipcInput = document.getElementById('ipc' + index);
    if (officialIPC[yearValue]) ipcInput.value = officialIPC[yearValue];
    else if (yearValue > 2030) ipcInput.value = 2.0; 
    runCalculations();
}

function formatNum(val) {
    return new Intl.NumberFormat('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
}

function toggleLang() {
    currentLang = currentLang === 'en' ? 'es' : 'en';
    document.querySelectorAll('.i18n').forEach(el => {
        el.innerText = el.getAttribute(`data-${currentLang}`);
    });
    document.getElementById('langBtn').innerText = currentLang === 'en' ? '🇪🇸 Español' : '🇬🇧 English';
    if(document.getElementById('resultsGrid')) runCalculations();
}

function getDayProfile(date) {
    const month = date.getMonth();
    const day = date.getDate();
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) return 'weekend';
    if (month === 7 || (month === 6 && day > 15)) return 'summer';
    const holidays = ["1-1", "6-1", "1-5", "24-6", "11-9", "24-9", "12-10", "1-11", "6-12", "8-12", "25-12", "26-12"];
    if (holidays.includes(`${day}-${month + 1}`)) return 'holiday';
    if ((month === 11 && day >= 22) || (month === 0 && day <= 7)) return 'holiday';
    if (month === 3 && day >= 14 && day <= 21) return 'holiday';
    return 'school_day';
}

let ecoChart = null;

function runCalculations() {
    const dailyE = parseFloat(document.getElementById('baseElec').value) / 30;
    const dailyW = parseFloat(document.getElementById('baseWater').value) / 30;
    const dailyO = parseFloat(document.getElementById('baseOffice').value) / 30;
    const dailyC = parseFloat(document.getElementById('baseClean').value) / 30;
    
    // Variables generales
    const reductionVal = parseFloat(document.getElementById('reductionPercent').value) || 0;
    const reduce = 1.0 - (reductionVal / 100);
    const solarVal = parseFloat(document.getElementById('solarPercent').value) || 0;
    const solarFactor = 1.0 - (solarVal / 100);
    const cloudVal = parseFloat(document.getElementById('cloudPercent').value) || 0;
    const cloudFactor = 1.0 - (cloudVal / 100);
    const timeScale = document.getElementById('timeScale').value;

    // 🟢 MICRO-OPTIMIZACIONES HARDWARE 🟢
    const ledVal = parseFloat(document.getElementById('opt-led').value) || 0;
    const isMotion = document.getElementById('opt-motion') && document.getElementById('opt-motion').checked;
    const isWater = document.getElementById('opt-water') && document.getElementById('opt-water').checked;
    const isHeatEco = document.getElementById('opt-heat') && document.getElementById('opt-heat').checked;
    const isCoolEco = document.getElementById('opt-cool') && document.getElementById('opt-cool').checked;
    const isItAm = document.getElementById('opt-it-am') && document.getElementById('opt-it-am').checked;
    const isItPm = document.getElementById('opt-it-pm') && document.getElementById('opt-it-pm').checked;
    
    // NUEVOS CONTROLES: GREEN IT & LLUVIA
    const isCpd = document.getElementById('opt-cpd') && document.getElementById('opt-cpd').checked;
    const isRain = document.getElementById('opt-rain') && document.getElementById('opt-rain').checked;

    // Matemáticas de ahorro global
    const ledFactor = 1.0 - ((ledVal / 100) * 0.12);
    const motionFactor = isMotion ? 0.98 : 1.0; 
    const smartWaterFactor = isWater ? 0.80 : 1.0; 
    const cpdFactor = isCpd ? 0.95 : 1.0; // 5% (media de 4-6%) ahorro global de electricidad por Green IT
    const rainFactor = isRain ? 0.88 : 1.0; // 12% ahorro global de agua por Recolección

    // Auto-Sleep IT
    let itFactor = 1.0;
    if (isItAm) itFactor -= 0.04; 
    if (isItPm) itFactor -= 0.04; 

    let totals = { yearE:0, schoolE:0, yearW:0, schoolW:0, yearO:0, schoolO:0, yearC:0, schoolC:0 };
    let baseE = 0, baseW = 0, baseO = 0, baseC = 0; 
    let monthlyE = new Array(12).fill(0);
    let monthlyW = new Array(12).fill(0);
    let currentDate = new Date(2025, 0, 1);
    let schoolDays = 0;

    for(let i = 0; i < 365; i++) {
        const profile = getDayProfile(currentDate);
        const m = currentDate.getMonth();
        let multE = 1.0, multW = 1.0, multO = 1.0, multC = 1.0;

        if (profile === 'school_day') { 
            schoolDays++; 
            
            // Climatización Estacional
            if (m === 10 || m === 11 || m === 0 || m === 1) {
                multE = isHeatEco ? 1.15 : 1.35; 
            } else if (m === 4 || m === 5) {
                multE = isCoolEco ? 1.10 : 1.25;
            } else {
                multE = 1.0;
            }

            multE *= itFactor; 

            if (m === 4 || m === 5 || m === 8) multW = 1.3; else multW = 1.0;
            
        } else if (profile === 'weekend') {
            multE = 0.15; multW = 0.05; multO = 0; multC = 0;
        } else if (profile === 'holiday') {
            multE = 0.10; multW = 0.02; multO = 0; multC = 0;
        } else if (profile === 'summer') {
            multE = 0.25; multW = 0.1; multO = 0.05; multC = 0.1;
        }

        // Base pura
        baseE += dailyE * multE;
        baseW += dailyW * multW;
        baseO += dailyO * multO;
        baseC += dailyC * multC;

        // Cálculos con las reducciones (CPD y Rain integrados)
        let dE = dailyE * multE * reduce * solarFactor * ledFactor * motionFactor * cpdFactor;
        let dW = dailyW * multW * reduce * smartWaterFactor * rainFactor;
        let dO = dailyO * multO * reduce * cloudFactor; 
        let dC = dailyC * multC * reduce;

        totals.yearE += dE; totals.yearW += dW; totals.yearO += dO; totals.yearC += dC;
        if (m !== 7) { 
            totals.schoolE += dE; totals.schoolW += dW; totals.schoolO += dO; totals.schoolC += dC;
        }
        monthlyE[m] += dE;
        monthlyW[m] += dW;
        currentDate.setDate(currentDate.getDate() + 1);
    }

    renderChart(monthlyE, monthlyW);

    let divY = 1, divS = 1, suffix = "";
    if (timeScale === 'month') { divY = 12; divS = 10; suffix = currentLang==='en'?" /mo":" /mes"; }
    if (timeScale === 'day') { divY = 365; divS = schoolDays; suffix = currentLang==='en'?" /day":" /día"; }

    const labels = currentLang === 'en' ? 
        { eY: "Electricity (Annual)", eS: "Electricity (Sept-Jul)", wY: "Water (Annual)", wS: "Water (Sept-Jul)", oY: "Office (Annual)", oS: "Office (Sept-Jul)", cY: "Cleaning (Annual)", cS: "Cleaning (Sept-Jul)" } :
        { eY: "Electricidad (Anual)", eS: "Electricidad (Set-Jul)", wY: "Agua (Anual)", wS: "Agua (Set-Jul)", oY: "Oficina (Anual)", oS: "Oficina (Set-Jul)", cY: "Limpieza (Anual)", cS: "Limpieza (Set-Jul)" };

    document.getElementById('resultsGrid').innerHTML = `
        <div class="res-box"><strong>${labels.eY}</strong><br>${formatNum(totals.yearE/divY)} kWh${suffix}</div>
        <div class="res-box"><strong>${labels.eS}</strong><br>${formatNum(totals.schoolE/divS)} kWh${suffix}</div>
        <div class="res-box"><strong>${labels.wY}</strong><br>${formatNum(totals.yearW/divY)} L${suffix}</div>
        <div class="res-box"><strong>${labels.wS}</strong><br>${formatNum(totals.schoolW/divS)} L${suffix}</div>
        <div class="res-box"><strong>${labels.oY}</strong><br>${formatNum(totals.yearO/divY)} €${suffix}</div>
        <div class="res-box"><strong>${labels.oS}</strong><br>${formatNum(totals.schoolO/divS)} €${suffix}</div>
        <div class="res-box"><strong>${labels.cY}</strong><br>${formatNum(totals.yearC/divY)} €${suffix}</div>
        <div class="res-box"><strong>${labels.cS}</strong><br>${formatNum(totals.schoolC/divS)} €${suffix}</div>
    `;

    renderPredictionTable(baseE, baseW, baseO, baseC, reductionVal, solarFactor, cloudFactor, ledFactor, motionFactor, cpdFactor, smartWaterFactor, rainFactor);
}

function renderPredictionTable(bE, bW, bO, bC, targetRed, solarF, cloudF, ledF, motionF, cpdF, waterF, rainF) {
    const tableContainer = document.getElementById('predictionTableContainer');
    
    const y1 = parseInt(document.getElementById('year1').value) || new Date().getFullYear();
    const y2 = y1 + 1;
    const y3 = y1 + 2;

    const ipc = parseFloat(document.getElementById('ipc1').value) || 0;
    const tElec = parseFloat(document.getElementById('tariffElec').value) || 0;
    const tWater = parseFloat(document.getElementById('tariffWater').value) || 0;

    const i1 = 1 + (ipc/100);
    const i2 = Math.pow(1 + (ipc/100), 2);
    const i3 = Math.pow(1 + (ipc/100), 3);

    const r1 = 1 - ((targetRed / 100) * 0.33);
    const r2 = 1 - ((targetRed / 100) * 0.66);
    const r3 = 1 - ((targetRed / 100) * 1.00);

    const finalElecFactor = solarF * ledF * motionF * cpdF;
    const finalWaterFactor = waterF * rainF;

    const costE1 = bE * r1 * finalElecFactor * tElec * i1;
    const costW1 = bW * r1 * finalWaterFactor * tWater * i1;
    const costO1 = bO * r1 * cloudF * i1;
    const costC1 = bC * r1 * i1;

    const costE2 = bE * r2 * finalElecFactor * tElec * i2;
    const costW2 = bW * r2 * finalWaterFactor * tWater * i2;
    const costO2 = bO * r2 * cloudF * i2;
    const costC2 = bC * r2 * i2;

    const costE3 = bE * r3 * finalElecFactor * tElec * i3;
    const costW3 = bW * r3 * finalWaterFactor * tWater * i3;
    const costO3 = bO * r3 * cloudF * i3;
    const costC3 = bC * r3 * i3;

    tableContainer.innerHTML = `
        <table class="styled-table" style="width: 100%; font-variant-numeric: tabular-nums;">
            <thead>
                <tr>
                    <th>${currentLang === 'en' ? "Year" : "Año"}</th>
                    <th style="color: #d97706;">⚡ Elec. (€)</th>
                    <th style="color: #2563eb;">💧 Water (€)</th>
                    <th style="color: #4b5563;">📎 Office (€)</th>
                    <th style="color: #4b5563;">✨ Clean (€)</th>
                    <th style="background: #1f2937; color: white;">💰 Total (€)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>${y1}</strong> <br><small>IPC base: +${ipc}%</small></td>
                    <td>${formatNum(costE1)}</td>
                    <td>${formatNum(costW1)}</td>
                    <td>${formatNum(costO1)}</td>
                    <td>${formatNum(costC1)}</td>
                    <td style="font-weight:bold;">${formatNum(costE1+costW1+costO1+costC1)}</td>
                </tr>
                <tr>
                    <td><strong>${y2}</strong> <br><small>IPC acumu.</small></td>
                    <td>${formatNum(costE2)}</td>
                    <td>${formatNum(costW2)}</td>
                    <td>${formatNum(costO2)}</td>
                    <td>${formatNum(costC2)}</td>
                    <td style="font-weight:bold;">${formatNum(costE2+costW2+costO2+costC2)}</td>
                </tr>
                <tr style="background: #ecfdf5;">
                    <td style="color: #059669;"><strong>${y3} (GOAL)</strong> <br><small>IPC acumu.</small></td>
                    <td style="color: #059669; font-weight:bold;">${formatNum(costE3)}</td>
                    <td style="color: #059669; font-weight:bold;">${formatNum(costW3)}</td>
                    <td style="color: #059669; font-weight:bold;">${formatNum(costO3)}</td>
                    <td style="color: #059669; font-weight:bold;">${formatNum(costC3)}</td>
                    <td style="background: #059669; color: white; font-weight:bold;">${formatNum(costE3+costW3+costO3+costC3)}</td>
                </tr>
            </tbody>
        </table>
    `;
}

function renderChart(dataE, dataW) {
    const ctx = document.getElementById('myChart').getContext('2d');
    if(ecoChart) ecoChart.destroy();
    
    const mLabels = currentLang === 'en' ? ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] : ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    
    ecoChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: mLabels,
            datasets: [
                { label: currentLang==='en'?'Electricity (kWh)':'Electricidad (kWh)', data: dataE, borderColor: '#f59e0b', fill: false, tension: 0.4, yAxisID: 'y'},
                { label: currentLang==='en'?'Water (L)':'Agua (L)', data: dataW, borderColor: '#3b82f6', fill: false, tension: 0.4, yAxisID: 'y1'}
            ]
        },
        options: { 
            responsive: true, maintainAspectRatio: false,
            interaction: { mode: 'index', intersect: false },
            scales: {
                y: { type: 'linear', display: true, position: 'left', title: { display: true, text: 'kWh' } },
                y1: { type: 'linear', display: true, position: 'right', title: { display: true, text: currentLang==='en'?'Litres':'Litros' }, grid: { drawOnChartArea: false } }
            }
        }
    });
}

function exportToPDF() {
    const dateElement = document.getElementById('printDate');
    const datePrefix = currentLang === 'en' ? 'Date: ' : 'Fecha: ';
    dateElement.innerText = datePrefix + new Date().toLocaleDateString();
    window.print();
}

window.onload = () => { 
    if(document.getElementById('year1')) {
        const currentYear = new Date().getFullYear();
        document.getElementById('year1').value = currentYear;
        autoFillIPC(1);
    }
};