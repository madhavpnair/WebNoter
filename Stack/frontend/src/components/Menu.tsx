import "./Menu.css";
import { useState, useEffect, useRef } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import useNoteStore from "./noteStore";

function Menu() {
  const [items, setItems] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const note = useNoteStore((state) => state.note);

  useEffect(() => {
    console.log("a note is saved in Popup");
    chrome.storage.sync
      .get()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [note]);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const divs = document.getElementsByTagName("div");
    if (divs.length > 0) {
      divs[0].classList.add("sb-shrink");
    }
  }, []);

  useEffect(() => {
    if (!sidebarRef.current) return;

    if (isExpanded) {
      sidebarRef.current.classList.add("sb-expanded");
      sidebarRef.current.classList.remove("sb-shrink");
    } else {
      sidebarRef.current.classList.add("sb-shrink");
      sidebarRef.current.classList.remove("sb-expanded");
    }
  }, [isExpanded]);

  if (loading) {
    return <div>loading...</div>;
  }
  //nothing

  if (error) {
    return <div>Error loading data:{error}</div>;
  }

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div ref={sidebarRef}>
      <aside>
        <MenuIcon onClick={toggleSidebar} data-resize-btn></MenuIcon>
        <nav>
          <ul>
            {Object.entries(items).map(([key, value]) => (
              <li key={key}>
                <span>
                  {key} :<br></br> {JSON.stringify(value)}
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Menu;
