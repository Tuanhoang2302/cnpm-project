/* eslint-disable no-plusplus */
/* eslint-disable import/prefer-default-export */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
export function DestinationTest(BLOCKY, RANGEBLOCK, input_Index) {
  const destinationPosYBlock = BLOCKY + RANGEBLOCK * (input_Index - 1);
  return destinationPosYBlock;
}
