import { VideoHTMLAttributes } from "react";
import "../assets/stylesheets/components/_BackgroundVideo.scss";
import Button from "./Button";

interface BackgroundVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  video: string;
  header?: string;
  subheader?: string;
  flipAnimation?: boolean;
  cta_buttons?: boolean;
  onClick?: () => void;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({
  video,
  header,
  subheader,
  flipAnimation,
  cta_buttons,
  onClick,
  ...configs
}) => {
  let spanLetters;
  if (header && flipAnimation) {
    const headerLetters = header.split("");
    spanLetters = headerLetters.map((letter, i) => {
      if (letter === " ") {
        return <span key={i}>&nbsp;</span>;
      }
      return (
        <span key={i} style={{ animationDelay: `calc(.2s * ${i + 1})` }}>
          {letter}
        </span>
      );
    });
  }

  const getStarted = (
    <div id="get-started">
      <Button primary onClick={onClick}>
        Register
      </Button>
    </div>
  );

  const backgroundText = (
    <div className="header">
      {header && <h1>{spanLetters || header}</h1>}
      {subheader && <p className="u-margin-bottom-medium">{subheader}</p>}
      {cta_buttons && getStarted}
    </div>
  );

  return (
    <div id="video-container">
      {backgroundText}
      <video {...configs} id="bg-video">
        <source src={video} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
