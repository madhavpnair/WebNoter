import { useState, useEffect } from "react";
import "./Popup.css"
import MenuIcon from '@mui/icons-material/Menu';

const Popup = () => {
    const [note, setNote] = useState("");
    const [url, setUrl] = useState("");


    useEffect(() => {
        // Get the current active tab URL
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs.length > 0 && tabs[0].url) {
                const urlObj = new URL(tabs[0].url);
                const domain = urlObj.hostname;

                setUrl(domain);
                // Fetch the saved note for this website
                chrome.storage.sync.get(domain, (result) => {
                    if (result[domain]) {
                        setNote(result[domain]);
                    }
                });
            }
        });
    }, []);

    const saveNote = () => {
        if (!url) return;  // Ensure we have a URL before saving

        // Save note in Chrome storage
        chrome.storage.sync.set({ [url]: note }, () => {
            console.log("Note saved for", url);
        });
    };

    return (
        <div className="popup_div">
            <div className="header">
                <MenuIcon className="MenuIcon"/>
                <h2>WebNoter</h2>
            </div>
            
            <p><strong>Website:</strong> {url}</p>
            <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a note..."
            />
            <button onClick={saveNote} >
                Save Note
            </button>
        </div>
    );
};

export default Popup;
