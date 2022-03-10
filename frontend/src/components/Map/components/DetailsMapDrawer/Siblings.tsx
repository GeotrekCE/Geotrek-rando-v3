import Link from 'components/Link';
import { generateChildrenDetailsUrl } from 'components/pages/details/utils';
import { TrekFamily } from 'modules/details/interface';
import { useIntl } from 'react-intl';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import ArrowLeft from './ArrowLeft';
import ArrowRight from './ArrowRight';

const Siblings = ({ trekFamily, trekId }: { trekFamily?: TrekFamily | null; trekId?: number }) => {
  const intl = useIntl();

  if (!trekFamily || !trekId || trekFamily.trekChildren.length < 2) {
    return null;
  }

  const index = trekFamily.trekChildren.findIndex(t => Number(t.id) === Number(trekId));
  const prev = index > 0 ? trekFamily.trekChildren[index - 1] : null;
  const next =
    index < trekFamily.trekChildren.length - 1 ? trekFamily.trekChildren[index + 1] : null;

  return (
    <Wrapper>
      <Prev>
        {prev && (
          <Linkk href={generateChildrenDetailsUrl(prev.id, prev.name, trekFamily.parentId)}>
            <ArrowLeft />
            {intl.formatMessage({ id: 'map.drawer.prev' })}
          </Linkk>
        )}
      </Prev>

      <Next>
        {next && (
          <Linkk href={generateChildrenDetailsUrl(next.id, next.name, trekFamily.parentId)}>
            {intl.formatMessage({ id: 'map.drawer.next' })}
            <ArrowRight />
          </Linkk>
        )}
      </Next>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Prev = styled.div`
  margin-right: 20px;
`;
const Next = styled.div`
  margin-left: 20px;
`;
const Linkk = styled(Link)`
  color: ${colorPalette.primary1} !important;
  display: flex;
  align-items: center;

  & > svg {
    margin: 0 10px;
  }
`;
export default Siblings;
