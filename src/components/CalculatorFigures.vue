<script setup lang="ts">
import { ref } from 'vue';
import { Figure, Square, Rectangle, Circle, Triangle } from '@/components/figures.ts';
const figures: Figure[] = [new Square(), new Rectangle(), new Circle(), new Triangle()];
const currentFigure = ref<Figure>(figures[0]!);
</script>

<template>
  <body>
    <div id="calcHeader" class="calc-header">
      <h2>Calculadora</h2>
      <p>Calcula àrees de figures geomètriques</p>
    </div>

    <div id="appCalculator" class="app-calculator">
      <div id="figureChooser" class="figure-chooser">
        <p class="text-section">Selecciona una figura:</p>
        <div class="buttons">
          <label
            v-for="figure of figures"
            :key="figure.name"
            class="radio-button"
            :class="{ active: currentFigure.name === figure.name }"
          >
            <input
              data-test="fig-selector"
              :data-name="figure.name"
              type="radio"
              :value="figure"
              v-model="currentFigure"
            />{{ figure.name }}
          </label>
        </div>
      </div>

      <div id="figureSizes" class="figure-sizes">
        <p class="text-section">Introdueix les mides:</p>
        <span class="dimension-fields">
          <div v-for="[key, dim] of Object.entries(currentFigure.dimensions)" :key="key">
            <label class="field-label">{{ dim.name }} ({{ key }}): </label>
            <input
              data-test="field-input"
              class="field-input"
              type="number"
              v-model="dim.value"
              min="0"
            />
          </div>
        </span>
      </div>

      <div id="figureResult" class="figure-result">
        <p data-test="label-result" class="resultat-text">
          Àrea <strong>{{ currentFigure.name }} = {{ currentFigure.formula }}</strong> =
          {{ currentFigure.getFormulaNum() }}
        </p>
        <div data-test="field-result" class="resultat-valor">
          {{ currentFigure.computeArea().toFixed(2) }}
        </div>
        <p class="resultat-text">unitats quadrades</p>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  border: 1px solid gray;
  background-color: #f0f0ef;
  color: black;
  font-family: Arial, sans-serif;
  font-size: 14px;
  padding: 0px;
  margin: 20px;
  border-radius: 7px;
  max-width: 600px;
  min-width: 400px;
}

.calc-header {
  border: 0px solid gray;
  background-color: rgb(1, 1, 83);
  color: lightyellow;
  font-size: 14px;
  padding: 1px;
  margin: 2px;
  border-radius: 7px;
  text-align: center;
}

.app-calculator {
  border: 1px solid gray;
  background-color: white;
  color: black;
  font-size: 16px;
  padding: 10px;
  margin: 2px;
  border-radius: 7px;
}

.figure-chooser {
  border: 1px solid gray;
  background-color: white;
  color: black;
  font-size: 16px;
  padding: 10px;
  margin: 1px;
  border-radius: 7px;
}

.figure-sizes {
  border: 1px solid gray;
  background-color: white;
  color: black;
  font-size: 16px;
  padding: 10px;
  margin: 1px;
  border-radius: 7px;
}

.figure-result {
  border: 0px solid gray;
  background-color: lightgray;
  color: black;
  font-size: 16px;
  padding: 1px;
  margin: 1px;
  border-radius: 7px;
  text-align: center;
}

.text-section {
  font-size: 14px;
  font-style: italic;
  padding: 0px;
  margin: 0px;
  margin-bottom: 20px;
}

.dimension-fields {
  display: flex;
  gap: 20px;
}

.field-label {
  font-size: 14px;
  font-weight: bold;
}

.field-input {
  width: 100%;
  max-width: 80px;
}

.resultat-valor {
  font-weight: bold;
  font-size: 20px;
}

.resultat-text {
  font-size: 14px;
  font-style: italic;
  color: black;
}

.buttons {
  display: flex;
  gap: 5px;
}

.radio-button {
  padding: 10px 20px;
  background: lightgray;
  border-radius: 8px;
  cursor: pointer;
  user-select: none;
  transition: 0.2s;
}

.radio-button.active {
  background: steelblue;
  color: white;
}

.radio-button input {
  display: none;
}
</style>
