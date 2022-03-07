import React from "react";
import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repos } from "./styles";
import logo from "../../assets/logo.svg";

export const Dashboard: React.FC = () => {
  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de Repositórios do GitHub</Title>;
      <Form>
        <input type="text" placeholder="username/repository_name" />
        <button type="submit">Pesquisar</button>
      </Form>
      <Repos>
        <a href="/repositories">
          <img
            src="https://avatars.githubusercontent.com/u/68669091?v=4"
            alt="Repositório"
          />
          <div>
            <strong>juan-engmed/gitcollection</strong>
            <p>Repositório Curso React Typescript</p>
          </div>
          <FiChevronRight size={20} />
        </a>
      </Repos>
    </>
  );
};
