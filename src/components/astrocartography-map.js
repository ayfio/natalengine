/**
 * Astro Cartography World Map - SVG Renderer
 * Renders planetary lines on a world map projection
 */

// Simple world map outline (simplified coastlines for SVG path)
// This is a basic Mercator projection outline
const WORLD_MAP_PATH = `M -180 -85 L 180 -85 L 180 85 L -180 85 Z`;

// Continental outlines (simplified)
const CONTINENTS = [
  // North America
  'M -170 55 L -168 60 L -145 70 L -94 75 L -82 65 L -60 47 L -65 30 L -80 25 L -90 18 L -105 20 L -118 32 L -125 40 L -140 58 L -170 55 Z',
  // South America
  'M -80 10 L -60 5 L -35 -5 L -35 -22 L -50 -35 L -55 -50 L -70 -55 L -75 -40 L -80 -18 L -82 0 L -80 10 Z',
  // Europe
  'M -10 35 L -5 43 L 0 50 L 10 55 L 30 60 L 35 70 L 60 72 L 60 55 L 40 45 L 25 35 L 0 35 L -10 35 Z',
  // Africa
  'M -15 35 L 0 35 L 30 30 L 50 10 L 52 -5 L 40 -20 L 30 -35 L 20 -35 L 15 -25 L 0 0 L -5 15 L -15 35 Z',
  // Asia
  'M 60 72 L 100 75 L 140 70 L 170 65 L 180 55 L 150 40 L 140 30 L 120 20 L 100 10 L 80 20 L 60 35 L 40 45 L 60 55 L 60 72 Z',
  // Australia
  'M 113 -10 L 130 -15 L 150 -20 L 155 -30 L 150 -42 L 135 -38 L 115 -35 L 115 -20 L 113 -10 Z'
];

// Map dimensions
const MAP_WIDTH = 720;
const MAP_HEIGHT = 360;
const MAP_PADDING = 20;

/**
 * Convert lat/lon to SVG coordinates (Mercator-like projection)
 * @param {number} lon - Longitude (-180 to 180)
 * @param {number} lat - Latitude (-90 to 90)
 * @returns {{x: number, y: number}} SVG coordinates
 */
function geoToSvg(lon, lat) {
  // Simple equirectangular projection
  const x = MAP_PADDING + ((lon + 180) / 360) * MAP_WIDTH;
  const y = MAP_PADDING + ((90 - lat) / 180) * MAP_HEIGHT;
  return { x, y };
}

/**
 * Create SVG element with namespace
 */
function createSvgElement(tag, attrs = {}) {
  const el = document.createElementNS('http://www.w3.org/2000/svg', tag);
  for (const [key, value] of Object.entries(attrs)) {
    if (value !== undefined && value !== null) {
      el.setAttribute(key, value);
    }
  }
  return el;
}

/**
 * Create tooltip handler
 */
function createTooltip(container) {
  let tooltip = container.querySelector('.acg-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'acg-tooltip';
    tooltip.style.cssText = `
      position: absolute;
      background: var(--bg-card, #fff);
      border: 1px solid var(--border, #e4e4e7);
      border-radius: 6px;
      padding: 8px 12px;
      font-size: 12px;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.15s;
      z-index: 100;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      max-width: 250px;
    `;
    container.style.position = 'relative';
    container.appendChild(tooltip);
  }
  return tooltip;
}

function showTooltip(tooltip, content, x, y) {
  tooltip.innerHTML = content;
  tooltip.style.left = `${x + 15}px`;
  tooltip.style.top = `${y - 10}px`;
  tooltip.style.opacity = '1';
}

function hideTooltip(tooltip) {
  tooltip.style.opacity = '0';
}

/**
 * Draw the world map background
 */
function drawMapBackground(svg) {
  const group = createSvgElement('g', { class: 'map-background' });

  // Ocean background
  const ocean = createSvgElement('rect', {
    x: MAP_PADDING,
    y: MAP_PADDING,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
    fill: 'var(--bg-muted, #f4f4f5)',
    stroke: 'var(--border, #e4e4e7)',
    'stroke-width': 1
  });
  group.appendChild(ocean);

  // Draw continents
  CONTINENTS.forEach(pathData => {
    // Parse and transform the path coordinates
    const transformedPath = transformPath(pathData);
    const continent = createSvgElement('path', {
      d: transformedPath,
      fill: 'var(--bg-card, #fff)',
      stroke: 'var(--border, #d4d4d8)',
      'stroke-width': 0.5
    });
    group.appendChild(continent);
  });

  svg.appendChild(group);
}

