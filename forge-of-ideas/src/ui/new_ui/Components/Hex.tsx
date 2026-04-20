import '../styles/hex.css';
import { useState } from 'react';

type HexProps = {
  size?: number;
  color?: string;
  label?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
  activeColor?: string;
  hoverColor?: string;
  activeStroke?: string;
  hoverStroke?: string;
};

export default function Hex(props: HexProps) {
    const {size = 60,
        color = "#ff6600",
        label,
        stroke,
        strokeWidth,
        className,
        onClick,
        isActive = false,
        activeColor,
        hoverColor,
        activeStroke,
        hoverStroke,
    } = props;

    const [isHovered, setIsHovered] = useState(false);

    const isInteractive = !!onClick;

    // Resolve fill
    const resolvedFill = isActive && activeColor
        ? activeColor
        : isHovered && hoverColor
            ? hoverColor
            : color;

    // Resolve stroke
    const resolvedStroke = isActive && activeStroke
        ? activeStroke
        : isHovered && hoverStroke
            ? hoverStroke
            : stroke;

    const handleMouseEnter = () => {
        if (!isInteractive) return;
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        if (!isInteractive) return;
        setIsHovered(false);
    };

    return (
        <div
            className={`hex ${className || ""} ${isInteractive ? "hex-interactive" : ""} ${isActive ? "hex-active" : ""}`}
            style={{ width: size, height: size, position: "relative", cursor: isInteractive ? "pointer" : "default" }}
            onClick={isInteractive ? onClick : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <svg
                viewBox="0 0 100 100"
                width="100%"
                height="100%"
                preserveAspectRatio="xMidYMid meet"
            >
                <polygon
                    points="
                    50,0
                    93.3,25
                    93.3,75
                    50,100
                    6.7,75
                    6.7,25
                    "
                    fill={resolvedFill}
                    stroke={resolvedStroke}
                    strokeWidth={strokeWidth}
                />
            </svg>
            {label && (
                <div className="hex-label">
                    {label}
                </div>
            )}
        </div>
    );
}
