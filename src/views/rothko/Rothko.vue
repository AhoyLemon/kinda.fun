<script setup lang="ts">
  import { reactive, computed, ref } from "vue";

  interface UI {
    activeShapeId: number | null;
  }

  interface Shape {
    id: number;
    name: string;
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

  const ui = reactive<UI>({
    activeShapeId: 1,
  });

  // Only one shape's controls open at a time
  const openShapeId = ref<number | null>(1);

  const toggleShapeControls = (id: number) => {
    openShapeId.value = openShapeId.value === id ? null : id;
  };

  const removeShapeWithAnimation = (id: number) => {
    // If the shape being removed is currently open, close it first
    if (openShapeId.value === id) {
      openShapeId.value = null;
    }

    // Remove the shape
    const index = painting.shapes.findIndex((shape) => shape.id === id);
    if (index > -1 && painting.shapes.length > 1) {
      painting.shapes.splice(index, 1);

      // Find the nearest shape to make visible
      const nearestShape = painting.shapes[index] || painting.shapes[index - 1];
      if (nearestShape) {
        openShapeId.value = nearestShape.id;
      }
    }
  };

  const painting = reactive<PaintingConfig>({
    aspectRatio: { width: 7, height: 8 }, // Start with reference painting 1 aspect ratio
    backgroundColor: "#FC772C", // Orange background for first reference
    shapes: [
      {
        id: 1,
        name: "Shape 1",
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
        name: "Shape 2",
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
        name: "Shape 3",
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
    return {
      aspectRatio: `${painting.aspectRatio.width} / ${painting.aspectRatio.height}`,
      backgroundColor: painting.backgroundColor,
    };
  });

  const addShape = () => {
    shapeIdCounter++;
    const rothkoColors = ["#8b4513", "#2f1b69", "#cd853f", "#556b2f", "#800020", "#483d8b"];
    const randomColor = rothkoColors[shapeIdCounter % rothkoColors.length];

    painting.shapes.push({
      id: shapeIdCounter,
      name: `Shape ${shapeIdCounter}`,
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
    const baseVariation = (roughness / 10) * 4; // Increased for more blobby effect
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

<template lang="pug" src="./Rothko.pug"></template>

<style lang="scss" src="./Rothko.scss"></style>
