import { useEffect, useState } from 'react';

type MessageBarProps = {
  message: string;
};

export default function MessageBar({ message }: MessageBarProps) {
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(k => k + 1);
  }, [message]);

  return (
    <div
      key={key}
      className="fade-in text-center px-4 py-2 rounded-lg bg-ocean-light/20 border border-ocean-light/30 text-white text-sm font-medium min-h-[40px] flex items-center justify-center"
    >
      {message}
    </div>
  );
}
