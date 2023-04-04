import react from 'react';
import {graphql, useStaticQuery} from "gatsby";

const useQuery = () => {
    const query = useStaticQuery(graphql`
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
