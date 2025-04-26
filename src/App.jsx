import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState("");
  const [img, setImg] = useState(
    "https://th.bing.com/th/id/OIP.Xk4cqWGuDHJK-zszSsV23QHaJe?w=184&h=236&c=7&r=0&o=5&cb=iwc1&pid=1.7"
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkList = links
    .split(",")
    .map((link) => link.trim())
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
        <button onClick={downloadImage} disabled={isDownloading}>
          {isDownloading ? "Downloading..." : "Download Card"}
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

          <label htmlFor="links">Links (comma-separated)</label>
          <input
            type="text"
            placeholder="https://github.com/you, https://linkedin.com/in/you"
            id="links"
            onChange={(e) => setLinks(e.target.value)}
          />
        </div>

        <div className="second">
          <div className="card" ref={cardRef}>
            <img src={img} alt="Profile" width={100} height={100} />
            <h2>{name || "Your Name"}</h2>
            <h4 style={{ color: "gray" }}>{title || "Your Title"}</h4>

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
              <strong>Links:</strong>
            </p>
            <div className="links-logo">
              {linkList.length > 0 ? (
                linkList.map((link, index) => {
                  let logo = "🌐"; // default logo
                  if (link.includes("github.com")) {
                    logo = "🐙";
                  } else if (link.includes("linkedin.com")) {
                    logo = "💼";
                  } else if (link.includes("twitter.com")) {
                    logo = "🐦";
                  } else if (link.includes("facebook.com")) {
                    logo = "📘";
                  } else if (link.includes("gmail.com")) {
                    logo = "✉️";
                  }
                  return (
                    <a
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="logo-link"
                    >
                      {logo}
                    </a>
                  );
                })
              ) : (
                <span>🌐</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
