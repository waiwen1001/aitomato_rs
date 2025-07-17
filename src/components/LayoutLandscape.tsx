import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { memo, useEffect, useRef, useState, useCallback } from "react";
import { Layout } from "../types/outlet";

const LayoutLandscape = ({ layouts, selectedLayout }: { layouts: Layout[], selectedLayout: string | null }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const highlightedLayoutIds = JSON.stringify(selectedLayout);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  };

  const drawLayouts = useCallback(() => {
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
        
        // Check if this layout is highlighted
        const isHighlighted = highlightedLayoutIds.includes(layout.id);
        
        // Set color based on highlight status and availability
        if (isHighlighted) {
          ctx.fillStyle = "#22c55e"; // Green for highlighted
        } else {
          ctx.fillStyle = layout.status === "available" ? "#22c55e" : "#ef4444";
        }
        
        ctx.fill();
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
      }
    });

    ctx.restore();
  }, [layouts, scale, offset, highlightedLayoutIds]);

  useEffect(() => {
    drawLayouts();
  }, [drawLayouts]);

  // Set up touch event listeners with passive: false to allow preventDefault
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      setIsDragging(true);
      setDragStart({
        x: touch.clientX - offset.x,
        y: touch.clientY - offset.y,
      });
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      
      const touch = e.touches[0];
      const newOffset = {
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      };

      // Add boundary constraints to prevent dragging too far
      const maxOffset = 400;
      const constrainedOffset = {
        x: Math.max(-maxOffset, Math.min(maxOffset, newOffset.x)),
        y: Math.max(-maxOffset, Math.min(maxOffset, newOffset.y)),
      };

      setOffset(constrainedOffset);
    };

    const handleTouchEnd = (e: TouchEvent) => {
      e.preventDefault();
      setIsDragging(false);
    };

    // Add event listeners with passive: false
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, dragStart, offset]);

  const getClientCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
    return {
      x: e.clientX,
      y: e.clientY,
    };
  };

  const handleStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    const coords = getClientCoordinates(e);
    setIsDragging(true);
    setDragStart({
      x: coords.x - offset.x,
      y: coords.y - offset.y,
    });
  }, [offset]);

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const coords = getClientCoordinates(e);
    const newOffset = {
      x: coords.x - dragStart.x,
      y: coords.y - dragStart.y,
    };

    // Add boundary constraints to prevent dragging too far
    const maxOffset = 400;
    const constrainedOffset = {
      x: Math.max(-maxOffset, Math.min(maxOffset, newOffset.x)),
      y: Math.max(-maxOffset, Math.min(maxOffset, newOffset.y)),
    };

    setOffset(constrainedOffset);
  }, [isDragging, dragStart]);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <div className="flex-1 relative w-full h-[calc(100vh-4rem)] overflow-hidden">
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
      <div className="w-full h-full p-4 overflow-visible">
        <div className="w-full h-full overflow-visible relative">
          <canvas
            ref={canvasRef}
            width={1200}
            height={800}
            className="bg-black rounded-lg cursor-grab active:cursor-grabbing touch-none absolute inset-0 w-full h-full"
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              aspectRatio: "1200 / 800",
              objectFit: "cover",
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(LayoutLandscape);
