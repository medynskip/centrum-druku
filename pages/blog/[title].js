import Layout from "../../components/layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import utils from "../../utils/utils";

import Image from "next/image";

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
      <Layout title={post.title}>
        <section className="blog">
          <Container>
            <Row>
              <Col className="post-card">
                <h2>{post.title}</h2>
                <Badge variant="warning">{displayDate}</Badge>
                <div className="post-img">
                  <Image
                    src={`http://localhost:5001/${post.image}`}
                    layout="fill"
                  />
                </div>

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
  const res = await fetch("http://api.piotrmedynski.pl/blog/get/active");
  const posts = await res.json();

  const paths = posts.map((post) => {
    const titleSlug = utils.slugify(post.title);
    return `/blog/${titleSlug}`;
  });

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://api.piotrmedynski.pl/blog/get/active`);
  const allPosts = await res.json();
  let post;
  allPosts.map((single) => {
    const titleSlug = utils.slugify(single.title);
    if (titleSlug == params.title) {
      post = { ...single };
    }
  });
  return { props: { post } };
}

export default Post;
