import Layout from "../components/layout";

const Error404 = ({ products, pages }) => {
  return (
    <Layout products={products} pages={pages} title="Ups, coś poszło nie tak">
      404
    </Layout>
  );
};

export async function getStaticProps() {
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
    },
  };
}

export default Error404;
