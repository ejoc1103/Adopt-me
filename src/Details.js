import React, { useEffect, useState, useContext } from "react";
import pet from "@frontendmasters/pet";
import { navigate } from "@reach/router";
import Modal from "./Modal";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Details = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [detail, setDetail] = useState({
    name: "",
    animal: "",
    location: "",
    description: "",
    media: "",
    breed: "",
    url: "",
    loading: false,
    showModal,
  });

  const [theme] = useContext(ThemeContext);

  console.log(theme + "banan ");

  const adopt = () => {
    navigate(detail.url);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    pet.animal(id).then(({ animal }) => {
      setDetail({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
        url: animal.url,
        loading: false,
      });
    }, console.error);
  }, [id]);
  const { name, animal, location, description, media, breed, loading } = detail;

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="details">
          <Carousel media={media} />
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            <button onClick={toggleModal} style={{ backgroundColor: theme }}>
              Adopt {name}
            </button>
            <p>{description}</p>
            {showModal ? (
              <Modal>
                <h1>Would you like to adopt {name}?</h1>
                <div className="buttons">
                  <button onClick={adopt}>Yes</button>
                  <button onClick={toggleModal}>Not today, Sorry.</button>
                </div>
              </Modal>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

export default function DetailsWithErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
