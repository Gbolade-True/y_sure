import classNames from 'classnames';
import { Size, Variant } from './types';

export enum ScreenSizes {
  xsm = 375,
  sm = 640,
  md = 744,
  lg = 1024,
  xl = 1280,
  xxl = 1440,
  xxxl = 1728,
  xxxxl = 1920,
}

export enum ElementEffect {
  HOVER = 'hover:',
  FOCUS = 'focus:',
}

export const getColor = (name: string): string => `${name} dark:${name}-d`;

export const getScrollbar = () =>
  'scrollbar scrollbar-thin scrollbar-thumb-secondary-2 scrollbar-track-transparent overflow-y-scroll dark:scrollbar-thumb-secondary-2-d';

export const getTextColorForBackground = (backgroundVariant: Variant): string => {
  switch (backgroundVariant) {
    case Variant.text: {
      return getColor('text-1');
    }
    case Variant.secondary: {
      return getColor('text-secondary-5');
    }
    case Variant.primary:
    case Variant.desctructionary:
    default: {
      return getColor('text-white');
    }
  }
};

export const getBackgroundColor = (variant: Variant, interactive?: boolean): string => {
  switch (variant) {
    case Variant.text: {
      return classNames({
        [getColor('bg-transparent')]: true,
      });
    }
    case Variant.primary: {
      return classNames({
        [getColor('bg-primary-1')]: true,
        [getColor('active:bg-primary-4')]: interactive,
        [getColor('hover:bg-primary-2')]: interactive,
        [getColor('focus:ring-blue-500')]: interactive,
      });
    }
    case Variant.secondary: {
      return classNames({
        [getColor('bg-misc-1')]: true,
        [getColor('active:bg-secondary-2')]: interactive,
        [getColor('hover:bg-secondary-1')]: interactive,
        [getColor('focus:ring-gray-300')]: interactive,
      });
    }
    case Variant.desctructionary:
    default: {
      return classNames({
        [getColor('bg-alert-2')]: true,
        [getColor('active:bg-alert-4')]: interactive,
        [getColor('hover:bg-alert-1')]: interactive,
        [getColor('focus:ring-red-600')]: interactive,
      });
    }
  }
};

export const getTextSize = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'text-sm';
    }
    case Size.medium: {
      return 'text-base';
    }
    case Size.large:
    default: {
      return 'text-lg';
    }
  }
};

export const getIconSize = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'w-3 h-3';
    }
    case Size.medium: {
      return 'w-4 h-4';
    }
    case Size.extralarge: {
      return 'w-8 h-8';
    }
    case Size.large:
    default: {
      return 'w-5 h-5';
    }
  }
};

export const getMinWidth = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'min-w-[24px] min-h-[24px]';
    }
    case Size.medium: {
      return 'min-w-[44px] min-h-[44px]';
    }
    case Size.large:
    default: {
      return 'min-w-[64px] min-h-[64px]';
    }
  }
};

export const getSpacing = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'py-1 px-4 gap-2';
    }
    case Size.medium: {
      return 'py-1.5 px-4 gap-3';
    }
    case Size.large:
    default: {
      return 'py-2.5 px-4 gap-4';
    }
  }
};

export const getMargins = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'm-2';
    }
    case Size.medium: {
      return 'm-3';
    }
    case Size.large:
    default: {
      return 'm-4';
    }
  }
};

export const buttonBorder = (variant: Variant) => {
  switch (variant) {
    case Variant.secondary: {
      return classNames('border', 'border-solid');
    }
    default: {
      return '';
    }
  }
};

export const rounded = (size: Size) => {
  switch (size) {
    case Size.small: {
      return 'rounded-lg';
    }
    case Size.medium: {
      return 'rounded-lg';
    }
    case Size.large:
    default: {
      return 'rounded-lg';
    }
  }
};

export const flexCenter = () => classNames('flex', 'justify-center', 'items-center');

export const buttonFocus = () => classNames('focus:ring', 'focus:ring-offset-2', 'focus:ring-opacity-50');