/**
 * Transform path coordinates from geo to SVG
 */
function transformPath(pathData) {
  return pathData.replace(/-?\d+\.?\d*/g, (match, offset, str) => {
    // Determine if this is x or y based on position
    const before = str.substring(0, offset);
    const lastCommand = before.match(/[MLHVCSQTAZ]/gi)?.pop() || 'M';

    // Count numbers since last command
    const numbersSinceCommand = before.substring(before.lastIndexOf(lastCommand) + 1)
      .match(/-?\d+\.?\d*/g)?.length || 0;

    const num = parseFloat(match);

    if (lastCommand === 'H') {
      // Horizontal line - x coordinate
      const { x } = geoToSvg(num, 0);
      return x.toFixed(1);
    } else if (lastCommand === 'V') {
      // Vertical line - y coordinate
      const { y } = geoToSvg(0, num);
      return y.toFixed(1);
    } else {
      // Regular coordinates - alternate x, y
      if (numbersSinceCommand % 2 === 0) {
        // This is an x (longitude)
        const { x } = geoToSvg(num, 0);
        return x.toFixed(1);
      } else {
        // This is a y (latitude)
        const { y } = geoToSvg(0, num);
        return y.toFixed(1);
      }
    }
  });
}

/**
 * Draw latitude/longitude grid
 */
function drawGrid(svg) {
  const group = createSvgElement('g', { class: 'grid' });

  // Longitude lines (every 30 degrees)
  for (let lon = -180; lon <= 180; lon += 30) {
    const { x: x1 } = geoToSvg(lon, 90);
    const { x: x2, y: y2 } = geoToSvg(lon, -90);

    const line = createSvgElement('line', {
      x1, y1: MAP_PADDING,
      x2, y2,
      stroke: 'var(--border, #e4e4e7)',
      'stroke-width': 0.5,
      'stroke-dasharray': lon === 0 ? '' : '2,2'
    });
    group.appendChild(line);

    // Label
    if (lon !== 180 && lon !== -180) {
      const label = createSvgElement('text', {
        x: x1,
        y: MAP_PADDING + MAP_HEIGHT + 12,
        'text-anchor': 'middle',
        'font-size': '8',
        fill: 'var(--text-muted, #a1a1aa)'
      });
      label.textContent = lon === 0 ? '0°' : `${Math.abs(lon)}°${lon > 0 ? 'E' : 'W'}`;
      group.appendChild(label);
    }
  }

  // Latitude lines (every 30 degrees)
  for (let lat = -60; lat <= 60; lat += 30) {
    const { y: y1 } = geoToSvg(-180, lat);
    const { x: x2, y: y2 } = geoToSvg(180, lat);

    const line = createSvgElement('line', {
      x1: MAP_PADDING, y1,
      x2: MAP_PADDING + MAP_WIDTH, y2,
      stroke: 'var(--border, #e4e4e7)',
      'stroke-width': 0.5,
      'stroke-dasharray': lat === 0 ? '' : '2,2'
    });
    group.appendChild(line);

    // Label
    if (lat !== 0) {
      const label = createSvgElement('text', {
        x: MAP_PADDING - 5,
        y: y1 + 3,
        'text-anchor': 'end',
        'font-size': '8',
        fill: 'var(--text-muted, #a1a1aa)'
      });
      label.textContent = `${Math.abs(lat)}°${lat > 0 ? 'N' : 'S'}`;
      group.appendChild(label);
    }
  }

  // Equator and Prime Meridian labels
  const eqLabel = createSvgElement('text', {
    x: MAP_PADDING - 5,
    y: geoToSvg(0, 0).y + 3,
    'text-anchor': 'end',
    'font-size': '8',
    fill: 'var(--text-secondary, #71717a)',
    'font-weight': '500'
  });
  eqLabel.textContent = 'EQ';
  group.appendChild(eqLabel);

  svg.appendChild(group);
}

