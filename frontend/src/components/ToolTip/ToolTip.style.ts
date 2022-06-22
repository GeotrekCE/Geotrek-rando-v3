import styled from 'styled-components';

export const ToolTipText = styled.span<{ color: string; bgcolor: string; invertPosition: boolean }>`
  background-color: ${props => props.color};
  color: ${props => props.bgcolor};
  visibility: hidden;
  width: 120px;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  top: ${props => (props.invertPosition ? '130%' : '-50%')};
  left: 50%;
  margin-left: -60px;
  &:after {
    content: '';
    position: absolute;
    bottom: ${props => (props.invertPosition ? '100%' : '-30%')};
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: ${props =>
      props.invertPosition
        ? `transparent transparent ${props.color} transparent`
        : `${props.color} transparent transparent transparent`};

`;

export const ToolTip = styled('div')({
  position: 'relative',
  display: 'inline-block',
  ':hover > .tooltipSpan:last-of-type': {
    visibility: 'visible',
  },
});
