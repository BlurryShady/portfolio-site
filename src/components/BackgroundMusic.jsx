import { useEffect, useRef, useState } from "react";

export default function BackgroundMusic() {
  const audioRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.22);
  const [muted, setMuted] = useState(false);

  // Apply volume/mute
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    audio.muted = muted;
  }, [volume, muted]);

  // Play/pause
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => setIsPlaying(false));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => setIsPlaying((p) => !p);
  const toggleMute = () => setMuted((m) => !m);

  const percent = Math.round(volume * 100);

  return (
    <>
      <style>{`
        .bgm-range {
          width: 150px !important;
          max-width: 150px !important;
          height: 18px !important;
          background: transparent !important;
          -webkit-appearance: none !important;
          appearance: none !important;
          outline: none !important;
          border: 0 !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        .bgm-range:focus {
          outline: none !important;
        }
        
        .bgm-range::-webkit-slider-runnable-track {
          height: 8px !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg, rgba(10,10,10,0.20), rgba(255,255,255,0.22)) !important;
          border: 1px solid rgba(0,0,0,0.22) !important;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.55) !important;
        }
        
        .bgm-range::-webkit-slider-thumb {
          -webkit-appearance: none !important;
          appearance: none !important;
          width: 18px !important;
          height: 18px !important;
          margin-top: -6px !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg, #ffffff, #e5ded0) !important;
          border: 1px solid rgba(0,0,0,0.28) !important;
          box-shadow: 0 10px 18px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -2px 6px rgba(0,0,0,0.10) !important;
          cursor: pointer !important;
        }
        
        .bgm-range::-moz-range-track {
          height: 8px !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg, rgba(10,10,10,0.20), rgba(255,255,255,0.22)) !important;
          border: 1px solid rgba(0,0,0,0.22) !important;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.55) !important;
        }
        
        .bgm-range::-moz-range-thumb {
          width: 18px !important;
          height: 18px !important;
          border-radius: 999px !important;
          background: linear-gradient(180deg, #ffffff, #e5ded0) !important;
          border: 1px solid rgba(0,0,0,0.28) !important;
          box-shadow: 0 10px 18px rgba(0,0,0,0.26), inset 0 1px 0 rgba(255,255,255,0.85), inset 0 -2px 6px rgba(0,0,0,0.10) !important;
          cursor: pointer !important;
        }
        
        .marble-music-container {
          position: fixed;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 9999;
          pointer-events: auto;
          user-select: none;
        }
        
        .marble-pill {
          position: relative;
          display: flex;
          align-items: center;
          overflow: hidden;
          min-width: 0;
          border-radius: 16px;
          border: 1px solid rgba(0, 0, 0, 0.15);
          box-shadow: 0 20px 55px rgba(0,0,0,0.38), 
                      inset 0 1px 0 rgba(255,255,255,0.90), 
                      inset 0 -2px 10px rgba(0,0,0,0.10);
          backdrop-filter: blur(2px);
          transition: all 0.2s ease-out;
        }
        
        .marble-pill.closed {
          width: 52px;
          height: 56px;
        }
        
        .marble-pill.open {
          width: 320px;
          height: 56px;
        }
        
        .marble-base {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, #fbfaf6, #f2eee5, #e7e1d3);
        }
        
        .marble-texture {
          position: absolute;
          inset: 0;
          opacity: 0.65;
          pointer-events: none;
          background-image: radial-gradient(circle at 18% 30%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 58%),
                            radial-gradient(circle at 72% 64%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 62%),
                            radial-gradient(circle at 42% 78%, rgba(0,0,0,0.06) 0%, rgba(0,0,0,0) 55%),
                            repeating-linear-gradient(46deg, rgba(0,0,0,0.018) 0 14px, transparent 14px 42px),
                            repeating-linear-gradient(-46deg, rgba(0,0,0,0.012) 0 18px, transparent 18px 48px);
        }
        
        .marble-edge-dark {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 2px;
          background: rgba(0, 0, 0, 0.12);
          pointer-events: none;
        }
        
        .marble-edge-light {
          position: absolute;
          right: 2px;
          top: 0;
          height: 100%;
          width: 1px;
          background: rgba(255, 255, 255, 0.5);
          pointer-events: none;
        }
        
        .toggle-btn {
          position: relative;
          z-index: 10;
          height: 56px;
          width: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(0, 0, 0, 0.7);
          transition: color 0.2s;
          cursor: pointer;
          background: none;
          border: none;
          flex-shrink: 0;
        }
        
        .toggle-btn:hover {
          color: rgba(0, 0, 0, 1);
        }
        
        .controls-panel {
          position: relative;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px 12px 8px;
          color: black;
          min-width: 0;
          transition: opacity 0.2s;
        }
        
        .controls-panel.hidden {
          opacity: 0;
          pointer-events: none;
        }
        
        .bgm-label {
          display: flex;
          flex-direction: column;
          line-height: 1;
          margin-right: 4px;
          flex-shrink: 0;
        }
        
        .bgm-label-top {
          font-size: 10px;
          letter-spacing: 0.24em;
          color: rgba(0, 0, 0, 0.55);
          font-weight: 600;
        }
        
        .bgm-label-bottom {
          font-size: 11px;
          color: rgba(0, 0, 0, 0.65);
        }
        
        .control-btn {
          font-size: 14px;
          padding: 6px 10px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(0, 0, 0, 0.15);
          transition: background 0.2s;
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.85);
          flex-shrink: 0;
          cursor: pointer;
        }
        
        .control-btn:hover {
          background: rgba(255, 255, 255, 0.85);
        }
        
        .slider-container {
          display: flex;
          align-items: center;
          min-width: 0;
        }
      `}</style>
      
      <audio ref={audioRef} loop preload="none" style={{ display: "none" }}>
        <source src="/audio/bg-music.mp3" type="audio/mpeg" />
      </audio>

      <div className="marble-music-container">
        <div className={`marble-pill ${open ? 'open' : 'closed'}`}>
          <div className="marble-base" />
          <div className="marble-texture" />
          <div className="marble-edge-dark" />
          <div className="marble-edge-light" />

          <button
            className="toggle-btn"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close music controls" : "Open music controls"}
          >
            <span style={{ fontSize: '18px' }}>{open ? "›" : "♫"}</span>
          </button>

          <div className={`controls-panel ${!open ? 'hidden' : ''}`}>
            <div className="bgm-label">
              <span className="bgm-label-top">BGM</span>
              <span className="bgm-label-bottom">{percent}%</span>
            </div>

            <button
              className="control-btn"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? "⏸" : "▶"}
            </button>

            <button
              className="control-btn"
              onClick={toggleMute}
              aria-label={muted ? "Unmute music" : "Mute music"}
            >
              {muted ? "🔇" : "🔈"}
            </button>

            <div className="slider-container">
              <input
                className="bgm-range"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                aria-label="Music volume"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}