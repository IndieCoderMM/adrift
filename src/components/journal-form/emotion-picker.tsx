import {
  emotions as defaultEmotions,
  getEmotionVisual,
} from "@/utils/emotions";
import { useEffect, useRef, useState } from "react";

type Props = {
  value?: number; // 0 to 1
  onChange?: (selected: string) => void;
  size?: number;
  emotions?: string[];
};

const EmotionPicker = ({
  emotions = defaultEmotions,
  value = 0.5,
  onChange,
  size = 500,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [angle, setAngle] = useState(() => valueToAngle(value));
  const [knob, setKnob] = useState({ x: size / 2, y: size / 2, d: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState("neutral");

  const center = size / 2;
  const radius = size / 2 - 20;

  useEffect(() => {
    let emotion = "";
    if (knob.d >= radius * 0.75) {
      emotion = "Super";
    } else if (knob.d >= radius * 0.5) {
      emotion = "Very";
    } else if (knob.d < radius * 0.25) {
      emotion = "neutral";
    }

    if (emotion !== "neutral") {
      const selected = emotions[getSegmentIndex(angle, emotions.length)];
      emotion += ` ${selected}`;
    }
    setSelectedEmotion(emotion);
    onChange?.(emotion);
  }, [angle, knob, onChange, emotions]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      ctx.clearRect(0, 0, size * 2, size);

      drawWheel(ctx, center, center, radius, "12px Space Grotesk");
      drawRadialLabels(
        ctx,
        emotions,
        center,
        center,
        radius + 10,
        "12px Space Grotesk",
      );

      ctx.beginPath();
      ctx.fillStyle = getEmotionVisual(selectedEmotion).color + "90";
      ctx.ellipse(knob.x, knob.y, 10, 10, 0, 0, 2 * Math.PI);
      ctx.arc(knob.x, knob.y, 10, 0, 2 * Math.PI);
      ctx.fill();
    };

    draw();
  }, [angle, size, knob, selectedEmotion, emotions]);

  const handleEvent = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
    const y = e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

    const cx = x - rect.left;
    const cy = y - rect.top;
    const { angle: a, dist } = fromCenter(cx, cy, center, center);

    const r = Math.min(dist, radius);

    if (a >= 0 && a <= 2 * Math.PI) {
      setAngle(a);
      setKnob({
        x: center + r * Math.cos(a),
        y: center + r * Math.sin(a),
        d: r,
      });
    }
  };

  useEffect(() => {
    const up = () => setIsDragging(false);
    const move = (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        handleEvent(e);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", move);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchend", up);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", move);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchend", up);
    };
  }, [isDragging]);

  return (
    <div className="relative flex w-full flex-col items-center gap-4">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleEvent(e.nativeEvent);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleEvent(e.nativeEvent);
        }}
        className="cursor-pointer"
      />
    </div>
  );
};

function drawWheel(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
  font = "12px sans-serif",
  color = "black",
) {
  ctx.setLineDash([0]);
  drawCircle(ctx, centerX, centerY, radius);

  ctx.setLineDash([2, 4]);
  ctx.lineDashOffset = 2;
  drawCircle(ctx, centerX, centerY, radius * 0.75);
  drawCircle(ctx, centerX, centerY, radius * 0.5);
  drawCircle(ctx, centerX, centerY, radius * 0.25);

  ctx.font = font;
  ctx.fillStyle = color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Neutral", centerX, centerY);
}

function drawCircle(
  ctx: CanvasRenderingContext2D,
  centerX: number,
  centerY: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.ellipse(centerX, centerY, radius, radius, 0, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawRadialLabels(
  ctx: CanvasRenderingContext2D,
  labels: string[],
  centerX: number,
  centerY: number,
  radius: number,
  font = "12px sans-serif",
  color = "black",
) {
  const total = labels.length;
  const angleStep = (2 * Math.PI) / total;

  ctx.font = font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  labels.forEach((label, i) => {
    ctx.fillStyle = getEmotionVisual(label).color;
    const angle = -angleStep * i - angleStep / 2;

    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;

    ctx.save();
    ctx.translate(x, y);

    // Rotate label so it faces center
    const rotation =
      Math.abs(angle) <= Math.PI ? angle + Math.PI / 2 : angle - Math.PI / 2;

    ctx.rotate(rotation);
    ctx.fillText(label.toUpperCase(), 0, 0);
    ctx.restore();
  });

  const tickCount = labels.length;
  const tickWidth = 2;
  const tickHeight = 10;

  ctx.save();
  ctx.translate(centerX, centerY);

  for (let i = 0; i < tickCount; i++) {
    const angle = (i / tickCount) * 2 * Math.PI;

    ctx.save();
    ctx.rotate(angle + Math.PI / 2);
    ctx.translate(0, -radius + 10);

    ctx.fillStyle = color;
    ctx.fillRect(0, 0, tickWidth, tickHeight);
    ctx.restore();
  }

  ctx.restore();
}

function fromCenter(x: number, y: number, centerX: number, centerY: number) {
  const dx = x - centerX;
  const dy = y - centerY;
  let angle = Math.atan2(dy, dx);
  if (angle < 0) angle += 2 * Math.PI;

  const dist = Math.sqrt(dx * dx + dy * dy);
  return { angle, dist };
}

function getSegmentIndex(angle: number, totalSegs: number) {
  const TWO_PI = 2 * Math.PI;
  const normalized = (-(angle % TWO_PI) + TWO_PI) % TWO_PI;
  const segmentSize = TWO_PI / totalSegs;
  return Math.floor(normalized / segmentSize);
}

function valueToAngle(value: number) {
  const start = Math.PI * 0.75;
  const end = Math.PI * 2.25;
  return start + value * (end - start);
}

export default EmotionPicker;
