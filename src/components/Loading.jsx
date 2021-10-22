import { Circle } from "better-react-spinkit";
import chatImg from "../assets/chat.png";
function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <img src={chatImg} height={200}  alt=""/>
      </div>
      <Circle color="#56acdd" size={60} />
    </center>
  );
}

export default Loading;
