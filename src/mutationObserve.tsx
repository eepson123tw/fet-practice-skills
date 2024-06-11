import {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";

interface MutationObserveProps {
  text: string;
  fontSize: number;
  gap: number;
  children: React.ReactNode;
}

const useWatermark = (text: string, fontSize: number, gap: number) => {
  const bg = useMemo(() => {
    const canvas = document.createElement("canvas");
    const devicePixelRatio = window.devicePixelRatio || 1;
    const deviceFontSize = fontSize * devicePixelRatio;
    const font = deviceFontSize + "px Arial";
    const ctx = canvas.getContext("2d")!;
    // set font weight and size
    ctx.font = font;
    const width = ctx.measureText(text).width;
    const canvasSize = Math.max(100, width) + gap * devicePixelRatio;
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    ctx?.translate(canvasSize / 2, canvasSize / 2);
    ctx?.rotate((Math.PI / 100) * -45);
    ctx.fillStyle = "rgba(255,0,0,0.6)";
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 0, 0);
    return {
      base64: canvas.toDataURL(),
      size: canvasSize / devicePixelRatio,
    };
  }, [fontSize, gap, text]);
  return bg;
};

export const MutationObserve: FunctionComponent<MutationObserveProps> = ({
  text,
  fontSize,
  gap,
  children,
}) => {
  const bg = useWatermark(text, fontSize, gap);
  const parent = useRef<HTMLHeadingElement>(null);
  let div: HTMLDivElement | null = null;
  const resetWatermark = useCallback(() => {
    if (parent.current === null) {
      return;
    }
    if (div) {
      div.remove();
    }

    const { base64, size } = bg;
    div = document.createElement("div");
    div.style.position = "absolute";
    div.style.backgroundImage = `url(${base64})`;
    div.style.backgroundSize = `${size}px ${size}px`;
    div.style.backgroundRepeat = "repeat";
    div.style.zIndex = "9999";
    div.style.inset = "0px";
    div.style.pointerEvents = "none";
    parent.current && parent.current.appendChild(div);
  }, []);
  const ob = useMemo(() => {
    return new MutationObserver((entires) => {
      for (const entry of entires) {
        for (const node of entry.removedNodes) {
          if (node === div) {
            resetWatermark();
          }
        }
        if (entry.target === div) {
          resetWatermark();
        }
      }
    });
  }, []);

  useEffect(() => {
    resetWatermark();
    ob.observe(parent.current!, {
      childList: true,
      subtree: true,
      attributes: true,
    });
    return () => {
      ob.disconnect();
      if (div) {
        div.remove();
      }
    };
  }, [parent, bg, ob, div, resetWatermark]);

  return (
    <div className="watermark-container" ref={parent}>
      {children}
    </div>
  );
};
