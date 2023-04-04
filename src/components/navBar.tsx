/** @jsx jsx */
/** @jsxFrag */
import React, { ReactNode, createContext, useEffect, useState } from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { jsx } from "theme-ui";
import theme from "../gatsby-plugin-theme-ui/index";

interface Header extends React.FC<{ children: ReactNode }> {
  ContextButton: React.Context<{ isOpen: boolean }>;
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
        height: "100%",
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

const ContextButton = createContext({ isOpen: false });
Header.ContextButton = ContextButton;

Header.Button = ({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpen(false);
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
    <Header.ContextButton.Provider value={{ isOpen: open }}>
      <button
        onClick={() => setOpen(!open)}
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
            transform: open
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
            transform: open
              ? "translate(0px,-3px) rotate(45deg)"
              : "translate(0px,5px) rotate(0)",
            borderRadius: "3px",
            transition: "all 0.3s ease-in-out",
          },
          "@media (min-width: 768px)": {
            display: open ? "block" : "none",
          },
        }}
      >
        <div
          sx={{
            display: "block",
            bg: color,
            height: "3px",
            width: open ? "0" : "100%",
            transition: "width 0.3s ease-in-out",
            margin: "0 auto",
            borderRadius: "3px",
          }}
        />
      </button>
      {children}
    </Header.ContextButton.Provider>
  );
};

const MenuLinks: MenuLinks = ({ children }: { children: ReactNode }) => {
  const { isOpen } = React.useContext(ContextButton);
  return (
    <ul
      sx={{
        display: isOpen ? "flex" : "none",
        flexDirection: isOpen ? "column" : "row",
        alignItems: isOpen ? "flex-start" : "center",
        justifyContent: isOpen ? "flex-start" : "flex-end",
        listStyle: "none",
        gap: "1.5rem",
        paddingTop: isOpen ? "13.5em" : "1em",
        paddingLeft: isOpen ? 0 : "auto",
        paddingBottom: isOpen ? "1.5rem" : "0",
        width: "100%",
        minHeight: "2em",
        transition: "width 0.3s ease-in-out",
        height: isOpen ? "auto" : "2em",
        margin: isOpen ? "0 0" : "0 auto",
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
  const { isOpen } = React.useContext(ContextButton);
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
        to={link}
      >
        {children}
      </Link>
      )}
      
    </li>
  );
};

const NavBar: React.FC = () => {
  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
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
            {data.site.siteMetadata.menuLinks.map(
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
