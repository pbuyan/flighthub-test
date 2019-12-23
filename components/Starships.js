import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Starships = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        starships: [],
        currentPage: 1,
        totalPages: 1,
        loadingStarships: false
    };

    this.getStarships = this.getStarships.bind(this);
  }

  componentDidMount() {
    this.setState({loadingStarships: true});
    fetch("https://swapi.co/api/starships/?page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadingStarships: false,
            starships: result.results,
            totalPages: Math.ceil(result.count / 10)
          });
        },
        (error) => {
          this.setState({
            loadingStarships: true,
            error
          });
        }
      )
  }

  getStarships (page) {
    this.setState({loadingStarships: true});
    fetch("https://swapi.co/api/starships/?page=" + page)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            starships: result.results,
            totalPages: Math.ceil(result.count / 10),
            currentPage: page,
            loadingStarships: false
          });
        },
        (error) => {
          this.setState({
            loadingStarships: false,
            error
          });
        }
      )
  };

  render() {

    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;

    const handleGetStarships = (pn) => {
        this.getStarships(pn)
    }

    const Starship = ({ starship }) => {
      return (
        <div className="card">
          <Link to="#">
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <h5 className="card-title">{starship.name}</h5>
                    <li className="list-group-item"><b>Model:</b> {starship.model}</li>
                    <li className="list-group-item"><b>Cost in credits:</b> {starship.cost_in_credits}</li>
                    <li className="list-group-item"><b>Length:</b> {starship.length}</li>
                    <li className="list-group-item"><b>Max atmosphering speed:</b> {starship.max_atmosphering_speed}</li>
                    <li className="list-group-item"><b>Crew:</b> {starship.crew}</li>
                    <li className="list-group-item"><b>Passengers:</b> {starship.passengers}</li>
                    <li className="list-group-item"><b>Cargo capacity:</b> {starship.cargo_capacity}</li>
                    <li className="list-group-item"><b>Consumables:</b> {starship.consumables}</li>
                    <li className="list-group-item"><b>MGLT:</b> {starship.MGLT}</li>
                    <li className="list-group-item"><b>Consumables:</b> {starship.consumables}</li>
                    <li className="list-group-item"><b>Starship class:</b> {starship.starship_class}</li>
                </ul>
            </div>
          </Link>
        </div>
      );
    };

    const StarshipsList = ({ items }) => {
      return (
        <div className="row positon-relative">

            {this.state.loadingStarships ?
            <Loader /> : null}

            {items.map((starship, key) => (
                <div className="col-6 col-md-4" key={key}>
                    <Starship starship={starship} />
                </div>
            ))}
        </div>
      );
    };

    return (
      <div className="container margin-top-20">
        <StarshipsList items={this.state.starships} />
        { this.state.totalPages > 1 ? 
        <div className="row">
            <nav className="pagination-container">
                <ul className="pagination">
                    <li className={"page-item " + (currentPage === 1 ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === 1} aria-label="Previous" onClick={() => handleGetStarships(currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {
                        function () {
                            let pages = [];
                            for (let i = 0; i < totalPages; i++) {
                                pages.push(<li className={"page-item" + (currentPage - 1  === i ? ' active' : '')} onClick={() => handleGetStarships(i + 1)} key={i}><button className="page-link">{i + 1}</button></li>)
                            }
                            return pages;
                        }()
                    }

                    <li className={"page-item " + (currentPage === totalPages ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === totalPages} aria-label="Next" onClick={() => handleGetStarships(currentPage + 1)} >
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

export default Starships;
