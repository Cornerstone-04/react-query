const PrimaryBtn = ({ action, label }) => {
  return (
    <button
      onClick={action}
      className="w-fit p-3 bg-green-500 text-white font-semibold hover:bg-green-600 hover:scale-[1.1] transition-all ease-linear duration-300 hover:font-bold focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50 focus:bg-green-600"
    >
      {label}
    </button>
  );
};

export default PrimaryBtn;
