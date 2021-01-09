import Layout from "../../components/layout";
import PostCard from "../../components/postCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Blog({ posts }) {
  return (
    <>
      <Layout title="Blog, aktualności, nowości">
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
  const res = await fetch("http://api.piotrmedynski.pl/blog/get/active");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    revalidate: 1,
  };
}

export default Blog;
