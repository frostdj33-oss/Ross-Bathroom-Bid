const fs = require(‘fs’);
let h = fs.readFileSync(‘index.html’, ‘utf8’);

// ── MEASUREMENTS PANEL CSS ──────────────────────────────────────────────────
const css = ` .meas-panel{max-width:900px;margin:24px auto 0;padding:0 16px;} .meas-box{background:var(--surface);border:2px solid var(--brass);border-radius:10px;overflow:hidden;} .meas-header{display:flex;align-items:center;justify-content:space-between;padding:16px 24px 12px;border-bottom:1px solid var(--border-bright);cursor:pointer;user-select:none;} .meas-header-left{display:flex;align-items:center;gap:12px;} .meas-eyebrow{font-size:9px;font-weight:500;letter-spacing:.22em;text-transform:uppercase;color:var(--brass);} .meas-title{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:var(--ink);margin-top:2px;} .meas-toggle{font-size:11px;color:var(--brass-dim);background:var(--surface3);border:1px solid var(--border-bright);border-radius:5px;padding:5px 12px;cursor:pointer;font-family:'DM Sans',sans-serif;font-weight:500;} .meas-toggle:hover{border-color:var(--brass);color:var(--brass);} .meas-body{padding:20px 24px 24px;} .meas-intro{font-size:12px;color:var(--ink-dim);margin-bottom:18px;line-height:1.55;} .meas-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:14px;} .meas-field{display:flex;flex-direction:column;gap:5px;} .meas-label{font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--brass-dim);} .meas-sublabel{font-size:10px;color:var(--ink-faint);margin-top:-3px;line-height:1.35;} .meas-input{background:var(--input-bg);border:1px solid var(--border-bright);border-radius:5px;color:var(--ink);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:8px 12px;width:100%;-moz-appearance:textfield;} .meas-input::-webkit-outer-spin-button,.meas-input::-webkit-inner-spin-button{-webkit-appearance:none;} .meas-input:focus{outline:none;border-color:var(--brass);box-shadow:0 0 0 2px rgba(196,151,63,.15);} .meas-actions{display:flex;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border);} .meas-btn{display:inline-flex;align-items:center;gap:7px;border:none;border-radius:6px;padding:9px 18px;font-size:12px;font-weight:500;text-transform:uppercase;letter-spacing:.06em;cursor:pointer;font-family:'DM Sans',sans-serif;transition:background .18s;} .meas-btn-primary{background:var(--brass);color:#0e0c08;} .meas-btn-primary:hover{background:var(--brass-light);} .meas-btn-secondary{background:var(--surface3);color:var(--ink-dim);border:1px solid var(--border-bright);} .meas-btn-secondary:hover{border-color:var(--brass-dim);color:var(--brass);} .meas-status{font-size:11px;color:var(--green);align-self:center;margin-left:auto;opacity:0;transition:opacity .3s;} .meas-status.show{opacity:1;} .meas-note{background:var(--scope-bg);border:1px solid var(--border);border-radius:6px;padding:10px 14px;margin-top:14px;font-size:11.5px;color:var(--ink-dim);line-height:1.5;} .meas-note strong{color:var(--brass-dim);} @media(max-width:600px){.meas-grid{grid-template-columns:1fr 1fr;}.meas-body{padding:16px;}}`;

