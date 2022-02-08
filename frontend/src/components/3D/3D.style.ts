import styled from 'styled-components';
import { colorPalette } from 'stylesheet';

export const Wrapper = styled.div`
  width: 90vw;
  height: 90vh;
  background-color: ${colorPalette.greyDarkColored};
  background-image: url(/images/3d/background.jpg);
  background-size: 100% 100%;
`;
export const Control = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0 0 0.35em 0.35em;
`;

export const Camera = styled.ul`
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 0.35em 0 0 0.35em;
`;

export const CameraItem = styled.li`
  border-left: 1px solid transparent;
  border-bottom: solid 1px rgba(255, 255, 255, 0.2);
  &.camera--disabled {
    cursor: default;
    opacity: 0.4;
  }
  &.camera--selected {
    cursor: auto;
    border-left-color: white;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const LoaderOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
`;

export const PoiSide = styled.div`
  background-color: rgba(20, 20, 20, 0.8);
  top: 0;
  left: -100%;
  width: 24rem;
  height: 100%;
  transition: left 0.3s ease-out;
  &.opened {
    left: 0;
  }
`;

export const Poi = styled.div`
  background-color: rgba(255, 255, 255, 0.2);
  position: absolute;
  width: auto;
  height: auto;
  padding: 2px;
  border-radius: 0.35em;
  text-align: center;
  display: none;
`;
