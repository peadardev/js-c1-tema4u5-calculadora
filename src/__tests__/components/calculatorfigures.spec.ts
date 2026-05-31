import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils';
import CalculatorFigures from '@/components/CalculatorFigures.vue';

async function selectFigure(wrapper: VueWrapper, name: string): void {
  const boto = wrapper.find(`[data-test="fig-selector"][data-name=${name}]`);
  await boto.setValue();
}

async function checkCalculation(figName: string, inValues: string[], outValue: string): void {
  //arrange
  const wrapper = mount(CalculatorFigures);
  await selectFigure(wrapper, 'Quadrat');
  const inputFields = wrapper.findAll('[data-test="field-input"]');

  //act
  for (let i = 0; i < inputFields.length; i++) {
    await inputFields[i].setValue(inValues[i]);
  }
  const resultField = wrapper.get('[data-test="field-result"]').text();

  //assert
  expect(resultField).toBe(outValue);
}

describe('CalculatorFigures.vue', () => {
  it('ha de mostrar un sol input quan se selecciona Quadrat', async () => {
    //arrange
    const wrapper = mount(CalculatorFigures);

    //act
    await selectFigure(wrapper, 'Quadrat');
    const inputFields = wrapper.findAll('[data-test="field-input"]');

    //assert
    expect(inputFields).toHaveLength(1);
  });

  it('ha de calcular correctament area del Quadrat, input enter', async () => {
    await checkCalculation('Quadrat', ['4'], '16.00');
  });

  it('ha de calcular correctament area del Quadrat, input float ', async () => {
    await checkCalculation('Quadrat', ['0.5'], '0.25');
  });

  it('ha de calcular correctament area del Quadrat, input 0 ', async () => {
    await checkCalculation('Quadrat', ['0'], '0.00');
  });

  it('ha de mostrar correctament la formula del Quadrat', async () => {
    //arrange
    const wrapper = mount(CalculatorFigures);

    //act
    await selectFigure(wrapper, 'Quadrat');
    const resultLabel = wrapper.get('[data-test="label-result"]').text();

    //assert
    expect(resultLabel).toContain('s x s');
  });
});
