import { createTheme } from "@mui/material";

export const createMyTheme = (theme) => {
  return createTheme({
    palette: {
      primary: {
        main: theme,
      },
    },
  });
}
