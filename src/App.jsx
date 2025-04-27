import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [links, setLinks] = useState("");
  const [img, setImg] = useState(
    "https://img.pikbest.com/photo/20241022/office-boy-in-photo_10993810.jpg!bw700"
  );
  const [isDownloading, setIsDownloading] = useState(false);

  const cardRef = useRef(null);
  const fileInputRef = useRef(null);

  const skillList = skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const linkList = links
    .split(",")
    .map((link) => link.trim())
    .filter(Boolean);

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

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 20;
    const rotateY = ((x - centerX) / centerX) * 20;

    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    card.style.transition = "transform 0.1s ease";
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.transition = "transform 0.5s ease";
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    card.style.transition = "transform 0.1s ease";
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please drop an image file!");
    }
  };

  const popup = () => {
    return (
      <div className="popUp">

      </div>
    )
  };

  return (
    <div className="container">
      <header className="header">
        <h2>DevCard</h2>
        <div
          style={{
            display: "flex",
            width: 500,
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <button onClick={downloadImage} disabled={isDownloading}>
            {isDownloading ? "Downloading..." : "Download Card"}
          </button>
          <button>Share</button>
          <svg
            style={{ cursor: "pointer" }}
            onClick={popup}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-menu"
          >
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </div>
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
          <div
            className="card"
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleMouseEnter}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
          >
            <img
              src={img}
              alt="Profile"
              width={100}
              height={100}
              style={{ cursor: "pointer", borderRadius: "50%" }}
              onClick={() => fileInputRef.current.click()}
            />
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
                  let logo = "🌐";
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

          {/* Hidden file input for image upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            ref={fileInputRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
