import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { generateResultDetailsUrl } from 'components/pages/search/utils';
import { Details } from 'modules/details/interface';
import { OutdoorCourseDetails } from 'modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { TouristicEventDetails } from 'modules/touristicEvent/interface';
import { ContentType } from 'modules/interface';
import Breadcrumb from './Breadcrumb';

interface DetailsBreadcrumb {
  details:
    | Details
    | TouristicContentDetails
    | OutdoorSiteDetails
    | OutdoorCourseDetails
    | TouristicEventDetails;
  type: ContentType;
  title: string;
  parent?: {
    id: string;
    name: string;
  };
}

/*
Accueil / Recherche type d'objet / Objet / Sous-objet / sous-sous-objet / parcours / étape

search?practices=4&categories=3&themes=5&districts=1&outdoorPractice=3&event=3
*/

const DetailsBreadcrumb: React.FC<DetailsBreadcrumb> = ({ details, title, type, parent }) => {
  const intl = useIntl();

  const getLabelAndLinkByDetails = useMemo(() => {
    let result;
    switch (type) {
      case 'TREK':
        result = ({ practice }: Details) =>
          practice
            ? {
                label: practice.label,
                link: `/search?practices=${practice.id}`,
              }
            : null;
        break;
      case 'OUTDOOR_SITE':
        result = ({ practice }: OutdoorSiteDetails) =>
          practice
            ? {
                label: practice.label,
                link: `/search?outdoorPractice=${practice.id}`,
              }
            : null;
        break;
      case 'TOURISTIC_CONTENT':
        result = ({ category }: TouristicContentDetails) => ({
          label: category.label,
          link: `/search?categories=${category.id}`,
        });
        break;
      case 'TOURISTIC_EVENT':
        result = ({ category }: TouristicEventDetails) => ({
          label: category.label,
          link: `/search?event=${category.id}`,
        });
        break;
      case 'OUTDOOR_COURSE':
      default:
        result = () => null;
    }
    return result as (
      detailsByType: DetailsBreadcrumb['details'],
    ) => { label: string; link: string } | null;
  }, [type]);

  const breadcrumb = [
    {
      label: intl.formatMessage({ id: 'header.home' }),
      link: '/',
    },
    getLabelAndLinkByDetails(details) && {
      label: getLabelAndLinkByDetails(details)?.label,
      link: getLabelAndLinkByDetails(details)?.link,
    },
    parent !== undefined && {
      label: parent.name,
      link: generateResultDetailsUrl(parent.id, parent.name),
    },
    {
      label: title,
    },
  ].filter(Boolean) as { label: string; link: string }[];

  return <Breadcrumb breadcrumb={breadcrumb} />;
};

export default DetailsBreadcrumb;
