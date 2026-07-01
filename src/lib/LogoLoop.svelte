<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import './LogoLoop.css';

  export let logos = [];
  export let speed = 120;
  export let direction = 'left';
  export let width = '100%';
  export let logoHeight = 28;
  export let gap = 32;
  export let pauseOnHover = undefined;
  export let hoverSpeed = undefined;
  export let fadeOut = false;
  export let fadeOutColor = undefined;
  export let scaleOnHover = false;
  export let renderItem = undefined;
  export let ariaLabel = 'Partner logos';
  export let className = '';
  export let style = '';

  let containerRef;
  let trackRef;
  let seqRef;

  let seqWidth = 0;
  let seqHeight = 0;
  let copyCount = 2; // MIN_COPIES = 2
  let isHovered = false;

  $: effectiveHoverSpeed = (() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  })();

  $: isVertical = direction === 'up' || direction === 'down';

  $: targetVelocity = (() => {
    const magnitude = Math.abs(speed);
    let directionMultiplier;
    if (isVertical) {
      directionMultiplier = direction === 'up' ? 1 : -1;
    } else {
      directionMultiplier = direction === 'left' ? 1 : -1;
    }
    const speedMultiplier = speed < 0 ? -1 : 1;
    return magnitude * directionMultiplier * speedMultiplier;
  })();

  function updateDimensions() {
    if (!containerRef) return;
    const containerWidth = containerRef.clientWidth ?? 0;
    const sequenceRect = seqRef ? seqRef.getBoundingClientRect() : null;
    const sequenceWidth = sequenceRect ? sequenceRect.width : 0;
    const sequenceHeight = sequenceRect ? sequenceRect.height : 0;

    if (isVertical) {
      const parentHeight = containerRef.parentElement ? containerRef.parentElement.clientHeight : 0;
      if (parentHeight > 0) {
        const targetHeight = Math.ceil(parentHeight);
        if (containerRef.style.height !== `${targetHeight}px`) {
          containerRef.style.height = `${targetHeight}px`;
        }
      }
      if (sequenceHeight > 0) {
        seqHeight = Math.ceil(sequenceHeight);
        const viewport = containerRef.clientHeight || parentHeight || sequenceHeight;
        const copiesNeeded = Math.ceil(viewport / sequenceHeight) + 2; // COPY_HEADROOM = 2
        copyCount = Math.max(2, copiesNeeded);
      }
    } else if (sequenceWidth > 0) {
      seqWidth = Math.ceil(sequenceWidth);
      const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + 2;
      copyCount = Math.max(2, copiesNeeded);
    }
  }

  let resizeObserver;
  onMount(() => {
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(() => {
        updateDimensions();
      });
      if (containerRef) resizeObserver.observe(containerRef);
      if (seqRef) resizeObserver.observe(seqRef);
    } else {
      window.addEventListener('resize', updateDimensions);
    }
    updateDimensions();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', updateDimensions);
      }
    };
  });

  let imageListeners = [];
  function setupImageListeners() {
    imageListeners.forEach(({ img, handler }) => {
      img.removeEventListener('load', handler);
      img.removeEventListener('error', handler);
    });
    imageListeners = [];

    if (!seqRef) return;
    const images = seqRef.querySelectorAll('img') || [];
    images.forEach(img => {
      if (img.complete) {
        // already complete
      } else {
        const handler = () => {
          updateDimensions();
        };
        img.addEventListener('load', handler, { once: true });
        img.addEventListener('error', handler, { once: true });
        imageListeners.push({ img, handler });
      }
    });
  }

  $: if (logos || gap || logoHeight || isVertical || seqRef) {
    tick().then(() => {
      setupImageListeners();
      updateDimensions();
    });
  }

  onDestroy(() => {
    imageListeners.forEach(({ img, handler }) => {
      img.removeEventListener('load', handler);
      img.removeEventListener('error', handler);
    });
  });

  let rafId = null;
  let lastTimestamp = null;
  let offset = 0;
  let velocity = 0;

  function startAnimation() {
    if (rafId) cancelAnimationFrame(rafId);
    lastTimestamp = null;

    const animate = (timestamp) => {
      if (!trackRef) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestamp) / 1000;
      lastTimestamp = timestamp;

      const target = isHovered && effectiveHoverSpeed !== undefined ? effectiveHoverSpeed : targetVelocity;
      const easingFactor = 1 - Math.exp(-deltaTime / 0.25); // SMOOTH_TAU = 0.25
      velocity += (target - velocity) * easingFactor;

      const seqSize = isVertical ? seqHeight : seqWidth;

      if (seqSize > 0) {
        let nextOffset = offset + velocity * deltaTime;
        nextOffset = ((nextOffset % seqSize) + seqSize) % seqSize;
        offset = nextOffset;

        const transformValue = isVertical
          ? `translate3d(0, ${-offset}px, 0)`
          : `translate3d(${-offset}px, 0, 0)`;
        trackRef.style.transform = transformValue;
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
  }

  onMount(() => {
    startAnimation();
  });

  onDestroy(() => {
    if (rafId) cancelAnimationFrame(rafId);
  });

  $: cssVariables = {
    '--logoloop-gap': `${gap}px`,
    '--logoloop-logoHeight': `${logoHeight}px`,
    ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor })
  };

  $: containerStyleString = (() => {
    let cssVarString = Object.entries(cssVariables)
      .map(([k, v]) => `${k}: ${v};`)
      .join(' ');
    
    let widthStyle = '';
    const toCssLength = value => (typeof value === 'number' ? `${value}px` : (value ?? ''));
    if (isVertical) {
      if (toCssLength(width) !== '100%') {
        widthStyle = `width: ${toCssLength(width)};`;
      }
    } else {
      widthStyle = `width: ${toCssLength(width) || '100%'};`;
    }
    
    return `${cssVarString} ${widthStyle} ${style}`;
  })();

  $: rootClassName = [
    'logoloop',
    isVertical ? 'logoloop--vertical' : 'logoloop--horizontal',
    fadeOut ? 'logoloop--fade' : '',
    scaleOnHover ? 'logoloop--scale-hover' : '',
    className
  ].filter(Boolean).join(' ');

  function handleMouseEnter() {
    if (effectiveHoverSpeed !== undefined) isHovered = true;
  }
  function handleMouseLeave() {
    if (effectiveHoverSpeed !== undefined) isHovered = false;
  }

  function setSeqRef(node, isFirst) {
    if (isFirst) {
      seqRef = node;
      setupImageListeners();
      updateDimensions();
    }
  }
