import { FC } from 'react';
import { colorPalette } from 'stylesheet';
import { ToolTip, ToolTipText } from './ToolTip.style';

interface Props {
  children?: any;
  toolTipText?: string;
  color?: string;
  backgroundColor?: string;
  reverse: boolean;
  role?: string;
  id?: string;
}

const ToolTipGT: FC<Props> = ({
  children,
  toolTipText,
  color = colorPalette.primary1,
  backgroundColor = colorPalette.primary2,
  reverse,
  role = 'tooltip',
  id,
}) => (
  <>
    {id !== undefined && (
      <ToolTip role={role} id={id}>
        {children}
        <ToolTipText
          reverse={reverse}
          color={color}
          bgcolor={backgroundColor}
          aria-describedby={id}
        >
          {toolTipText}
        </ToolTipText>
      </ToolTip>
    )}
    {id === undefined && (
      <ToolTip role={role}>
        {children}
        <ToolTipText reverse={reverse} color={color} bgcolor={backgroundColor}>
          {toolTipText}
        </ToolTipText>
      </ToolTip>
    )}
  </>
);

export default ToolTipGT;
