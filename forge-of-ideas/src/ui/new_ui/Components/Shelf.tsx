import '../styles/tokens.css';
import '../styles/shelf.css';
import Hex from './Hex.tsx';

export default function Shelf(){
    const conter1 = 42;
    const conter2 = 22;
    const conter3 = 12;


    return (
        <main className="shelf-grid-container">
            <div className="row v-indicators">
                <div className="hex-grid">
                    <Hex size={80} color="#ff5a1f" label={conter1} className="hex-orange"/>
                    <Hex size={80} color="#00c2b2" label={conter2} className="hex-cyan"/>
                    <Hex size={80} color="#3a4f66" label={conter3} className="hex-dark"/>
                </div>
            </div>
            <div className="row cards"></div>
            <div className="row buttons">
                <div className="hex-grid hex-buttons">
                    <Hex size={70} color="#22303c" label="▲" className="hex-bUp" stroke="#8A9BB0"/>
                    <Hex size={70} color="#22303c" label="▼" className="hex-bDown" stroke="#8A9BB0"/>
                    <Hex size={70} color="#22303c" label="+" className="hex-bPlus" stroke="#8A9BB0"/>
                </div>
            </div>
        </main>
    );
}
