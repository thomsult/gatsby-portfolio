import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";

import Index from "../pages/index/index.mdx";
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

}

const IndexPage: React.FC<IndexPageProps> = (props) => {
  const {pageContext, location} = props;
  console.log(props);
  // const project = data.allMdx.nodes;
   const profile = getImage(pageContext.profilsPicture as ImageDataLike);
   const project = pageContext.project;

  return (
    
     <Layout location={location}>
    <Index data="5" heroImage={profile} projects={project} aboutPicture={pageContext.aboutPicture} /> 
     </Layout>
  );
};



export default IndexPage;

export const Head: HeadFC = () => <SEO />;
