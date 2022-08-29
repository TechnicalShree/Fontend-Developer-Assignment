import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [articals, setArticals] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");

  const URI =
    "https://newsapi.org/v2/everything?q=tesla&from=2022-07-29&sortBy=publishedAt&apiKey=2c924600f1524970899020d9b6ed9037";

  useEffect(() => {
    (async () => {
      const res = await axios.get(URI);
      console.log(res.data.articles);
      setArticals(res.data.articles);
    })();
  }, []);

  const searchHandler = () => {
    setFilteredData(
      articals.filter((artical) => artical.source.name.includes(search))
    );
  };

  return (
    <div className="newsApp">
      <h2>News Application</h2>
      <div className="searchBar">
        <input
          type="text"
          value={search}
          className="searchInput"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn" onClick={searchHandler}>
          Search
        </button>
      </div>
      <div className="displayNews">
        {filteredData?.map((artical, idx) => (
          <div key={idx} className="newsBox">
            <h3 className="title" title={artical?.title}>
              {artical.title.substr(0, 50) + "..."}
            </h3>
            <p>{artical.description.substr(0, 100) + "..."}</p>
            <p>{artical.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
