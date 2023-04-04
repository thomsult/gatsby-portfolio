/** @jsx jsx */
/** @jsxFrag */
import { jsx } from "theme-ui";
import { Image } from "theme-ui";
import { StaticImage, getImage } from "gatsby-plugin-image";
import React from "react";

const About = (props) => {
  return (
    <section
    sx={{
        maxWidth: "1500px",
        margin: "0 auto",
        
    }}
    >
    <div
      sx={{
        display: "flex",
        flexDirection: "column",
        bg: "background",
        
        margin: "0 auto",
        "@media screen and (min-width: 768px)": {
          minHeight: "100vh",
          flexDirection: "row",
          justifyContent: "space-between",
          overflow: "hidden",
        },
      }}
      id="About"
      {...props}
    />
    </section>
  );
};
const AboutText = (props) => {
  return (
    <div
      sx={{
        bg: "background",
        display: "flex",
        maxWidth: "700px",
        margin: "0 auto",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        width: "100%",
        paddingTop: "1em",
        paddingLeft: "1em",
        paddingRight: "1em",
        '& p': {
            margin: "0.5em 0",
            lineHeight: "1.6em",
            '& strong': {
                fontWeight: "700",
            }
        },
        '& h1': {
          margin: "0.2em 0",
      },

        "@media screen and (min-width: 768px)": {
          width: "100%",
          minHeight: "fit-content",
          paddingTop: "5em",
          paddingLeft: "3em"
          
        },
      }}
      {...props}
    />
  );
};
const AboutCompetences = (props) => {
  const title = props.title;
  const competences = JSON.parse(props.competences);
  return (
    <>
      <h2 sx={{
        fontSize: "1.5em",
        fontWeight: "bold",
        margin: "0.8em 0",
      }}>{title}</h2>
      <ul
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          flexWrap: "wrap",
          listStyle: "none",
          paddingLeft: 0,
          paddingBottom: "2em",
          "& li": {
            listStyle: "none",
            marginBottom: "0.5em",
            bg: "rgba(0,0,0,0.1)",
            borderRadius: "0.5em",
            padding: "0.5em 1.5em",
          },
        }}
      >
        {competences.map((competence: string) => {
          return <li key={competence}>{competence}</li>;
        })}
      </ul>
    </>
  );
};

export default { About, AboutText, AboutCompetences };
