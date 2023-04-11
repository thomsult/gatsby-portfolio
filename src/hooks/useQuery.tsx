import react from 'react';
import {graphql, useStaticQuery} from "gatsby";


interface Query {
  allFile: {
    edges: {
      node: {
        id: string;
        publicURL: string;
      };
    }[];
  };
}







const useQuery = () => {
    const query:Query = useStaticQuery(graphql`
    query MyQuery {
  allFile(filter: {publicURL: {regex: "/svg/"}}) {
    edges {
      node {
        id
        publicURL
      }
    }
  }
}`)
const data = {
  svg:query.allFile.edges.map((edge) => {
    return {
      id: edge.node.id,
      url: edge.node.publicURL,
    };
  })
}


  return data
    
}
export default useQuery
