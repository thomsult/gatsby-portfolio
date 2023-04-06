/** @jsx jsx */
/** @jsxFrag */

import React, { useEffect, useMemo, useState } from "react";

import { Global, ThemeProvider, jsx } from "theme-ui";
import { MDXProvider, useMDXComponents } from "@mdx-js/react";
import theme from "../gatsby-plugin-theme-ui/index";
import IconWithName from "./utils/iconWithName";

import { useThemedStylesWithMdx } from "@theme-ui/mdx";
import Hero from "./section/hero";
import About from "./section/about";
import Project from "./section/project";
import Tools from "./section/tools";
import Formulaire from "./section/formulaire";
import ImageHalf from "./utils/imageHalfSection";
import Overlay from "./context/headerContext";
import { withPrefix } from "gatsby";

interface LayoutProps {
  children: React.ReactNode;
  location: Location;
}

const GetCurrentPage = (location: Location) => {
  const loc = location.pathname.split("/");
  const currentPage = loc[loc.length - 2];
  const hash = (location.hash || "").replace("#", "");

  return currentPage || hash || "Home";
};

const Layout: React.FC<LayoutProps> = (props) => {
  const components = useMemo(
    () => ({
      ...Project,
      ...About,
      ...Hero,
      ...Tools,
      ...Formulaire,
      IconWithName,
      ImageHalf: ImageHalf,
    }),
    []
  );

  const isHomePage = props.location.pathname === withPrefix("/");
  const { children } = props;
  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components)
  );
  const MainTheme = {
    paddingTop: "4rem",
  };

  const currentPage = GetCurrentPage(props.location);

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={{
          "*": {
            margin: 0,
            padding: 0,
            boxSizing: "border-box",
            scrollBehavior: "smooth",
          },
        }}
      />
      <Overlay isHomePage={isHomePage} currentPage={currentPage}>
        <main sx={MainTheme}>
          <MDXProvider components={componentsWithStyles}>
            {children}
          </MDXProvider>
        </main>
      </Overlay>
    </ThemeProvider>
  );
};

export default Layout;
