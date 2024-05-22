import Image from 'next/image';
import { MessageFormatElement, useIntl } from 'react-intl';

const getControls = (t: Record<string, string> | Record<string, MessageFormatElement[]>) => [
  {
    control: 'examine',
    title: t['rando3D.views.examine.title'],
    steps: [
      {
        label: t['rando3D.instructions.zoom'],
        action: t['rando3D.actions.scrollMouse'],
      },
      {
        label: t['rando3D.instructions.lookAround'],
        action: t['rando3D.actions.leftClick'],
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
        action: t['rando3D.actions.scrollMouse'],
      },
      {
        label: t['rando3D.instructions.lookAround'],
        action: t['rando3D.actions.leftClick'],
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
        action: t['rando3D.actions.leftClick'],
      },
      {
        label: t['rando3D.instructions.playPause'],
        action: t['rando3D.actions.space'],
      },
      {
        label: t['rando3D.instructions.stop'],
        action: t['rando3D.actions.enter'],
      },
    ],
    cameraTitle: t['rando3D.views.hiker.cameraTitle'],
  },
];

const Interface = () => {
  const { messages } = useIntl();
  const controls = getControls(messages);
  return (
    <section className="interface absolute inset-0 pointer-events-none z-10">
      {controls.map(({ control, title, steps }) => (
        <div
          key={control}
          className={`controls controls--${control} absolute top-0 right-0 w-70 p-4 hidden bg-white/20 rounded-bl-lg`}
        >
          <h2 className="text-2xl mb-2">{title.toString()}</h2>
          <p className="controls-description mb-2" />
          {steps.map(({ label, action }, index) => (
            <span key={index} className="flex items-center m-1">
              <>
                <span className="mr-1">{label.toString()}</span>
                <strong className="font-bold">
                  {Array.isArray(action) ? action.toString() : action}
                </strong>
              </>
            </span>
          ))}
        </div>
      ))}

      <ul className="camera_switcher absolute hidden top-90 right-0 w-15 pointer-events-auto bg-white/20 rounded-l-lg">
        {controls.map(({ control, cameraTitle }) => (
          <li
            key={control}
            className={`camera camera--${control} camera--disabled text-center cursor-pointer border-l border-l-transparent border-solid border-b border-b-white/20 last:border-b-0 peer-[.camera--selected]:text-black`}
          >
            <button type="button" className="block">
              <Image width={60} height={60} src={`/images/3d/camera-${control}.svg`} alt="" />
              <span className="block">{cameraTitle.toString()}</span>
              <span className="camera-description absolute invisible" />
            </button>
          </li>
        ))}
      </ul>

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
