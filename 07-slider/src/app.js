import React, { useState, useEffect } from "react";
import { FaQuoteRight } from "react-icons/fa";
import data from "./data";
import { Button } from "./Button";

export const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [people, setPeople] = useState(data);
  const [index, setIndex] = useState(0);

  /*==========================
    SETTING UP COLLISION GUARD
  ===========================*/
  useEffect(() => {
    const lastIndex = people.length - 1;

    if (index < 0) {
      setIndex(lastIndex);
    }

    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, people]);

  useEffect(() => {
    let slideAnimation = setInterval(() => {
      setIndex((index) => ++index);
    }, 4000);

    return () => {
      clearInterval(slideAnimation);
    };
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people?.map((person, personIndex) => {
          const { id, image, name, title, quote } = person;
          let position = "nextSlide";

          if (personIndex === index) {
            position = "activeSlide";
          }

          if (
            personIndex === index - 1 ||
            (index === 0 && personIndex === people.length - 1)
          ) {
            position = "lastSlide";
          }

          return (
            <article className={position} key={id}>
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="title">{title}</p>
              <p className="text">{quote}</p>
              <FaQuoteRight className="icon" />
            </article>
          );
        })}

        <Button setIndex={setIndex} />
      </div>
    </section>
  );
};
