import '../styles/ideaCard.css';
import { useState } from 'react';

type IdeaCardProps = {
    idea: IdeaData;
    onClick?: () => void;
    isActive?: boolean;
};

function getLevelColor(level: number) {
    switch (level) {
        case 1: return 'var(--accent-orange)';
        case 2: return 'var(--accent-cyan)';
        case 3: return 'var(--border)';
        default: return 'var(--border)';
    }
}

export default function IdeaCard({ idea, onClick, isActive = false }: IdeaCardProps) {

    const [isHovered, setIsHovered] = useState(false);
    const isInteractive = !!onClick;

    const levelColor = getLevelColor(idea.level);

    const stateClass = isActive
        ? 'ideaCard-active'
        : isHovered
            ? 'ideaCard-hover'
            : '';

    return (
        <div
            className={`ideaCard ${isInteractive ? 'ideaCard-interactive' : ''} ${stateClass}`}
            onClick={isInteractive ? onClick : undefined}
            onMouseEnter={() => isInteractive && setIsHovered(true)}
            onMouseLeave={() => isInteractive && setIsHovered(false)}
        >
            <div
                className="ideaCard-bar"
                style={{ backgroundColor: levelColor }}
            />

            <span className="ideaCard-title">
                {idea.title}
            </span>
        </div>
    );
}


