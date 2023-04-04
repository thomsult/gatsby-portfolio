
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
      projectImage: {
        childrenImageSharp: {
          gatsbyImageData: gatsbyImageData;
        }[];
      };
    };
    id: string;
  }
  


  
  export {Project, gatsbyImageData}