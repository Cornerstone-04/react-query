import React from "react";

const HeroCard = ({ id, name, alterEgo }) => {
  return (
    <div
      key={id}
      className="w-full sm:max-w-[250px] h-fit p-4 bg-slate-800 hover:bg-slate-700 transition-all ease-linear text-white flex flex-col items-start justify-center"
    >
      <p>
        <span className="font-bold">Hero:</span> {name}
      </p>
      <p>
        <span className="font-bold">Alias:</span> {alterEgo}
      </p>
    </div>
  );
};

export default HeroCard;