// ── MEASUREMENTS PANEL HTML ─────────────────────────────────────────────────
const panel = `

<div class="meas-panel">
  <div class="meas-box">
    <div class="meas-header" onclick="toggleMeas()">
      <div class="meas-header-left">
        <div>
          <div class="meas-eyebrow">Step 1 — Enter Before Pricing</div>
          <div class="meas-title">Project Measurements</div>
        </div>
      </div>
      <button class="meas-toggle" id="meas-toggle-btn">Hide ▲</button>
    </div>
    <div class="meas-body" id="meas-body">
      <p class="meas-intro">Enter the room dimensions below. Quantity fields across all divisions will auto-populate so your PM only needs to confirm unit prices with subs and suppliers.</p>
      <div class="meas-grid">

```
    <div class="meas-field">
      <label class="meas-label">Floor SF</label>
      <div class="meas-sublabel">Total bathroom floor area</div>
      <input class="meas-input" type="number" id="m-floor-sf" placeholder="e.g. 180" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Shower Wall SF</label>
      <div class="meas-sublabel">3 walls floor-to-ceiling tile</div>
      <input class="meas-input" type="number" id="m-shower-wall-sf" placeholder="e.g. 120" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Shower Floor SF</label>
      <div class="meas-sublabel">Inside shower floor only</div>
      <input class="meas-input" type="number" id="m-shower-floor-sf" placeholder="e.g. 32" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Shower Bench SF</label>
      <div class="meas-sublabel">Bench top + face tile area</div>
      <input class="meas-input" type="number" id="m-bench-sf" placeholder="e.g. 12" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Vanity Wall Tile SF</label>
      <div class="meas-sublabel">Behind vanity — full height</div>
      <input class="meas-input" type="number" id="m-vanity-wall-sf" placeholder="e.g. 48" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Schluter Trim LF</label>
      <div class="meas-sublabel">All tile edge transitions</div>
      <input class="meas-input" type="number" id="m-trim-lf" placeholder="e.g. 60" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Ceiling SF</label>
      <div class="meas-sublabel">Full ceiling area (paint)</div>
      <input class="meas-input" type="number" id="m-ceiling-sf" placeholder="e.g. 180" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Wall SF (paint)</label>
      <div class="meas-sublabel">All paintable wall surfaces</div>
      <input class="meas-input" type="number" id="m-wall-paint-sf" placeholder="e.g. 420" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Door Casing LF</label>
      <div class="meas-sublabel">Both faces × 3 doors</div>
      <input class="meas-input" type="number" id="m-casing-lf" placeholder="e.g. 84" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">LED Toe-Kick LF</label>
      <div class="meas-sublabel">Vanity base run length</div>
      <input class="meas-input" type="number" id="m-led-lf" placeholder="e.g. 6" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Quartz Top SF</label>
      <div class="meas-sublabel">Countertop fabrication area</div>
      <input class="meas-input" type="number" id="m-quartz-sf" placeholder="e.g. 18" min="0" step="1" oninput="applyMeasurements()">
    </div>

    <div class="meas-field">
      <label class="meas-label">Electrical Wire LF</label>
      <div class="meas-sublabel">All lighting circuits est.</div>
      <input class="meas-input" type="number" id="m-wire-lf" placeholder="e.g. 120" min="0" step="1" oninput="applyMeasurements()">
    </div>

  </div>

  <div class="meas-actions">
    <button class="meas-btn meas-btn-primary" onclick="applyMeasurements()">
      ↳ Apply to All Divisions
    </button>
    <button class="meas-btn meas-btn-secondary" onclick="clearMeasurements()">
      Clear All
    </button>
    <span class="meas-status" id="meas-status">✓ Quantities updated</span>
  </div>

  <div class="meas-note">
    <strong>PM Note:</strong> These quantities include a 10% material waste factor already. Verify all measurements on-site before ordering. Unit prices should be confirmed with your tile sub, plumber, electrician, and painter. Add any allowances or alternates in the exclusions box at the bottom.
  </div>
</div>
```

  </div>
</div>`;

