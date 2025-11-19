import "../Styles/Components.css";
import { useState} from 'react';

export default function Shelf() {
    const handleButtonClick = async () => {
        window.api.saveClick();
        window.api.saveData({
            title: "Teste",
            createdAt: new Date().toISOString()
        });
    };
    return (
        <div className="Shelf">
            <div className="ButtonDiv item-1">
                <div className="ButtonArea BA-left">
                    <button 
                    onClick = {handleButtonClick}
                    className="Button B-plus"><h1>+</h1></button>
                </div>
            </div>

            <div className="IdeasShelf">
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
