import { useState, useEffect } from "react";
import "../Styles/Components.css";
// import {PopUp_forms} from './PopUp_forms.tsx';
export default function Shelf() {
    const [open, setOpen] = useState<boolean>(false);
    console.log(open);
    return (
        <div className="Shelf">
            <div className="ButtonDiv item-1">
                <div className="ButtonArea BA-left">
                    <button className="Button B-plus" onClick={()=>setOpen(!open)}><h1>+</h1></button>
                </div>
            </div>

            <div className="IdeasShelf">
            {/* <PopUp_forms isOpen={open}/> */}
            </div>

            <div className="ButtonDiv">
                <div className="ButtonArea BA-right">
                    <button className="Button B-up"><b>Ʌ</b></button>
                    <button className="Button B-down"><b>V</b></button>
                </div>
            </div>
        </div>
    );
}
