import React from "react";
import ThemeContext from "../useTheme/ThemeContext";
import useTheme from "../useTheme";

function ThemeProvider(props) {
  const { Children, theme: localTheme } = props;
  const outerTheme = useTheme();

  const theme = React.useMemo(() => {
    const output = { ...outerTheme, ...localTheme}
    return output;
  }, [localTheme, outerTheme]);

  return (
    <ThemeContext.Provider value={theme}>{Children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;