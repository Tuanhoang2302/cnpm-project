/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { BLOCK, RANGEBLOCK } from '../src/Scenes/Game1Scene2';


let input_Index;
let panelDesEnd;

describe('Check the next position of blocks', () => {
  test('test 1 - when it is placed in expected postion', () => {
    input_Index = 2;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(140 + 150 * 1);
  });

  test('test 1.1 - when it is placed in wrong postion', () => {
    input_Index = 2;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(230);
  });

  test('test 1.2 - when it is placed in wrong postion', () => {
    input_Index = 2;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(330);
  });

  test('test 2 - when it is placed in expected postion', () => {
    input_Index = 3;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(440);
  });

  test('test 2.1 - when it is placed in wrong postion', () => {
    input_Index = 3;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(130 + 150 * 1);
  });

  test('test 2.2 - when it is placed in wrong postion', () => {
    input_Index = 3;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(140 + 150 * 3);
  });
});

describe('Check the position of last resutl panel', () => {
  describe('When total number of question is 3', () => {
    beforeEach(() => {
      const subquestionTotalNumber = 3;
      panelDesEnd = (RANGEBLOCK - 20) * (subquestionTotalNumber - 1 + 1)
                        + 20 * (subquestionTotalNumber - 1);
    });
    test('test 1 - expect true', () => {
      expect(panelDesEnd).toBe((150 - 20) * 3 + 20 * (3 - 1));
    });

    test('test 1.1 - expect true', () => {
      expect(panelDesEnd).toBe(430);
    });

    test('test 1.2 - expect false', () => {
      expect(panelDesEnd).toBe(500);
    });

    test('test 1.3 - expect false', () => {
      expect(panelDesEnd).toBe(150 * 3 + 20 * (3 - 1));
    });
  });

  describe('When total number of question is 2', () => {
    beforeEach(() => {
      const subquestionTotalNumber = 2;
      panelDesEnd = (RANGEBLOCK - 20) * (subquestionTotalNumber - 1 + 1)
                        + 20 * (subquestionTotalNumber - 1);
    });
    test('test 1 - expect true', () => {
      expect(panelDesEnd).toBe((150 - 20) * 2 + 20 * (2 - 1));
    });

    test('test 1.1 - expect true', () => {
      expect(panelDesEnd).toBe(280);
    });

    test('test 1.2 - expect false', () => {
      expect(panelDesEnd).toBe(300);
    });

    test('test 1.3 - expect false', () => {
      expect(panelDesEnd).toBe(150 * 2 + 20 * (2 - 1));
    });
  });
});
