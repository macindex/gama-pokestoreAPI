import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  padding: 12px;
  color: #fff;
  background-color: #008B8B;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  position: static;
  bottom: 0;

  @media (max-width: 360px) {
    flex-direction: column;
  }
`;

const Image = styled.img`
  height: 42px;
`;

const Author = styled.a`
  text-decoration: none;
  color: inherit;
  font-weight: bold;
`;

function Footer() {
  return (
    <Container>
      <Image src="/img/pokeball.png" alt="pokeball" />
      <p>
        Gama PokeStore - Desenvolvido por{" "}
        <Author
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/macindex"
        >
          Claudio Holanda
        </Author>
      </p>
    </Container>
  );
}

export default Footer;
