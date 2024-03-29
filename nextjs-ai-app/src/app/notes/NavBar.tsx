'use client';

import Image from 'next/image';
import Link from 'next/link';
import logo from '@/assets/logo.png';
import { UserButton } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import AddEditNoteDiaglog from '@/components/AddEditNoteDialog';
import AiChatButton from '@/components/AiChatButton';

export default function NavBar() {
  const [showAddEditNoteDialog, setShowAddEditNoteDialog] = useState(false);

  return (
    <>
      <div className='p-4 shadow'>
        <div className='max-w-7xl flex flex-wrap gap-3 items-center justify-between'>
          <Link href='/notes' className='flex items-center gap-1'>
            {/* <Image src={logo} alt='AI App' width={32} height={32} /> */}
            <span className='font-bold'>AI App</span>
          </Link>
          <div className='flex items-center gap-2'>
            <UserButton
              afterSignOutUrl='/'
              appearance={{
                elements: { avatarBox: { width: '2.5rem', height: '2.5rem' } },
              }}
            />
            <Button onClick={() => setShowAddEditNoteDialog(true)}>
              <Plus size={20} className='mr-2' />
              Add Note
            </Button>
            <AiChatButton />
          </div>
        </div>
      </div>
      <AddEditNoteDiaglog
        open={showAddEditNoteDialog}
        setOpen={setShowAddEditNoteDialog}
      />
    </>
  );
}
