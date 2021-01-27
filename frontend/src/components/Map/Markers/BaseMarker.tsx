/**
 * Empty marker background with no picto in it
 */
export const BaseMarker: React.FC<{ className: string }> = ({ className }) => {
  return <img src="/icons/active-map-marker.svg" className={className} />;
};
