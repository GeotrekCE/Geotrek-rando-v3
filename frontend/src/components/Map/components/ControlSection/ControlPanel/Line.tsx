import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { useIntl } from 'react-intl';
import Check from './Check';
import IconLocation from './IconLocation';

const Wrapper = styled.div<{ active: boolean }>`
  color: ${props => (props.active ? colorPalette.primary1 : colorPalette.greyDarkColored)};

  display: flex;
  align-items: center;
  font-weight: bold;
`;

const IconWrapper = styled.div`
  & svg {
    height: 25px;
    width: 25px;
    margin-right: 10px;
  }
`;

const Text = styled.div`
  flex: auto;
`;

export const Line: React.FC<{ Icon: any; active: boolean; toggle: () => void; transKey: string }> =
  ({ Icon, active, toggle, transKey }) => {
    const intl = useIntl();
    return (
      <Wrapper active={active} onClick={toggle}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <Text>{intl.formatMessage({ id: transKey })}</Text>
        {<Check visibility={active ? 'auto' : 'hidden'} />}
      </Wrapper>
    );
  };
