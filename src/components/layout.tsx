
/** @jsx jsx */
/** @jsxFrag */

import React from "react";

import {Global, ThemeProvider,jsx} from "theme-ui";
import {MDXProvider, useMDXComponents} from "@mdx-js/react";
import theme from "../gatsby-plugin-theme-ui/index";
import NavBar from "./navBar";
import IconWithName from "./utils/iconWithName";

import { useThemedStylesWithMdx } from '@theme-ui/mdx'
import Hero from "./section/hero";
import About from "./section/about";
import Project from "./section/project";
import Tools from './section/tools';
import Formulaire from "./section/formulaire";
import ImageHalf from "./utils/imageHalfSection";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
const components = {
  ...Project,
  ...About,
  ...Hero,
  ...Tools,
  ...Formulaire,
    IconWithName,
    ImageHalf:ImageHalf
    
}



  const componentsWithStyles = useThemedStylesWithMdx(
    useMDXComponents(components,)
  )

  return (
    <ThemeProvider theme={theme}>
        <Global styles={{
            "*": {
                margin: 0,
                padding: 0,
                boxSizing: "border-box",
                scrollBehavior: "smooth",
            },
        }}/>
      <NavBar/>
      <main sx={{
        paddingTop: "4rem",
        
      }}>
          <MDXProvider components={componentsWithStyles}>
              {children}
          </MDXProvider>
      </main>
    </ThemeProvider>
  );
};

export default Layout;
