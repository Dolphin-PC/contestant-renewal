import React from "react";

const SupporterCardComp = ({ img, name, desc }) => {
  return (
    <div className="Supporter-Card hover-up">
      <img
        src={img}
        alt=""
        style={{
          borderRadius: "100px",
          width: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
      <br />
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default SupporterCardComp;
