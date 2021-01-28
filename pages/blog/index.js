import Layout from "../../components/layout";
import PostCard from "../../components/postCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Blog({ posts, products, pages }) {
  return (
    <>
      <Layout
        title="Blog, aktualności, nowości"
        products={products}
        pages={pages}
      >
        <section className="blog top-section">
          <Container>
            <Row noGutters xs={1}>
              {posts.map((post) => {
                return <PostCard key={post._id} post={post} />;
              })}
            </Row>
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const postsQuery = await fetch("http://api.piotrmedynski.pl/blog/get/active");
  const posts = await postsQuery.json();

  const productsQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await productsQuery.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  return {
    props: {
      products,
      pages,
      posts,
    },
    revalidate: 1,
  };
}

export default Blog;
