import {ImageDataLike} from 'gatsby-plugin-image';
interface ImageSharp {
  childrenImageSharp: {
    gatsbyImageData: gatsbyImageData;
  }[];
}
interface gatsbyImageData {
    layout: string;
    width: number;
    height: number;
    images: {
      sources: {
        srcSet: string;
        sizes: string;
        type: string;
      }[];
      fallback: {
        src: string;
        srcSet: string;
        sizes: string;
      };
    };
    backgroundColor: string;
  }
  
  interface Project {
    frontmatter: {
      name: string;
      title: string;
      school: string;
      category: string;
      description: string;
      date: string;
      projectImage:ImageSharp;
    };
    id: string;
  }


////////////Pages






  
  interface Data{
    mdx?: {
      frontmatter: {
        title: string;

      };
      id: string;
    };
    allFile: {
      nodes:[{
        childImageSharp:ImageDataLike,
        name:string
      }]
    };
  }
  
  
  
  
  interface HeaderPagesProps {
    title:string,
    description:string,
    name:string
    data:Data;
  }
  
  
  interface PageTemplateProps {
    pageContext: {
      frontmatter: {
        title: string;
        name: string;
        description: string;
        image: string;
        date: string;
        tags: string[];
        gitHubUrl: string;
        liveUrl: string;
      };
    };
    data:Data;
    location: Location;
    children: React.ReactNode;
  }


  
  export {Project, gatsbyImageData, HeaderPagesProps, PageTemplateProps}