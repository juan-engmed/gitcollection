import React, { useState } from "react";

import { api } from "../../services/api";

import { FiChevronRight } from "react-icons/fi";
import { Title, Form, Repos, Error } from "./styles";
import logo from "../../assets/logo.svg";

interface IGitData {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
export const Dashboard: React.FC = () => {
  const [repos, setRepos] = useState<IGitData[]>([]);
  const [newRepo, setNewRepo] = useState("");

  const [inputError, setInputError] = useState("");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setNewRepo(event.target.value);
  }

  async function handleAddRepo(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();

    //Verificação caso esteja vazia a pesquisa
    if (!newRepo) {
      setInputError("Informe o nome do repositório");
      return;
    }

    const response = await api.get<IGitData>(`repos/${newRepo}`);

    const repository = response.data;

    setRepos([...repos, repository]);
    setNewRepo("");
  }

  return (
    <>
      <img src={logo} alt="GitCollection" />
      <Title>Catálogo de Repositórios do GitHub</Title>;
      <Form hasError={Boolean(inputError)} onSubmit={handleAddRepo}>
        <input
          className="inputRepo"
          type="text"
          placeholder="username/repository_name"
          onChange={handleInputChange}
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repos>
        {repos.map((repository) => (
          <a href="/repositories" key={repository.full_name}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Repos>
    </>
  );
};
