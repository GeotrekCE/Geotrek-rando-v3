import Link from 'components/Link';
import { Details } from 'modules/details/interface';
import { OutdoorCourseDetails } from 'modules/outdoorCourse/interface';
import { OutdoorSiteDetails } from 'modules/outdoorSite/interface';
import { TouristicContentDetails } from 'modules/touristicContent/interface';
import { TouristicEventDetails } from 'modules/touristicEvent/interface';
import React from 'react';
import styled from 'styled-components';
import { colorPalette, MAX_WIDTH_MOBILE } from 'stylesheet';
import { generateResultDetailsUrl } from 'components/pages/search/utils';

const BreadcrumbElem = styled.div`
  display: flex;
`;
const StyledLink = styled(Link)`
  display: flex;
  color: ${colorPalette.primary1};

  &:hover {
    text-decoration: underline;
  }
`;

const Wrapper = styled.div`
  display: flex;

  margin-bottom: 1rem;
  margin-top: 0.5rem;

  @media (min-width: ${MAX_WIDTH_MOBILE}px) {
    margin-bottom: 4rem;
    margin-top: 2rem;
  }
`;

const Separator = styled.div`
  margin: 0 0.5rem;
`;

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
      label: 'Accueil',
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

  return (
    <Wrapper>
      {breadcrumb.map(({ label, link }, i) => {
        const separator = i === 0 ? '>>' : '>';
        return link ? (
          <StyledLink href={link} className="underline">
            <Separator>{separator}</Separator>
            {label}
          </StyledLink>
        ) : (
          <BreadcrumbElem>
            <Separator>{separator}</Separator>
            {label}
          </BreadcrumbElem>
        );
      })}
    </Wrapper>
  );
};

export default DetailsBreadcrumb;
