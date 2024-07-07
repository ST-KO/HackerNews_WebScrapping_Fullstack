import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ArticlesContext } from "../context/ArticlesContext";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import io from "socket.io-client";

const serverURL = import.meta.env.VITE_APP_BACKEND_URL;

const socket = io(serverURL);

interface FormData {
  numberOfArticles: number;
  additionalData: boolean;
  outputFormat: string;
  email: string;
}

const HackerNewsForm: React.FC = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw Error("No context");
  }
  const { setArticles } = context;

  const [data, setData] = useState<FormData>({
    numberOfArticles: 10,
    additionalData: true,
    outputFormat: "CSV",
    email: "",
  });

  const [loadingMessage, setLoadingMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    socket.on("loading", (message) => {
      setLoadingMessage(message);
    });

    return () => {
      socket.off("loading");
    };
  }, []);

  const onChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setLoadingMessage(
        "Waking up the server due to free tier limitations on Render.com...\nThank you for bearing with me"
      );
      const response = await axios.post(`${serverURL}/api/save-articles`, data);

      setArticles(response.data.data);

      setData({
        numberOfArticles: 10,
        additionalData: true,
        outputFormat: "CSV",
        email: "",
      });

      navigate("/articles");
      setLoading(false);
    } catch (error) {
      console.log(error);
      alert("An error occured while submitting the form. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen">
      {loading ? (
        <Loading loadingMessage={loadingMessage} />
      ) : (
        <form
          onSubmit={onSubmitHandler}
          className="max-w-lg mx-8 pt-10 md:mx-auto md:max-w-screen-sm lg:max-w-screen-md"
        >
          <div className="mb-10">
            <label
              htmlFor="numberOfArticles"
              className="block text-sm font-medium text-gray-900"
            >
              Enter the number of articles to retrieve:
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="number"
              id="numberOfArticles"
              name="numberOfArticles"
              value={data.numberOfArticles}
              onChange={onChangeHandler}
              required
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="isEmail"
              className="block text-sm font-medium text-gray-900"
            >
              Would you like to receive an email with the data file attached?
              (optional)
            </label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="example@email.com"
            />
          </div>
          <div className="mb-10">
            <label
              htmlFor="outputFormat"
              className="block text-sm font-medium text-gray-900"
            >
              Which format do you want to get the data in?
            </label>
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="outputFormat"
              id="outputFormat"
              value={data.outputFormat}
              onChange={onChangeHandler}
            >
              <option value="CSV">CSV</option>
              <option value="JSON">JSON</option>
            </select>
          </div>

          <div className="flex items-start mb-10">
            <div className="flex items-center h-5">
              <input
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                type="checkbox"
                id="additionalData"
                name="additionalData"
                checked={data.additionalData}
                onChange={onChangeHandler}
              />
            </div>
            <label
              htmlFor="additionalData"
              className="ms-2 text-sm font-medium text-gray-900"
            >
              Include Additional Data
              <span className="text-gray-600 ml-2 text-sm">
                (Author, Points, Time, Number of Comments)
              </span>
            </label>
          </div>
          <button
            type="submit"
            className="text-white bg-gray-800 hover:bg-gray-950 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Submit
          </button>
        </form>
      )}
    </section>
  );
};

export default HackerNewsForm;
