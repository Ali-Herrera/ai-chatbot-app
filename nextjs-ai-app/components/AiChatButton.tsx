import { useState } from 'react';
import AIChatBox from './AIChatBox';
import { Button } from './ui/button';

export default function AiChatButton() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setChatBoxOpen(true)}>AI Chat</Button>
      <AIChatBox open={chatBoxOpen} onClose={() => setChatBoxOpen(false)} />
    </>
  );
}