/**
 * Draw planetary lines
 */
function drawLines(svg, lines, tooltip) {
  const group = createSvgElement('g', { class: 'planetary-lines' });

  // Line style by angle type
  const angleStyles = {
    MC: { dash: '', width: 2, opacity: 0.8 },
    IC: { dash: '6,3', width: 1.5, opacity: 0.6 },
    ASC: { dash: '', width: 2, opacity: 0.8 },
    DSC: { dash: '6,3', width: 1.5, opacity: 0.6 }
  };

  lines.forEach(line => {
    const style = angleStyles[line.angle] || { dash: '', width: 1.5, opacity: 0.7 };

    if (line.type === 'meridian') {
      // Draw vertical line (MC/IC)
      const { x } = geoToSvg(line.longitude, 0);

      const pathEl = createSvgElement('line', {
        x1: x,
        y1: MAP_PADDING,
        x2: x,
        y2: MAP_PADDING + MAP_HEIGHT,
        stroke: line.planetColor,
        'stroke-width': style.width,
        'stroke-dasharray': style.dash,
        'stroke-opacity': style.opacity,
        'stroke-linecap': 'round',
        class: `line-${line.planet}-${line.angle}`,
        style: 'cursor: pointer; transition: stroke-opacity 0.15s, stroke-width 0.15s;'
      });

      addLineTooltip(pathEl, line, tooltip, svg);
      group.appendChild(pathEl);

      // Add planet symbol at top
      const symbolText = createSvgElement('text', {
        x: x,
        y: MAP_PADDING - 5,
        'text-anchor': 'middle',
        'font-size': '10',
        fill: line.planetColor,
        style: 'cursor: pointer;'
      });
      symbolText.textContent = `${line.planetSymbol} ${line.angleAbbr}`;
      addLineTooltip(symbolText, line, tooltip, svg);
      group.appendChild(symbolText);

    } else if (line.points && line.points.length > 1) {
      // Draw curved line (ASC/DSC)
      const pathData = buildLinePath(line.points);

      if (pathData) {
        const pathEl = createSvgElement('path', {
          d: pathData,
          fill: 'none',
          stroke: line.planetColor,
          'stroke-width': style.width,
          'stroke-dasharray': style.dash,
          'stroke-opacity': style.opacity,
          'stroke-linecap': 'round',
          'stroke-linejoin': 'round',
          class: `line-${line.planet}-${line.angle}`,
          style: 'cursor: pointer; transition: stroke-opacity 0.15s, stroke-width 0.15s;'
        });

        addLineTooltip(pathEl, line, tooltip, svg);
        group.appendChild(pathEl);

        // Add planet symbol near the middle of the line
        const midPoint = line.points[Math.floor(line.points.length / 2)];
        if (midPoint) {
          const { x, y } = geoToSvg(midPoint.lon, midPoint.lat);
          const symbolText = createSvgElement('text', {
            x: x + 5,
            y: y - 5,
            'text-anchor': 'start',
            'font-size': '9',
            fill: line.planetColor,
            'font-weight': '500',
            style: 'cursor: pointer;'
          });
          symbolText.textContent = `${line.planetSymbol} ${line.angleAbbr}`;
          addLineTooltip(symbolText, line, tooltip, svg);
          group.appendChild(symbolText);
        }
      }
    }
  });

  svg.appendChild(group);
}

/**
 * Build SVG path from points, handling discontinuities
 */
function buildLinePath(points) {
  if (!points || points.length < 2) return null;

  const segments = [];
  let currentSegment = [];

  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    const { x, y } = geoToSvg(point.lon, point.lat);

    // Check for discontinuity (crossing date line)
    if (i > 0) {
      const prevPoint = points[i - 1];
      const lonDiff = Math.abs(point.lon - prevPoint.lon);

      if (lonDiff > 90) {
        // Date line crossing - start new segment
        if (currentSegment.length > 1) {
          segments.push(currentSegment);
        }
        currentSegment = [];
      }
    }

    currentSegment.push({ x, y });
  }

  if (currentSegment.length > 1) {
    segments.push(currentSegment);
  }

  // Build path string
  const pathParts = segments.map(seg => {
    const commands = seg.map((p, i) =>
      i === 0 ? `M ${p.x.toFixed(1)} ${p.y.toFixed(1)}` : `L ${p.x.toFixed(1)} ${p.y.toFixed(1)}`
    );
    return commands.join(' ');
  });

  return pathParts.join(' ');
}

