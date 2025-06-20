
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Keypad, Headphones, PhoneOff, Plus, Contacts } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-900 text-white flex flex-col relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900"></div>
      
      {/* Status bar */}
      <div className="relative z-10 flex justify-between items-center px-6 pt-4 pb-2">
        <span className="text-sm font-medium">9:34</span>
        <div className="flex items-center space-x-1">
          <div className="w-4 h-2 bg-white rounded-sm"></div>
          <div className="w-6 h-3 border border-white rounded-sm">
            <div className="w-4 h-1 bg-white rounded-sm mt-0.5 ml-0.5"></div>
          </div>
        </div>
      </div>

      {/* Call content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-between px-6 py-8">
        {/* Caller info */}
        <div className="text-center mt-8">
          <div className="text-sm text-gray-300 mb-2">
            {isCallAnswered ? formatCallDuration(callDuration) : 'calling...'}
          </div>
          <h1 className="text-4xl font-light mb-4 capitalize">{callerName}</h1>
          
          {/* Avatar placeholder */}
          <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-8 flex items-center justify-center">
            <span className="text-4xl font-light capitalize">{callerName.charAt(0)}</span>
          </div>
        </div>

        {/* Call controls */}
        <div className="w-full max-w-sm">
          {!isCallAnswered ? (
            /* Incoming call controls */
            <div className="flex justify-center space-x-16 mb-8">
              {/* Decline button */}
              <Button
                onClick={onEndCall}
                className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
              >
                <PhoneOff size={24} />
              </Button>
              
              {/* Answer button */}
              <Button
                onClick={handleAnswerCall}
                className="w-16 h-16 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center"
              >
                <PhoneCall size={24} />
              </Button>
            </div>
          ) : (
            /* Active call controls */
            <div>
              {/* Top row of controls */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <Button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center ${
                      isMuted ? 'bg-white text-gray-900' : 'bg-gray-700 text-white'
                    }`}
                  >
                    {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">mute</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <Keypad size={24} />
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">keypad</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <Headphones size={24} />
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">audio</span>
                </div>
              </div>
              
              {/* Bottom row of controls */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <Plus size={24} />
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">add call</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/>
                    </svg>
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">FaceTime</span>
                </div>
                
                <div className="flex flex-col items-center">
                  <Button className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <Contacts size={24} />
                  </Button>
                  <span className="text-xs text-gray-400 mt-2">contacts</span>
                </div>
              </div>
              
              {/* End call button */}
              <div className="flex justify-center">
                <Button
                  onClick={onEndCall}
                  className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center"
                >
                  <PhoneOff size={24} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Phone call icon component since it's not in the allowed lucide icons
const PhoneCall = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

export default FakeCallScreen;
