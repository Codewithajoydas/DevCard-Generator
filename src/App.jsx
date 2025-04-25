import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState("");
  const [img, setImg] = useState(
    "data:image/jpeg;base64,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"
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const cardRef = useRef(null);

  const downloadImage = () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "devcard.png";
        link.href = dataUrl;
        link.click();
      })
      .catch(() => alert("Failed to download card."))
      .finally(() => setIsDownloading(false));
  };

  return (
    <div className="container">
      <header className="header">
        <h2>🚀 DevCard Generator</h2>
        <p>Create a beautiful developer card with your info!</p>
        <button onClick={downloadImage} disabled={isDownloading}>
          {isDownloading ? "⏳ Downloading..." : "📥 Download Card"}
        </button>
        {isDownloading && <div className="progress-bar"></div>}
      </header>

      <div className="p">
        <div className="first">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            id="name"
            onChange={(e) => setName(e.target.value)}
          />

          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Enter Title"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="skills">Skills (comma-separated)</label>
          <input
            type="text"
            placeholder="HTML, CSS, JS"
            id="skills"
            onChange={(e) => setSkills(e.target.value)}
          />

          <label htmlFor="links">Links</label>
          <input
            type="url"
            placeholder="https://yourportfolio.com"
            id="links"
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>

        <div className="second">
          <div className="card" ref={cardRef}>
            <img src={img} alt="Profile" width={100} />
            <h1>{name || "Your Name"}</h1>
            <h4>{title || "Your Title"}</h4>

            <p>
              <strong>Skills:</strong>
            </p>
            <div className="skills-chip">
              {skillList.length > 0 ? (
                skillList.map((skill, index) => (
                  <span key={index} className="chip">
                    {skill}
                  </span>
                ))
              ) : (
                <span className="chip">HTML</span>
              )}
            </div>

            <p>
              <strong>Links:</strong> {links || "https://yourportfolio.com"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
