const fs = require(‘fs’);
let html = fs.readFileSync(‘index.html’, ‘utf8’);
const svg = ‘<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>’;
const links = {
// 01 FLOORING — primary
‘Hex floor tile (material)’: ‘https://www.tileshop.com/products/black-hex-porcelain-wall-and-floor-tile-10-in-680185’,
// 01 FLOORING — secondary (some already linked, repeating is safe — replace is idempotent if already done)
‘Schluter Ditra uncoupling membrane’: ‘https://www.schluter.com/schluter-us/en_US/Membranes/Uncoupling-(DITRA)/p/DITRA’,
‘Thinset mortar — floor’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Dark unsanded grout’: ‘https://www.tileshop.com/c/grout’,
‘Grout sealer’: ‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter brass transition strips’: ‘https://www.schluter.com/schluter-us/en_US/Profiles/Transition-Profiles/p/SCHIENE’,
‘Silicone caulk — color matched’: ‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,
// 02 SHOWER — primary
‘Shower wall tile — 24x48 stone look’: ‘https://www.flooranddecor.com/large-format-tile-tile’,
‘Black hex mosaic — floor, curb & bench’: ‘https://www.flooranddecor.com/mosaic-tile-tile’,
‘Frameless glass enclosure — 3 panel (brass)’: ‘https://www.signaturehardware.com/shower-doors/frameless-shower-doors’,
‘Rain head + handheld + slide bar + valve (brass)’: ‘https://www.signaturehardware.com/shower-systems’,
// 02 SHOWER — secondary
‘Waterproofing membrane (Kerdi/RedGard)’: ‘https://www.schluter.com/schluter-us/en_US/Membranes/Waterproofing/p/KERDI’,
‘Wedi board / cement board (bench)’: ‘https://www.wedi.net/us/products/building-panels/’,
‘Thinset mortar — wall (large format)’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Thinset mortar — floor (mosaic)’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Wall grout — light sanded (cream/white)’: ‘https://www.tileshop.com/c/grout’,
‘Floor grout — dark unsanded’: ‘https://www.tileshop.com/c/grout’,
‘Grout sealer — shower’: ‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter Rondec/Jolly brass edge trim’: ‘https://www.schluter.com/schluter-us/en_US/Profiles/Finishing-Profiles-(Tile-Edge)/p/RONDEC’,
‘Shower center/linear drain — brass’: ‘https://www.signaturehardware.com/bathroom-plumbing/shower-drains’,
‘Recessed niche (prefab or custom tiled)’: ‘https://www.schluter.com/schluter-us/en_US/Shelves-%26-Niches/p/SHELF-N’,
‘Silicone caulk — corners & seams’: ‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,
// 03 BATHTUB — primary
‘Freestanding tub (gloss white)’: ‘https://admbathroom.com/collections/freestanding-bathtubs’,
‘Floor-mount tub filler (brass)’: ‘https://www.signaturehardware.com/bathroom-faucets/tub-fillers/floor-mount-tub-fillers’,
‘Ice bath chiller unit’: ‘https://plunge.com/products/the-cold-plunge’,
‘Custom millwork + magenta bench top’: ‘https://www.homedepot.com/b/Lumber-Composites-Hardwood-Boards/N-5yc1vZbqkh’,
// 03 BATHTUB — secondary
‘Tub platform substrate (cement board)’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Backer-Board/N-5yc1vZar94’,
‘Platform tile (to match floor)’: ‘https://www.tileshop.com/products/black-hex-porcelain-wall-and-floor-tile-10-in-680185’,
‘Drain & overflow assembly (brass)’: ‘https://www.signaturehardware.com/bathroom-plumbing/tub-drains’,
‘P-trap & supply line rough-in’: ‘https://www.homedepot.com/b/Plumbing-Drain-Waste-Vent/P-Traps/N-5yc1vZbqkd’,
‘Thinset + grout (platform)’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Silicone caulk — tub perimeter’: ‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,
// 04 VANITY — primary
‘Vanity cabinet set (72 in. white shaker)’: ‘https://rileyandhiggs.com/products/72-inch-white-shaker-double-sink-bathroom-vanity-with-drawers’,
‘Quartz countertop (fabricated)’: ‘https://www.msisurfaces.com/quartz/q-premium-natural-quartz/’,
‘Undermount sinks (2)’: ‘https://www.signaturehardware.com/bathroom-sinks/undermount-sinks’,
‘Widespread faucets — brass (2)’: ‘https://www.signaturehardware.com/bathroom-faucets/widespread-faucets’,
‘Vanity wall tile — large format marble look’: ‘https://www.flooranddecor.com/marble-look-tile-tile’,
‘Mirrors (2) + medicine cabinet’: ‘https://www.signaturehardware.com/bathroom-accessories/bathroom-mirrors’,
// 04 VANITY — secondary
‘Brass cabinet pulls / drawer hardware’: ‘https://www.signaturehardware.com/cabinet-hardware/cabinet-pulls’,
‘P-traps (2) + supply lines (2)’: ‘https://www.homedepot.com/b/Plumbing-Drain-Waste-Vent/P-Traps/N-5yc1vZbqkd’,
‘Wall tile thinset mortar’: ‘https://www.homedepot.com/b/Flooring-Tile-Tile-Setting-Materials-Thin-Set-Mortar/N-5yc1vZar8z’,
‘Wall tile grout (light/white)’: ‘https://www.tileshop.com/c/grout’,
‘Tile sealer — vanity wall’: ‘https://www.homedepot.com/b/Flooring-Tile-Grout-Grout-Sealer/N-5yc1vZar8r’,
‘Schluter edge trim — wall perimeter (brass)’: ‘https://www.schluter.com/schluter-us/en_US/Profiles/Finishing-Profiles-(Tile-Edge)/p/JOLLY’,
‘LED strip + aluminum channel + diffuser’: ‘https://www.superbrightleds.com/cat/led-strip-lights/’,
‘LED dimmer driver’: ‘https://www.superbrightleds.com/cat/led-dimmer-switches/’,
‘Silicone caulk — countertop/sink seams’: ‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,
// 05 DOORS — primary
‘Interior doors — prehung charcoal 5-panel (3)’: ‘https://www.homedepot.com/b/Doors-Windows-Interior-Closet-Doors-Prehung-Doors/5-Panel/N-5yc1vZc5ijZ1z0scnt’,
‘Matte black lever hardware (3 sets)’: ‘https://www.homedepot.com/b/Doors-Windows-Door-Hardware-Door-Knobs-Levers/Matte-Black/N-5yc1vZc4b2Z1z175a2’,
// 05 DOORS — secondary
‘Door hinges — matte black (9 total)’: ‘https://www.homedepot.com/b/Doors-Windows-Door-Hardware-Door-Hinges/Matte-Black/N-5yc1vZc4b4Z1z175a2’,
‘MDF door casing (both faces x 3 doors)’: ‘https://www.homedepot.com/b/Millwork-Moulding-Trim/MDF/N-5yc1vZar9lZ1z0r2tf’,
‘Door paint — charcoal’: ‘https://www.sherwin-williams.com/en-us/color/color-family/black-paint-colors’,
‘Casing paint — white (semi-gloss)’: ‘https://www.sherwin-williams.com/en-us/color/color-family/white-paint-colors’,
‘Door stops (3)’: ‘https://www.homedepot.com/b/Doors-Windows-Door-Hardware-Door-Stops/N-5yc1vZc4b7’,
‘Shims + nails + wood filler’: ‘https://www.homedepot.com/b/Millwork-Shims/N-5yc1vZar9e’,
// 06 LIGHTING — primary
‘Bubble chandelier — brass (over tub)’: ‘https://farmhouzelight.com/products/modern-frosted-glass-bubble-brass-sputnik-chandelier’,
‘Tubular brass vanity sconces (4)’: ‘https://pearedcreation.com’,
// 06 LIGHTING — secondary
‘Wet-rated junction box (tub rated)’: ‘https://www.homedepot.com/b/Electrical-Electrical-Boxes/N-5yc1vZbqb3’,
‘Dimmer switches’: ‘https://www.homedepot.com/b/Electrical-Light-Switches-Dimmers/N-5yc1vZbqb8’,
‘Electrical wire + conduit’: ‘https://www.homedepot.com/b/Electrical-Wire-Electrical-Cable/N-5yc1vZbqb0’,
‘LED bulbs for chandelier + sconces’: ‘https://www.homedepot.com/b/Light-Bulbs-LED-Light-Bulbs/N-5yc1vZbqbg’,
‘Low-voltage cable (LED strip run)’: ‘https://www.superbrightleds.com/cat/led-accessories/’,
// 07 ACCESSORIES — primary
‘Double towel bar — brass’: ‘https://www.signaturehardware.com/bathroom-accessories/towel-bars’,
‘Robe hook — brass’: ‘https://www.signaturehardware.com/bathroom-accessories/robe-hooks’,
‘Toilet paper holder — brass’: ‘https://www.signaturehardware.com/bathroom-accessories/toilet-paper-holders’,
‘Hand towel ring — brass’: ‘https://www.signaturehardware.com/bathroom-accessories/towel-rings’,
// 07 ACCESSORIES — secondary
‘Tile toggle anchors (tile-rated)’: ‘https://www.homedepot.com/b/Hardware-Wall-Anchors/N-5yc1vZc2b8’,
‘Clear silicone — escutcheon sealing’: ‘https://www.homedepot.com/b/Paint-Caulk-Sealants/Silicone/N-5yc1vZar4tZ1z0zb4k’,
// 08 PAINT — primary
‘Wall paint — neutral white/greige (eggshell)’: ‘https://www.sherwin-williams.com/en-us/color/color-family/white-paint-colors’,
‘Ceiling paint — bold accent blue (flat)’: ‘https://www.sherwin-williams.com/en-us/color/color-family/blue-paint-colors’,
‘Trim paint — bright white (semi-gloss)’: ‘https://www.sherwin-williams.com/en-us/color/color-family/white-paint-colors’,
// 08 PAINT — secondary
‘Joint compound + setting compound’: ‘https://www.homedepot.com/b/Building-Materials-Drywall-Joint-Compound/N-5yc1vZaqms’,
‘Drywall primer (PVA or high-hide)’: ‘https://www.homedepot.com/b/Paint-Primer/N-5yc1vZar4r’,
“Painter’s tape + plastic sheeting”: ‘https://www.homedepot.com/b/Paint-Painting-Supplies-Tools-Masking-Painters-Tape/N-5yc1vZar4u’,
‘Drywall patch mesh + corner bead’: ‘https://www.homedepot.com/b/Building-Materials-Drywall-Drywall-Repair-Patching/N-5yc1vZaqmv’
};
let count = 0;
for (const [label, url] of Object.entries(links)) {
const search = ‘class=“pricing-row-label”>’ + label + ‘</div>’;
if (html.includes(search)) {
const link = ‘<a class="mat-link" href="' + url + '" target="_blank">’ + svg + ‘</a>’;
html = html.replace(search, ‘class=“pricing-row-label”>’ + label + ’ ’ + link + ‘</div>’);
count++;
console.log(’linked: ’ + label);
}
}
fs.writeFileSync(‘index.html’, html);
console.log(’\nDone. ’ + count + ’ links added.’);
