import { FC } from 'react';
import { colorPalette } from 'stylesheet';
import { ToolTip, ToolTipText } from './ToolTip.style';

interface Props {
  children?: any;
  toolTipText?: string;
  color?: string;
  backgroundColor?: string;
  invertPosition?: boolean;
  role?: string;
  id?: string;
}

const ToolTipGT: FC<Props> = ({
  children,
  toolTipText,
  color = colorPalette.primary1,
  backgroundColor = colorPalette.primary2,
  invertPosition = false,
  role = 'tooltip',
  id = `tooltip-${Math.random().toString(36).substring(2, 9)}`,
}) => (
  <ToolTip role={role} aria-describedby={id}>
    {children}
    <ToolTipText
      invertPosition={invertPosition}
      color={color}
      bgcolor={backgroundColor}
      id={id}
      className="tooltipSpan"
    >
      {toolTipText}
    </ToolTipText>
  </ToolTip>
);

export default ToolTipGT;
