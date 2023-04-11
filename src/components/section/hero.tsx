/** @jsx jsx */
/** @jsxFrag */
import { graphql, useStaticQuery } from "gatsby";
import useQuery from "../../hooks/useQuery";
import React, { useEffect } from "react";
import { jsx } from "theme-ui";
import { keyframes } from "@emotion/react";

interface PropsType {
  children: React.ReactNode;
}

const Hero = (props: PropsType) => {
  const { children } = props;
  return (
    <section
      id="Accueil"
      sx={{
        bg: "background",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        sx={{
          width: "100%",
          bg: "background",
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          justifyContent: "flex-end",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingBottom: "4rem",

          "@media screen and (min-width: 768px)": {
            flexDirection: "row",
            paddingTop: "0",
          },
        }}
      >
        {children}
      </div>
    </section>
  );
};
const HeroText = (props: PropsType) => {
  return (
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        paddingLeft: "1em",
        paddingRight: "1em",
        maxWidth: "50vmax",
      }}
      {...props}
    />
  );
};
const HeroHeading = (props: PropsType) => {
  const fadeIn = keyframes({
    from: {
      opacity: 0,
      transform: "translateX(-100%)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  });
  return (
    <h1
      sx={{
        width: "100%",
        fontSize: "clamp(2em, 5vw, 3em)",
        fontWeight: "800",
        color: "#202020",
        animation: `${fadeIn} 1s ease`,
      }}
      {...props}
    />
  );
};
const HeroParagraph = (props: PropsType) => {
  const fadeIn = keyframes({
    from: {
      opacity: 0,
      transform: "translateX(-200%)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  });
  return (
    <p
      sx={{
        width: "100%",
        fontSize: "clamp(0.8em, 2vw, 1.2em)",
        maxWidth: "35em",
        fontWeight: "400",
        lineHeight: "1.5em",
        marginBottom: "0.5em",
        animation: `${fadeIn} 1s ease`,
      }}
      {...props}
    />
  );
};
const HeroList = (props: PropsType) => {
  const { svg } = useQuery();
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      const props = { svgList: svg } as {
        svgList: [
          {
            url: string;
            id: string;
          }
        ];
      };

      return React.cloneElement(child, props);
    }
    return child;
  });
  const fadeIn = keyframes({
    from: {
      opacity: 0,
      transform: "translateX(-200%)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  });

  return (
    <ul
      sx={{
        display: "flex",
        listStyle: "none",
        gap: "clamp(3em, 5vw, 5em)",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        animation: `${fadeIn} 1s ease`,
        "@media screen and (min-width: 768px)": {
          justifyContent: "flex-start",
        },
      }}
    >
      {childrenWithProps}
    </ul>
  );
};

interface ListItemProps {
  children: React.ReactNode;
  svgList: [
    {
      url: string;
      id: string;
    }
  ];
}

const HeroListItem = (props: ListItemProps) => {
  const childrenWithProps = React.Children.map(props.children, (child) => {
    if (React.isValidElement(child)) {
      const newProps = {
        img: props.svgList.filter((el) => {
          return el.url.includes(child.props.name) ? el : null;
        })[0],
      } as { img: { url: string; id: string } };
      return React.cloneElement(child, newProps);
    }
    return child;
  });
  return <li>{childrenWithProps}</li>;
};

const HeroImage = (props: {
  img: { images: { fallback: { src: string | undefined } } };
}) => {
  const fadeIn = keyframes({
    from: {
      opacity: 0,
      transform: "translateX(200%)",
    },
    to: {
      opacity: 1,
      transform: "translateX(0)",
    },
  });
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="600"
      height="680"
      fill="none"
      viewBox="-45 -40 590 681"
      sx={{
        width: "90vmin",
        height: "auto",
        maxHeight: "560px",
        animation: `${fadeIn} 1s ease`,
      }}
    >
      <mask id="svgmask">
        <path
          fill="#ffffff"
          d="M63.283 86.384C90.74 70.396 229.048 32.747 336.487 4.894c71.189-18.454 142.493 28.156 155.1 100.609l45.658 262.389c9.877 56.76-19.691 113.058-72.028 137.143L219.011 618.336c-77.481 35.655-167.452-13.651-179.993-98.015-10.05-67.603-21.557-141.406-31.08-192.857-22.253-120.235 9.225-214.226 55.345-241.08Z"
        />
      </mask>
      <path
        style={{ opacity: 0.1 }}
        fill="#5e5e5e"
        d="M63.283 86.384C90.74 70.396 229.048 32.747 336.487 4.894c71.189-18.454 142.493 28.156 155.1 100.609l45.658 262.389c9.877 56.76-19.691 113.058-72.028 137.143L219.011 618.336c-77.481 35.655-167.452-13.651-179.993-98.015-10.05-67.603-21.557-141.406-31.08-192.857-22.253-120.235 9.225-214.226 55.345-241.08Z"
      />
      <image
        sx={{
          objectFit: "cover",
          objectPosition: "center center",
          width: "100%",
          background: "#5e5e5e",
          transform: "translate(-5%,-2%)",
        }}
        mask="url(#svgmask)"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        xlinkHref={props?.img?.images?.fallback.src}
      />
    </svg>
  );
};

export default {
  Hero,
  HeroText,
  HeroHeading,
  HeroParagraph,
  HeroList,
  HeroListItem,
  HeroImage,
};
