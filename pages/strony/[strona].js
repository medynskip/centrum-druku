import Layout from "../../components/layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import utils from "../../utils/utils";

import Image from "next/image";

function Post({ page, products, pages }) {
  const date = new Date(page.added);
  const displayDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} g: ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;

  const htmlContent = () => {
    return { __html: page.content };
  };

  return (
    <>
      <Layout title={page.title} products={products} pages={pages}>
        <section className="blog">
          <Container>
            <Row>
              <Col className="post-card">
                <h2>{page.title}</h2>
                <Badge variant="warning">{displayDate}</Badge>
                {page.image ? (
                  <div className="post-img">
                    <Image
                      src={`http://localhost:5001/${page.image}`}
                      layout="fill"
                    />
                  </div>
                ) : null}

                <div
                  className="post-full-text"
                  dangerouslySetInnerHTML={htmlContent()}
                />
              </Col>
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await res.json();

  const paths = pages.map((page) => {
    const titleSlug = utils.slugify(page.title);
    return `/strony/${titleSlug}`;
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const productsQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await productsQuery.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_LINK}/blog/get/active`
  //   );
  //   const allPosts = await res.json();
  let page;
  pages.map((single) => {
    const titleSlug = utils.slugify(single.title);
    if (titleSlug == params.strona) {
      page = { ...single };
    }
  });
  return { props: { page, products, pages } };
}

export default Post;
