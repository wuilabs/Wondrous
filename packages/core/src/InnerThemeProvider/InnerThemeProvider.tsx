import * as React from "react"
import { ThemeContext as EmotionContext } from "@emotion/react";
import { ThemeProvider as WuiThemeProvider} from "@wuilabs/private-theming";
import useTheme from "../useTheme";

function InnerThemeProvider ({ children }) {
  const theme = useTheme()

  return (
    <EmotionContext.Provider value={theme}>{children}</EmotionContext.Provider>
  )
}

export default function ThemeProvider(props) {
  const { children, theme } = props

  return (
    <WuiThemeProvider theme={theme}>
      <InnerThemeProvider>
        {children}
      </InnerThemeProvider>
    </WuiThemeProvider>
  )
}