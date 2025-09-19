<script setup lang="ts">
  import { reactive, computed } from "vue";

  interface Shape {
    id: number;
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    roughness: number;
    blur: number;
    brushStrokes: number;
  }

  interface PaintingConfig {
    aspectRatio: { width: number; height: number };
    backgroundColor: string;
    shapes: Shape[];
  }

  const painting = reactive<PaintingConfig>({
    aspectRatio: { width: 1, height: 2 },
    backgroundColor: "#ffffff",
    shapes: [
      {
        id: 1,
        x: 10,
        y: 20,
        width: 80,
        height: 25,
        color: "#d4573b",
        roughness: 3,
        blur: 2,
        brushStrokes: 4,
      },
      {
        id: 2,
        x: 10,
        y: 55,
        width: 80,
        height: 25,
        color: "#1a237e",
        roughness: 2,
        blur: 3,
        brushStrokes: 5,
      },
    ],
  });

  let shapeIdCounter = 2;

  const canvasStyle = computed(() => ({
    aspectRatio: `${painting.aspectRatio.width} / ${painting.aspectRatio.height}`,
    backgroundColor: painting.backgroundColor,
  }));

  const addShape = () => {
    shapeIdCounter++;
    painting.shapes.push({
      id: shapeIdCounter,
      x: 10,
      y: 30,
      width: 80,
      height: 20,
      color: "#8bc34a",
      roughness: 3,
      blur: 2,
      brushStrokes: 4,
    });
  };

  const removeShape = (id: number) => {
    const index = painting.shapes.findIndex((shape) => shape.id === id);
    if (index > -1 && painting.shapes.length > 1) {
      painting.shapes.splice(index, 1);
    }
  };

  const getShapeStyle = (shape: Shape) => {
    const blurAmount = shape.blur * 1.2;
    const baseOpacity = Math.max(0.6, 1 - shape.brushStrokes * 0.06);

    return {
      position: "absolute",
      left: `${shape.x}%`,
      top: `${shape.y}%`,
      width: `${shape.width}%`,
      height: `${shape.height}%`,
      filter: `blur(${blurAmount}px)`,
      opacity: baseOpacity,
    };
  };

  const generateRoughPath = (shape: Shape) => {
    const roughness = shape.roughness;
    const w = 100;
    const h = 100;

    if (roughness === 0) {
      return `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`;
    }

    // Create more organic, Rothko-like rough edges
    const variation = roughness * 1.5;
    const points = [];

    // Top edge - multiple points for organic variation
    const topPoints = 8 + Math.floor(roughness);
    for (let i = 0; i <= topPoints; i++) {
      const x = (i / topPoints) * w;
      const y = (Math.random() - 0.5) * variation;
      points.push({ x, y });
    }

    // Right edge
    const rightPoints = 6 + Math.floor(roughness * 0.5);
    for (let i = 1; i <= rightPoints; i++) {
      const x = w + (Math.random() - 0.5) * variation;
      const y = (i / rightPoints) * h;
      points.push({ x, y });
    }

    // Bottom edge
    const bottomPoints = 8 + Math.floor(roughness);
    for (let i = bottomPoints - 1; i >= 0; i--) {
      const x = (i / bottomPoints) * w;
      const y = h + (Math.random() - 0.5) * variation;
      points.push({ x, y });
    }

    // Left edge
    const leftPoints = 6 + Math.floor(roughness * 0.5);
    for (let i = leftPoints - 1; i >= 1; i--) {
      const x = (Math.random() - 0.5) * variation;
      const y = (i / leftPoints) * h;
      points.push({ x, y });
    }

    // Create smooth path using curves
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      const prev = points[i - 1];

      // Control points for smooth curves
      const cp1x = prev.x + (current.x - prev.x) * 0.5;
      const cp1y = prev.y + (current.y - prev.y) * 0.5;
      const cp2x = current.x + (next.x - current.x) * 0.3;
      const cp2y = current.y + (next.y - current.y) * 0.3;

      path += ` Q ${cp1x} ${cp1y} ${current.x} ${current.y}`;
    }

    path += " Z";
    return path;
  };

  const getBrushStrokePattern = (shape: Shape) => {
    if (shape.brushStrokes === 0) return [];

    const strokes = [];
    const intensity = shape.brushStrokes;
    const strokeCount = Math.floor(intensity * 3) + 5;

    // Create varied brush stroke patterns
    for (let i = 0; i < strokeCount; i++) {
      const strokeType = Math.random();

      if (strokeType < 0.6) {
        // Horizontal brush strokes (most common in Rothko)
        strokes.push({
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          width: Math.random() * 30 + 20,
          height: Math.random() * 4 + 1,
          opacity: (Math.random() * 0.15 + 0.05) * (intensity / 10),
          rotation: (Math.random() - 0.5) * 10,
        });
      } else if (strokeType < 0.85) {
        // Vertical brush strokes
        strokes.push({
          x: Math.random() * 90 + 5,
          y: Math.random() * 90 + 5,
          width: Math.random() * 4 + 1,
          height: Math.random() * 25 + 15,
          opacity: (Math.random() * 0.12 + 0.03) * (intensity / 10),
          rotation: 90 + (Math.random() - 0.5) * 15,
        });
      } else {
        // Diagonal strokes for texture
        strokes.push({
          x: Math.random() * 85 + 7,
          y: Math.random() * 85 + 7,
          width: Math.random() * 20 + 10,
          height: Math.random() * 3 + 1,
          opacity: (Math.random() * 0.08 + 0.02) * (intensity / 10),
          rotation: (Math.random() - 0.5) * 45,
        });
      }
    }

    return strokes;
  };

  // Add color variation function for more realistic Rothko colors
  const getColorVariations = (baseColor: string, intensity: number) => {
    const variations = [];
    const count = Math.floor(intensity * 2) + 3;

    // Convert hex to RGB for manipulation
    const hex = baseColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    for (let i = 0; i < count; i++) {
      const variation = (0.15 * intensity) / 10;
      const newR = Math.max(0, Math.min(255, r + (Math.random() - 0.5) * 60 * variation));
      const newG = Math.max(0, Math.min(255, g + (Math.random() - 0.5) * 60 * variation));
      const newB = Math.max(0, Math.min(255, b + (Math.random() - 0.5) * 60 * variation));

      variations.push(`rgb(${Math.floor(newR)}, ${Math.floor(newG)}, ${Math.floor(newB)})`);
    }

    return variations;
  };
