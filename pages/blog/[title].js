import Head from "next/head";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

function Post({ post }) {
  const date = new Date(post.added);
  const displayDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} g: ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;

  const htmlContent = () => {
    return { __html: post.content };
  };

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

      <section className="blog">
        <Container>
          <Row>
            <Col className="post-card">
              <h2>{post.title}</h2>
              <Badge variant="warning">{displayDate}</Badge>
              <div className="post-img">
                <img src={post.image} />
              </div>

              <div
                className="post-full-text"
                dangerouslySetInnerHTML={htmlContent()}
              />
            </Col>
          </Row>
        </Container>
      </section>
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await fetch(
    "https://centrum-druku-api.herokuapp.com/api/blog/get/active"
  );
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => `/blog/${post._id}`);

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://centrum-druku-api.herokuapp.com/api/blog/get/active`
  );

  const allPosts = await res.json();
  let post;
  allPosts.map((single) => {
    if (single._id == params.title) {
      post = { ...single };
    }
  });

  // Pass post data to the page via props
  return { props: { post } };
}

export default Post;
