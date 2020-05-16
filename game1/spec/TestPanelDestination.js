/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
export function PanelPositionTest(RANGEBLOCK, subquestionTotalNumber) {
  const panelDesEnd = (RANGEBLOCK - 20) * (subquestionTotalNumber - 1 + 1)
                            + 20 * (subquestionTotalNumber - 1);
  return panelDesEnd;
}

export function CheckPanelPosition(x) {
  const PosChange = [430, 280];
  for (let i = 0; i < 2; i++) {
    if (x === PosChange[i]) {
      return true;
    }
  }
  return false;
}
