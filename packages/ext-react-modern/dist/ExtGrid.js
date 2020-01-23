import reactize from './reactize.js';
import EWCGrid from '@sencha/ext-web-components-modern/dist/ext-grid.component.js';
import './overrides';
export { default as Template } from './Template';
export default reactize(EWCGrid);
import './ReactCell';