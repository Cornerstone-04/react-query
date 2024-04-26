import React from "react";
import { Link } from "react-router-dom";

const HeroCard = ({ alterEgo, id, link, name, label, title }) => {
  return (
    <Link
      to={link}
      key={id}
      className="w-full sm:max-w-[250px] h-fit p-4 bg-slate-800 hover:bg-slate-700 transition-all ease-linear duration-300 text-white flex flex-col items-start justify-center cursor-pointer gap-2"
    >
      <p className="w-full capitalize">
        <span className="font-bold">{title}</span> {""}
        <span>{name}</span>
      </p>
      <p className="w-full flex h-fit">
        <span className="font-bold">{label}</span>
        <div className="w-full h-fit">{alterEgo}</div>
      </p>
    </Link>
  );
};

export default HeroCard;