</script>

<template lang="pug">
.rothko-generator
  .controls-panel
    h1 Rothko Painting Generator
    
    .control-group
      label Aspect Ratio
      .aspect-ratio-controls
        input(
          type="number"
          v-model.number="painting.aspectRatio.width"
          min="1"
          max="10"
          step="0.5"
        )
        span :
        input(
          type="number"
          v-model.number="painting.aspectRatio.height"
          min="1"
          max="10"
          step="0.5"
        )
    
    .control-group
      label Background Color
      input(
        type="color"
        v-model="painting.backgroundColor"
      )
    
    .shapes-section
      .shapes-header
        h3 Shapes ({{ painting.shapes.length }})
        button.add-shape(@click="addShape") Add Shape
      
      .shape-controls(
        v-for="shape in painting.shapes"
        :key="shape.id"
      )
        .shape-header
          h4 Shape {{ shape.id }}
          button.remove-shape(
            @click="removeShape(shape.id)"
            :disabled="painting.shapes.length === 1"
          ) Remove
        
        .control-row
          .control
            label Position X (%)
            input(
              type="range"
              v-model.number="shape.x"
              min="0"
              max="50"
              step="1"
            )
            span {{ shape.x }}%
          
          .control
            label Position Y (%)
            input(
              type="range"
              v-model.number="shape.y"
              min="0"
              max="80"
              step="1"
            )
            span {{ shape.y }}%
        
        .control-row
          .control
            label Width (%)
            input(
              type="range"
              v-model.number="shape.width"
              min="10"
              max="90"
              step="1"
            )
            span {{ shape.width }}%
          
          .control
            label Height (%)
            input(
              type="range"
              v-model.number="shape.height"
              min="5"
              max="60"
              step="1"
            )
            span {{ shape.height }}%
        
        .control-row
          .control
            label Color
            input(
              type="color"
              v-model="shape.color"
            )
          
          .control
            label Roughness
            input(
              type="range"
              v-model.number="shape.roughness"
              min="0"
              max="10"
              step="1"
            )
            span {{ shape.roughness }}
        
        .control-row
          .control
            label Blur
            input(
              type="range"
              v-model.number="shape.blur"
              min="0"
              max="10"
              step="1"
            )
            span {{ shape.blur }}
          
          .control
            label Brush Strokes
            input(
              type="range"
              v-model.number="shape.brushStrokes"
              min="0"
              max="10"
              step="1"
            )
            span {{ shape.brushStrokes }}
  
  .painting-canvas
    figure.rothko-painting(:style="canvasStyle")
      .shape(
        v-for="shape in painting.shapes"
        :key="shape.id"
        :style="getShapeStyle(shape)"
      )
        svg(
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        )
          defs
            // Enhanced gradient for more realistic color transitions
            linearGradient(:id="`gradient-${shape.id}`" gradientTransform="rotate(45)")
              stop(offset="0%" :stop-color="shape.color" stop-opacity="1")
              stop(offset="30%" :stop-color="shape.color" stop-opacity="0.95")
              stop(offset="70%" :stop-color="shape.color" stop-opacity="0.98")
              stop(offset="100%" :stop-color="shape.color" stop-opacity="0.9")
            
            // Improved turbulence filter for organic texture
            filter(:id="`texture-${shape.id}`")
              feTurbulence(
                baseFrequency="0.02 0.1"
                numOctaves="4"
                seed="3"
                stitchTiles="stitch"
              )
              feColorMatrix(values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0")
              feComponentTransfer
                feFuncA(type="discrete" tableValues="0.2 0.3 0.4 0.3 0.2")
              feComposite(in2="SourceGraphic" operator="over")
            
            // Brush stroke pattern with color variations
            pattern(
              :id="`brush-pattern-${shape.id}`"
              patternUnits="userSpaceOnUse"
              width="100"
              height="100"
            )
              rect(
                width="100"
                height="100"
                :fill="`url(#gradient-${shape.id})`"
              )
              g(v-if="shape.brushStrokes > 0")
                rect(
                  v-for="(stroke, index) in getBrushStrokePattern(shape)"
                  :key="`stroke-${shape.id}-${index}`"
                  :x="stroke.x"
                  :y="stroke.y"
                  :width="stroke.width"
                  :height="stroke.height"
                  :fill="getColorVariations(shape.color, shape.brushStrokes)[index % getColorVariations(shape.color, shape.brushStrokes).length]"
                  :opacity="stroke.opacity"
                  :transform="`rotate(${stroke.rotation || 0} ${stroke.x + stroke.width/2} ${stroke.y + stroke.height/2})`"
                )
          
          // Main shape with improved path and texture
          path(
            :d="generateRoughPath(shape)"
            :fill="`url(#brush-pattern-${shape.id})`"
            :filter="shape.roughness > 2 || shape.brushStrokes > 3 ? `url(#texture-${shape.id})` : 'none'"
            :stroke="shape.color"
            :stroke-width="shape.roughness > 5 ? '0.5' : '0'"
            :stroke-opacity="0.3"
          )
</template>

<style lang="scss" scoped>
  .rothko-generator {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    font-family: "Arial", sans-serif;
    background: #f5f5f5;
    min-height: 100vh;

    .controls-panel {
      flex: 0 0 350px;
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      max-height: fit-content;

      h1 {
        margin: 0 0 1.5rem 0;
        color: #333;
        font-size: 1.5rem;
      }

      .control-group {
        margin-bottom: 1.5rem;

        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #555;
        }

        input[type="number"],
        input[type="color"] {
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 100%;
        }

        .aspect-ratio-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;

          input {
            flex: 1;
          }

          span {
            font-weight: bold;
          }
        }
      }

      .shapes-section {
        .shapes-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;

          h3 {
            margin: 0;
            color: #333;
          }

          .add-shape {
            background: #4caf50;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;

            &:hover {
              background: #45a049;
            }
          }
        }

        .shape-controls {
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 1rem;
          margin-bottom: 1rem;

          .shape-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;

            h4 {
              margin: 0;
              color: #333;
              font-size: 1.1rem;
            }

            .remove-shape {
              background: #f44336;
              color: white;
              border: none;
              padding: 0.25rem 0.5rem;
              border-radius: 4px;
              cursor: pointer;
              font-size: 0.8rem;

              &:hover:not(:disabled) {
                background: #da190b;
              }

              &:disabled {
                background: #ccc;
                cursor: not-allowed;
              }
            }
          }

          .control-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0;
            }

            .control {
              label {
                display: block;
                margin-bottom: 0.25rem;
                font-size: 0.9rem;
                font-weight: 500;
                color: #666;
              }

              input[type="range"] {
                width: 100%;
                margin-bottom: 0.25rem;
              }

              input[type="color"] {
                width: 100%;
                height: 2rem;
                border: none;
                border-radius: 4px;
                cursor: pointer;
              }

              span {
                font-size: 0.85rem;
                color: #888;
              }
            }
          }
        }
      }
    }

    .painting-canvas {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;

      .rothko-painting {
        margin: 0;
        max-width: 600px;
        width: 100%;
        position: relative;
        border: 1px solid #ddd;
        box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
        overflow: hidden;

        .shape {
          svg {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
