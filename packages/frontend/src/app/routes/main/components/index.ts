import { lazier } from 'eth-hooks/helpers';

// use lazy/lazier for react lazy loading

/**
 * lazy/lazier loaded component
 */
export const MainPageHeader = lazier(() => import('./MainPageHeader'), 'MainPageHeader');
/**
 * lazy/lazier loaded component
 */

// export const __ = lazier(() => import("./"), "")
