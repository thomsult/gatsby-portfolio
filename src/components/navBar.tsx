/** @jsx jsx */
/** @jsxFrag */
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Link, useStaticQuery, graphql, withPrefix } from "gatsby";
import { jsx } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui/index";
import { useHeaderContext } from "./context/headerContext";

interface Header extends React.FC<{ children: ReactNode }> {
  Nav: React.FC<{ children: ReactNode }>;
  Button: React.FC<{ label: string; children: ReactNode }>;
}
interface MenuLinks extends React.FC<{ children: ReactNode }> {
  Item: React.FC<{ children: React.ReactNode; link: string; type: string }>;
}

const Header: Header = ({ children }) => {
  return (
    <header
      sx={{
        position: "fixed",
        bg: "background",
        height: "4rem",
        zIndex: 1000,
        width: "100%",
        top: 0,
        left: 0,
      }}
    >
      {children}
    </header>
  );
};

Header.Nav = ({ children }) => {
  return (
    <nav
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",

        height: "auto",
        width: "100%",
        maxWidth: "1200px",
        margin: "0 auto",
        "@keyframes slideIn": {
          from: {
            transform: "translateY(-100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        animation: "slideIn 0.5s ease-in-out",
        minHeight: "3rem",
      }}
    >
      {children}
    </nav>
  );
};

Header.Button = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {


  const { isOpen,toggleMenu } = useHeaderContext();
  const handleResize = () => {
    if (window.innerWidth > 768) {
      toggleMenu(false);
      
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);





  const color = theme.colors?.menuHamburger;
  return (
    <>
      <button
        onClick={() => toggleMenu(!isOpen)}
        aria-label={label}
        sx={{
          display: "block",
          cursor: "pointer",
          position: "absolute",
          zIndex: 1000,
          top: "1.2em",
          right: "1.2em",
          height: "30px",
          width: "30px",
          bg: "transparent",
          border: "none",

          ":before": {
            content: '""',
            display: "block",
            bg: color,
            height: "3px",
            transform: isOpen
              ? "translate(0px,3px) rotate(-45deg)"
              : "translate(0px,-5px) rotate(0)",
            borderRadius: "3px",
            transition: "all 0.3s ease-in-out",
          },
          ":after": {
            content: '""',
            display: "block",
            bg: color,
            height: "3px",
            transform: isOpen
              ? "translate(0px,-3px) rotate(45deg)"
              : "translate(0px,5px) rotate(0)",
            borderRadius: "3px",
            transition: "all 0.3s ease-in-out",
          },
          "@media (min-width: 768px)": {
            display: isOpen ? "block" : "none",
          },
        }}
      >
        <div
          sx={{
            display: "block",
            bg: color,
            height: "3px",
            width: isOpen ? "0" : "100%",
            transition: "width 0.3s ease-in-out",
            margin: "0 auto",
            borderRadius: "3px",
          }}
        />
      </button>
      {children}
    </>
  );
};

const MenuLinks: MenuLinks = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useHeaderContext();
  return (
    <ul
      sx={{
        display: isOpen ? "flex" : "none",
        flexDirection: isOpen ? "column" : "row",
        alignItems: isOpen ? "flex-start" : "center",
        justifyContent: isOpen ? "flex-start" : "flex-end",
        listStyle: "none",
        gap: "1.5rem",
        paddingLeft: isOpen ? 0 : "auto",
        paddingBottom: isOpen ? "1.5rem" : "0",
        width: "100%",
        minHeight: "2em",
        paddingTop: "1rem",
        transition: "width 0.3s ease-in-out",
        height: isOpen ? "100%" : "2em",
        backgroundColor: isOpen ? "white" : "transparent",
        "@media (min-width: 768px)": {
          display: "flex",
        },

        bg: isOpen ? "white" : "transparent",
        boxShadow: isOpen ? "#25252517 0px 0px 10px 0px" : "none",
      }}
    >
      {children}
    </ul>
  );
};

MenuLinks.Item = ({ children, link, type }) => {
  const { isOpen,toggleMenu } = useHeaderContext();
  return (
    <li
      sx={{
        padding: isOpen ? "0 1.5em" : "1em",

        fontWeight: "450",
        listStyle: "none",
        cursor: "pointer",
      }}
    >
      {type === "external" ? (
        <a
        sx={{
          textDecoration: "none",
          color: " #5c5c5c",
          ":hover": {
            opacity: "0.8",
          },
        }}
        href={link}
        >{children}
        </a>):(<Link
        sx={{
          textDecoration: "none",
          color: " #5c5c5c",
          ":hover": {
            opacity: "0.8",
          },
        }}
        to={`/${link}`}
        onClick={() => {
          if (isOpen) {
            toggleMenu(false);
          }
        }}
      >
        {children}
      </Link>
      )}
      
    </li>
  );
};

const NavBar: React.FC<{path:string}> = ({path}) => {
  const isHomepage = location.pathname === withPrefix("/")
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
          title
          menuLinks {
            link
            name
            type
          }
        }
      }
    }
  `);
  return (
    <Header>
      <Header.Nav>
        <Header.Button label="menu">
          <MenuLinks>
            {data.site.siteMetadata.menuLinks
            .filter((el: { name: string; })=>{
              if(isHomepage ){
                return el
              }else{
                if(el.name ==="Home" || el.name ==="Mon CV"){
                  return el
                }
              }
            })
            .map(
              (link: { link: string; name: string; type: string }) => (
                <MenuLinks.Item
                  key={link.name}
                  link={link.link}
                  type={link.type}
                >
                  {link.name}
                </MenuLinks.Item>
              )
            )}
          </MenuLinks>
        </Header.Button>
      </Header.Nav>
    </Header>
  );
};
export default NavBar;
