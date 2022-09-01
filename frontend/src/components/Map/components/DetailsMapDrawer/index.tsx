import { TrekFamily } from 'modules/details/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { getMapConfig } from 'components/Map/config';
import { AltimetricProfile } from '../AltimetricProfile';
import Siblings from './Siblings';

const Wrapper = styled.div<{ open: boolean }>`
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 1500;

  transform: translateY(${props => (props.open ? 0 : 'calc(100% - 45px)')});
  transition: transform 0.25s;

  width: 100vw;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Puller = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
`;

const Content = styled.div`
  padding: 0 10px 1rem;
`;

const Separator = styled.div`
  border: 2px solid #d7d6d9;
  width: 32px;
  border-radius: 10px;
  margin-top: 6px;
`;

const Title = styled.div`
  color: ${colorPalette.primary1};
  font-size: 16px;
  font-weight: bold;
  justify-self: stretch;
  margin-bottom: 6px;
  margin-top: 4px;
  max-width: 90%;
`;

const DetailsMapDrawer: React.FC<{
  title: string;
  trekGeoJSON?: string;
  trekFamily?: TrekFamily | null;
  trekId?: number;
}> = ({ title, trekGeoJSON, trekFamily, trekId }) => {
  const { mobileMapPanelDefaultOpened } = getMapConfig();

  const [open, setOpen] = useState<boolean>(mobileMapPanelDefaultOpened);

  if (
    Boolean(trekGeoJSON) === false &&
    (!trekFamily || trekId === null || trekFamily.trekChildren.length < 2)
  ) {
    return null;
  }

  return (
    <Wrapper open={open}>
      <Puller
        onClick={e => {
          if (e.isTrusted) {
            setOpen(!open);
          }
        }}
      >
        <Separator />
        <Title>{title}</Title>
      </Puller>
      <Content>
        <Siblings trekFamily={trekFamily} trekId={trekId} />
        {typeof trekGeoJSON === 'string' && (
          <>
            <AltimetricProfile id="altimetric-profile-map" trekGeoJSON={trekGeoJSON} />
            <div className="h-90" id="altimetric-profile-map"></div>
          </>
        )}
      </Content>
    </Wrapper>
  );
};

export default DetailsMapDrawer;
