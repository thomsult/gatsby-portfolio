/** @jsx jsx */
/** @jsxFrag */

import {graphql, HeadFC} from 'gatsby';
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
import { SEO } from '../components/seo';
import React from 'react';
import ImageChange from '../components/utils/imageChange';







export default function PageTemplate(props:PageTemplateProps) {
  const frontMatter = props.pageContext.frontmatter;
  const { title,name, description, image, date, tags, gitHubUrl, liveUrl } =
    frontMatter;
  return (
    <Layout location={props.location}>
      { <HeaderPages 
      title={title} 
      data={props.data} 
      description={description}
      name={name}
      /> }
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
  query ($id: String, $image: String) {
    mdx(id: { eq: $id }) {
      id
      frontmatter {
        title
      }
    }
    allFile(
      filter: {dir: {regex: $image}}
      sort: {relativeDirectory: ASC}
    ) {
    nodes {
      childImageSharp {
        gatsbyImageData
      }
      name
    }
  }
  }
`;






const filterImages =(nodes:[{
  childImageSharp:ImageDataLike,
  name:string
}],regex:RegExp) =>{
  return nodes
  .filter((node) => node.name.match(regex))
  .sort((a,b)=>a.name.localeCompare(b.name))
  .map((node) => getImage(node.childImageSharp))
}








const HeaderPages:React.FC<HeaderPagesProps> = (props) => {
  const { title,description,name } = props;
  const { nodes } = props.data.allFile
  const [index, setIndex] = React.useState(0)

  const ImageList = {
    mobile:filterImages(nodes,/mobile/i),
    desktop:filterImages(nodes,/desktop/i),
    tablet:filterImages(nodes,/tablet/i)
  }



  const ImageMobile = ImageList.mobile[index]
  const ImageDesktop = ImageList.desktop[index]
  const ImageTablet = ImageList.tablet[index]
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
        position: "relative",
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
      <ImageChange 
      nbImages={ImageList.desktop.length}
      OnChange={(index:number)=>{
        setIndex(index)
      }}
      />
      </div>
      
    </header>
  );
};

export const Head = (props:PageTemplateProps) => {
  const frontMatter = props.pageContext.frontmatter;

  return <SEO title={frontMatter.name}  description={frontMatter.description}/>
}