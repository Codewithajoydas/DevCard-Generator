import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState("");
  const [img, setImg] = useState(
    "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
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
            <img src={img} alt="Profile" width={100} height={100} />
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
