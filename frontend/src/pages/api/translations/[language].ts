import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { flattenMessages } from '../../../services/i18n/intl';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { language } = req.query;

  const messages = JSON.parse(
    fs.readFileSync(`./src/translations/${String(language)}.json`).toString(),
  );

  const path = `./customization/translations/${String(language)}.json`;
  let customMessages = {};
  if (fs.existsSync(path)) {
    customMessages = JSON.parse(fs.readFileSync(path).toString());
  }

  res.status(200).json({
    ...flattenMessages(messages),
    ...flattenMessages(customMessages),
  });
};
