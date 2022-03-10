import { TrekFamily } from 'modules/details/interface';
import { useState } from 'react';
import styled from 'styled-components';
import { colorPalette } from 'stylesheet';
import { AltimetricProfile } from '../AltimetricProfile';
import Siblings from './Siblings';

const Wrapper = styled.div<{ open: boolean }>`
  background: white;
  position: absolute;
  bottom: 0;
  z-index: 1500;

  transform: translateY(${props => (props.open ? 0 : 'calc(100% - 65px)')});
  transition: transform 0.25s;

  width: 100vw;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
`;

const Puller = styled.div`
  height: 65px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: space-around;
`;

const Content = styled.div`
  height: 270px;
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
  margin-top: 12px;
`;

const DetailsMapDrawer: React.FC<{
  title: string;
  trekGeoJSON?: string;
  trekFamily?: TrekFamily | null;
  trekId?: number;
}> = ({ title, trekGeoJSON, trekFamily, trekId }) => {
  const [open, setOpen] = useState(false);
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
        {trekGeoJSON && <AltimetricProfile id="altimetric-profile-map" trekGeoJSON={trekGeoJSON} />}
        <div className="h-90" id="altimetric-profile-map"></div>
      </Content>
    </Wrapper>
  );
};

export default DetailsMapDrawer;
