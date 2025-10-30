import { createTheme } from "@mui/material";
import { COLORS,DARKCOLORS } from "./colors";

export const getTheme = (palette, isDark) => {
    createTheme({
        palette: {
            mode: isDark ? "light" : "dark",
            background:{
                default: palette.primaryBg,
                paper: palette.secondaryBg
            },
            text:{
                primary: palette.primaryText,
                secondary: palette.secondaryText
            },
            primary:{
                main: palette.primaryAccent
            },
            error:{
                main: palette.error
            }
        },
        components: {
            MuiPaper: {
                styleOverrides: {
                    root: {
                        borderColor: palette.cardBorder,
                        backgroundColor: palette.secondaryBg
                    }
                }
            },
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: palette.primaryAccent,
                        color: palette.primaryText,
                        "&:hover": {
                            backgroundColor: palette.hoverAccent
                        }
                    }
                }
            },
            MuiIconButton:{
                styleOverrides: {
                    root:{
                        borderRadius: "50%",
                        minWidth:'auto',
                        padding:'6px'
                    }
                }
            }
        }
    })
}

export { COLORS, DARKCOLORS }