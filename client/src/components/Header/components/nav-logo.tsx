import React from 'react';
import { useTranslation } from 'react-i18next';
import Icon from '../../../assets/icons/FreeCodeCamp-logo';

const NavLogo = (): JSX.Element => {
  const { t } = useTranslation();
  return <Icon aria-label={t('aria.fcc-curriculum')} />;
};

NavLogo.displayName = 'NavLogo';
export default NavLogo;
