import { GatsbyNode } from "gatsby";
import {gatsbyImageData} from '@/type/gatsby-graphql';

const path = require("path");
 const PageTemplate = path.resolve("./src/templates/index.tsx");

const indexPage = async ({
  graphql,
  actions,
  reporter,
}) => {
  const { createPage } = actions;
  const result = await graphql(`
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
    project:allMdx(
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
`);

  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors);
  }
  if (!result.data) {
    reporter.panicOnBuild("Error loading MDX result", Error("No data"));
  }
  // Create blog post pages.
  createPage({
    path: "/",
    component: `${PageTemplate}?__contentFilePath=${result.data.page.internal.contentFilePath}`,
    context: {
      id: result.data.page.id,
      profilsPicture: result.data.page.frontmatter.profilPicture.childImageSharp.gatsbyImageData,
      aboutPicture: result.data.page.frontmatter.aboutPicture.childImageSharp.gatsbyImageData,
      project: result.data.project.nodes
    },
  })
}








export default indexPage