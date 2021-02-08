import React from "react";

const RuleTextFormatComp = (props) => {
  const { header, subHeader, rules } = props;

  return (
    <>
      <h3>{header}</h3>
      <p>{subHeader}</p>
      <hr />
      {rules.map((rule, index) => (
        <div className="Rule-Text" key={index}>
          <small>#{index + 1}</small>
          <br />
          <h4>{rule.mainText}</h4>
          <p>{rule.subText}</p>
        </div>
      ))}
    </>
  );
};

RuleTextFormatComp.defaultProps = {
  header: "제목이 들어갑니다.",
  subHeader: "sub Header Title",
  rules: [
    {
      mainText: "Main Text",
      subText: "sub Text",
    },
    {
      mainText: "Main Text2",
      subText: "sub Text2",
    },
  ],
};

export default RuleTextFormatComp;
