/**

- Ross Bathroom Bid Tool — Material Link Patch
- Run: node patch.js
- Adds sourcing links to every secondary material row in index.html
- Deletes itself when done.
  */

const fs = require(‘fs’);
const path = require(‘path’);

const FILE = path.join(__dirname, ‘index.html’);

if (!fs.existsSync(FILE)) {
console.error(‘❌  index.html not found in this directory.’);
process.exit(1);
}

let html = fs.readFileSync(FILE, ‘utf8’);

// CSS to inject — small link icon style for material rows
const CSS_INJECT = ` .mat-link{display:inline-flex;align-items:center;margin-left:6px;color:var(--brass-dim);text-decoration:none;font-size:10px;vertical-align:middle;opacity:.7;transition:opacity .15s;} .mat-link:hover{opacity:1;color:var(--brass);} .mat-link svg{width:9px;height:9px;}`;

const LINK_SVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>`;

function matLink(url) {
return `<a class="mat-link" href="${url}" target="_blank" title="View product">${LINK_SVG}</a>`;
}

// ─── MATERIAL LINKS MAP ───────────────────────────────────────────────────────
// Format: exact label text in HTML → product URL
const LINKS = {

// ── 01 FLOORING ──
‘Schluter Ditra uncoupling membrane’:
‘https://www.schluter.com/schluter-us/en_US/Membranes/Uncoupling-(DITRA)/Schluter%C2%AE-DITRA/p/DITRA’,
‘Thinset mortar — floor’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Dark unsanded grout’:
‘https://www.tileshop.com/products/mapei-unsanded-grout-10-lbs-780010’,
‘Grout sealer’:
‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter brass transition strips’:
‘https://www.schluter.com/schluter-us/en_US/Profiles/Transition-Profiles/Schluter%C2%AE-SCHIENE/p/SCHIENE’,
‘Silicone caulk — color matched’:
‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,

// ── 02 SHOWER ──
‘Waterproofing membrane (Kerdi/RedGard)’:
‘https://www.schluter.com/schluter-us/en_US/Membranes/Waterproofing/Schluter%C2%AE-KERDI/p/KERDI’,
‘Wedi board / cement board (bench)’:
‘https://www.wedi.net/us/products/building-panels/’,
‘Thinset mortar — wall (large format)’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Thinset mortar — floor (mosaic)’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Wall grout — light sanded (cream/white)’:
‘https://www.tileshop.com/c/grout’,
‘Floor grout — dark unsanded’:
‘https://www.tileshop.com/products/mapei-unsanded-grout-10-lbs-780010’,
‘Grout sealer — shower’:
‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter Rondec/Jolly brass edge trim’:
‘https://www.schluter.com/schluter-us/en_US/Profiles/Finishing-Profiles-(Tile-Edge)/Schluter%C2%AE-RONDEC/p/RONDEC’,
‘Shower center/linear drain — brass’:
‘https://www.signaturehardware.com/bathroom-plumbing/shower-drains’,
‘Recessed niche (prefab or custom tiled)’:
‘https://www.schluter.com/schluter-us/en_US/Shelves-%26-Niches/Schluter%C2%AE-SHELF-N/p/SHELF-N’,
‘Silicone caulk — corners & seams’:
‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,

// ── 03 BATHTUB ──
‘Tub platform substrate (cement board)’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Backer-Board/N-5yc1vZar94’,
‘Platform tile (to match floor)’:
‘https://www.tileshop.com/products/black-hex-porcelain-wall-and-floor-tile-10-in-680185’,
‘Drain & overflow assembly (brass)’:
‘https://www.signaturehardware.com/bathroom-plumbing/tub-drains’,
‘P-trap & supply line rough-in’:
‘https://www.homedepot.com/b/Plumbing-Rough-In-Valves/N-5yc1vZbqmf’,
‘Thinset + grout (platform)’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Silicone caulk — tub perimeter’:
‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,

// ── 04 VANITY ──
‘Brass cabinet pulls / drawer hardware’:
‘https://www.signaturehardware.com/cabinet-hardware/cabinet-pulls’,
‘P-traps (2) + supply lines (2)’:
‘https://www.homedepot.com/b/Plumbing-Drain-Waste-Vent/P-Traps/N-5yc1vZbqkdZ1z0zb7l’,
‘Wall tile thinset mortar’:
‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Wall tile grout (light/white)’:
‘https://www.tileshop.com/c/grout’,
‘Tile sealer — vanity wall’:
‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter edge trim — wall perimeter (brass)’:
‘https://www.schluter.com/schluter-us/en_US/Profiles/Finishing-Profiles-(Tile-Edge)/Schluter%C2%AE-JOLLY/p/JOLLY’,
‘LED strip + aluminum channel + diffuser’:
‘https://www.superbrightleds.com/cat/led-strip-lights/’,
‘LED dimmer driver’:
‘https://www.superbrightleds.com/cat/led-dimmer-switches/’,
‘Silicone caulk — countertop/sink seams’:
‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,

// ── 05 DOORS ──
‘Door hinges — matte black (9 total)’:
‘https://www.homedepot.com/b/Doors-Windows-Door-Hardware-Door-Hinges/Matte-Black/N-5yc1vZc4b4Z1z175a2’,
‘MDF door casing (both faces x 3 doors)’:
‘https://www.homedepot.com/b/Millwork-Moulding-Trim/MDF/N-5yc1vZar9lZ1z0r2tf’,
‘Door paint — charcoal’:
‘https://www.sherwin-williams.com/en-us/color/color-family/black-paint-colors’,
‘Casing paint — white (semi-gloss)’:
‘https://www.sherwin-williams.com/en-us/color/color-family/white-paint-colors’,
‘Door stops (3)’:
‘https://www.homedepot.com/b/Doors-Windows-Door-Hardware-Door-Stops/N-5yc1vZc4b7’,
‘Shims + nails + wood filler’:
‘https://www.homedepot.com/b/Millwork-Shims/N-5yc1vZar9e’,

// ── 06 LIGHTING ──
‘Wet-rated junction box (tub rated)’:
‘https://www.homedepot.com/b/Electrical-Electrical-Boxes-Conduit-Fittings-Electrical-Boxes/N-5yc1vZbqb3’,
‘Dimmer switches’:
‘https://www.homedepot.com/b/Electrical-Light-Switches-Dimmers-Outlets-Plugs-Light-Dimmers/N-5yc1vZbqb8’,
‘Electrical wire + conduit’:
‘https://www.homedepot.com/b/Electrical-Wire-Electrical-Cable/N-5yc1vZbqb0’,
‘LED bulbs for chandelier + sconces’:
‘https://www.homedepot.com/b/Light-Bulbs-LED-Light-Bulbs/N-5yc1vZbqbg’,
‘Low-voltage cable (LED strip run)’:
‘https://www.superbrightleds.com/cat/led-strip-lights/’,

// ── 07 ACCESSORIES ──
‘Tile toggle anchors (tile-rated)’:
‘https://www.homedepot.com/b/Hardware-Wall-Anchors/N-5yc1vZc2b8’,
‘Clear silicone — escutcheon sealing’:
‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,

// ── 08 PAINT & CEILING ──
‘Joint compound + setting compound’:
‘https://www.homedepot.com/b/Building-Materials-Drywall-Joint-Compound/N-5yc1vZaqms’,
‘Drywall primer (PVA or high-hide)’:
‘https://www.homedepot.com/b/Paint-Primer/N-5yc1vZar4r’,
“Painter’s tape + plastic sheeting”:
‘https://www.homedepot.com/b/Paint-Painting-Supplies-Tools-Masking-Painters-Tape/N-5yc1vZar4u’,
‘Drywall patch mesh + corner bead’:
‘https://www.homedepot.com/b/Building-Materials-Drywall-Drywall-Repair-Patching/N-5yc1vZaqmv’,
};

// ─── INJECT CSS ───────────────────────────────────────────────────────────────
if (html.includes(’.mat-link’)) {
console.log(‘ℹ️  .mat-link CSS already present — skipping CSS injection’);
} else {
html = html.replace(’</style>’, CSS_INJECT + ‘\n</style>’);
console.log(‘✅  CSS injected’);
}

// ─── INJECT LINKS ─────────────────────────────────────────────────────────────
let count = 0;
let missed = [];

for (const [label, url] of Object.entries(LINKS)) {
// Match the label inside a pricing-row-label div, not already linked
const search = `class="pricing-row-label">${label}</div>`;
const replace = `class="pricing-row-label">${label} ${matLink(url)}</div>`;

if (html.includes(search)) {
html = html.replace(search, replace);
count++;
console.log(`✅  Linked: ${label}`);
} else {
// Try without the closing div in case there’s an attribute
missed.push(label);
console.warn(`⚠️   Not found: ${label}`);
}
}

// ─── WRITE FILE ───────────────────────────────────────────────────────────────
fs.writeFileSync(FILE, html, ‘utf8’);

console.log(`\n─────────────────────────────────────`);
console.log(`✅  Done. ${count} material links added.`);
if (missed.length) {
console.log(`⚠️   ${missed.length} labels not matched (may already be linked or label text differs):`);
missed.forEach(m => console.log(`    • ${m}`));
}
console.log(`─────────────────────────────────────`);
console.log(`\nDeploy index.html to Netlify to go live.`);

// Self-delete
fs.unlinkSync(__filename);
console.log(`🗑️   patch.js deleted.`);
