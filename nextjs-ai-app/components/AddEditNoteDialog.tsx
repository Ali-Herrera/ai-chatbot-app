import { CreateNoteSchema, createNoteSchema } from '@/lib/validation/note';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogFooter,
} from './ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from './ui/form';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import LoadingButton from './ui/loading-button';
import { useRouter } from 'next/navigation';
import { Note } from '@prisma/client';
import { useState } from 'react';
import { set } from 'zod';

interface AddEditNoteDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  noteToEdit?: Note;
}

export default function AddEditNoteDiaglog({
  open,
  setOpen,
  noteToEdit,
}: AddEditNoteDialogProps) {
  const [deleteInProgress, setDeleteInProgress] = useState(false);

  const router = useRouter();

  const form = useForm<CreateNoteSchema>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: {
      title: noteToEdit?.title || '',
      content: noteToEdit?.content || '',
    },
  });

  async function onSubmit(input: CreateNoteSchema) {
    try {
      if (noteToEdit) {
        const response = await fetch('/api/notes', {
          method: 'PUT',
          body: JSON.stringify({ id: noteToEdit.id, ...input }),
        });
        if (!response.ok) throw Error('Status code: ' + response.status);
      } else {
        const response = await fetch('/api/notes', {
          method: 'POST',
          body: JSON.stringify(input),
        });

        if (!response.ok) throw Error('Status code: ' + response.status);
        form.reset();
      }
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  }

  async function deleteNote() {
    if (!noteToEdit) return;
    setDeleteInProgress(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'DELETE',
        body: JSON.stringify({ id: noteToEdit.id }),
      });
      if (!response.ok) throw Error('Status code: ' + response.status);
      router.refresh();
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    } finally {
      setDeleteInProgress(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{noteToEdit ? 'Edit Note' : 'Add Note'}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note title</FormLabel>
                  <FormControl>
                    <Input placeholder='Note title' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='content'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note Content</FormLabel>
                  <FormControl>
                    <Textarea placeholder='Note content' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className='gap=1'>
              {noteToEdit && (
                <LoadingButton
                  loading={deleteInProgress}
                  onClick={deleteNote}
                  variant='destructive'
                  disabled={form.formState.isSubmitting}
                  type='button'
                >
                  Delete
                </LoadingButton>
              )}
              <LoadingButton
                type='submit'
                loading={form.formState.isSubmitting}
                disabled={deleteInProgress}
              >
                Submit
              </LoadingButton>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
