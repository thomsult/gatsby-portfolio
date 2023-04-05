/** @jsx jsx */
/** @jsxFrag */

import { graphql } from "gatsby";
import { MDXProvider } from "@mdx-js/react"; // Provide common components here
import Layout from "../components/layout";

import { jsx } from "theme-ui";
import Button from "../components/utils/button";
import { GatsbyImage, StaticImage, getImage } from "gatsby-plugin-image";
import { DesktopMockup, PhoneMockup,TabletMockup } from "../components/utils/mockup";
export default function PageTemplate(props) {
  const frontMatter = props.pageContext.frontmatter;
  const headerImages = props.data.mdx.frontmatter;

  const { title, description, image, date, tags, gitHubUrl, liveUrl } =
    frontMatter;
  console.log(props);
  return (
    <Layout location={props.location}>
      <HeaderPages headerImages={headerImages} />
      <section>{props.children}</section>
      <footer
        sx={{
          marginTop: "auto",
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
      }
    }
  }
`;

const HeaderPages = (props) => {
  const { headerImages } = props;
  const { projectImage, projectImageMobile } = headerImages;
  console.log(headerImages);
  const ImageMobile = getImage(
    projectImageMobile.childrenImageSharp[0].gatsbyImageData
  );
  const Image = getImage(projectImage.childrenImageSharp[0].gatsbyImageData);
  return (
    <header
      sx={{
        width: "100%",
        maxWidth: "1200px",
        margin: "auto",
        overflow: "hidden",
      }}
    >
      <h1>Header</h1>
      <PhoneMockup>
        <GatsbyImage image={ImageMobile} alt="projectImage" />
        </PhoneMockup>
        <TabletMockup>
        <GatsbyImage image={Image} alt="projectImage" />
        </TabletMockup>
        <DesktopMockup>
        <GatsbyImage image={Image} alt="projectImage" />
        </DesktopMockup>
    </header>
  );
};








{
  /* <div class="image-mockup">
    <div class="phone-wrap">
      <img
        class="phone"
        src="./images/google_pixel_3___not_pink.png"
        alt="google pixel mockup"
      >
      
    </div>
    <p class="phone-comment">Image de la version Mobile</p>
    <div class="retina-wrap">
      <img class="retina" src="./images/apple_imac_retina.png" alt=" apple retina mockup" >
    </div>
    <div class="surface-wrap">
      <img class="surface" src="./images/microsoft_surface_book.png" alt="microsoft surface mockup" >
    </div>
  </div> */
}
