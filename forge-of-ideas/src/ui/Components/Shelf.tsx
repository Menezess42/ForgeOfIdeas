import "../Styles/Components.css";
import { useState} from 'react';
import  type { IdeaData} from './Modal';

interface ShelfProps{
    openModal: ()=>void;
    ideas: IdeaData[];
}


export default function Shelf({openModal, ideas}: ShelfProps) {
    return (
        <div className="Shelf">
            <div className="ButtonDiv item-1">
                <div className="ButtonArea BA-left">
                    <button 
                    onClick = {openModal}
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
