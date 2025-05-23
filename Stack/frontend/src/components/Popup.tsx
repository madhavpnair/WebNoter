import { useState, useEffect } from "react";
import "./Popup.css";
import Menu from "./Menu";
import useNoteStore from "./noteStore";

const Popup = () => {
  const [url, setUrl] = useState("");
  const note = useNoteStore((state) => state.note);
  const setNote = useNoteStore((state) => state.setNote);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length > 0 && tabs[0].url) {
        const urlObj = new URL(tabs[0].url);
        const domain = urlObj.hostname;

        setUrl(domain);

        chrome.storage.sync.get(domain, (result) => {
          if (result[domain]) {
            setNote(result[domain]);
          }
        });
      }
    });
  }, []);

  const saveNote = () => {
    if (!url) return;

    chrome.storage.sync.set({ [url]: note }, () => {
      console.log("Note saved for", url);
    });

    // Trigger re-fetch in Menu by changing the store value
    setNote(note + " ");
  };

  return (
    <div className="popup_div">
      <aside className="side_bar">
        <Menu />
      </aside>

      <main className="popup_body">
        <div className="header">
          <h2 className="Title">WebNoter</h2>
        </div>

        <p className="websiteCard">
          <strong>Website:</strong> {url}
        </p>

        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
        />

        <button onClick={saveNote}>Save Note</button>
      </main>
    </div>
  );
};

export default Popup;
