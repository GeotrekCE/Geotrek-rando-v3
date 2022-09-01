import Image from 'next/image';
import { MessageFormatElement, useIntl } from 'react-intl';
import { Camera, CameraItem, Control } from './3D.style';

const getControls = (t: Record<string, string> | Record<string, MessageFormatElement[]>) => [
  {
    control: 'examine',
    title: t['rando3D.views.examine.title'],
    steps: [
      {
        label: t['rando3D.instructions.zoom'],
        action: <strong>{t['rando3D.actions.scrollMouse']}</strong>,
      },
      {
        label: t['rando3D.instructions.lookAround'],
        action: <strong>{t['rando3D.actions.leftClick']}</strong>,
      },
      {
        label: t['rando3D.instructions.moveAround'],
        action: <Image width={50} height={33} src="/images/3d/icon_783__.png" alt="" />,
      },
    ],
    cameraTitle: t['rando3D.views.examine.cameraTitle'],
  },
  {
    control: 'bird',
    title: t['rando3D.views.bird.title'],
    steps: [
      {
        label: t['rando3D.instructions.zoom'],
        action: <strong>{t['rando3D.actions.scrollMouse']}</strong>,
      },
      {
        label: t['rando3D.instructions.lookAround'],
        action: <strong>{t['rando3D.actions.leftClick']}</strong>,
      },
      {
        label: t['rando3D.instructions.moveAround'],
        action: <Image width={50} height={33} src="/images/3d/icon_783__.png" alt="" />,
      },
    ],
    cameraTitle: t['rando3D.views.bird.cameraTitle'],
  },
  {
    control: 'hiker',
    title: t['rando3D.views.hiker.title'],
    steps: [
      {
        label: t['rando3D.instructions.lookAround'],
        action: <strong>{t['rando3D.actions.leftClick']}</strong>,
      },
      {
        label: t['rando3D.instructions.playPause'],
        action: <strong>{t['rando3D.actions.space']}</strong>,
      },
      {
        label: t['rando3D.instructions.stop'],
        action: <strong>{t['rando3D.actions.enter']}</strong>,
      },
    ],
    cameraTitle: t['rando3D.views.examine.hiker'],
  },
];

const Interface: React.FC = () => {
  const { messages } = useIntl();
  const controls = getControls(messages);
  return (
    <section className="interface absolute inset-0 pointer-events-none z-10">
      {controls.map(({ control, title, steps }) => (
        <Control
          key={control}
          className={`controls controls--${control} absolute top-0 right-0 w-70 p-4 hidden`}
        >
          <h2 className="text-2xl mb-2">{title}</h2>
          <p className="controls-description mb-2" />
          {steps.map(({ label, action }, index) => (
            <span key={index} className="block m-1">
              {label} <span className="font-bold">{action}</span>
            </span>
          ))}
        </Control>
      ))}

      <Camera className="camera_switcher absolute hidden top-90 right-0 w-15 pointer-events-auto">
        {controls.map(({ control, cameraTitle }) => (
          <CameraItem
            key={control}
            className={`camera camera--${control} camera--disabled text-center cursor-pointer`}
          >
            <button type="button" className="block">
              <Image width="100%" height="100%" src={`/images/3d/camera-${control}.svg`} alt="" />
              <span className="block">{cameraTitle}</span>
              <span className="camera-description absolute invisible" />
            </button>
          </CameraItem>
        ))}
      </Camera>

      <div className="absolute bottom-1 left-2 block pointer-events-auto">
        <a
          className="geotrek_link"
          href="https://makina-corpus.com/"
          target="_blank"
          rel="noreferrer"
        >
          <Image
            width={80}
            height={80}
            src="/images/3d/logo-makina-corpus.svg"
            alt="Makina Corpus"
          />
        </a>
      </div>

      <strong className="absolute bottom-1 right-2">©IGN</strong>
    </section>
  );
};

export default Interface;
