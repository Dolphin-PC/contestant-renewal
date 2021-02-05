import Lottie from "react-lottie";
import ActivityHeader from "./ActivityHeader.json";
import catBallPlay from "./catBallPlay.json";
import Team from "assets/animation/Team.json";

export const ActivityHeaderAnimation = ({ width, height }) => {
  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: ActivityHeader,
  };

  return (
    <div>
      <Lottie options={animationOption} width={width} height={height} />
    </div>
  );
};
ActivityHeaderAnimation.defaultProps = {
  width: "100%",
  height: "100%",
};

export const CatBallPlayAnimation = ({ width, height }) => {
  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: catBallPlay,
  };

  return (
    <div style={{ width: width, height: height }}>
      <Lottie options={animationOption} />
    </div>
  );
};
ActivityHeaderAnimation.defaultProps = {
  width: "100%",
  height: "100%",
};

export const LandingPageTeamAnimation = ({ width, height }) => {
  const animationOption = {
    loop: true,
    autoplay: true,
    animationData: Team,
  };

  return (
    <div style={{ width: width, height: height }}>
      <Lottie options={animationOption} />
    </div>
  );
};
LandingPageTeamAnimation.defaultProps = {
  width: "100%",
  height: "100%",
};
