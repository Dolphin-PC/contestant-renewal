import Lottie from "react-lottie";
import ActivityHeader from "./ActivityHeader.json";

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
