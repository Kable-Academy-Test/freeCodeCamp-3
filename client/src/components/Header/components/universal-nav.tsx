import Loadable from '@loadable/component';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Media from 'react-responsive';
import { isLanding } from '../../../utils/path-parsers';
import { Link, SkeletonSprite } from '../../helpers';
import { User } from '../../../redux/prop-types';
import MenuButton from './menu-button';
import NavLinks from './nav-links';
import NavLogo from './nav-logo';
import './universal-nav.css';
import AuthOrProfile from './auth-or-profile';

const SearchBar = Loadable(() => import('../../search/searchBar/search-bar'));
const SearchBarOptimized = Loadable(
  () => import('../../search/searchBar/search-bar-optimized')
);

const MAX_MOBILE_WIDTH = 980;

interface UniversalNavProps {
  displayMenu: boolean;
  isLanguageMenuDisplayed: boolean;
  fetchState: { pending: boolean };
  menuButtonRef: React.RefObject<HTMLButtonElement>;
  searchBarRef?: React.RefObject<HTMLDivElement>;
  showMenu: () => void;
  hideMenu: () => void;
  showLanguageMenu: (elementToFocus: HTMLButtonElement) => void;
  hideLanguageMenu: () => void;
  user?: User;
}
export const UniversalNav = ({
  displayMenu,
  isLanguageMenuDisplayed,
  showMenu,
  hideMenu,
  showLanguageMenu,
  hideLanguageMenu,
  menuButtonRef,
  searchBarRef,
  user,
  fetchState
}: UniversalNavProps): JSX.Element => {
  const { pending } = fetchState;
  const { t } = useTranslation();

  const search =
    typeof window !== `undefined` && isLanding(window.location.pathname) ? (
      <SearchBarOptimized innerRef={searchBarRef} />
    ) : (
      <SearchBar innerRef={searchBarRef} />
    );

  return (
    <nav
      aria-label={t('aria.primary-nav')}
      className={`universal-nav${displayMenu ? ' expand-nav' : ''}`}
      id='universal-nav'
    >
      <div
        style={{ opacity: 0.0 }}
        className={`universal-nav-left${displayMenu ? ' display-search' : ''}`}
      >
        <Media minWidth={MAX_MOBILE_WIDTH + 1}>{search}</Media>
      </div>
      <div className='universal-nav-middle text-center'>
        <Link id='universal-nav-logo' to='/learn'>
          <NavLogo />
        </Link>
      </div>
      <div className='universal-nav-right main-nav'>
        {pending ? (
          <div className='nav-skeleton'>
            <SkeletonSprite />
          </div>
        ) : (
          <>
            <MenuButton
              displayMenu={displayMenu}
              hideMenu={hideMenu}
              innerRef={menuButtonRef}
              showMenu={showMenu}
              user={user}
            />
            <Media maxWidth={MAX_MOBILE_WIDTH}>{search}</Media>
            <NavLinks
              displayMenu={displayMenu}
              fetchState={fetchState}
              isLanguageMenuDisplayed={isLanguageMenuDisplayed}
              hideLanguageMenu={hideLanguageMenu}
              hideMenu={hideMenu}
              menuButtonRef={menuButtonRef}
              showLanguageMenu={showLanguageMenu}
              showMenu={showMenu}
              user={user}
            />
            <div className='navatar'>
              <AuthOrProfile user={user} />
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

UniversalNav.displayName = 'UniversalNav';
export default UniversalNav;
