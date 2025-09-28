import { deepPurple, lightBlue } from "@mui/material/colors"
import { createTheme } from "@mui/material/styles"

export const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[400],
      light: deepPurple[300],
      dark: deepPurple[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: lightBlue[400],
      light: lightBlue[300],
      dark: lightBlue[600],
      contrastText: "#ffffff",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
})
