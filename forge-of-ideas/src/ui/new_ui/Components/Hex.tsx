import '../styles/hex.css';

type HexProps = {
  size?: number;
  color?: string;
  label?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
};

export default function Hex({
    size = 60,
    color = "#ff6600",
    label,
    stroke,
   strokeWidth,
    className
}: HexProps) {
    const height = size;
    const width = size;

    return (
<div className={`hex ${className || ""}`} style={{ width, height, position: "relative" }} >
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
                    fill={color}
                    stroke={stroke}
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
