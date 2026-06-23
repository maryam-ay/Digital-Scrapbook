import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, AlertTriangle } from 'lucide-react';

interface CameraOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Data: string) => void;
}

export default function CameraOverlay({ isOpen, onClose, onCapture }: CameraOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const [flash, setFlash] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);

  // Play a retro mechanical camera shutter click using Web Audio API
  const playShutterSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      
      const ctx = new AudioCtx();
      
      // Shutter click part 1: Quick burst of noise
      const bufferSize = ctx.sampleRate * 0.05; // 50ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;
      
      // Filter the noise to sound like a metallic click
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, ctx.currentTime);
      filter.Q.setValueAtTime(8, ctx.currentTime);
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.04);
      
      noiseNode.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      noiseNode.start();
      
      // Shutter click part 2: Low-end spring thud 20ms later
      setTimeout(() => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.06);
        
        oscGain.gain.setValueAtTime(0.4, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);
        
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      }, 20);

    } catch (e) {
      console.warn('Audio context click sound failed:', e);
    }
  };

  // Start the video stream
  const startCamera = async () => {
    setIsInitializing(true);
    setCameraError(null);
    
    // Stop any existing streams first
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      const constraints = {
        video: {
          facingMode: facingMode,
          width: { ideal: 800 },
          height: { ideal: 800 },
          aspectRatio: { ideal: 1 } // square viewfinder for polaroid
        },
        audio: false
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error('Camera access error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setCameraError('Permission Denied. Please enable camera access in your browser settings.');
      } else {
        setCameraError('Could not access camera. Please make sure no other app is using it.');
      }
    } finally {
      setIsInitializing(false);
    }
  };

  // Toggle Camera Facing
  const toggleFacing = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  // Trigger when camera is opened or facing mode changes
  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      // Cleanup streams on close
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        setStream(null);
      }
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, facingMode]);

  // Capture Image
  const handleCapture = () => {
    if (!videoRef.current || !canvasRef.current || !stream) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // We want a square crop for the Polaroid
    const size = Math.min(video.videoWidth, video.videoHeight);
    canvas.width = size;
    canvas.height = size;

    // Crop center square
    const sx = (video.videoWidth - size) / 2;
    const sy = (video.videoHeight - size) / 2;

    ctx.drawImage(
      video,
      sx, sy, size, size, // source
      0, 0, size, size   // destination
    );

    // Play Shutter Click Sound
    playShutterSound();

    // Trigger Visual Shutter Flash
    setFlash(true);
    setTimeout(() => {
      setFlash(false);
      
      // Get Base64 image
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
      
      // Callback
      onCapture(dataUrl);
      onClose();
    }, 80); // White flash for 80ms
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-neutral-950/90 flex items-center justify-center p-4 z-50 animate-fade-in">
      {/* Visual Shutter Flash Overlay */}
      {flash && (
        <div className="fixed inset-0 bg-white z-55 pointer-events-none transition-all duration-75" />
      )}

      <div className="bg-neutral-900 border border-neutral-800 text-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden flex flex-col relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-[#E8341A]" />
            <span className="font-mono text-xs uppercase tracking-widest font-bold">Retro Shutter Snap</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder Polaroid Frame */}
        <div className="p-6 bg-neutral-950 flex flex-col items-center justify-center flex-1 min-h-[360px]">
          {cameraError ? (
            <div className="w-[280px] h-[340px] bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col items-center justify-center text-center gap-4">
              <AlertTriangle className="w-12 h-12 text-[#E8341A] shrink-0" />
              <p className="text-xs font-mono text-neutral-300">{cameraError}</p>
              <button
                type="button"
                onClick={startCamera}
                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 font-mono text-[10px] uppercase font-bold rounded-md transition-colors"
              >
                Retry Camera
              </button>
            </div>
          ) : (
            /* Polaroid Photo Frame Viewfinder */
            <div className="w-[280px] bg-white text-neutral-950 p-3 pb-12 shadow-2xl flex flex-col items-center animate-[peel-in_0.4s_ease-out]">
              <div className="w-full aspect-square bg-neutral-950 relative overflow-hidden flex items-center justify-center rounded-xs">
                {isInitializing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-900 text-neutral-500 gap-2 font-mono text-[10px]">
                    <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
                    Initializing Lens...
                  </div>
                )}
                
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                  style={{ display: isInitializing ? 'none' : 'block' }}
                />
              </div>
              
              {/* Polaroid signature bottom text bar */}
              <div className="mt-4 font-caveat text-lg text-neutral-400 select-none">
                SAY CHEESE! 📸
              </div>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="px-6 py-5 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between gap-4">
          {/* Flip camera lens */}
          <button
            onClick={toggleFacing}
            disabled={!!cameraError || isInitializing}
            className="p-3 bg-neutral-800 hover:bg-neutral-750 disabled:opacity-40 disabled:cursor-not-allowed rounded-full text-neutral-300 hover:text-white transition-all active:scale-95"
            title="Flip Camera Lens"
          >
            <RefreshCw className="w-5 h-5" />
          </button>

          {/* Shutter press button */}
          <button
            onClick={handleCapture}
            disabled={!!cameraError || isInitializing || !stream}
            className="w-16 h-16 bg-red-600 hover:bg-red-500 disabled:bg-neutral-800 border-4 border-white/20 hover:border-white/30 rounded-full flex items-center justify-center shadow-lg transition-all active:scale-90 disabled:cursor-not-allowed shrink-0"
            title="Click Shutter"
          >
            <div className="w-8 h-8 rounded-full bg-white" />
          </button>

          {/* Cancel button */}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-neutral-800 hover:bg-neutral-750 rounded-xl text-neutral-300 font-mono text-[10px] uppercase font-bold transition-colors"
          >
            Close
          </button>
        </div>

        {/* Hidden canvas for video cropping */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
}
