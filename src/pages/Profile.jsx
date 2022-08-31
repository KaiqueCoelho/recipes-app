import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import Footer from '../components/Footer';
import profileImg from '../images/profileImg.svg';

function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('user'))) {
      setEmail(JSON.parse(localStorage.getItem('user')).email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
  };

  return (
    <div className="divSize">
      <Header title="Profile" />
      <section>
        <h5 data-testid="profile-email">{ email }</h5>
        <div className="d-flex m-2 flex-column">
          <Link to="/done-recipes">
            <Button
              type="button"
              data-testid="profile-done-btn"
              variant="danger"
              className="my-2"
            >
              Done Recipes
            </Button>
          </Link>
          <Link to="/favorite-recipes">
            <Button
              type="button"
              data-testid="profile-favorite-btn"
              variant="danger"
              className="my-2"
            >
              Favorite Recipes
            </Button>
          </Link>
          <Link to="/">
            <Button
              type="button"
              data-testid="profile-logout-btn"
              onClick={ handleLogout }
              variant="danger"
              className="my-2"
            >
              Logout
            </Button>
          </Link>
        </div>
      </section>
      <img src={ profileImg } alt="" width="280" heigth="175" className="profile-image" />
      <Footer />
    </div>
  );
}

export default Profile;
