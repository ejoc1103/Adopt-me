import React, { useEffect, useState, useContext } from "react";
import pet from "@frontendmasters/pet";
import Carousel from "./Carousel";
import ErrorBoundary from "./ErrorBoundary";
import ThemeContext from "./ThemeContext";

const Details = ({ id }) => {
  const [detail, setDetail] = useState({
    name: "",
    animal: "",
    location: "",
    description: "",
    media: "",
    breed: "",
    loading: false,
  });
  const [theme] = useContext(ThemeContext);
  useEffect(() => {
    pet.animal(id).then(({ animal }) => {
      setDetail({
        name: animal.name,
        animal: animal.type,
        location: `${animal.contact.address.city}, ${animal.contact.address.state}`,
        description: animal.description,
        media: animal.photos,
        breed: animal.breeds.primary,
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
            <button style={{ backgroundColor: theme }}>Adopt {name}</button>
            <p>{description}</p>
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
