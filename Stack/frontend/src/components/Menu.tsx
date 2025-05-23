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

  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    chrome.storage.sync
      .get()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
        console.error(err);
      });
  }, [note]);

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

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  if (loading) {
    return <div>Loading notes...</div>;
  }

  if (error) {
    return <div>Error loading notes.</div>;
  }

  return (
    <aside ref={sidebarRef} className="sb-shrink">
      <MenuIcon onClick={toggleSidebar} className="menu-toggle" />

      <nav>
        <ul>
          {Object.entries(items).map(([key, value]) => (
            <li key={key}>
              <span>
                {key}
                <br />
                {JSON.stringify(value)}
              </span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Menu;
