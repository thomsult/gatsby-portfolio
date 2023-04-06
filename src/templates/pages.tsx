/** @jsx jsx */
/** @jsxFrag */

import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react"; // Provide common components here
import Layout from "../components/layout";
import "./test.css";
import { jsx } from "theme-ui";
import Button from "../components/utils/button";
import { GatsbyImage, ImageDataLike, StaticImage, getImage } from "gatsby-plugin-image";
import {
  DesktopMockup,
  PhoneMockup,
  TabletMockup,
} from "../components/utils/mockup";
import { PageTemplateProps,HeaderPagesProps } from "@/type/gatsby-graphql";








export default function PageTemplate(props:PageTemplateProps) {
  const frontMatter = props.pageContext.frontmatter;
  const headerImages = props.data.mdx.frontmatter;
  console.log(props);
  const { title,name, description, image, date, tags, gitHubUrl, liveUrl } =
    frontMatter;
  return (
    <Layout location={props.location}>
      <HeaderPages 
      title={title} 
      headerImages={headerImages} 
      description={description}
      name={name}
      />
      <section
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "0 1rem",
          display: "flex",
          flexDirection: ["column", "row", "row"],
          alignItems: "flex-start",
          justifyContent: "space-between",
          "&>div": {
            padding: "0.5em",
            
            margin: "0",
            minWidth: "220px",
            "&>ul": {
              listStyle: "none",
              padding: "0",
              margin: "0",
              paddingBottom: "1em",
              lineHeight: "1.8em",
              "&>li": {
                padding: "0 0.5em",
                margin: "0",
                "&:before": {
                  content: '"\\2022"',
                  color: "primary",
                  fontSize: "1em",
                  fontWeight: "bold",
                  marginRight: "0.2em",
                },
              },
            },
          },

        }}
      >
        {props.children}
      </section>
      <footer
        sx={{
          maxWidth: "1200px",
          padding: "1rem",
          margin: "auto",
          display: "flex",
          flexDirection: "row",
          gap: "1rem",
        }}
      >
        <Button
          options={{
            color: "primary",
          }}
          url={gitHubUrl}
        >
          GitHub
        </Button>
        <Button url={liveUrl}>Site</Button>
        <Button options={{
            color: "primary",
            type: "internal",
          }} url="/">Retour</Button>
      </footer>
    </Layout>
  );
}
export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        projectImage {
          childrenImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: JPG)
          }
        }
        projectImageMobile {
          childrenImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: JPG)
          }
        }
        projectImageTablet {
          childrenImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: JPG)
          }
        }
      }
    }
  }
`;

const HeaderPages:React.FC<HeaderPagesProps> = (props) => {
  const { headerImages,title,description,name } = props;
  const { projectImage, projectImageMobile, projectImageTablet } = headerImages;
  const ImageMobile = getImage(
    projectImageMobile?.childrenImageSharp[0].gatsbyImageData as ImageDataLike
  );
  const ImageDesktop = getImage(
    projectImage?.childrenImageSharp[0].gatsbyImageData as ImageDataLike
  );
  const ImageTablet = getImage(
    projectImageTablet?.childrenImageSharp[0].gatsbyImageData as ImageDataLike
  );
  return (
    <header
    id={name}
      sx={{
        position: "relative",
        width: ["100%", "100%", "95%"],
        maxWidth: "1200px",
        margin: [0, 0, "1em auto"],
        padding: ["0", "0", "4rem"],
        height: "auto",
        bg: ["transparent", "transparent", "primary"],
        borderRadius: ["0", "0", "10px"],
        boxShadow: ["none", "none", "0 0 10px rgba(0, 0, 0, 0.562)"],
      }}
    >
      <div
        sx={{
          maxWidth: ["auto", "auto", "900px"],
          width: ["auto", "auto", "100%"],
          height: ["auto", "auto", "500px"],
          position: "relative",
          margin: "auto",
        }}
      >
        <div
          sx={{
            maxWidth: ["auto", "170px"],
            position: ["relative", "absolute", "absolute"],
            bottom: ["0", "0", "0%"],
            left: ["0", "0", "-5%"],
            zIndex: "3",
          }}
        >
          {ImageMobile&&<PhoneMockup>
            <GatsbyImage image={ImageMobile} alt="projectImage" />
          </PhoneMockup>}
        </div>
        <div
          sx={{
            maxWidth: ["100%", "100%", "450px"],
            position: ["inherit", "inherit", "absolute"],
            bottom: ["0", "0", "-9%"],
            left: ["0", "0", "15%"],
            zIndex: "2",
          }}
        >
          {ImageTablet&&<TabletMockup>
            <GatsbyImage image={ImageTablet} alt="projectImage" />
          </TabletMockup>}
        </div>
        <div
          sx={{
            maxWidth: "700px",
            position: "absolute",
            bottom: "0",
            right: "0",
            zIndex: "1",
          }}
        >
          {ImageDesktop&&<DesktopMockup>
            <GatsbyImage image={ImageDesktop} alt="projectImage" />
          </DesktopMockup>}
        </div>
      </div>
      <div
      sx={{
        padding: ["1em", "1em", "2em 0 0 0"],
        margin: "1em 0 0 0",
        color: ["text", "text", "white"],
        "&>h1": {
          fontSize: "2.3rem",
          fontWeight: "bold",
        },
        "&>p": {
          fontSize: "1rem",
          fontWeight: "light",
        },
      }}>
      <h1
      >{title}</h1>
      <p>{description}</p>

      </div>
    </header>
  );
};
