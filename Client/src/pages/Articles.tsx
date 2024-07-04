import { useContext } from "react";
import { ArticlesContext } from "../context/ArticlesContext";
import { Link } from "react-router-dom";
import Heading from "../components/Heading";
import Button from "../components/Button";

const Articles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw Error("No context");
  }

  const { articles } = context;

  return (
    <section>
      <Heading headingText={"Your"} />
      <Button url={"/"} text={"Go Back"} />
      <div className="relative flex min-h-screen flex-col items-center overflow-hidden bg-gray-50 p-6 sm:py-12">
        {articles?.map((article: any) => (
          <div
            key={article.id}
            className="animate-fadeindown bg-gray-50 mb-4 shadow-2xl w-full max-w-4xl flex flex-col sm:flex-row gap-3 sm:items-center  justify-between px-5 py-4 rounded-md"
          >
            <div>
              <span className="text-cyan-800 text-sm text-transform: uppercase">
                {article?.author}
              </span>
              <h3 className="font-bold mt-px">{article.title}</h3>
              <div className="flex items-center gap-3 mt-2">
                <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm">
                  {article.numOfComments}
                </span>
                <span className="bg-sky-100 text-sky-700 rounded-full px-3 py-1 text-sm">
                  {article.points}
                </span>
                <span className="text-slate-600 text-sm flex gap-1 items-center">
                  {article.time}
                </span>
              </div>
            </div>

            <div>
              <Link
                to={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white font-medium px-4 py-2 rounded-md flex gap-1 items-center"
              >
                Read
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Articles;
