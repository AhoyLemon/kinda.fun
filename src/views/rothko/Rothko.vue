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
    aspectRatio: { width: 7, height: 8 }, // Start with reference painting 1 aspect ratio
    backgroundColor: "#FC772C", // Orange background for first reference
    shapes: [
      {
        id: 1,
        x: 6, // Add left margin
        y: 3, // Add top margin
        width: 92, // Leave space on sides
        height: 38, // Larger for proper proportion
        color: "#860F2D", // Dark red for first reference
        roughness: 3,
        blur: 2,
        brushStrokes: 8,
      },
      {
        id: 2,
        x: 4, // Add left margin
        y: 42, // Position between shapes
        width: 92, // Leave space on sides
        height: 8, // Much smaller middle stripe
        color: "#F24120", // Darker orange, distinct from background
        roughness: 7,
        blur: 2,
        brushStrokes: 6,
      },
      {
        id: 3,
        x: 6, // Add left margin
        y: 52, // Position after middle stripe
        width: 88, // Leave space on sides
        height: 44, // Bottom section
        color: "#8E162C", // Dark red bottom
        roughness: 3,
        blur: 2,
        brushStrokes: 10,
      },
    ],
  });

  let shapeIdCounter = 3;

  const canvasStyle = computed(() => {
    const aspectRatio = painting.aspectRatio.width / painting.aspectRatio.height;
    const maxWidth = 500; // Max width in pixels
    const maxHeight = 600; // Max height in pixels

    let width, height;
    if (aspectRatio >= 1) {
      // Wider than tall
      width = Math.min(maxWidth, maxHeight * aspectRatio);
      height = width / aspectRatio;
    } else {
      // Taller than wide
      height = Math.min(maxHeight, maxWidth / aspectRatio);
      width = height * aspectRatio;
    }

    return {
      width: `${width}px`,
      height: `${height}px`,
      backgroundColor: painting.backgroundColor,
      position: "relative" as const,
      overflow: "hidden" as const,
    };
  });

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
    const blurAmount = shape.blur * 0.5; // Increase blur for softer Rothko-like edges
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

    // Create very fluid, "blobby" organic edges with enhanced variation
    const baseVariation = (roughness / 10) * 15; // Increased for more blobby effect
    const points = [];

    // Seed for consistent randomness per shape
    const seed = shape.id * 123 + shape.roughness * 456;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 2.718) * 10000;
      return x - Math.floor(x);
    };

    // Create multiple frequency layers for very organic, blobby variation
    const getLayeredVariation = (index: number, baseIndex: number) => {
      // Layer 1: Large organic undulations (major blob shape)
      const layer1 = Math.sin((index / 6) * Math.PI * 2) * baseVariation * 0.7;
      // Layer 2: Medium frequency organic texture (blob details)
      const layer2 = (seededRandom(baseIndex + index) - 0.5) * baseVariation * 0.4;
      // Layer 3: Fine irregular details (paint texture)
      const layer3 = (seededRandom(baseIndex + index + 1000) - 0.5) * baseVariation * 0.2;
      // Layer 4: Random spikes and indentations for very organic feel
      const layer4 = (seededRandom(baseIndex + index + 2000) - 0.5) * baseVariation * 0.3;
      
      return layer1 + layer2 + layer3 + layer4;
    };

    // More points for very fluid, organic curves
    const pointsPerEdge = 16;

    // Top edge - create organic undulations
    for (let i = 0; i <= pointsPerEdge; i++) {
      const x = (i / pointsPerEdge) * w;
      const y = getLayeredVariation(i, 0);
      points.push({ x, y });
    }

    // Right edge
    for (let i = 1; i <= pointsPerEdge; i++) {
      const x = w + getLayeredVariation(i, 100);
      const y = (i / pointsPerEdge) * h;
      points.push({ x, y });
    }

    // Bottom edge
    for (let i = pointsPerEdge - 1; i >= 0; i--) {
      const x = (i / pointsPerEdge) * w;
      const y = h + getLayeredVariation(i, 200);
      points.push({ x, y });
    }

    // Left edge
    for (let i = pointsPerEdge - 1; i >= 1; i--) {
      const x = getLayeredVariation(i, 300);
      const y = (i / pointsPerEdge) * h;
      points.push({ x, y });
    }

    // Create smooth organic path using gentle curves
    let path = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length; i++) {
      const current = points[i];
      const next = points[(i + 1) % points.length];

      // Create soft control points for natural painterly curves
      const smoothness = 0.4;
      const cp1x = current.x + (seededRandom(400 + i) - 0.5) * baseVariation * smoothness;
      const cp1y = current.y + (seededRandom(500 + i) - 0.5) * baseVariation * smoothness;

      path += ` Q ${cp1x} ${cp1y} ${next.x} ${next.y}`;
    }

    path += " Z";
    return path;
  };

  const getColorVariations = (baseColor: string, brushIntensity: number) => {
    if (brushIntensity === 0) return [baseColor];

    const variations = [];
    const count = Math.floor(brushIntensity * 20) + 8; // Many more variations

    // Convert hex to RGB for manipulation
    const hex = baseColor.replace("#", "");
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

      // Create much more dramatic color shifts for visible brush strokes
      const intensity = 100 * variation; // Much higher intensity for visibility
      const rShift = (seededRandom(i) - 0.5) * intensity;
      const gShift = (seededRandom(i + 100) - 0.5) * intensity;
      const bShift = (seededRandom(i + 200) - 0.5) * intensity;

      // Add lightness/darkness variations for depth
      const lightnessShift = (seededRandom(i + 300) - 0.5) * 80 * variation;

      const newR = Math.max(0, Math.min(255, r + rShift + lightnessShift));
      const newG = Math.max(0, Math.min(255, g + gShift + lightnessShift));
      const newB = Math.max(0, Math.min(255, b + bShift + lightnessShift));

      variations.push(`rgb(${Math.floor(newR)}, ${Math.floor(newG)}, ${Math.floor(newB)})`);
    }

    return variations;
  };

  const generateColorFields = (shape: Shape) => {
    const brushIntensity = shape.brushStrokes / 10;
    if (brushIntensity === 0) return [];

    const fields = [];
    const colorVariations = getColorVariations(shape.color, brushIntensity);
    const fieldCount = Math.floor(brushIntensity * 30) + 12; // Many more fields for visible variation

    const seed = shape.id * 789 + shape.brushStrokes * 321;
    const seededRandom = (index: number) => {
      const x = Math.sin(seed + index * 2.345) * 10000;
      return x - Math.floor(x);
    };

    for (let i = 0; i < fieldCount; i++) {
      // Create brush stroke-like fields with varied shapes and sizes
      const strokeType = seededRandom(i + 600);
      
      let x, y, width, height;
      
      if (strokeType < 0.4) {
        // Horizontal brush strokes (most common in Rothko)
        x = seededRandom(i) * 85 + 2;
        y = seededRandom(i + 100) * 90 + 2;
        width = seededRandom(i + 200) * 80 + 20; // Long horizontal strokes
        height = seededRandom(i + 300) * 15 + 3; // Thin vertical
      } else if (strokeType < 0.7) {
        // Vertical brush strokes
        x = seededRandom(i) * 90 + 2;
        y = seededRandom(i + 100) * 85 + 2;
        width = seededRandom(i + 200) * 15 + 3; // Thin horizontal
        height = seededRandom(i + 300) * 80 + 20; // Long vertical strokes
      } else {
        // Irregular blob-like color fields
        x = seededRandom(i) * 85 + 2;
        y = seededRandom(i + 100) * 85 + 2;
        width = seededRandom(i + 200) * 60 + 20;
        height = seededRandom(i + 300) * 60 + 20;
      }
      
      const opacity = (seededRandom(i + 400) * 0.6 + 0.3) * brushIntensity; // Higher base opacity
      const colorIndex = Math.floor(seededRandom(i + 500) * colorVariations.length);

      fields.push({
        x,
        y,
        width,
        height,
        color: colorVariations[colorIndex],
        opacity,
        rx: Math.min(width, height) * 0.3, // More organic rounded corners
        ry: Math.min(width, height) * 0.3,
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
              max="100"
              step="1"
            )
            span {{ shape.x }}%
          
          .control
            label Position Y (%)
            input(
              type="range"
              v-model.number="shape.y"
              min="0"
              max="100"
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
              max="100"
              step="1"
            )
            span {{ shape.width }}%
          
          .control
            label Height (%)
            input(
              type="range"
              v-model.number="shape.height"
              min="5"
              max="100"
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
