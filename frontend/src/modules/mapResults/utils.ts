export const formatLocation = (rawLocation: number[] | null): { x: number; y: number } | null =>
  rawLocation === null
    ? null
    : {
        x: rawLocation[0],
        y: rawLocation[1],
      };
