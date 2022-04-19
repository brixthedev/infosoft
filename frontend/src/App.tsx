import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [active, setActive] = useState(false);

  const SetActive = () => setActive((previousActive) => !previousActive);

  return (
    <div className="App">
      <h1>Simple Bulletin Board</h1>
      <button onClick={SetActive}>Create new article</button>
      <CreateArticle active={active} setActive={setActive} />
      <DisplayArticles />
    </div>
  );
}

function DisplayArticles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    getArticles();
  }, [articles]);

  const getArticles = () => {
    axios
      .get("http://localhost:3001/")
      .then((response) => setArticles(response.data));
  };

  type Article = {
    title: string;
    content: string;
    createdat: string;
  };

  // const onDeleteArticle = (article: Article) => {
  //   axios
  //     .delete("http://localhost:3001/", { article.title } )
  //     .then(() => console.log("Article deleted from database."));
  // }

  // TODO : Edit and Delete articles

  return (
    <div>
      {articles.length !== 0 &&
        articles.map((article: Article) => (
          <div key={article.title}>
            <h1>{article.title}</h1>
            <h2>{article.content}</h2>
            <p>{article.createdat}</p>
            <button>Edit article</button>
            <button>Delete article</button>
          </div>
        ))}
    </div>
  );
}

function CreateArticle({
  active,
  setActive,
}: {
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [article, setArticle] = useState<Record<string, string>>();

  const onChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setArticle((previousArticle) => ({
      ...previousArticle,
      [event.target.name]: event.target.value,
    }));
  };

  const onAddArticle = () => {
    axios
      .post("http://localhost:3001/", {
        ...article,
        createdat: new Date().toISOString(),
      })
      .then(() => console.log("Values sent to the server"));

    setArticle({
      title: "",
      content: "",
    });
  };

  return (
    <div className={active ? "form active" : "form"}>
      <label htmlFor="title">Title</label>
      <input type="text" id="title" name="title" onChange={onChange} />
      <label htmlFor="content">Content</label>
      <textarea
        name="content"
        id="content"
        cols={30}
        rows={10}
        onChange={onChange}
      />
      <button onClick={onAddArticle}>Add article</button>
    </div>
  );
}

export default App;
