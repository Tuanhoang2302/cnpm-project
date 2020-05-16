/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
export function TestDisplayNextQues(x) {
  const PosChange = [290, 440, 590];
  for (let i = 0; i < 3; i++) {
    if (x === PosChange[i]) {
      return true;
    }
  }
  return false;
}
