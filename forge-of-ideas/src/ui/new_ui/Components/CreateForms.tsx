import '../styles/createForms.css';
import '../styles/tokens.css';
import { useState } from "react";
import Hex from "./Hex";

type CreateFormProps = {
    onCancel: () => void;
    onSave?: (data: {
        title: string;
        description: string;
        level: number | null;
    }) => void;
};

export default function CreateForm({ onCancel, onSave }: CreateFormProps) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [level, setLevel] = useState<number | null>(2);
    var active_stroke = "#E6D5B8";

    const handleSave = () => {
        onSave?.({ title, description, level });
    };

    return (
        <div className="create-form">
            <h1 className="create-title">NEW IDEA</h1>
            <div className="form-group">
                <label>TITLE</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title..."
                />
            </div>

            <div className="form-group">
                <label>DESCRIPTION</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description..."
                />
            </div>

            <div className="hex-row">
                <Hex
                    label="1"
                    color="#ff6a2b"
                    activeStroke={active_stroke}
                    strokeWidth={3}
                    isActive={level === 1}
                    onClick={() => setLevel(1)}
                    className="hex-orange"
                />

                <Hex
                    label="2"
                    color="#00d1c1"
                    activeStroke={active_stroke}
                    strokeWidth={3}
                    isActive={level === 2}
                    onClick={() => setLevel(2)}
                    className="hex-cyan"
                />

                <Hex
                    label="3"
                    color="#5c6f86"
                    activeStroke={active_stroke}
                    strokeWidth={3}
                    isActive={level === 3}
                    onClick={() => setLevel(3)}
                    className="hex-dark"
                />
            </div>

            <div className="actions">
                <button className="btn-save">SAVE</button>
                <button className="btn-cancel" onClick={onCancel}>CANCEL</button>
            </div>
        </div>
    );
}
