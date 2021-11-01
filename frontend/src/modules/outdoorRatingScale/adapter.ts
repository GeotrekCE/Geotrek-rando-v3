import { OutdoorRatingScale, RawOutdoorRatingScale } from './interface';

export const adaptOutdoorRatingScale = ({
  rawOutdoorRatingScale,
}: {
  rawOutdoorRatingScale: RawOutdoorRatingScale[];
}): OutdoorRatingScale[] => rawOutdoorRatingScale.map(item => item);
