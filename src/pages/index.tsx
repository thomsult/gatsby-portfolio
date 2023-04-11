import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import Index from "./projects/index.mdx";
import { SEO } from "../components/seo";
import { GatsbyImage, getImage, ImageDataLike } from "gatsby-plugin-image";
import { Project, gatsbyImageData } from "../type/gatsby-graphql";
import Layout from "../components/layout";

interface IndexPageProps extends PageProps {
  pageContext: {
    id: string;
    profilsPicture: gatsbyImageData;
    project: Project[];
    aboutPicture: gatsbyImageData;
  };
  data:{
    page: {
      frontmatter: {
        title: string;
        profilPicture: {
          childImageSharp: {
            gatsbyImageData: gatsbyImageData;
          };
        };
        aboutPicture: {
          childImageSharp: {
            gatsbyImageData: gatsbyImageData;
          };
        };
      };
    };
    projects: {
      nodes: Project[];
    };
  }

}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const {pageContext, location} = props;
  const page = props.data.page;
  const projects = props.data.projects.nodes;
  const profile = getImage(page.frontmatter.profilPicture as ImageDataLike);;

  return (
    
     <Layout location={location}>
     <Index data="5" heroImage={profile} projects={projects} aboutPicture={page.frontmatter.aboutPicture} />  
     </Layout>
  );
};




export const query = graphql`
  {
    page:mdx(frontmatter: {title: {eq: "Home Page"}}) {
      id
      body
      frontmatter {
        title
        profilPicture {
          childImageSharp {
            gatsbyImageData
          }
        }
        aboutPicture {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
      internal {
        contentFilePath
      }
    }
    projects:allMdx(
      filter: { frontmatter: { category: { eq: "Project" } } }
      sort: { frontmatter: { title: ASC } })
      {
          nodes {
            id
            frontmatter {
              title
              name
              school
              category
              date
              description
              gitHubUrl
              liveUrl
              projectImage {
                  childrenImageSharp {
                    gatsbyImageData
                }
              }
            }
          }
        }
  }
`


export default IndexPage;







export const Head: HeadFC = () => <SEO />;
