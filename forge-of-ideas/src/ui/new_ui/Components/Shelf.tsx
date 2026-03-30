import '../styles/tokens.css';
import '../styles/shelf.css';
import Hex from './Hex.tsx';

export default function Shelf(){

    return (
        <main className="shelf-grid-container">
            <div className="row v-indicators">
                <div className="hex-grid">
                    <Hex size={80} color="#ff5a1f" label="10" className="hex-column"/>
                    <Hex size={80} color="#00c2b2" label="05" className="hex-column"/>
                    <Hex size={80} color="#3a4f66" label="05" className="hex-column"/>
                </div>
            </div>
            <div className="row cards"></div>
            <div className="row buttons">
                <div className="hex-grid hex-buttons">
                    <Hex size={70} color="#22303c" className="hex-column" 
                    stroke="#8A9BB0"/>
                    <Hex size={70} color="#22303c" className="hex-column"
                    stroke="#8A9BB0"/>
                    <Hex size={70} color="#22303c" className="hex-column"
                    stroke="#8A9BB0"/>
                </div>
            </div>
        </main>
    );
}
