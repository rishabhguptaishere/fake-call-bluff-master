import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import FakeCallScreen from '@/components/FakeCallScreen';

const Index = () => {
  const [selectedCaller, setSelectedCaller] = useState<string>('');
  const [isCallActive, setIsCallActive] = useState(false);
  const [ringtoneAudio, setRingtoneAudio] = useState<HTMLAudioElement | null>(null);

  const callerNames = [
    { name: 'mom', emoji: '👩‍❤️‍👨' },
    { name: 'wife', emoji: '💕' },
    { name: 'jake', emoji: '👨' },
    { name: 'boss', emoji: '💼' },
    { name: 'doctor', emoji: '👨‍⚕️' },
    { name: 'bank', emoji: '🏦' }
  ];

  useEffect(() => {
    // ========== CUSTOM RINGTONE SPACE ==========
    // Add your custom ringtone file here
    // Example: const audioObj = new Audio('/path/to/your/ringtone.mp3');
    // audioObj.loop = true;
    // setRingtoneAudio(audioObj);
    
    // Default Apple-style ringtone (remove this when adding custom ringtone)
    const createAppleRingtone = () => {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const createTone = (frequency: number, duration: number, startTime: number) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, startTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + duration - 0.1);
        gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
        
        oscillator.start(startTime);
        oscillator.stop(startTime + duration);
      };

      const playRingtone = () => {
        const currentTime = audioContext.currentTime;
        createTone(523.25, 0.3, currentTime);
        createTone(659.25, 0.3, currentTime + 0.3);
        createTone(783.99, 0.3, currentTime + 0.6);
        createTone(1046.50, 0.5, currentTime + 0.9);
      };

      return { playRingtone, audioContext };
    };

    const { playRingtone, audioContext } = createAppleRingtone();
    
    const audioObj = {
      play: () => {
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        const playLoop = () => {
          playRingtone();
          setTimeout(playLoop, 2000);
        };
        playLoop();
      },
      pause: () => {},
      currentTime: 0,
      loop: true
    } as HTMLAudioElement;

    setRingtoneAudio(audioObj);
    // ===============================================

    return () => {
      if (audioContext) {
        audioContext.close();
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
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-8 font-sans">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="text-5xl">📞</span>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-3 tracking-tight">Fake Phone Call</h1>
          <p className="text-gray-500 text-base leading-relaxed">Choose a caller and get rescued from any situation</p>
        </div>

        {/* Caller Selection */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 mb-8 shadow-lg shadow-gray-100/50">
          <h2 className="text-xl font-medium text-gray-900 mb-6 text-center">Choose Name</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            {callerNames.map(({ name, emoji }) => (
              <Button
                key={name}
                variant={selectedCaller === name ? "default" : "outline"}
                className={`h-16 text-base font-medium rounded-2xl transition-all duration-200 flex flex-col items-center justify-center gap-1 ${
                  selectedCaller === name 
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg shadow-blue-500/25' 
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
                onClick={() => setSelectedCaller(name)}
              >
                <span className="text-lg">{emoji}</span>
                <span className="capitalize font-medium">{name}</span>
              </Button>
            ))}
          </div>

          {/* Call Me ASAP Button */}
          <Button
            onClick={handleCallMeNow}
            disabled={!selectedCaller}
            className={`w-full h-16 text-lg font-semibold rounded-2xl transition-all duration-200 flex items-center justify-center gap-2 ${
              selectedCaller 
                ? 'bg-red-500 hover:bg-red-600 text-white shadow-xl shadow-red-500/25 hover:shadow-red-500/40' 
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span className="text-xl">🚨</span>
            call me asap
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-sm text-gray-400 font-light">fakephonecall.com</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