</script>

<div
  bind:this={containerRef}
  class={rootClassName}
  style={containerStyleString}
  role="region"
  aria-label={ariaLabel}
>
  <div
    class="logoloop__track"
    bind:this={trackRef}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    role="presentation"
  >
    {#each Array(copyCount) as _, copyIndex}
      <ul
        class="logoloop__list"
        role="list"
        aria-hidden={copyIndex > 0}
        use:setSeqRef={copyIndex === 0}
      >
        {#each logos as item, itemIndex}
          <li class="logoloop__item" role="listitem">
            {#if renderItem}
              <!-- Custom rendering option -->
              {@html renderItem(item, `${copyIndex}-${itemIndex}`)}
            {:else}
              <div class="logoloop__item-container">
                {#if item.href}
                  <a
                    class="logoloop__link"
                    href={item.href}
                    aria-label={item.ariaLabel || item.title || item.alt || 'logo link'}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {#if item.node}
                      <span class="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>
                        <svelte:component this={item.node} />
                      </span>
                    {:else}
                      <img
                        src={item.src}
                        srcset={item.srcSet}
                        sizes={item.sizes}
                        width={item.width}
                        height={item.height}
                        alt={item.alt ?? ''}
                        title={item.title}
                        loading="lazy"
                        decoding="async"
                        draggable={false}
                      />
                    {/if}
                  </a>
                {:else}
                  {#if item.node}
                    <span class="logoloop__node">
                      <svelte:component this={item.node} />
                    </span>
                  {:else}
                    <img
                      src={item.src}
                      srcset={item.srcSet}
                      sizes={item.sizes}
                      width={item.width}
                      height={item.height}
                      alt={item.alt ?? ''}
                      title={item.title}
                      loading="lazy"
                      decoding="async"
                      draggable={false}
                    />
                  {/if}
                {/if}
                
                {#if item.alt || item.title}
                  <span class="logoloop__item-title">{item.alt || item.title}</span>
                {/if}
              </div>
            {/if}
          </li>
        {/each}
      </ul>
    {/each}
  </div>
</div>