// ── MEASUREMENTS JAVASCRIPT ─────────────────────────────────────────────────
const js = `
// ── MEASUREMENTS PANEL ──
function toggleMeas(){
const b=document.getElementById(‘meas-body’);
const btn=document.getElementById(‘meas-toggle-btn’);
if(b.style.display===‘none’){b.style.display=’’;btn.textContent=‘Hide ▲’;}
else{b.style.display=‘none’;btn.textContent=‘Show ▼’;}
}

function setQty(label,val){
if(!val||val<=0)return;
document.querySelectorAll(’.pricing-row[data-row-label]’).forEach(row=>{
const l=row.getAttribute(‘data-row-label’)||’’;
if(l.toLowerCase().includes(label.toLowerCase())){
const q=row.querySelector(’[data-role=“qty”]’);
if(q&&q.type===‘number’){q.value=val;calcRow(q);}
}
});
}

function waste(n,pct){return Math.ceil(n*(1+(pct||0.10)));}

function applyMeasurements(){
const g=id=>parseFloat(document.getElementById(id)?.value)||0;
const floorSF=g(‘m-floor-sf’);
const showerWallSF=g(‘m-shower-wall-sf’);
const showerFloorSF=g(‘m-shower-floor-sf’);
const benchSF=g(‘m-bench-sf’);
const vanityWallSF=g(‘m-vanity-wall-sf’);
const trimLF=g(‘m-trim-lf’);
const ceilingSF=g(‘m-ceiling-sf’);
const wallPaintSF=g(‘m-wall-paint-sf’);
const casingLF=g(‘m-casing-lf’);
const ledLF=g(‘m-led-lf’);
const quartzSF=g(‘m-quartz-sf’);
const wireLF=g(‘m-wire-lf’);

// Flooring
if(floorSF){
setQtyById(‘sc01-hex-tile’,waste(floorSF));
setQtyByLabel(‘Schluter Ditra uncoupling membrane’,waste(floorSF));
setQtyByLabel(‘Thinset mortar — floor’,Math.ceil(waste(floorSF)/40));
setQtyByLabel(‘Dark unsanded grout’,Math.ceil(waste(floorSF)/50));
setQtyByLabel(‘Grout sealer’,Math.ceil(floorSF/200));
}

// Shower wall tile
if(showerWallSF){
setQtyByLabel(‘Shower wall tile — 24x48 stone look’,waste(showerWallSF));
setQtyByLabel(‘Waterproofing membrane (Kerdi/RedGard)’,waste(showerWallSF+showerFloorSF));
setQtyByLabel(‘Thinset mortar — wall (large format)’,Math.ceil(waste(showerWallSF)/30));
setQtyByLabel(‘Wall grout — light sanded (cream/white)’,Math.ceil(waste(showerWallSF)/60));
setQtyByLabel(‘Grout sealer — shower’,Math.ceil((showerWallSF+showerFloorSF)/150));
}

// Shower floor + bench mosaic
if(showerFloorSF||benchSF){
const mosaicSF=waste((showerFloorSF||0)+(benchSF||0));
setQtyByLabel(‘Black hex mosaic — floor, curb & bench’,mosaicSF);
setQtyByLabel(‘Thinset mortar — floor (mosaic)’,Math.ceil(mosaicSF/35));
setQtyByLabel(‘Floor grout — dark unsanded’,Math.ceil(mosaicSF/40));
setQtyByLabel(‘Wedi board / cement board (bench)’,waste(benchSF||0));
}

// Schluter trim
if(trimLF){
setQtyByLabel(‘Schluter Rondec/Jolly brass edge trim’,trimLF);
setQtyByLabel(‘Schluter brass transition strips’,Math.ceil(trimLF*0.1));
setQtyByLabel(‘Schluter edge trim — wall perimeter (brass)’,Math.ceil(vanityWallSF/8));
}

// Vanity wall tile
if(vanityWallSF){
setQtyByLabel(‘Vanity wall tile — large format marble look’,waste(vanityWallSF));
setQtyByLabel(‘Wall tile thinset mortar’,Math.ceil(waste(vanityWallSF)/30));
setQtyByLabel(‘Wall tile grout (light/white)’,Math.ceil(waste(vanityWallSF)/60));
setQtyByLabel(‘Tile sealer — vanity wall’,Math.ceil(vanityWallSF/150));
}

// Platform tile (matches floor)
if(floorSF){
setQtyByLabel(‘Platform tile (to match floor)’,Math.ceil(waste(floorSF)*0.08));
setQtyByLabel(‘Tub platform substrate (cement board)’,Math.ceil(floorSF*0.06));
setQtyByLabel(‘Thinset + grout (platform)’,1);
}

// Quartz countertop
if(quartzSF){
setQtyByLabel(‘Quartz countertop (fabricated)’,quartzSF);
}

// LED strip
if(ledLF){
setQtyByLabel(‘LED strip + aluminum channel + diffuser’,ledLF);
setQtyByLabel(‘Low-voltage cable (LED strip run)’,Math.ceil(ledLF*2));
}

// Door casing
if(casingLF){
setQtyByLabel(‘MDF door casing (both faces x 3 doors)’,casingLF);
}

// Paint — ceiling (1 GL per 400 SF, 2 coats = /200)
if(ceilingSF){
setQtyByLabel(‘Ceiling paint — bold accent blue (flat)’,Math.ceil(ceilingSF/200));
setQtyByLabel(‘Drywall primer (PVA or high-hide)’,Math.ceil(ceilingSF/300));
}

// Paint — walls
if(wallPaintSF){
setQtyByLabel(‘Wall paint — neutral white/greige (eggshell)’,Math.ceil(wallPaintSF/200));
setQtyByLabel(‘Trim paint — bright white (semi-gloss)’,Math.ceil(wallPaintSF*0.15/200));
setQtyByLabel(‘Door paint — charcoal’,1);
setQtyByLabel(‘Casing paint — white (semi-gloss)’,1);
}

// Electrical
if(wireLF){
setQtyByLabel(‘Electrical wire + conduit’,wireLF);
}

updateGrandTotal();
const s=document.getElementById(‘meas-status’);
s.classList.add(‘show’);
setTimeout(()=>s.classList.remove(‘show’),2500);
}

function setQtyByLabel(label,val){
if(!val||val<=0)return;
const v=Math.round(val*10)/10;
document.querySelectorAll(’.pricing-row’).forEach(row=>{
const l=row.getAttribute(‘data-row-label’)||’’;
if(l.trim()===label.trim()){
const q=row.querySelector(’[data-role=“qty”]’);
if(q&&(q.type===‘number’||q.type==’’)){q.value=v;calcRow(q);}
}
});
}

function setQtyById(id,val){}

function clearMeasurements(){
[‘m-floor-sf’,‘m-shower-wall-sf’,‘m-shower-floor-sf’,‘m-bench-sf’,
‘m-vanity-wall-sf’,‘m-trim-lf’,‘m-ceiling-sf’,‘m-wall-paint-sf’,
‘m-casing-lf’,‘m-led-lf’,‘m-quartz-sf’,‘m-wire-lf’].forEach(id=>{
const el=document.getElementById(id);
if(el)el.value=’’;
});
document.querySelectorAll(’.pricing-row [data-role=“qty”]’).forEach(q=>{
if(q.type===‘number’&&parseFloat(q.placeholder||0)===0){q.value=’’;calcRow(q);}
});
updateGrandTotal();
}`;

// ── INJECT CSS ──────────────────────────────────────────────────────────────
if(!h.includes(’.meas-panel’)){
h=h.replace(’</style>’,css+’\n</style>’);
console.log(‘✅ CSS injected’);
}

// ── INJECT PANEL after <main> ───────────────────────────────────────────────
if(!h.includes(‘meas-panel’)){
h=h.replace(’<main>’,’<main>\n’+panel);
console.log(‘✅ Panel HTML injected’);
}

// ── INJECT JS before </script> ─────────────────────────────────────────────
if(!h.includes(‘applyMeasurements’)){
h=h.replace(’</script>’,js+’\n</script>’);
console.log(‘✅ JS injected’);
}

fs.writeFileSync(‘index.html’,h);
console.log(’\n✅ Done. Measurements panel added.’);
