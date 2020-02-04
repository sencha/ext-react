import '../public/ext-runtime-classic/themes/css.classic.triton.js';
import '../public/ext-runtime-classic/engine.js';
import { configure } from '@storybook/react';

configure(require.context('../src', true, /\.stories\.js$/), module);