import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    palette: {
      type: 'light',
    },
    primary: {
      main: '#1976d2',
      light: '#ffffff'
    },
    secondary: {
      main: '#024059',
      //main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    color: {
      default: '#000000',
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;



//main: '#024059'