/* eslint-disable no-undef */
/* eslint-disable camelcase */
import { PanelPositionTest, CheckPanelPosition } from './TestPanelDestination';
import { DestinationTest } from './TestBlockDestination';
import { TestDisplayNextQues } from './TestLogic';

export const BLOCK = {
  X: 250,
  Y: 140,
};

export const RANGEBLOCK = 150;
let input_Index;
let panelDesEnd;

describe('Check the next position of blocks', () => {
  test('test 1 - when it is placed in expected postion', () => {
    input_Index = 2;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(x).toBe(140 + 150 * 1);
  });

  test('test 1.1 - lower bound - when it is placed in wrong postion', () => {
    input_Index = 0;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x)).toBe(false);
  });

  test('test 1.2 - upper bound - when it is placed in wrong postion', () => {
    input_Index = 5;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x)).toBe(false);
  });

  test('test 1.3 - wrong type of variable - String', () => {
    input_Index = 2;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x.toString())).toBe(false);
  });

  test('test 2 - when it is placed in expected postion', () => {
    input_Index = 3;
    const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (input_Index - 1);
    expect(destinationPosYBlock).toBe(440);
  });

  test('test 2.1 - lower bound - when it is placed in wrong postion', () => {
    input_Index = 0;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x)).toBe(false);
  });

  test('test 2.2 - upper bound - when it is placed in wrong postion', () => {
    input_Index = 5;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK + 1, input_Index);
    expect(TestDisplayNextQues(x)).toBe(false);
  });
});

describe('Check the position of last resutl panel', () => {
  describe('When total number of question is 3', () => {
    beforeEach(() => {
      const subquestionTotalNumber = 3;
      panelDesEnd = PanelPositionTest(RANGEBLOCK, subquestionTotalNumber);
    });
    test('test 1 - expect true', () => {
      expect(CheckPanelPosition(panelDesEnd)).toBe(true);
    });

    test('test 1.1 - expect true', () => {
      expect(panelDesEnd).toBe(430);
    });

    test('test 1.2 - expect false', () => {
      expect(CheckPanelPosition(300)).toBe(false);
    });

    test('test 1.3 - expect false', () => {
      expect(CheckPanelPosition(510)).toBe(false);
    });
  });

  describe('When total number of question is 2', () => {
    beforeEach(() => {
      const subquestionTotalNumber = 2;
      panelDesEnd = PanelPositionTest(RANGEBLOCK, subquestionTotalNumber);
    });
    test('test 1 - expect true', () => {
      expect(CheckPanelPosition(panelDesEnd)).toBe(true);
    });

    test('test 1.1 - expect true', () => {
      expect(panelDesEnd).toBe(280);
    });

    test('test 1.2 - expect false', () => {
      expect(CheckPanelPosition(300)).toBe(false);
    });

    test('test 1.3 - expect false', () => {
      expect(CheckPanelPosition(510)).toBe(false);
    });
  });
});

describe('Check display next question', () => {
  test('test 1 - expect true', () => {
    input_Index = 2;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x)).toBe(true);
  });

  test('test 2 - expect false', () => {
    input_Index = 5;
    const x = DestinationTest(BLOCK.Y, RANGEBLOCK, input_Index);
    expect(TestDisplayNextQues(x)).toBe(false);
  });
});
