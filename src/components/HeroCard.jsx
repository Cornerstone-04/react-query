import React from "react";
import { Link } from "react-router-dom";

const HeroCard = ({ alterEgo, id, link, name }) => {
  return (
    <Link
      to={link}
      key={id}
      className="w-full sm:max-w-[250px] h-fit p-4 bg-slate-800 hover:bg-slate-700 transition-all ease-linear duration-300 text-white flex flex-col items-start justify-center cursor-pointer"
    >
      <p>
        <span className="font-bold">Hero:</span> {name}
      </p>
      <p>
        <span className="font-bold">Alias:</span> {alterEgo}
      </p>
    </Link>
  );
};

export default HeroCard;
