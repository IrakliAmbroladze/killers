import { themeQuartz } from "ag-grid-community";

export const myTheme = themeQuartz
  .withParams(
    {
      backgroundColor: "#FFE8E0",
      foregroundColor: "#361008CC",
      browserColorScheme: "light",
    },
    "light"
  )
  .withParams(
    {
      backgroundColor: "#201008",
      foregroundColor: "#FFFFFFCC",
      browserColorScheme: "dark",
    },
    "dark"
  );
