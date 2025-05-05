import { useState, useEffect } from "react";
import "./Popup.css";
import Menu from "./Menu";
import useNoteStore from "./noteStore"
// import MenuIcon from '@mui/icons-material/Menu';

const Popup = () => {
    const [url, setUrl] = useState("");
    const note = useNoteStore((state) => state.note);
    const setNote = useNoteStore((state) => state.setNote);

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
        setNote(note+' ');
    };

    return (
        <div className="popup_div">
            <div className="side_bar"><Menu/></div>
            <div className="popup_body">
                <div className="header">
                    <h2 className="Title">WebNoter</h2>
                </div>
                <p className="websiteCard"><strong>Website:</strong> {url}</p>
                <textarea
                    value={note}
                    onChange={(e) => {setNote(e.target.value);console.log("onChange saved!");}}
                    placeholder="Write a note..."
                />
                <button onClick={saveNote} >
                    Save Note
                </button>
            </div>
            
        </div>
    );
};

export default Popup;
