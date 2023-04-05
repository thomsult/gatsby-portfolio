import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import Index from "../content/index.mdx";
import { SEO } from "../components/seo";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Project, gatsbyImageData } from "../type/gatsby-graphql";
import Layout from "../components/layout";

interface IndexPageProps extends PageProps {
  data: {
    allMdx: {
      nodes: Project[];
    };
    file: {
      id: string;
      childImageSharp: {
        gatsbyImageData: gatsbyImageData;
      };
    };
  };
}

const IndexPage: React.FC<IndexPageProps> = ({ data,location }) => {
  const project = data.allMdx.nodes;
  const profile = getImage(data.file?.childImageSharp);

  return (
    <Layout location={location}>
      <Index data="5" HeroImage={profile} projects={project} />
    </Layout>
  );
};

export const query = graphql`
  query {
    file(name: { regex: "/photoProfile/" }) {
      id
      childImageSharp {
        gatsbyImageData
      }
    }
    allMdx(
      filter: { frontmatter: { category: { eq: "Project" } } }
      sort: { frontmatter: { title: ASC } }
    ) {
      nodes {
        frontmatter {
          name
          title
          school
          category
          description
          date
          liveUrl
          gitHubUrl
          projectImage {
            childrenImageSharp {
              gatsbyImageData
            }
          }
          projectImageMobile {
            childrenImageSharp {
              gatsbyImageData
            }
          }
        }
        id
      }
    }
  }
`;

export default IndexPage;

export const Head: HeadFC = () => <SEO />;
