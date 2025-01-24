import React, { useEffect, useState } from "react";
import axios from "axios";

function FruitPage({ fruitName }) {
  const [fruitData, setFruitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 明确指定后端地址
    axios
      .get(`http://localhost:5000/fruit/${fruitName}`)
      .then((response) => {
        // 检查响应数据是否为 JSON
        if (response.headers["content-type"].includes("application/json")) {
          setFruitData(response.data);
        } else {
          throw new TypeError("Response is not JSON");
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [fruitName]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Fruit Information</h1>
      <p>{fruitData.message}</p>
    </div>
  );
}

export default FruitPage;
