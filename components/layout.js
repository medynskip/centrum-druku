import Head from "next/head";

import Navbar from "./navbar";
import Footer from "./footer";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <title>{title} - Centrum Druku Online</title>
      </Head>

      <Navbar />
      <div className="content">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;
