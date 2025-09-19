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
    backgroundColor: "#f5f1eb", // Warmer off-white like Rothko canvases
    shapes: [
      {
        id: 1,
        x: 5,
        y: 15,
        width: 90,
        height: 30,
        color: "#8b4513", // Muted brown-red like Rothko
        roughness: 4,
        blur: 6,
        brushStrokes: 3,
      },
      {
        id: 2,
        x: 5,
        y: 55,
        width: 90,
        height: 30,
        color: "#2f1b69", // Deep muted blue-purple
        roughness: 3,
        blur: 7,
        brushStrokes: 4,
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
    const rothkoColors = ["#8b4513", "#2f1b69", "#cd853f", "#556b2f", "#800020", "#483d8b"];
    const randomColor = rothkoColors[shapeIdCounter % rothkoColors.length];
    
    painting.shapes.push({
      id: shapeIdCounter,
      x: 5,
      y: 30,
      width: 90,
      height: 25,
      color: randomColor,
      roughness: 4,
      blur: 6,
      brushStrokes: 3,
    });
  };

  const removeShape = (id: number) => {
    const index = painting.shapes.findIndex((shape) => shape.id === id);
    if (index > -1 && painting.shapes.length > 1) {
      painting.shapes.splice(index, 1);
    }
  };

  const getShapeStyle = (shape: Shape) => {
    // Invert brush strokes logic - more visible at higher values
    const brushIntensity = shape.brushStrokes / 10;
    const blurAmount = shape.blur * 2.5; // Increase blur for softer Rothko-like edges
    const baseOpacity = Math.max(0.7, 1 - brushIntensity * 0.2);

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

    // Create soft, organic Rothko-like edges using smooth curves
    const variation = (roughness / 10) * 8; // Reduce variation for softer edges
    const points = [];
    
    // Seed for consistent randomness per shape
    const seed = shape.id * 123 + shape.roughness * 456;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index) * 10000;
      return x - Math.floor(x);
    };

    // Top edge - create gentle undulations
    const topPoints = 6;
    for (let i = 0; i <= topPoints; i++) {
      const x = (i / topPoints) * w;
      const y = (seededRandom(i) - 0.5) * variation;
      points.push({ x, y });
    }

    // Right edge
    const rightPoints = 4;
    for (let i = 1; i <= rightPoints; i++) {
      const x = w + (seededRandom(100 + i) - 0.5) * variation;
      const y = (i / rightPoints) * h;
      points.push({ x, y });
    }

    // Bottom edge
    const bottomPoints = 6;
    for (let i = bottomPoints - 1; i >= 0; i--) {
      const x = (i / bottomPoints) * w;
      const y = h + (seededRandom(200 + i) - 0.5) * variation;
      points.push({ x, y });
    }

    // Left edge
    const leftPoints = 4;
    for (let i = leftPoints - 1; i >= 1; i--) {
      const x = (seededRandom(300 + i) - 0.5) * variation;
      const y = (i / leftPoints) * h;
      points.push({ x, y });
    }

    // Create smooth Bezier curves for organic Rothko-like edges
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 1; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];
      
      // Use gentle control points for smooth curves
      const cp1x = current.x + (seededRandom(400 + i) - 0.5) * variation * 0.3;
      const cp1y = current.y + (seededRandom(500 + i) - 0.5) * variation * 0.3;
      
      path += ` Q ${cp1x} ${cp1y} ${current.x} ${current.y}`;
    }

    // Close path smoothly
    const firstPoint = points[0];
    const cp1x = firstPoint.x + (seededRandom(600) - 0.5) * variation * 0.3;
    const cp1y = firstPoint.y + (seededRandom(700) - 0.5) * variation * 0.3;
    path += ` Q ${cp1x} ${cp1y} ${firstPoint.x} ${firstPoint.y}`;
    
    path += " Z";
    return path;
  };

  const getColorVariations = (baseColor: string, brushIntensity: number) => {
    if (brushIntensity === 0) return [baseColor];

    const variations = [];
    const count = Math.floor(brushIntensity * 8) + 3;
    
    // Convert hex to RGB for manipulation
    const hex = baseColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);  
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Seed for consistent variations per shape
    const seed = r + g + b;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 1.234) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      const variation = brushIntensity / 10;
      
      // Create subtle color shifts typical of Rothko paintings
      const rShift = (seededRandom(i) - 0.5) * 40 * variation;
      const gShift = (seededRandom(i + 100) - 0.5) * 40 * variation;
      const bShift = (seededRandom(i + 200) - 0.5) * 40 * variation;
      
      const newR = Math.max(0, Math.min(255, r + rShift));
      const newG = Math.max(0, Math.min(255, g + gShift));
      const newB = Math.max(0, Math.min(255, b + bShift));
      
      variations.push(`rgb(${Math.floor(newR)}, ${Math.floor(newG)}, ${Math.floor(newB)})`);
    }
    
    return variations;
  };

  const generateColorFields = (shape: Shape) => {
    const brushIntensity = shape.brushStrokes / 10;
    if (brushIntensity === 0) return [];
    
    const fields = [];
    const colorVariations = getColorVariations(shape.color, brushIntensity);
    const fieldCount = Math.floor(brushIntensity * 12) + 3;
    
    const seed = shape.id * 789 + shape.brushStrokes * 321;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 2.345) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < fieldCount; i++) {
      // Create organic color field shapes typical of Rothko
      const x = seededRandom(i) * 80 + 5;
      const y = seededRandom(i + 100) * 80 + 5;
      const width = seededRandom(i + 200) * 60 + 20;
      const height = seededRandom(i + 300) * 40 + 10;
      const opacity = (seededRandom(i + 400) * 0.3 + 0.1) * brushIntensity;
      const colorIndex = Math.floor(seededRandom(i + 500) * colorVariations.length);
      
      fields.push({
        x,
        y, 
        width,
        height,
        color: colorVariations[colorIndex],
        opacity,
        rx: width * 0.3, // Rounded corners for organic feel
        ry: height * 0.4
      });
    }
    
    return fields;
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
            // Define clipping path for the shape
            clipPath(:id="`clip-${shape.id}`")
              path(:d="generateRoughPath(shape)")
            
            // Subtle radial gradient for Rothko-like luminosity
            radialGradient(:id="`radial-gradient-${shape.id}`")
              stop(offset="0%" :stop-color="shape.color" stop-opacity="1")
              stop(offset="50%" :stop-color="shape.color" stop-opacity="0.95")
              stop(offset="100%" :stop-color="shape.color" stop-opacity="0.85")
          
          // Base shape with main color
          path(
            :d="generateRoughPath(shape)"
            :fill="`url(#radial-gradient-${shape.id})`"
          )
          
          // Color variation fields (clipped to shape)
          g(:clip-path="`url(#clip-${shape.id})`" v-if="shape.brushStrokes > 0")
            ellipse(
              v-for="(field, index) in generateColorFields(shape)"
              :key="`field-${shape.id}-${index}`"
              :cx="field.x + field.width/2"
              :cy="field.y + field.height/2"
              :rx="field.rx"
              :ry="field.ry"
              :fill="field.color"
              :opacity="field.opacity"
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
