<script setup>
  import { onMounted, watch, ref } from "vue";

  // Set blur stdDeviation for up to 10 shapes
  function updateBlurFilters() {
    for (let i = 0; i < 10; i++) {
      const el = document.getElementById(`blur${i}-std`);
      if (el && shapes.value[i]) {
        el.setAttribute("stdDeviation", shapes.value[i].blur);
      }
    }
  }

  // Painting background color (not page)
  const paintingBg = ref("#ffffff");

  // Shapes array: each with color, top, left, width, height, blur, roughness
  const shapes = ref([
    {
      color: "#b13b2e",
      top: 5,
      left: 3,
      width: 93,
      height: 35,
      blur: 0,
      roughness: 8,
    },
    {
      color: "#e3b97b",
      top: 46,
      left: 8,
      width: 84,
      height: 15,
      blur: 0,
      roughness: 6,
    },
    {
      color: "#3b3a2e",
      top: 64,
      left: 8,
      width: 84,
      height: 32,
      blur: 0,
      roughness: 10,
    },
  ]);

  onMounted(updateBlurFilters);
  watch(shapes, updateBlurFilters, { deep: true });

  // Deterministic pseudo-random for consistent roughness per square
  function seededRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  // Generate a smooth, wavy polygon path for a shape, unique per shape index
  function roughRectPath(sq, idx = 0) {
    const { left, top, width, height, roughness } = sq;
    // Convert percent to px for 950x800 canvas
    const pxLeft = (left / 100) * 950;
    const pxTop = (top / 100) * 800;
    const pxWidth = (width / 100) * 950;
    const pxHeight = (height / 100) * 800;
    const pointsPerEdge = 64;
    const pts = [];
    // Use a sum of sine/cosine waves for smooth waviness
    function wavy(t, edgeSeed, baseLength, roughness) {
      // t in [0,1], edgeSeed is unique per edge, baseLength is edge length in px
      let v = 0;
      // Fixed 3 harmonics for painterly look
      for (let h = 1; h <= 3; h++) {
        const freq = h * 2 + (idx % 3);
        const phase = seededRandom(edgeSeed * 1000 + h * 17 + idx) * Math.PI * 2;
        // Amplitude is proportional to edge length and roughness
        const amp = roughness * (0.18 / h) * (baseLength / 400);
        v += Math.sin(t * Math.PI * 2 * freq + phase) * amp;
      }
      return v;
    }
    // Generate points for all edges
    for (let i = 0; i <= pointsPerEdge; i++) {
      const t = i / pointsPerEdge;
      const x = pxLeft + pxWidth * t + wavy(t, idx + 11, pxWidth, roughness);
      const y = pxTop + wavy(t, idx + 1, pxWidth, roughness);
      pts.push([x, y]);
    }
    for (let i = 1; i <= pointsPerEdge; i++) {
      const t = i / pointsPerEdge;
      const y = pxTop + pxHeight * t + wavy(t, idx + 12, pxHeight, roughness);
      const x = pxLeft + pxWidth + wavy(t, idx + 2, pxHeight, roughness);
      pts.push([x, y]);
    }
    for (let i = pointsPerEdge; i >= 0; i--) {
      const t = i / pointsPerEdge;
      const x = pxLeft + pxWidth * t + wavy(1 - t, idx + 13, pxWidth, roughness);
      const y = pxTop + pxHeight + wavy(1 - t, idx + 3, pxWidth, roughness);
      pts.push([x, y]);
    }
    for (let i = pointsPerEdge; i >= 1; i--) {
      const t = i / pointsPerEdge;
      const y = pxTop + pxHeight * t + wavy(1 - t, idx + 14, pxHeight, roughness);
      const x = pxLeft + wavy(1 - t, idx + 4, pxHeight, roughness);
      pts.push([x, y]);
    }
    // Use circular buffer for seamless join
    function catmullRom2bezier(pts) {
      let d = "";
      const n = pts.length;
      for (let i = 0; i < n; i++) {
        const p0 = pts[(i - 1 + n) % n];
        const p1 = pts[i];
        const p2 = pts[(i + 1) % n];
        const p3 = pts[(i + 2) % n];
        if (i === 0) {
          d += `M ${p1[0]},${p1[1]}`;
        }
        const c1x = p1[0] + (p2[0] - p0[0]) / 6;
        const c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6;
        const c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x},${c1y} ${c2x},${c2y} ${p2[0]},${p2[1]}`;
      }
      d += " Z";
      return d;
    }
    return catmullRom2bezier(pts);
  }

  function updateShape(index, key, value) {
    shapes.value[index][key] = value;
  }
</script>

<template>
  <div class="rothko-bg">
    <div class="controls">
      <label>
        Painting Background:
        <input type="color" v-model="paintingBg" />
      </label>
      <div v-for="(shape, i) in shapes" :key="i" class="shape-controls">
        <h4>Shape {{ i + 1 }}</h4>
        <label>Color: <input type="color" v-model="shape.color" /></label>
        <label>Top (%): <input type="number" v-model.number="shape.top" min="0" max="100" /></label>
        <label>Left (%): <input type="number" v-model.number="shape.left" min="0" max="100" /></label>
        <label>Width (%): <input type="number" v-model.number="shape.width" min="1" max="100" /></label>
        <label>Height (%): <input type="number" v-model.number="shape.height" min="1" max="100" /></label>
        <label>Blur: <input type="range" v-model.number="shape.blur" min="0" max="10" /></label>
        <label>Roughness: <input type="range" v-model.number="shape.roughness" min="0" max="20" /></label>
      </div>
    </div>
    <div class="painting-frame">
      <svg :width="950" :height="800" viewBox="0 0 950 800" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Feathered mask for soft edges (not used for main shape now) -->
          <radialGradient id="featherMask" cx="50%" cy="50%" r="0.7">
            <stop offset="80%" stop-color="white" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </radialGradient>
          <filter id="softBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <filter v-for="i in 10" :id="`blur${i - 1}`" :key="i">
            <feGaussianBlur :id="`blur${i - 1}-std`" stdDeviation="0" />
          </filter>
        </defs>
        <rect x="0" y="0" width="950" height="800" :fill="paintingBg" />
        <g v-for="(shape, i) in shapes" :key="i" :filter="`url(#blur${i})`">
          <!-- Main shape: crisp, rough, unblurred -->
          <path
            :d="roughRectPath(shape, i)"
            :fill="shape.color"
            :style="{
              opacity: 0.95,
              mixBlendMode: 'normal',
            }"
          />
          <!-- Internal blurred texture, clipped to main shape -->
          <clipPath :id="`clip${i}`">
            <path :d="roughRectPath(shape, i)" />
          </clipPath>
          <g :clip-path="`url(#clip${i})`">
            <path
              :d="roughRectPath({ ...shape, left: shape.left + 1.5, top: shape.top + 1.5, roughness: shape.roughness * 1.5 }, i + 100)"
              :fill="shape.color"
              :style="{
                opacity: 0.25,
                mixBlendMode: 'lighter',
              }"
            />
            <path
              :d="roughRectPath({ ...shape, left: shape.left - 1.5, top: shape.top - 1.5, roughness: shape.roughness * 1.7 }, i + 200)"
              :fill="shape.color"
              :style="{
                opacity: 0.13,
                mixBlendMode: 'lighter',
              }"
            />
          </g>
          <filter :id="`blur${i}`">
            <feGaussianBlur :stdDeviation="shape.blur" />
          </filter>
        </g>
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .rothko-bg {
    //width: 100vw;
    max-height: 80dvh;
    background: #f5f5f5;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 2rem;
  }
  .controls {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background: #fff;
    border-radius: 1rem;
    box-shadow: 0 2px 16px #0001;
    padding: 1.5rem 2rem;
    min-width: 260px;
    max-width: 320px;
  }
  .controls label {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-size: 1rem;
    margin-bottom: 0.5em;
  }
  .shape-controls {
    border-top: 1px solid #eee;
    margin-top: 1.5em;
    padding-top: 1em;
  }
  .painting-frame {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 8px 64px 0 #0006;
  }
  svg {
    background: none;
  }
</style>
