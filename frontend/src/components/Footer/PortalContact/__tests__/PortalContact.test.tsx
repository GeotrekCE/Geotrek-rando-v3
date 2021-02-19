import { render } from 'services/testing/reactTestingLibraryWrapper';

import { PortalContact } from '..';

test('AAU, if I click on the "mailTo" link, Im redirected to the bow mail with the correct address', () => {
  const portalContact = render(
    <PortalContact
      name="Parc National des Écrins"
      addressLine1="Domaine de Charance"
      addressLine2="05000 Gap"
      number="04 92 40 20 10"
      mail="lesecrins@parcnational.com"
    />,
  );
  const mailToLinks = portalContact.getAllByText('Envoyer un email');
  expect(mailToLinks[0]).toHaveAttribute('href', 'mailto:lesecrins@parcnational.com');
});
