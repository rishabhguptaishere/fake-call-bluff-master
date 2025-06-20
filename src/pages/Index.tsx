
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import FakeCallScreen from '@/components/FakeCallScreen';

const Index = () => {
  const [selectedCaller, setSelectedCaller] = useState<string>('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [ringtoneAudio, setRingtoneAudio] = useState<HTMLAudioElement | null>(null);

  const callerNames = ['mom', 'wife', 'jake', 'boss', 'doctor', 'bank'];

  useEffect(() => {
    // Create audio element for ringtone
    const audio = new Audio('https://www.soundjay.com/misc/sounds/bell-ringing-05.wav');
    audio.loop = true;
    audio.preload = 'auto';
    setRingtoneAudio(audio);

    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, []);

  const handleCallMeNow = () => {
    if (selectedCaller && ringtoneAudio) {
      setIsCallActive(true);
      ringtoneAudio.play().catch(e => console.log('Audio play failed:', e));
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    if (ringtoneAudio) {
      ringtoneAudio.pause();
      ringtoneAudio.currentTime = 0;
    }
  };

  if (isCallActive) {
    return (
      <FakeCallScreen 
        callerName={selectedCaller} 
        onEndCall={handleEndCall}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Fake Phone Call</h1>
          <p className="text-gray-500 text-sm">Choose a caller and get rescued from any situation</p>
        </div>

        {/* Caller Selection */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="text-lg font-medium text-gray-900 mb-4 text-center">Choose Name</h2>
          
          <div className="grid grid-cols-3 gap-3 mb-6">
            {callerNames.map((name) => (
              <Button
                key={name}
                variant={selectedCaller === name ? "default" : "outline"}
                className={`h-12 text-sm font-medium rounded-lg transition-all ${
                  selectedCaller === name 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCaller(name)}
              >
                {name}
              </Button>
            ))}
          </div>

          {/* Call Me ASAP Button */}
          <Button
            onClick={handleCallMeNow}
            disabled={!selectedCaller}
            className={`w-full h-14 text-lg font-medium rounded-xl transition-all ${
              selectedCaller 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-lg' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            call me asap
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-400">fakephonecall.com</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
