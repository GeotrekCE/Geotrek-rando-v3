import { CityDictionnary } from 'modules/city/interface';
import { Choices } from 'modules/filters/interface';
import { InformationDeskDictionnary } from 'modules/informationDesk/interface';
import { LabelDictionnary } from 'modules/label/interface';
import { SourceDictionnary } from 'modules/source/interface';

export type CommonDictionaries = {
  themes: Choices;
  cities: CityDictionnary;
  sources: SourceDictionnary;
  informationDesk: InformationDeskDictionnary;
  labels: LabelDictionnary;
};
