
import React, { useRef, useEffect, useState, useCallback } from 'react';
import { COLORS, PEN_SIZES } from '../constants';

interface DrawingPadProps {
  onClose: () => void;
}

const DrawingPad: React.FC<DrawingPadProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [size, setSize] = useState(8);
  const [isErasing, setIsErasing] = useState(false);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 100;
    
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
  }, [color, size]);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.globalCompositeOperation = isErasing ? 'destination-out' : 'source-over';
    ctx.strokeStyle = isErasing ? 'rgba(0,0,0,1)' : color;
    ctx.lineWidth = size;
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="fixed inset-0 bg-white flex flex-col z-[150] overflow-hidden">
      {/* Tool Bar - Sleek Glass */}
      <div className="h-[100px] bg-slate-900/90 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-8 shrink-0">
        <div className="flex gap-4">
          {COLORS.map((c) => (
            <button
              key={c.value}
              onClick={() => {
                setColor(c.value);
                setIsErasing(false);
              }}
              className={`w-12 h-12 rounded-full border-2 transition-all ${color === c.value && !isErasing ? 'ring-4 ring-indigo-500/50 scale-110 border-white' : 'border-white/20'}`}
              style={{ backgroundColor: c.value }}
              aria-label={c.name}
            />
          ))}
          <button
            onClick={() => setIsErasing(!isErasing)}
            className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all text-2xl shadow-lg ${isErasing ? 'bg-indigo-600 border-indigo-400 text-white scale-110' : 'bg-white/10 border-white/20 text-white'}`}
          >
            🧽
          </button>
        </div>

        <div className="flex gap-3 bg-white/5 p-2 rounded-2xl border border-white/5">
          {PEN_SIZES.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all font-black text-xl ${size === s ? 'bg-indigo-600 border-indigo-400 text-white' : 'bg-transparent border-transparent text-white/50'}`}
            >
              {s === 4 ? '•' : s === 8 ? '●' : s === 16 ? '⬤' : '⭐'}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <button
            onClick={clearCanvas}
            className="px-8 h-14 bg-red-500/20 text-red-400 border border-red-500/30 rounded-2xl font-black transition-all active:bg-red-500/40"
          >
            அழி (Clear)
          </button>
          <button
            onClick={onClose}
            className="w-14 h-14 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-full flex items-center justify-center text-2xl shadow-lg transition-all"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Drawing Area */}
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
        className="cursor-crosshair bg-white flex-1"
      />
    </div>
  );
};

export default DrawingPad;
