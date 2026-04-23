import '../styles/hex.css';
import { useRef, useState } from 'react';
import Hex from './Hex';

type HexScrollProps = {
    size?: number;
    color?: string;
    label?: string;
    stroke?: string;
    strokeWidth?: number;
    className?: string;
    activeColor?: string;
    hoverColor?: string;
    direction: "up" | "down";
    targetRef: React.RefObject<HTMLDivElement>;
};

export default function HexScroll({ direction, targetRef, color, hoverColor, ...hexProps }: HexScrollProps) {
    const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const step = direction === "up" ? -20 : 20;

    const startScroll = () => {
        setIsPressed(true);
        targetRef.current?.scrollBy({ top: step });
        timeoutRef.current = setTimeout(() => {
            scrollIntervalRef.current = setInterval(() => {
                targetRef.current?.scrollBy({ top: step });
            }, 50);
        }, 400);
    };

    const stopScroll = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (scrollIntervalRef.current) clearInterval(scrollIntervalRef.current);
        timeoutRef.current = null;
        scrollIntervalRef.current = null;
        setIsPressed(false);
    };

    const resolvedColor = isPressed
        ? hexProps.activeColor ?? color
        : isHovered && hoverColor
            ? hoverColor
            : color;

    return (
        <div
            onMouseDown={startScroll}
            onMouseUp={stopScroll}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => { stopScroll(); setIsHovered(false); }}
            style={{ display: "contents" }}
        >
            <Hex
                {...hexProps}
                color={resolvedColor}
                isActive={isPressed}
                activeColor={hexProps.activeColor}
            />
        </div>
    );
}
