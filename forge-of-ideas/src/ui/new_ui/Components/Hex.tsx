import '../styles/hex.css';

type HexProps = {
  size?: number;
  color?: string;
  label?: string;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
  // Interaction props
  onClick?: () => void;
  isActive?: boolean;
  activeColor?: string;
  hoverColor?: string;
};

export default function Hex({
  size = 60,
  color = "#ff6600",
  label,
  stroke,
  strokeWidth,
  className,
  onClick,
  isActive = false,
  activeColor,
  hoverColor,
}: HexProps) {
  const height = size;
  const width = size;

  const isInteractive = !!onClick;

  // Resolve fill color based on state
  const resolvedColor = isActive && activeColor ? activeColor : color;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || isActive) return;
    const polygon = (e.currentTarget as HTMLDivElement).querySelector("polygon");
    if (polygon && hoverColor) polygon.setAttribute("fill", hoverColor);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || isActive) return;
    const polygon = (e.currentTarget as HTMLDivElement).querySelector("polygon");
    if (polygon) polygon.setAttribute("fill", resolvedColor);
  };

  return (
    <div
      className={`hex ${className || ""} ${isInteractive ? "hex-interactive" : ""} ${isActive ? "hex-active" : ""}`}
      style={{ width, height, position: "relative", cursor: isInteractive ? "pointer" : "default" }}
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
          fill={resolvedColor}
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
