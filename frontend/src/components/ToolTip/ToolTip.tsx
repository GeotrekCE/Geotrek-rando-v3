import { FunctionComponent } from 'react';
import { ToolTipText, ToolTip } from './ToolTip.style';
import { colorPalette } from 'stylesheet';

interface Props {
  children?: any;
  toolTipText?: string;
  bottom ?: string;
  color ?: string;
  backgroundColor ?: string;
  reverse ?: boolean;
}

const ToolTipGT: FunctionComponent<Props> = ({ children,
                                                toolTipText,
                                                bottom="115%",
                                                color = colorPalette.primary1,
                                                backgroundColor = colorPalette.primary2,
                                                reverse = false }) => (
  <ToolTip>
    {children}
    <ToolTipText style={{bottom}} color={reverse?color:backgroundColor} bgcolor={reverse?backgroundColor:color}>
      {toolTipText}
    </ToolTipText>
  </ToolTip>
);

export default ToolTipGT;
