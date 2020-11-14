import React from "react";
import Container from "@material-ui/core/Container"
import TopBar from "../components/TopBar";

export default function Layout({ children }) {
  return (
    <>
      <TopBar />
      <Container>{children}</Container>
    </>
  );
}