/**
 * Add tooltip handlers to a line element
 */
function addLineTooltip(el, line, tooltip, svg) {
  const content = `
    <div style="font-weight: 600; color: ${line.planetColor}; margin-bottom: 4px;">
      ${line.planetSymbol} ${line.planetName} on ${line.angleName}
    </div>
    <div style="color: var(--text-secondary, #71717a); font-size: 11px;">
      ${line.interpretation}
    </div>
  `;

  el.addEventListener('mouseenter', (e) => {
    el.style.strokeOpacity = '1';
    el.style.strokeWidth = parseFloat(el.getAttribute('stroke-width') || 1.5) + 1;

    const rect = svg.parentElement.getBoundingClientRect();
    showTooltip(tooltip, content, e.clientX - rect.left, e.clientY - rect.top);
  });

  el.addEventListener('mousemove', (e) => {
    const rect = svg.parentElement.getBoundingClientRect();
    showTooltip(tooltip, content, e.clientX - rect.left, e.clientY - rect.top);
  });

  el.addEventListener('mouseleave', () => {
    el.style.strokeOpacity = '';
    el.style.strokeWidth = '';
    hideTooltip(tooltip);
  });
}

/**
 * Draw paran markers
 */
function drawParans(svg, parans, tooltip) {
  if (!parans || parans.length === 0) return;

  const group = createSvgElement('g', { class: 'parans' });

  parans.forEach(paran => {
    const { x, y } = geoToSvg(paran.lon, paran.lat);

    // Paran marker (star shape)
    const marker = createSvgElement('circle', {
      cx: x,
      cy: y,
      r: 4,
      fill: '#f59e0b',
      stroke: '#fff',
      'stroke-width': 1,
      style: 'cursor: pointer;'
    });

    const content = `
      <div style="font-weight: 600; margin-bottom: 4px;">
        ${paran.planet1Symbol} ${paran.angle1} × ${paran.planet2Symbol} ${paran.angle2}
      </div>
      <div style="color: var(--text-secondary, #71717a); font-size: 11px; margin-bottom: 4px;">
        ${paran.planet1Name} & ${paran.planet2Name} crossing
      </div>
      <div style="color: var(--text-muted, #a1a1aa); font-size: 10px;">
        ${paran.lat.toFixed(1)}°${paran.lat >= 0 ? 'N' : 'S'}, ${paran.lon.toFixed(1)}°${paran.lon >= 0 ? 'E' : 'W'}
      </div>
    `;

    marker.addEventListener('mouseenter', (e) => {
      marker.setAttribute('r', '6');
      const rect = svg.parentElement.getBoundingClientRect();
      showTooltip(tooltip, content, e.clientX - rect.left, e.clientY - rect.top);
    });

    marker.addEventListener('mouseleave', () => {
      marker.setAttribute('r', '4');
      hideTooltip(tooltip);
    });

    group.appendChild(marker);
  });

  svg.appendChild(group);
}

/**
 * Draw a location marker
 */
function drawLocationMarker(svg, lat, lon, label = null, color = '#ef4444') {
  const { x, y } = geoToSvg(lon, lat);

  const group = createSvgElement('g', { class: 'location-marker' });

  // Pin marker
  const pin = createSvgElement('path', {
    d: `M ${x} ${y - 8}
        C ${x - 4} ${y - 8}, ${x - 6} ${y - 4}, ${x - 6} ${y}
        C ${x - 6} ${y + 6}, ${x} ${y + 12}, ${x} ${y + 12}
        C ${x} ${y + 12}, ${x + 6} ${y + 6}, ${x + 6} ${y}
        C ${x + 6} ${y - 4}, ${x + 4} ${y - 8}, ${x} ${y - 8} Z`,
    fill: color,
    stroke: '#fff',
    'stroke-width': 1
  });
  group.appendChild(pin);

  // Center dot
  const dot = createSvgElement('circle', {
    cx: x,
    cy: y,
    r: 2,
    fill: '#fff'
  });
  group.appendChild(dot);

  // Label
  if (label) {
    const text = createSvgElement('text', {
      x: x,
      y: y + 20,
      'text-anchor': 'middle',
      'font-size': '9',
      fill: 'var(--text, #18181b)',
      'font-weight': '500'
    });
    text.textContent = label;
    group.appendChild(text);
  }

  svg.appendChild(group);
}

