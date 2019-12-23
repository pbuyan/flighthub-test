import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const People = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      searchValue: "",
      currentPage: 1,
      totalPages: 1,
      searchTimer: null,
      searchedPeople: [],
      loadingPeople: false
    };

    this.searchPeople = this.searchPeople.bind(this);
    this.getPeople = this.getPeople.bind(this);
    this.getPerson = this.getPerson.bind(this);
  }

  componentDidMount() {
    this.setState({loadingPeople: true});
    fetch("https://swapi.co/api/people/?page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadingPeople: false,
            people: result.results,
            totalPages: Math.ceil(result.count / 10)
          });
        },
        (error) => {
          this.setState({
            loadingPeople: true,
            error
          });
        }
      )
  }

  searchPeople(search) {
    fetch("https://swapi.co/api/people/?search=" + search)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({searchedPeople: result.results});
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
  }

  getPeople (page) {
    this.setState({loadingPeople: true});
    fetch("https://swapi.co/api/people/?page=" + page)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            people: result.results,
            totalPages: Math.ceil(result.count / 10),
            currentPage: page,
            loadingPeople: false
          });
        },
        (error) => {
          this.setState({
            loadingPeople: false,
            error
          });
        }
      )
  };

  getPerson (url) {
    this.setState({loadingPeople: true});
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
            this.setState({
              searchValue: result.name,
              people: [result],
              searchedPeople: [],
              loadingPeople: false,
              totalPages: 1
            });
        },
        (error) => {
          this.setState({
            loadingPeople: false,
            error
          });
        }
      )
  };

  render() {
    let searchTimer;
    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;
    const searchedPeople = this.state.searchedPeople;

    const handleGetPeople = (pn) => {
        this.getPeople(pn)
    }

    const handleSearchTimer = (e) => {
        let searchTerm = e.target.value;
        clearTimeout(searchTimer);
        createSearchTimer(searchTerm)
        this.setState({searchValue: searchTerm});
    }

    const createSearchTimer = (searchTerm) => {
        searchTimer = setTimeout(this.searchPeople, 300, searchTerm);
    }

    const handleSelectPerson = (url) => {
        this.getPerson(url)
    }

    const resetSearch = () => {
        this.setState({searchValue: ""});
        this.getPeople(1)
    }

    const Person = ({ person }) => {
      return (
        <div className="card">
          <Link to="#">
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <h5 className="card-title">{person.name}</h5>
                    <li className="list-group-item"><b>Gender:</b> {person.gender}</li>
                    <li className="list-group-item"><b>Mass:</b> {person.mass}</li>
                    <li className="list-group-item"><b>Height:</b> {person.height}</li>
                    <li className="list-group-item"><b>Hair color:</b> {person.hair_color}</li>
                    <li className="list-group-item"><b>Skin color:</b> {person.skin_color}</li>
                    <li className="list-group-item"><b>Eye color:</b> {person.eye_color}</li>
                    <li className="list-group-item"><b>Birth year:</b> {person.birth_year}</li>
                </ul>
            </div>
          </Link>
        </div>
      );
    };

    const PeopleList = ({ items }) => {
      return (
        <div className="row positon-relative">
            {this.state.loadingPeople ?
            <Loader /> : null}
          {items.map((person, key) => (
            <div className="col-6 col-md-3" key={key}>
              <Person person={person} />
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="container">
        <div className="row filter-bar">
          <div className="col-md-12">
              <div className="search-container">

                <div className="input-group">
                    <input
                        name="searchPeople"
                        value={this.state.searchValue}
                        type="text"
                        className="form-control"
                        placeholder="Search people"
                        onChange={(e) => handleSearchTimer(e)}
                    />
                    <div className="input-group-append" onClick={() => resetSearch()}>
                        <span className="input-group-text">
                        <i className="fas fa-times"></i>
                        </span>
                    </div>

                    {
                      searchedPeople.length > 0 ?
                      <ul className="list-group shadow-sm">
                        {searchedPeople.map((person, key) => (
                            <li className="list-group-item" key={key} onClick={() => handleSelectPerson(person.url)}>
                                <a href="#"><i>{person.name}</i></a>
                            </li>
                        ))}
                      </ul>: null
                    }
                    
                </div>
              </div>
          </div>
        </div>
        <PeopleList items={this.state.people} />
        { this.state.totalPages > 1 ? 
        <div className="row">
            <nav className="pagination-container">
                <ul className="pagination">
                    <li className={"page-item " + (currentPage === 1 ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === 1} aria-label="Previous" onClick={() => handleGetPeople(currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {
                        function () {
                            let pages = [];
                            for (let i = 0; i < totalPages; i++) {
                                pages.push(<li className={"page-item" + (currentPage - 1  === i ? ' active' : '')} onClick={() => handleGetPeople(i + 1)} key={i}><button className="page-link">{i + 1}</button></li>)
                            }
                            return pages;
                        }()
                    }

                    <li className={"page-item " + (currentPage === totalPages ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === totalPages} aria-label="Next" onClick={() => handleGetPeople(currentPage + 1)} >
                            <span aria-hidden="true">&raquo;</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>: null }
      </div>
    );
  }
};

export default People;
