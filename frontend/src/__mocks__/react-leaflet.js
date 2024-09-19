const MapContainer = ({ children }) => <div data-testid="MapContainer">{children}</div>;

const useMap = () => ({ fitBounds: () => {} });

const TileLayer = () => <div data-testid="TileLayer" />;

const Marker = ({ children }) => <div data-testid="Marker">{children}</div>;

const Popup = () => <div data-testid="Popup" />;

export { MapContainer, TileLayer, Marker, Popup, useMap };
