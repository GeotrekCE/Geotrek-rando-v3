import { Label, LabelDictionnary, RawLabel } from './interface';

const adaptLabel = (rawLabel: RawLabel): Label => ({
  id: rawLabel.id,
  name: rawLabel.name,
  advice: rawLabel.advice,
  pictogramUri: rawLabel.pictogram,
});

export const adaptLabels = (rawLabels: RawLabel[]): LabelDictionnary =>
  rawLabels.reduce(
    (Labels, currentLabel) => ({
      ...Labels,
      [`${currentLabel.id}`]: adaptLabel(currentLabel),
    }),
    {},
  );
