/** @jsx jsx */
/** @jsxFrag */
import React from "react";
import { Image, jsx } from "theme-ui";
import { GatsbyImage, IGatsbyImageData, getImage } from "gatsby-plugin-image";

import { Project } from "../../type/gatsby-graphql";

import Button from "../utils/button";

interface ProjectSectionProps {
  header: string;
  projects: Project[];
}
interface ProjectEntryProps {
  name: string;
  image: IGatsbyImageData | undefined;
  title: string;
  description: string;
  liveUrl?: string;
  gitHubUrl?: string;
}

const ProjectSection: React.FC<ProjectSectionProps> = (props) => {
  return (
    <section
      id="Projects"
      sx={{
        bg: "background",
        height: "100%",
        minHeight: "100vh",
      }}
    >
      <div
        sx={{
          width: "100%",
          bg: "background",
          minHeight: "100vh",
          maxWidth: "1200px",
          margin: "0 auto",
          height: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "4em 0 0 0",
        }}
      >
        <h1
          sx={{
            fontSize: "2.5em",
            fontWeight: 600,
            padding: "0.2em 0.3em",
            textDecoration: "none",
          }}
        >
          {props.header}
        </h1>
        <ProjectListWild projectsList={props.projects} />

        <ProjectListFrontend projectsList={props.projects} />
      </div>
    </section>
  );
};

const removeSpaceAndLowerCase = (str: string) => {
  return str.replace(/\s+/g, "").toLowerCase();
};

const ProjectEntries: React.FC<ProjectEntryProps> = ({
  image,
  title,
  name,
  description,
  liveUrl,
  gitHubUrl,
}) => {
  const nameLowerCase = removeSpaceAndLowerCase(name);
  return (
    <article
      tabIndex={0}
      sx={{
        border: "1px solid #ddd",
        height: "100%",
        boxShadow: "0 1px 1px rgba(0,0,0,.05)",
        transition: "all 0.5s ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "4px",
        padding: "2em 2em",
      }}
    >
      <header
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a
          sx={{
            fontSize: "1.2em",
            fontWeight: 500,
            padding: "0.4em 0",
            color: "primary",
            textDecoration: "none",
          }}
          href={`./projects/${nameLowerCase}/`}
        >
          {image && (
            <GatsbyImage
              sx={{
                height: "auto",
                width: "100%",
                borderRadius: "4px",
                marginBottom: "1em",
                boxShadow: "0 1px 1px rgba(0,0,0,.05)",
              }}
              image={image}
              alt={`Voir le projet ${title}`}
            />
          )}
        </a>
      </header>
      <h2
        sx={{
          fontSize: "1.5rem",
          fontWeight: 500,
          padding: "0.4em 0",
        }}
      >
        {title}
      </h2>
      <p>{description}</p>
      <footer
        sx={{
          display: "flex",
          gap: "0.5em",
        }}
      >
        <Button options={{
          color:"primary"
        }} url={gitHubUrl}>
          GitHub
        </Button>
        <Button url={liveUrl}>Site</Button>
      </footer>
    </article>
  );
};

const ProjectListWild = (props: { projectsList: Project[] }) => {
  const { projectsList } = props;

  return (
    <>
      <h2
        sx={{
          fontSize: "1.5em",
          fontWeight: 600,
          textDecoration: "none",
          padding: "0 0.5em",
        }}
      >
        Projet : Wild Code School
      </h2>
      <ul
        sx={{
          padding: "2em 0.5em 0 0.5em",
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          maxWidth: "1200px",

          width: "100%",
          height: "auto",
          gap: "3em",
        }}
      >
        {projectsList
          .filter(
            (project) => project.frontmatter.school === "Wild code School"
          )
          .map((project) => {
            const image = getImage(
              project.frontmatter.projectImage?.childrenImageSharp[0]
            );
            return (
              <li
                sx={{
                  alignSelf: "flex-start",
                  width: "100%",
                  maxWidth: "1000px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",

                  "@media screen and (min-width: 1000px)": {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "2em",
                    paddingBottom: "2em",
                  },

                  "&:nth-of-type(odd)": {
                    alignSelf: "flex-end",
                  },
                }}
                key={project.id}
              >
                <ProjectEntries image={image} {...project.frontmatter} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

const ProjectListFrontend = (props: { projectsList: Project[] }) => {
  const { projectsList } = props;

  return (
    <>
      <h2
        sx={{
          fontSize: "1.5em",
          fontWeight: 600,
          padding: "1em 0 0.2em 0.5em",
          textDecoration: "none",
        }}
      >
        Projet : Frontend-Mentor
      </h2>

      <ul
        sx={{
          padding: ["2em 0.5em 0 0.5em", "2em 0", "2em 0"],
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {projectsList
          .filter((project) => project.frontmatter.school === "Frontend-Mentor")
          .map((project, index) => {
            const image = getImage(
              project.frontmatter.projectImage?.childrenImageSharp[0]
            );
            return (
              <li
                sx={{
                  padding: index !== 2 ? 0 : [0, "0.5em", 0],
                  minHeight: "350px",
                  maxWidth:
                    index !== 2
                      ? [
                          "100%",
                          "calc(50% - 1em)",
                          "calc(33% - 1em + calc(1em/3))",
                        ]
                      : ["100%", "100%", "calc(33% - 1em + calc(1em/3))"],
                  "&>article>h2": {
                    fontSize: "1.1em",
                  },
                  "&>article>p": {
                    fontSize: "0.9em",
                  },
                }}
                key={project.id}
              >
                <ProjectEntries image={image} {...project.frontmatter} />
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default { ProjectSection };
