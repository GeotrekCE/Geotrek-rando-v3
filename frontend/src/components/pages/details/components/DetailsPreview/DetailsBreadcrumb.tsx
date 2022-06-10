import Link from 'components/Link';
import { generateResultDetailsUrl } from 'components/pages/search/utils';
import React from 'react';
import styled from 'styled-components';
import { colorPalette, MAX_WIDTH_MOBILE } from 'stylesheet';
import { useIntl } from 'react-intl';
import Breadcrumb from './Breadcrumb';

interface DetailsBreadcrumb {
  details: any;
  type: 'TREK' | 'TOURISTIC_CONTENT' | 'OUTDOOR_SITE' | 'OUTDOOR_COURSE' | 'TOURISTIC_EVENT';
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

  const toSearchLink = (type: string) =>
    ({
      TREK: (d: any) =>
        d.practice
          ? {
              label: d.practice.name,
              link: `/search?practices=${d.practice.id as number}`,
            }
          : null,
      OUTDOOR_SITE: (d: any) =>
        d.practice
          ? {
              label: d.practice.name,
              link: `/search?outdoorPractice=${d.practice.id as number}`,
            }
          : null,
      TOURISTIC_CONTENT: (d: any) =>
        d.category
          ? {
              label: d.category.label,
              link: `/search?categories=${d.category.id as number}`,
            }
          : null,
      TOURISTIC_EVENT: (d: any) =>
        d.typeEvent
          ? {
              label: d.typeEvent.type,
              link: `/search?event=${d.typeEvent.id as number}`,
            }
          : null,
      OUTDOOR_COURSE: null,
    }[type]);

  const search = toSearchLink(type);

  const breadcrumb = [
    {
      label: intl.formatMessage({ id: 'header.home' }),
      link: '/',
    },
    search &&
      search(details) && {
        label: search(details)?.label,
        link: search(details)?.link,
      },
    parent && {
      label: parent.name,
      link: generateResultDetailsUrl(parent.id, parent.name),
    },
    {
      label: title,
    },
  ].filter(e => e) as { label: string; link: string }[];

  return <Breadcrumb breadcrumb={breadcrumb} />;
};

export default DetailsBreadcrumb;
