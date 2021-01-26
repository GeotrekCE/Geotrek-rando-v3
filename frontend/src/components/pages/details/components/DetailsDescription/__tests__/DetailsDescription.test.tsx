import { render } from 'services/testing/reactTestingLibraryWrapper';
import { DetailsDescription } from '../DetailsDescription';
import { checkAndParseToList } from '../../../utils';
describe('DetailsDescription', () => {
  it('should display a well parsed description Element', () => {
    const [, intro, conclusion, steps] = checkAndParseToList(
      "<p>Du parking remonter la vall&eacute;e du S&eacute;l&eacute; par le sentier qui suit la rive gauche du torrent de Celse Ni&egrave;re. Apr&egrave;s une longue mont&eacute;e en faux plat, le sentier remonte des lacets raides jusqu'&agrave; la jonction avec le sentier du refuge du S&eacute;l&eacute; (1993 m).</p>\r\n<ol>\r\n<li>Prendre &agrave; droite le sentier du refuge du Pelvoux qui serpente au milieu des &eacute;boulis et de petites barres rocheuses, puis se poursuit en lacets dans des pentes d'herbe et de rochers peu inclin&eacute;es. Le refuge est invisible jusqu'&agrave; l'arriv&eacute;e mais l'approche est signal&eacute;e par des cairns (tas de pierres).</li>\r\n<li>Emprunter le m&ecirc;me itin&eacute;raire en sens inverse pour le retour.</li>\r\n</ol><br />Et ensuite vous &ecirc;tes arriv&eacute;s ! ;-)<br />Sympa ce petit tour, non ?",
    );
    const detailsDescription = render(
      <DetailsDescription intro={intro} steps={steps} conclusion={conclusion} />,
    );

    expect(detailsDescription).toMatchSnapshot();
  });
});
