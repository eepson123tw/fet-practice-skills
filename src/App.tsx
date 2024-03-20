import "./main-fn";
import Timer from "./timer.tsx";

function Link() {
  // if is build change the link to under '/'
  const urlhead = import.meta.env.MODE === "production" ? "." : "/fet-trick";
  return (
    <>
      <div className="link">
        <a href={urlhead + "/canvas-music.html"}>canvas-music</a>
        <a href={urlhead + "/clipboard-api.html"}>clipboard-api</a>
        <a href={urlhead + "/canvas-img.html"}>canvas-img</a>
        <a href={urlhead + "/eye-dropper.html"}>eye dropper</a>
        <a href={urlhead + "/media-query"}>media-query</a>
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
