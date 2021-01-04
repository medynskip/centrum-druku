import Head from "next/head";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import PostCard from "../../components/postCard";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function Blog({ posts }) {
  return (
    <>
      <Head>
        <title>Centrum Druku - Twoja drukarnia internetowa</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />

      <section className="blog top-section">
        <Container>
          <Row noGutters xs={1}>
            {posts.map((post) => {
              return <PostCard key={post._id} post={post} />;
            })}
          </Row>
        </Container>
      </section>

      <Footer />
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
  };
}

export default Blog;
