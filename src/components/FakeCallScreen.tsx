
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Hash, Volume2, PhoneOff, Plus, User } from 'lucide-react';

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

  const getCallerEmoji = (name: string) => {
    const emojiMap: { [key: string]: string } = {
      'mom': '👩‍❤️‍👨',
      'wife': '💕',
      'jake': '👨',
      'boss': '💼',
      'doctor': '👨‍⚕️',
      'bank': '🏦'
    };
    return emojiMap[name.toLowerCase()] || '👤';
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden font-sans">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black"></div>
      
      {/* Status bar - iPhone style */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-3 pb-2">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full"></div>
            <div className="w-1 h-1 bg-white rounded-full opacity-60"></div>
          </div>
          <span className="text-sm font-medium ml-2 tracking-tight">Verizon</span>
        </div>
        <span className="text-lg font-semibold tracking-tight">9:41</span>
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
          <div className="text-xl text-gray-300 mb-8 font-light tracking-wide">
            {isCallAnswered ? formatCallDuration(callDuration) : 'calling...'}
          </div>
          
          {/* Avatar */}
          <div className="relative mb-10">
            <div className="w-52 h-52 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full mx-auto flex items-center justify-center shadow-2xl shadow-black/50 border-4 border-gray-700">
              <span className="text-7xl">{getCallerEmoji(callerName)}</span>
            </div>
            {!isCallAnswered && (
              <div className="absolute inset-0 w-52 h-52 rounded-full border-4 border-white/20 animate-pulse mx-auto"></div>
            )}
          </div>
          
          <h1 className="text-5xl font-light mb-6 capitalize text-white tracking-tight leading-tight">{callerName}</h1>
        </div>

        {/* Call controls */}
        <div className="w-full max-w-sm">
          {!isCallAnswered ? (
            /* Incoming call controls - iPhone style */
            <div className="space-y-8">
              {/* Action buttons row */}
              <div className="flex justify-center space-x-12">
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                    </svg>
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">Message</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-800/80 hover:bg-gray-700 rounded-full flex items-center justify-center backdrop-blur-sm border border-gray-600">
                    <User size={24} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">Remind Me</span>
                </div>
              </div>

              {/* Main call controls */}
              <div className="flex justify-between items-center px-4">
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
            </div>
          ) : (
            /* Active call controls - iPhone layout */
            <div className="space-y-12">
              {/* Top row of controls */}
              <div className="flex justify-center space-x-16">
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                      isMuted ? 'bg-white text-black' : 'bg-gray-700/80 text-white backdrop-blur-sm'
                    }`}
                  >
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">mute</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Hash size={24} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">keypad</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Volume2 size={24} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">speaker</span>
                </div>
              </div>
              
              {/* Second row of controls */}
              <div className="flex justify-center space-x-16">
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <Plus size={24} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">add call</span>
                </div>
                
                <div className="flex flex-col items-center opacity-50">
                  <Button disabled className="w-16 h-16 bg-gray-700/40 rounded-full flex items-center justify-center backdrop-blur-sm cursor-not-allowed">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21 16.5c0 .38-.21.71-.53.88l-7.9 4.44c-.16.12-.36.18-.57.18-.21 0-.41-.06-.57-.18l-7.9-4.44A.991.991 0 0 1 3 16.5v-9c0-.38.21-.71.53-.88l7.9-4.44c.16-.12.36-.18.57-.18.21 0 .41.06.57.18l7.9 4.44c.32.17.53.5.53.88v9z"/>
                    </svg>
                  </Button>
                  <span className="text-sm text-gray-500 mt-2 font-light tracking-wide">FaceTime</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <User size={24} />
                  </Button>
                  <span className="text-sm text-gray-400 mt-2 font-light tracking-wide">contacts</span>
                </div>
              </div>
              
              {/* End call button - centered */}
              <div className="flex justify-center pt-4">
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
