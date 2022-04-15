import React from 'react';
import ResetViewControl from '@20tab/react-leaflet-resetview';
import { ControlPosition } from 'leaflet';
import { useIntl } from 'react-intl';

interface ResetViewControlProps {
  icon?: string;
  position?: ControlPosition;
  title?: string;
}

export const ResetView: React.FC<ResetViewControlProps> = ({
  position = 'topleft',
  icon = 'url(/icons/icon-resetview.png)',
  title,
}) => {
  const intl = useIntl();

  return (
    <ResetViewControl
      icon={icon}
      position={position}
      title={title ?? intl.formatMessage({ id: 'search.map.resetView' })}
    />
  );
};
