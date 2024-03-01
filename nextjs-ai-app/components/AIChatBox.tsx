import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { XCircle } from 'lucide-react';

interface AIChatBoxProps {
  open: boolean;
  onClose: () => void;
}

export default function AIChatBox({ open, onClose }: AIChatBoxProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    isLoading,
    error,
  } = useChat();

  return (
    <div
      className={cn(
        'buttom-0 right-0 z-10 w-full max-w-[500px] p-1 xl:right-36',
        open ? 'fixed' : 'hidden'
      )}
    >
      <button onClick={onClose} className='mb-1 ms-auto block'>
        <XCircle size={24} />
      </button>
      <div className='flex h-[600px] flex-col rounded bg-background border'></div>
    </div>
  );
}
