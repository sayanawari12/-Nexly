import colors from './colors';
import typography from './typography';
import spacing from './spacing';
import radius from './radius';
import shadows from './shadows';
import gradients from './gradients';
import animations from './animations';
import breakpoints from './breakpoints';
import glass from './glass';
import layout from './layout';

export {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  gradients,
  animations,
  breakpoints,
  glass,
  layout,
};

export const DESIGN_TOKENS = {
  colors,
  typography,
  spacing,
  borderRadius: radius,
  shadows,
  gradients,
  transitions: animations,
  breakpoints,
  glass,
  layout,
};

export default DESIGN_TOKENS;
