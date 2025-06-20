
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Hash, Headphones, PhoneOff, Plus, User } from 'lucide-react';

interface FakeCallScreenProps {
  callerName: string;
  onEndCall: () => void;
}

const FakeCallScreen: React.FC<FakeCallScreenProps> = ({ callerName, onEndCall }) => {
  const [isCallAnswered, setIsCallAnswered] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isCallAnswered) {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCallAnswered]);

  const formatCallDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerCall = () => {
    setIsCallAnswered(true);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900"></div>
      
      {/* Status bar - more iPhone-like */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-3 pb-2">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          </div>
          <span className="text-sm font-medium ml-2">Verizon</span>
        </div>
        <span className="text-lg font-medium">9:41</span>
        <div className="flex items-center space-x-1">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
            <path d="M16 0H2C0.895 0 0 0.895 0 2v8c0 1.105 0.895 2 2 2h14c1.105 0 2-0.895 2-2V2c0-1.105-0.895-2-2-2zm0 9H2V3h14v6z"/>
          </svg>
          <div className="w-6 h-3 border border-white rounded-sm relative">
            <div className="w-4 h-1.5 bg-green-500 rounded-sm absolute top-0.5 left-0.5"></div>
          </div>
        </div>
      </div>

      {/* Call content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-8 py-12">
        {/* Caller info */}
        <div className="text-center flex-1 flex flex-col justify-center">
          <div className="text-lg text-gray-300 mb-6 font-light">
            {isCallAnswered ? formatCallDuration(callDuration) : 'Incoming call...'}
          </div>
          
          {/* Avatar with glow effect */}
          <div className="relative mb-8">
            <div className="w-48 h-48 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-black/50 border-4 border-gray-700">
              <span className="text-6xl font-light text-white capitalize">{callerName.charAt(0)}</span>
            </div>
            {!isCallAnswered && (
              <div className="absolute inset-0 w-48 h-48 rounded-full border-4 border-white/20 animate-pulse mx-auto"></div>
            )}
          </div>
          
          <h1 className="text-4xl font-light mb-4 capitalize text-white">{callerName}</h1>
          <p className="text-gray-400 text-lg font-light">Mobile</p>
        </div>

        {/* Call controls */}
        <div className="w-full max-w-sm">
          {!isCallAnswered ? (
            /* Incoming call controls - iPhone style */
            <div className="flex justify-between items-center px-4">
              {/* Message button */}
              <Button className="w-16 h-16 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
              </Button>
              
              {/* Decline button */}
              <Button
                onClick={onEndCall}
                className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25"
              >
                <PhoneOff size={28} />
              </Button>
              
              {/* Accept button */}
              <Button
                onClick={handleAnswerCall}
                className="w-20 h-20 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/25"
              >
                <PhoneCall size={28} />
              </Button>
            </div>
          ) : (
            /* Active call controls - cleaner iPhone layout */
            <div className="space-y-8">
              {/* Top row of controls */}
              <div className="flex justify-center space-x-12">
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                      isMuted ? 'bg-white text-black' : 'bg-gray-800/80 text-white backdrop-blur-sm border border-gray-600'
                    }`}
                  >
                    {isMuted ? <MicOff size={28} /> : <Mic size={28} />}
                  </Button>
                  <span className="text-sm text-gray-400 mt-3 font-light">mute</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600">
                    <Hash size={28} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-3 font-light">keypad</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-20 h-20 bg-gray-800/80 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600">
                    <Headphones size={28} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-3 font-light">speaker</span>
                </div>
              </div>
              
              {/* End call button - centered */}
              <div className="flex justify-center pt-8">
                <Button
                  onClick={onEndCall}
                  className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center shadow-lg shadow-red-500/25"
                >
                  <PhoneOff size={28} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Phone call icon component
const PhoneCall = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export default FakeCallScreen;
