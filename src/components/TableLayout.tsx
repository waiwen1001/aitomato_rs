import { memo, useEffect, useRef, useState } from "react";
import { Table } from "../types/outlet";

const TableLayout = ({ tables }: { tables: Table[] }) => {
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

  const drawTables = () => {
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
    tables.forEach((table) => {
      if (table.type === "table") {
        ctx.beginPath();
        ctx.arc(
          table.x_position + table.width / 2,
          table.y_position + table.height / 2,
          table.width / 2,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = table.status === "available" ? "#22c55e" : "#ef4444";
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    });

    ctx.restore();
  };

  useEffect(() => {
    drawTables();
  }, [tables, scale, offset]);

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
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white p-2 rounded-md shadow-md hover:bg-gray-100"
        >
          -
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

export default memo(TableLayout);
