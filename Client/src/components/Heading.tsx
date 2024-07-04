interface HeadingProps {
  headingText: string;
}

const Heading: React.FC<HeadingProps> = ({ headingText }) => {
  return (
    <h1 className="text-center m-10 text-3xl font-extrabold text-gray-900 md:text-4xl md:mx-2 lg:text-5xl">
      {headingText}{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        Top Hacker News
      </span>{" "}
      Articles
    </h1>
  );
};

export default Heading;
