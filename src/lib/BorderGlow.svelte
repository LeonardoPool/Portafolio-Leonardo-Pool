<script>
  import { onMount, onDestroy } from 'svelte';
  import './BorderGlow.css';

  export let edgeSensitivity = 30;
  export let glowColor = '40 80 80';
  export let backgroundColor = '#120F17';
  export let borderRadius = 28;
  export let glowRadius = 40;
  export let glowIntensity = 1.0;
  export let coneSpread = 25;
  export let animated = false;
  export let colors = ['#c084fc', '#f472b6', '#38bdf8'];
  export let fillOpacity = 0.5;
  export let className = '';
  export let style = '';

  let cardRef;
  let activeAnimations = [];

  function parseHSL(hslStr) {
    const match = hslStr.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
    if (!match) return { h: 40, s: 80, l: 80 };
    return { h: parseFloat(match[1]), s: parseFloat(match[2]), l: parseFloat(match[3]) };
  }

  function buildGlowVars(glowColor, intensity) {
    const { h, s, l } = parseHSL(glowColor);
    const base = `${h}deg ${s}% ${l}%`;
    const opacities = [100, 60, 50, 40, 30, 20, 10];
    const keys = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
    const vars = {};
    for (let i = 0; i < opacities.length; i++) {
      vars[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(opacities[i] * intensity, 100)}%)`;
    }
    return vars;
  }

  const GRADIENT_POSITIONS = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
  const GRADIENT_KEYS = [
    '--gradient-one',
    '--gradient-two',
    '--gradient-three',
    '--gradient-four',
    '--gradient-five',
    '--gradient-six',
    '--gradient-seven'
  ];
  const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

  function buildGradientVars(colors) {
    const vars = {};
    for (let i = 0; i < 7; i++) {
      const c = colors[Math.min(COLOR_MAP[i], colors.length - 1)];
      vars[GRADIENT_KEYS[i]] = `radial-gradient(at ${GRADIENT_POSITIONS[i]}, ${c} 0px, transparent 50%)`;
    }
    vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
    return vars;
  }

  function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }
  function easeInCubic(x) { return x * x * x; }

  function animateValue({ start = 0, end = 100, duration = 1000, delay = 0, ease = easeOutCubic, onUpdate, onEnd }) {
    let rafId;
    const t0 = performance.now() + delay;
    function tick() {
      const elapsed = performance.now() - t0;
      const t = Math.min(elapsed / duration, 1);
      onUpdate(start + (end - start) * ease(t));
      if (t < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (onEnd) {
        onEnd();
      }
    }
    const timeoutId = setTimeout(() => {
      rafId = requestAnimationFrame(tick);
    }, delay);

    activeAnimations.push({
      cancel: () => {
        clearTimeout(timeoutId);
        if (rafId) cancelAnimationFrame(rafId);
      }
    });
  }

  function getCenterOfElement(el) {
    const { width, height } = el.getBoundingClientRect();
    return [width / 2, height / 2];
  }

  function getEdgeProximity(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity;
    let ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    return Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
  }

  function getCursorAngle(el, x, y) {
    const [cx, cy] = getCenterOfElement(el);
    const dx = x - cx;
    const dy = y - cy;
    if (dx === 0 && dy === 0) return 0;
    const radians = Math.atan2(dy, dx);
    let degrees = radians * (180 / Math.PI) + 90;
    if (degrees < 0) degrees += 360;
    return degrees;
  }

  function handlePointerMove(e) {
    if (!cardRef) return;
    const rect = cardRef.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const edge = getEdgeProximity(cardRef, x, y);
    const angle = getCursorAngle(cardRef, x, y);

    cardRef.style.setProperty('--edge-proximity', `${(edge * 100).toFixed(3)}`);
    cardRef.style.setProperty('--cursor-angle', `${angle.toFixed(3)}deg`);
  }

  onMount(() => {
    if (!animated || !cardRef) return;
    const angleStart = 110;
    const angleEnd = 465;
    cardRef.classList.add('sweep-active');
    cardRef.style.setProperty('--cursor-angle', `${angleStart}deg`);

    animateValue({ duration: 500, onUpdate: v => cardRef.style.setProperty('--edge-proximity', v) });
    animateValue({ ease: easeInCubic, duration: 1500, end: 50, onUpdate: v => {
      cardRef.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeOutCubic, delay: 1500, duration: 2250, start: 50, end: 100, onUpdate: v => {
      cardRef.style.setProperty('--cursor-angle', `${(angleEnd - angleStart) * (v / 100) + angleStart}deg`);
    }});
    animateValue({ ease: easeInCubic, delay: 2500, duration: 1500, start: 100, end: 0,
      onUpdate: v => cardRef.style.setProperty('--edge-proximity', v),
      onEnd: () => cardRef.classList.remove('sweep-active'),
    });
  });

  onDestroy(() => {
    activeAnimations.forEach(anim => anim.cancel());
  });

  $: glowVars = buildGlowVars(glowColor, glowIntensity);
  $: gradientVars = buildGradientVars(colors);

  $: styleString = (() => {
    const vars = {
      '--card-bg': backgroundColor,
      '--edge-sensitivity': edgeSensitivity,
      '--border-radius': `${borderRadius}px`,
      '--glow-padding': `${glowRadius}px`,
      '--cone-spread': coneSpread,
      '--fill-opacity': fillOpacity,
      ...glowVars,
      ...gradientVars
    };
    const varString = Object.entries(vars)
      .map(([k, v]) => `${k}: ${v};`)
      .join(' ');
    return `${varString} ${style}`;
  })();
</script>

<div
  bind:this={cardRef}
  on:pointermove={handlePointerMove}
  class="border-glow-card {className}"
  style={styleString}
  role="presentation"
>
  <span class="edge-light"></span>
  <div class="border-glow-inner">
    <slot />
  </div>
</div>