/**
 * Draw legend
 */
function drawLegend(svg, lines) {
  const group = createSvgElement('g', { class: 'legend' });

  // Get unique planets
  const planets = [...new Set(lines.map(l => l.planet))];

  // Legend background
  const legendX = MAP_PADDING + MAP_WIDTH + 10;
  const legendY = MAP_PADDING;
  const legendWidth = 80;
  const legendHeight = planets.length * 18 + 30;

  const bg = createSvgElement('rect', {
    x: legendX,
    y: legendY,
    width: legendWidth,
    height: legendHeight,
    fill: 'var(--bg-card, #fff)',
    stroke: 'var(--border, #e4e4e7)',
    rx: 4
  });
  group.appendChild(bg);

  // Title
  const title = createSvgElement('text', {
    x: legendX + 8,
    y: legendY + 15,
    'font-size': '10',
    'font-weight': '600',
    fill: 'var(--text, #18181b)'
  });
  title.textContent = 'Planets';
  group.appendChild(title);

  // Planet entries
  planets.forEach((planet, i) => {
    const line = lines.find(l => l.planet === planet);
    const y = legendY + 32 + i * 18;

    // Color swatch
    const swatch = createSvgElement('rect', {
      x: legendX + 8,
      y: y - 6,
      width: 12,
      height: 12,
      fill: line.planetColor,
      rx: 2
    });
    group.appendChild(swatch);

    // Planet name
    const text = createSvgElement('text', {
      x: legendX + 26,
      y: y + 4,
      'font-size': '9',
      fill: 'var(--text-secondary, #71717a)'
    });
    text.textContent = line.planetName;
    group.appendChild(text);
  });

  svg.appendChild(group);
}

/**
 * Main render function
 *
 * @param {HTMLElement} container - Container element
 * @param {Object} astroCartoData - Result from calculateAstroCartography
 * @param {Object} options - Render options
 * @param {Array} options.locations - Array of {lat, lon, label} to mark
 * @param {boolean} options.showParans - Whether to show paran markers (default: true)
 * @param {boolean} options.showLegend - Whether to show legend (default: true)
 * @param {string[]} options.planets - Which planets to show (default: all)
 * @param {string[]} options.angles - Which angles to show (default: all)
 */
export function renderAstroCartographyMap(container, astroCartoData, options = {}) {
  const {
    locations = [],
    showParans = true,
    showLegend = true,
    planets = null,
    angles = null
  } = options;

  // Remove existing map
  const existing = container.querySelector('.astrocartography-map-svg');
  if (existing) existing.remove();

  // Filter lines if needed
  let lines = astroCartoData.lines;
  if (planets) {
    lines = lines.filter(l => planets.includes(l.planet));
  }
  if (angles) {
    lines = lines.filter(l => angles.includes(l.angle));
  }

  // SVG dimensions
  const svgWidth = MAP_WIDTH + MAP_PADDING * 2 + (showLegend ? 100 : 0);
  const svgHeight = MAP_HEIGHT + MAP_PADDING * 2 + 20;

  const svg = createSvgElement('svg', {
    viewBox: `0 0 ${svgWidth} ${svgHeight}`,
    class: 'astrocartography-map-svg',
    style: 'max-width: 100%; height: auto; display: block; margin: 0 auto;'
  });

  const tooltip = createTooltip(container);

  // Draw layers
  drawMapBackground(svg);
  drawGrid(svg);
  drawLines(svg, lines, tooltip);

  if (showParans && astroCartoData.parans) {
    drawParans(svg, astroCartoData.parans, tooltip);
  }

  // Draw location markers
  locations.forEach(loc => {
    drawLocationMarker(svg, loc.lat, loc.lon, loc.label, loc.color);
  });

  if (showLegend) {
    drawLegend(svg, lines);
  }

  container.insertBefore(svg, container.firstChild);

  return svg;
}

export default renderAstroCartographyMap;
