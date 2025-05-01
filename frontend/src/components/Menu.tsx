import "./Menu.css"
import { useState,useEffect } from "react"
import MenuIcon from '@mui/icons-material/Menu';


function Menu() {
const [items,setItems] = useState({})
const [loading, setLoading] = useState(true)
const [error, setError] = useState(false)
const [isExpanded, setIsExpanded] = useState(false)


useEffect(()=>{
    chrome.storage.sync.get()
    .then(data => {
        setItems(data);
        setLoading(false);
    })
    .catch(err=>{
        setError(err);
        setLoading(false);
    })
},[])

useEffect(()=>{
    if(isExpanded){
        document.body.classList.add("sb-expanded");
    }
    else{
        document.body.classList.remove("sb-expanded");
    }
},[isExpanded]);

if(loading){
    return <div>loading...</div>
}
//nothing

if(error){
    return <div>Error loading data:{error}</div>
}

const toggleSidebar = ()=>{
    setIsExpanded(prev => !prev);
}

return(
    <>
        <aside>
        <MenuIcon onClick={toggleSidebar} data-resize-btn></MenuIcon>
            <nav>
                <ul>
                    { Object.entries(items).map(([key,value])=>(
                        <li key={key}>
                            <span>
                                {key} : {JSON.stringify(value)}
                            </span>
                        </li>
                        ))
                    }
                </ul>
            </nav>
        
        </aside>
    </>
)
}



export default Menu