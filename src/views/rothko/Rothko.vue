<script setup lang="ts">
import { reactive, computed } from 'vue'

interface Shape {
  id: number
  x: number
  y: number
  width: number
  height: number
  color: string
  roughness: number
  blur: number
  brushStrokes: number
}

interface PaintingConfig {
  aspectRatio: { width: number; height: number }
  backgroundColor: string
  shapes: Shape[]
}

const painting = reactive<PaintingConfig>({
  aspectRatio: { width: 1, height: 2 },
  backgroundColor: '#ffffff',
  shapes: [
    {
      id: 1,
      x: 10,
      y: 20,
      width: 80,
      height: 25,
      color: '#d4573b',
      roughness: 3,
      blur: 2,
      brushStrokes: 4
    },
    {
      id: 2,
      x: 10,
      y: 55,
      width: 80,
      height: 25,
      color: '#1a237e',
      roughness: 2,
      blur: 3,
      brushStrokes: 5
    }
  ]
})

let shapeIdCounter = 2

const canvasStyle = computed(() => ({
  aspectRatio: `${painting.aspectRatio.width} / ${painting.aspectRatio.height}`,
  backgroundColor: painting.backgroundColor
}))

const addShape = () => {
  shapeIdCounter++
  painting.shapes.push({
    id: shapeIdCounter,
    x: 10,
    y: 30,
    width: 80,
    height: 20,
    color: '#8bc34a',
    roughness: 3,
    blur: 2,
    brushStrokes: 4
  })
}

const removeShape = (id: number) => {
  const index = painting.shapes.findIndex(shape => shape.id === id)
  if (index > -1 && painting.shapes.length > 1) {
    painting.shapes.splice(index, 1)
  }
}

const getShapeStyle = (shape: Shape) => {
  const roughnessOffset = shape.roughness * 0.5
  const blurAmount = shape.blur * 0.8
  const brushOpacity = Math.max(0.1, 1 - (shape.brushStrokes * 0.08))
  
  return {
    position: 'absolute',
    left: `${shape.x}%`,
    top: `${shape.y}%`,
    width: `${shape.width}%`,
    height: `${shape.height}%`,
    filter: `blur(${blurAmount}px)`,
    opacity: brushOpacity
  }
}

const generateRoughPath = (shape: Shape) => {
  const roughness = shape.roughness
  const w = 100
  const h = 100
  
  if (roughness === 0) {
    return `M 0 0 L ${w} 0 L ${w} ${h} L 0 ${h} Z`
  }
  
  const variation = roughness * 2
  const topLeft = { x: Math.random() * variation, y: Math.random() * variation }
  const topRight = { x: w - Math.random() * variation, y: Math.random() * variation }
  const bottomRight = { x: w - Math.random() * variation, y: h - Math.random() * variation }
  const bottomLeft = { x: Math.random() * variation, y: h - Math.random() * variation }
  
  return `M ${topLeft.x} ${topLeft.y} 
          L ${topRight.x} ${topRight.y} 
          L ${bottomRight.x} ${bottomRight.y} 
          L ${bottomLeft.x} ${bottomLeft.y} Z`
}

const getBrushStrokePattern = (shape: Shape) => {
  if (shape.brushStrokes === 0) return []
  
  const strokes = []
  const intensity = shape.brushStrokes
  const strokeCount = Math.floor(intensity * 2) + 3
  
  for (let i = 0; i < strokeCount; i++) {
    strokes.push({
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      width: Math.random() * 15 + 5,
      height: Math.random() * 8 + 2,
      opacity: (Math.random() * 0.3 + 0.1) * (intensity / 10)
    })
  }
  
  return strokes
}
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
            filter(:id="`roughness-${shape.id}`")
              feTurbulence(
                baseFrequency="0.04"
                numOctaves="3"
                seed="2"
                :stdDeviation="shape.roughness * 0.5"
              )
              feDisplacementMap(
                in="SourceGraphic"
                :scale="shape.roughness * 2"
              )
            
            pattern(
              :id="`brush-pattern-${shape.id}`"
              patternUnits="userSpaceOnUse"
              :width="100"
              :height="100"
            )
              rect(
                width="100"
                height="100"
                :fill="shape.color"
              )
              g(v-if="shape.brushStrokes > 0")
                rect(
                  v-for="stroke in getBrushStrokePattern(shape)"
                  :key="`stroke-${shape.id}-${stroke.x}`"
                  :x="stroke.x"
                  :y="stroke.y"
                  :width="stroke.width"
                  :height="stroke.height"
                  :fill="shape.color"
                  :opacity="stroke.opacity"
                  transform="rotate(45 50 50)"
                )
          
          path(
            :d="generateRoughPath(shape)"
            :fill="`url(#brush-pattern-${shape.id})`"
            :filter="shape.roughness > 0 ? `url(#roughness-${shape.id})` : 'none'"
          )
</template>

<style lang="scss" scoped>
.rothko-generator {
  display: flex;
  gap: 2rem;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
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

      input[type="number"], input[type="color"] {
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
          background: #4CAF50;
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