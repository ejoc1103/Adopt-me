import React, { useState, useEffect } from "react";

const Carousel = ({ media }) => {
  const [photos, setPhotos] = useState(["http://placecorgi.com/600/600"]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (media.length) {
      setPhotos(() => media.map(({ large }) => large));
    }
  }, [media]);

  const handleClick = (e) => {
    console.log(e.target.dataset.index);
    setActive(+e.target.dataset.index);
  };

  return (
    <div className="carousel">
      <img src={photos[active]} alt="animal" />
      <div className="carousel-smaller">
        {photos.map((photo, index) => (
          // eslint-disable-next-line
          <img
            key={photo}
            onClick={handleClick}
            data-index={index}
            src={photo}
            alt="animal thumbnail"
            className={index === active ? "active" : ""}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
