declare module 'rando3d' {
  interface Rando3DSettings {
    IMAGES_FOLDER: string;
    DEM_URL: string;
    PROFILE_URL: string;
    POI_URL: string;
    TILE_TEX_URL: string | null;
    SIDE_TEX_URL: string;
    CAM_SPEED_F: number;
    PICTO_PREFIX: string;
    TREK_COLOR: {
      R: number;
      V: number;
      B: number;
    };
    NO_DESCRIPTION_MESSAGE: string | MessageFormatElement[];
    CAMERA_MESSAGES: {
      bird: string | MessageFormatElement[];
      examine: string | MessageFormatElement[];
      hiker: string | MessageFormatElement[];
    };
    MODE: {
      bird: {
        enabled: boolean;
      };
      hiker: {
        enabled: boolean;
      };
    };
  }
  declare global {
    interface Window {
      Rando3D?: () => {
        init: (
          settings: Rando3DSettings,
          element: HTMLElement | null,
          view: string,
        ) => {
          init: () => void;
          deinit: () => void;
        };
      };
    }
  }
}
