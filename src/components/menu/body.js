import React, { useState, useEffect } from "react";
import FirstDiagramm from "./firstDiagramm";
import SecondDiagramm from "./secondDiagramm";
import ThirdDiagramm from "./thirdDiagramm";
import Depo from "./depo";
import "../../styles/body.css";

function Body() {
  const [depoData, setDepoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://194.87.56.253:8081/api/analis/depo");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setDepoData(json);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container">
      <div className="diagram-container">
      <div className="bodyinfo">
        <FirstDiagramm header={depoData ? depoData.header : null} />
        <SecondDiagramm header={depoData ? depoData.header : null}/>
        <ThirdDiagramm months={depoData ? depoData.months : null}/>
      </div></div>
      <div className="bottom-item">
        {depoData && <Depo data={depoData} />}
      </div>
    </div>
  );
}

export default Body;