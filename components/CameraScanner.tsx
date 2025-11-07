import React, { useState, useRef, useEffect } from 'react';

interface CameraScannerProps {
  onCapture: (dataUrl: string) => void;
  onClose: () => void;
}

export const CameraScanner: React.FC<CameraScannerProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions.");
        onClose();
      }
    };

    getCameraStream();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, []);

  const handleCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        // Apply "scanner" effect filters
        context.filter = 'grayscale(1) contrast(150%) brightness(110%)';
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        setCapturedImage(canvas.toDataURL('image/jpeg', 0.9));
      }
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
  };

  const handleUseImage = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex flex-col items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-4xl aspect-[4/3] bg-black rounded-lg overflow-hidden">
        {capturedImage ? (
          <img src={capturedImage} alt="Captured scan" className="w-full h-full object-contain" />
        ) : (
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-contain"></video>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4">
        {capturedImage ? (
          <>
            <button onClick={handleRetake} className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold">Retake</button>
            <button onClick={handleUseImage} className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">Use Image</button>
          </>
        ) : (
          <button onClick={handleCapture} className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold">Capture</button>
        )}
      </div>
       <button onClick={onClose} className="absolute top-4 right-4 bg-white/20 text-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
       </button>
    </div>
  );
};
