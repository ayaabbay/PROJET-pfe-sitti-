import React from "react";

const MainContent = ({ children }) => {
  return (
    <div className="main-content">
      {children ? (
        children
      ) : (
        <>
          <h1>Welcome, Yasmine Ait Halibi!</h1>
          <p>
            Emsi Donnons à nos élèves ingénieurs une formation de qualité et des expériences
            qui les préparent au succès dans leurs carrières.
          </p>

          <div className="details">
            <div>
              <h3>1000%</h3>
              <p>Totale des stages</p>
            </div>
            <div>
              <h3>200%</h3>
              <p>Total des professeurs</p>
            </div>
            <div>
              <h3>300%</h3>
              <p>Total des étudiants</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MainContent;
