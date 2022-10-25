import { getGlobalConfig } from 'modules/utils/api.config';
import { useRef } from 'react';
import { useRouter } from 'next/router';
import HCaptcha from '@hcaptcha/react-hcaptcha';

const Captcha = () => {
  const { hCaptchaKey } = getGlobalConfig();
  const captchaRef = useRef(null);
  const { locale } = useRouter();

  if (hCaptchaKey === null) {
    return null;
  }

  return <HCaptcha hl={locale} ref={captchaRef} sitekey={hCaptchaKey} />;
};

export default Captcha;
