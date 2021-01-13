import React, { useEffect, useState } from "react";
import pet from "@frontendmasters/pet";

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
          <div>
            <h1>{name}</h1>
            <h2>{`${animal} - ${breed} - ${location}`}</h2>
            <p>{description}</p>
            <img src={media} alt={media} />
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
