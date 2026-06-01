import { describe, it, expect } from 'vitest';

import { mount, VueWrapper } from '@vue/test-utils';
import CalculatorFigures from '@/components/CalculatorFigures.vue';

async function selectFigure(wrapper: VueWrapper, name: string): Promise<void> {
  const boto = wrapper.find(`[data-test="fig-selector"][data-name=${name}]`);
  await boto.setValue();
}

async function checkNumInputFields(figName: string, numInput: number) {
  it(`ha de mostrar ${numInput} input/s quan se selecciona ${figName}`, async () => {
    //arrange
    const wrapper = mount(CalculatorFigures);

    //act
    await selectFigure(wrapper, figName);
    const inputFields = wrapper.findAll('[data-test="field-input"]');

    //assert
    expect(inputFields).toHaveLength(numInput);
  });
}

async function checkCalculation(figName: string, inValues: string[], outValue: string) {
  it(`ha de calcular correctament area de ${figName}`, async () => {
    //arrange
    const wrapper = mount(CalculatorFigures);
    await selectFigure(wrapper, figName);
    const inputFields = wrapper.findAll('[data-test="field-input"]');

    //act
    for (let i = 0; i < inputFields.length; i++) {
      await inputFields[i].setValue(inValues[i]);
    }
    const resultField = wrapper.get('[data-test="field-result"]').text();

    //assert
    expect(resultField).toBe(outValue);
  });
}

async function checkFormulaOfArea(figName: string, formula: string) {
  it(`ha de mostrar correctament la formula de ${figName}`, async () => {
    //arrange
    const wrapper = mount(CalculatorFigures);

    //act
    await selectFigure(wrapper, figName);
    const resultLabel = wrapper.get('[data-test="label-result"]').text();

    //assert
    expect(resultLabel).toContain(formula);
  });
}

describe('CalculatorFigures.vue', () => {
  checkNumInputFields('Quadrat', 1);
  checkCalculation('Quadrat', ['4'], '16.00');
  checkCalculation('Quadrat', ['0.5'], '0.25');
  checkCalculation('Quadrat', ['0'], '0.00');
  checkFormulaOfArea('Quadrat', 's x s');

  checkNumInputFields('Rectangle', 2);
  checkCalculation('Rectangle', ['4', '2'], '8.00');
  checkCalculation('Rectangle', ['2', '4'], '8.00');
  checkCalculation('Rectangle', ['0.5', '0.8'], '0.40');
  checkCalculation('Rectangle', ['0', '0'], '0.00');
  checkFormulaOfArea('Rectangle', 'b x h');

  checkNumInputFields('Cercle', 1);
  checkCalculation('Cercle', ['5'], '78.54');
  checkCalculation('Cercle', ['0.5'], '0.79');
  checkCalculation('Cercle', ['0'], '0.00');
  checkFormulaOfArea('Cercle', 'pi x r^2');

  checkNumInputFields('Triangle', 2);
  checkCalculation('Triangle', ['5', '2'], '5.00');
  checkCalculation('Triangle', ['2', '5'], '5.00');
  checkCalculation('Triangle', ['0.5', '0.8'], '0.20');
  checkCalculation('Triangle', ['0', '0'], '0.00');
  checkFormulaOfArea('Triangle', '(b x h) / 2');
});
