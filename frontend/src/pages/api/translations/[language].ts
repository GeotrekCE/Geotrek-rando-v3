import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import { flattenMessages } from '../../../services/i18n/intl';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { language } = req.query;

  const messages = JSON.parse(
    fs.readFileSync(`./src/translations/${String(language)}.json`).toString(),
  );

  const customMessages = JSON.parse(
    fs.readFileSync(`./customization/translations/${String(language)}.json`).toString(),
  );

  res.status(200).json({
    ...flattenMessages(messages),
    ...flattenMessages(customMessages),
  });
};
