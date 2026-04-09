'use client';

import { Button } from '@/app/components/ui/button';
import { LuShare2 } from 'react-icons/lu';
import { toast } from 'sonner';

export function ShareEventButton({ eventId }: { eventId: string }) {
  async function handleCopyToClipboard() {
    const base = process.env.NEXT_PUBLIC_BASE_URL || window.location.origin;
    const url = `${base}/events/${eventId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Event link copied to clipboard!');
    } catch {
      toast.error('Failed to copy link to clipboard');
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full mt-3"
      onClick={handleCopyToClipboard}
    >
      <LuShare2 className="w-3.5 h-3.5" />
      Share event
    </Button>
  );
}
