import "./main-fn";
import Timer from "./timer.tsx";

function Link() {
  return (
    <>
      <div className="link">
        <a href="./fet-trick/canvas-music.html">canvas-music</a>
        <a href="./fet-trick/clipboard-api.html">clipboard-api</a>
        <a href="./fet-trick/canvas-img.html">canvas-img</a>
        <a href="./fet-trick/eye-dropper.html">eye dropper</a>
        <a href="./fet-trick/media-query">media-query</a>
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <div id="app">
        <Timer></Timer>
        <Link></Link>
      </div>
    </>
  );
}

export default App;
