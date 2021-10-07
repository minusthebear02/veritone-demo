import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
	typography: {
		fontFamily: 'Nunito, Dosis, sans-serif',
	},
	palette: {
		primary: {
			main: '#4D81B7',
			contrastText: '#fff'
		},
		secondary: {
			main: '#1871E8'	,
			contrastText: '#fff'
		},
  	},
});