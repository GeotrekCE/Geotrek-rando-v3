import { LABEL_EXCLUDE_ID, LABEL_ID } from 'modules/filters/constant';
import { FilterWithoutType } from 'modules/filters/interface';
import { Label, LabelDictionnary, RawLabel } from './interface';

const adaptLabel = (rawLabel: RawLabel): Label => ({
  id: rawLabel.id,
  name: rawLabel.name,
  advice: rawLabel.advice,
  pictogramUri: rawLabel.pictogram,
  filter: rawLabel.filter,
});

export const adaptLabels = (rawLabels: RawLabel[]): LabelDictionnary =>
  Object.fromEntries(rawLabels.map(label => [label.id, adaptLabel(label)]));

export const adaptLabelsFilter = (
  rawLabels: RawLabel[],
  withExclude: boolean,
): FilterWithoutType => ({
  id: withExclude ? LABEL_EXCLUDE_ID : LABEL_ID,
  options: rawLabels.map(rawLabel => ({
    value: `${rawLabel.id}`,
    label: rawLabel.name,
    pictogramUrl: rawLabel.pictogram ?? undefined,
  })),
});
