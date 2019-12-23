import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Planets = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      planets: [],
      currentPage: 1,
      totalPages: 1,
      loadingPlanets: false
    };

    this.getPlanets = this.getPlanets.bind(this);
  }

  componentDidMount() {
    this.setState({loadingPlanets: true});
    fetch("https://swapi.co/api/planets/?page=1")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            loadingPlanets: false,
            planets: result.results,
            totalPages: Math.ceil(result.count / 10)
          });
        },
        (error) => {
          this.setState({
            loadingPlanets: true,
            error
          });
        }
      )
  }

  getPlanets (page) {
    this.setState({loadingPlanets: true});
    fetch("https://swapi.co/api/planets/?page=" + page)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            planets: result.results,
            totalPages: Math.ceil(result.count / 10),
            currentPage: page,
            loadingPlanets: false
          });
        },
        (error) => {
          this.setState({
            loadingPlanets: false,
            error
          });
        }
      )
  };

  render() {

    const totalPages = this.state.totalPages;
    const currentPage = this.state.currentPage;

    const handleGetPlanets = (pn) => {
        this.getPlanets(pn)
    }

    const Planet = ({ planet }) => {
      return (
        <div className="card">
          <Link to="#">
            <div className="card-body">
                <ul className="list-group list-group-flush">
                    <h5 className="card-title">{planet.name}</h5>
                    <li className="list-group-item"><b>Rotation period:</b> {planet.rotation_period}</li>
                    <li className="list-group-item"><b>Orbital period:</b> {planet.orbital_period}</li>
                    <li className="list-group-item"><b>Diameter:</b> {planet.diameter}</li>
                    <li className="list-group-item"><b>Climate:</b> {planet.climate}</li>
                    <li className="list-group-item"><b>Gravity:</b> {planet.gravity}</li>
                    <li className="list-group-item"><b>Terrain:</b> {planet.terrain}</li>
                    <li className="list-group-item"><b>Surface water:</b> {planet.surface_water}</li>
                    <li className="list-group-item"><b>Population:</b> {planet.population}</li>
                </ul>
            </div>
          </Link>
        </div>
      );
    };

    const PlanetsList = ({ items }) => {
      return (
        <div className="row positon-relative">
            {this.state.loadingPlanets ?
            <Loader /> : null}
          {items.map((planet, key) => (
            <div className="col-6 col-md-4" key={key}>
              <Planet planet={planet} />
            </div>
          ))}
        </div>
      );
    };

    return (
      <div className="container margin-top-20">
        <PlanetsList items={this.state.planets} />
        { this.state.totalPages > 1 ? 
        <div className="row">
            <nav className="pagination-container">
                <ul className="pagination">
                    <li className={"page-item " + (currentPage === 1 ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === 1} aria-label="Previous" onClick={() => handleGetPlanets(currentPage - 1)}>
                            <span aria-hidden="true">&laquo;</span>
                        </button>
                    </li>
                    {
                        function () {
                            let pages = [];
                            for (let i = 0; i < totalPages; i++) {
                                pages.push(<li className={"page-item" + (currentPage - 1  === i ? ' active' : '')} onClick={() => handleGetPlanets(i + 1)} key={i}><button className="page-link">{i + 1}</button></li>)
                            }
                            return pages;
                        }()
                    }

                    <li className={"page-item " + (currentPage === totalPages ? "disabled" : '') }>
                        <button className="page-link" disabled={currentPage === totalPages} aria-label="Next" onClick={() => handleGetPlanets(currentPage + 1)} >
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

export default Planets;
