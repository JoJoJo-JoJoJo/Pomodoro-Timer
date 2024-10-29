import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faRotate } from "@fortawesome/free-solid-svg-icons";

const Play = () => (
  <FontAwesomeIcon icon={faPlay} style={{ color: "#63E6BE" }} />
);

const Pause = () => (
  <FontAwesomeIcon icon={faPause} style={{ color: "#63E6BE" }} />
);

const Reset = () => (
  <FontAwesomeIcon icon={faRotate} style={{ color: "#63E6BE" }} />
);

export { Play, Pause, Reset };
