import { OutdoorPractice, RawOutdoorPractice } from './interface';

export const adaptOutdoorPractices = ({
  rawOutdoorPractices,
}: {
  rawOutdoorPractices: RawOutdoorPractice[];
}): OutdoorPractice[] =>
  rawOutdoorPractices.map(rawOutdoorPractice => ({
    id: rawOutdoorPractice.id,
    name: rawOutdoorPractice.name,
    sector: rawOutdoorPractice.sector,
  }));
