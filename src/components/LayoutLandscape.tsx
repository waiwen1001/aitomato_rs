import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { memo, useEffect, useRef, useState } from "react";
import { Layout } from "../types/outlet";

const LayoutLandscape = ({ layouts }: { layouts: Layout[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const drawLayouts = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(offset.x, offset.y);
    ctx.scale(scale, scale);

    // Draw tables
    layouts.forEach((layout) => {
      if (layout.type === "table") {
        ctx.beginPath();
        ctx.arc(
          layout.x_position + layout.width / 2,
          layout.y_position + layout.height / 2,
          layout.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = layout.status === "available" ? "#22c55e" : "#ef4444";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    });

    ctx.restore();
  };

  useEffect(() => {
    drawLayouts();
  }, [layouts, scale, offset]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setOffset((prev) => ({
      x: prev.x - e.clientX,
      y: prev.y - e.clientY,
    }));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setOffset((prev) => ({
      x: prev.x + e.clientX,
      y: prev.y + e.clientY,
    }));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="relative w-full h-[400px] overflow-hidden">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        <button
          onClick={handleZoomIn}
          className="bg-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-300"
        >
          <AiOutlinePlus />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white w-8 h-8 rounded-md flex items-center justify-center hover:bg-gray-300"
        >
          <AiOutlineMinus />
        </button>
      </div>
      <div className="w-full h-full overflow-auto">
        <canvas
          ref={canvasRef}
          width={1200}
          height={800}
          className="bg-black cursor-grab active:cursor-grabbing"
          style={{
            display: "block",
            minWidth: "100%",
            minHeight: "100%",
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default memo(LayoutLandscape);
