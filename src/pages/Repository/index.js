import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FaSpinner } from 'react-icons/fa';

import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  SelectContainer,
  PaginationContainer,
} from './styles';

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    stateFilter: 'all',
    page: 1,
  };

  componentDidMount() {
    this.apiCall();
  }

  apiCall = async () => {
    const { match } = this.props;
    const { stateFilter, page } = this.state;

    const repoName = decodeURIComponent(match.params.repoName);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: stateFilter,
          per_page: 5,
          page,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  };

  handleSelectChange = async e => {
    await this.setState({ stateFilter: e.target.value });
    this.apiCall();
  };

  nextPage = async () => {
    const { page } = this.state;

    await this.setState({ page: page + 1 });
    this.apiCall();
  };

  prevPage = async () => {
    const { page } = this.state;

    const prevPage = page > 0 ? page - 1 : page;

    await this.setState({ page: prevPage });
    this.apiCall();
  };

  render() {
    const { repository, issues, loading, stateFilter, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <div>
            Carregando
            <FaSpinner color="#fff" size={16} />
          </div>
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <SelectContainer stateFilter={stateFilter}>
            <select onChange={this.handleSelectChange}>
              <option defaultValue value="all">
                Todas
              </option>
              <option value="open">Abertas</option>
              <option value="closed">Fechadas</option>
            </select>
          </SelectContainer>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <span>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </span>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}

          <PaginationContainer>
            <button onClick={this.prevPage} disabled={page <= 1} type="button">
              Anterior
            </button>
            <span>Página {page}</span>
            <button onClick={this.nextPage} type="button">
              Próxima
            </button>
          </PaginationContainer>
        </IssueList>
      </Container>
    );
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repoName: PropTypes.string,
    }),
  }).isRequired,
};
