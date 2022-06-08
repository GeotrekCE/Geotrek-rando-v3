import { FC } from 'react';
import { colorPalette } from 'stylesheet';
import { ToolTip, ToolTipText } from './ToolTip.style';

interface Props {
  children?: any;
  toolTipText?: string;
  color?: string;
  backgroundColor?: string;
  invertPosition: boolean;
  role?: string;
  id?: string;
}

const ToolTipGT: FC<Props> = ({
  children,
  toolTipText,
  color = colorPalette.primary1,
  backgroundColor = colorPalette.primary2,
  invertPosition,
  role = 'tooltip',
  id,
}) => (
  <>
    {id !== undefined && (
      <ToolTip role={role} id={id}>
        {children}
        <ToolTipText
          invertPosition={invertPosition}
          color={color}
          bgcolor={backgroundColor}
          aria-describedby={id}
          className="tooltipSpan"
        >
          {toolTipText}
        </ToolTipText>
      </ToolTip>
    )}
    {id === undefined && (
      <ToolTip role={role}>
        {children}
        <ToolTipText
          invertPosition={invertPosition}
          color={color}
          bgcolor={backgroundColor}
          className="tooltipSpan"
        >
          {toolTipText}
        </ToolTipText>
      </ToolTip>
    )}
  </>
);

export default ToolTipGT;
