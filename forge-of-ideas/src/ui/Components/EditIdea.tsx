import '../styles/createForms.css';
import '../styles/tokens.css';
import { useState } from "react";
import Hex from "./Hex";

interface IdeaData {
    title: string;
    description: string;
    level: 1 | 2 | 3;
    path?: string;
}
type CreateFormProps = {
    data: IdeaData;
    onCancel: () => void;
    onSave?: (data:IdeaData, oldTitle: IdeaData) => Promise<string | null>;
};

export default function EditIdea({data, onCancel, onSave }: CreateFormProps) {

    const [title, setTitle] = useState(data.title);
    const [old, setOld] = useState(data);
    const [description, setDescription] = useState(data.description);
    const [level, setLevel] = useState<number | null>(data.level);
    const [path, setPath] = useState<number | null>(data.path);
    var active_stroke = "#E6D5B8";

    const handleSave = async () => {
        let response = await onSave?.({ title, description, level}, old);
        if (response == null){
            setTitle("");
            setOld("");
            setDescription("");
            setLevel(null);
            setPath(null);
            onCancel();
        }
    };

    return (
        <div className="create-form">
            <h1 className="create-title">EDIT IDEA</h1>
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
                <button className="btn-save" onClick={handleSave}>SAVE</button>
                <button className="btn-cancel" onClick={onCancel}>CANCEL</button>
            </div>
        </div>
    );
}
