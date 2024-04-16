import { act, render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsCard } from '../DetailsCard';
describe('DetailsCard', () => {
  it('should display a well parsed description Element', async () => {
    const propsCard = {
      name: 'Église St Louis',
      id: '2',
      images: [
        {
          url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_1280.jpg',
          author: 'Lorem ipsum',
          legend: 'Lorem ipsum',
        },
      ],
      thumbnails: [
        {
          url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_400.jpg',
          author: 'Lorem ipsum',
          legend: 'Lorem ipsum',
        },
      ],
      iconUri: 'https://geotrekdemo.ecrins-parcnational.fr/media/upload/practice-foot_GpBv9u1.svg',
      iconName: 'Randonnée pédestre',
      description:
        "<span>Pour esp&eacute;rer apercevoir cet oiseau, partir la nuit au printemps, parcourir un grand d&eacute;nivel&eacute; afin d'arriver sur son terrain de pr&eacute;dilection &agrave; plus de 2000 m voire 3000 m d'altitude avant le lever du jour et l&agrave;, entendre le chant guttural&nbsp;caract&eacute;ristique qui trahit sa pr&eacute;sence. Mais pour le voir, il faudra bien ouvrir les yeux ou se munir d'une paire de jumelles. Et alors l&agrave;, quel bonheur&nbsp;! Le lagop&egrave;de alpin est l'esp&egrave;ce arctique par excellence, menac&eacute;e entre autre par le r&eacute;chauffement climatique. Il fait partie des esp&egrave;ces &agrave; prot&eacute;ger dans le c&oelig;ur du Parc national des Ecrins.</span>",
    };
    const detailsDescription = render(<DetailsCard {...propsCard} />);
    const detailsDescriptionWithCarousel = render(
      <DetailsCard
        {...propsCard}
        images={[
          {
            url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_1280.jpg',
            author: 'Lorem ipsum',
            legend: 'Lorem ipsum',
          },
          {
            url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_1280.jpg',
            author: 'Lorem ipsum',
            legend: 'Lorem ipsum',
          },
        ]}
        thumbnails={[
          {
            url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_400.jpg',
            author: 'Lorem ipsum',
            legend: 'Lorem ipsum',
          },
          {
            url: 'https://cdn.pixabay.com/photo/2017/06/29/18/40/background-2455710_400.jpg',
            author: 'Lorem ipsum',
            legend: 'Lorem ipsum',
          },
        ]}
      />,
    );

    expect(detailsDescription).toMatchSnapshot();
    expect(detailsDescriptionWithCarousel).toMatchSnapshot();

    // Useful for avoid a warning with react-inlinesvg package
    const promise = Promise.resolve();
    await act(async () => {
      await promise;
    });
  });
});
