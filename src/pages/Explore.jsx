import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import exploreImg from '../images/exploreImg.svg';

function Explore() {
  return (
    <section className="container-explorer">
      <Header title="Explore" />
      <main className="d-flex justify-content-around">
        <Link to="/explore/foods">
          <Button
            type="button"
            data-testid="explore-foods"
            variant="danger"
          >
            Explore Foods
          </Button>
        </Link>
        <Link to="/explore/drinks">
          <Button
            type="button"
            data-testid="explore-drinks"
            variant="danger"
          >
            Explore Drinks
          </Button>
        </Link>
      </main>
      <img
        src={ exploreImg }
        alt=""
        width="280"
        heigth="175"
        className="exploreImg"
      />
      <Footer />
    </section>
  );
}

export default Explore;
