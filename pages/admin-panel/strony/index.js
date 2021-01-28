import Link from "next/link";
import { useRouter } from "next/router";

import AdminLayout from "./../../../components/admin/adminLayout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

import PageRow from "./../../../components/admin/pageRow";
import PageNew from "./../../../components/admin/pageNew";

const PagesList = ({ pages }) => {
  const router = useRouter();

  const addPage = (page) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/page/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  const deletePage = (pageID) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/page/delete/${pageID}`, {
      method: "DELETE",
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Podstrony</h3>
        <ListGroup>
          {pages.length > 0 ? (
            pages.map((page) => {
              return (
                <PageRow key={page._id} page={page} deletePage={deletePage} />
              );
            })
          ) : (
            <Alert variant="warning">
              Nie dodałeś jeszcze żadnych podstron!
            </Alert>
          )}
        </ListGroup>
        <PageNew addPage={addPage} />

        {/* <Button variant="success" onClick={handleClick}>
          Dodaj nowy wpis
        </Button> */}
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_LINK}/page/get`);
  const pages = await res.json();

  // Pass data to the page via props
  return { props: { pages } };
}

export default PagesList;
