import React, { createContext, ReactNode, useState } from "react";

interface ArticlesContextType {
  articles: any[];
  setArticles: React.Dispatch<React.SetStateAction<any[]>>;
}

export const ArticlesContext = createContext<ArticlesContextType>({
  articles: [],
  setArticles: () => {},
});

interface ArticlesContextProviderProps {
  children: ReactNode;
}

const ArticlesContextProvider: React.FC<ArticlesContextProviderProps> = ({
  children,
}) => {
  const [articles, setArticles] = useState<any[]>([]);

  return (
    <ArticlesContext.Provider value={{ articles, setArticles }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export default ArticlesContextProvider;
