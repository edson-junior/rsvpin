import { http, HttpResponse } from 'msw';
import { mockEvents, mockUsers } from './mockData';

export const handlers = [
  http.get('*/api/users', () => {
    return HttpResponse.json(mockUsers);
  }),

  http.get('*/api/events/:eventId', ({ params }) => {
    const { eventId } = params;
    const event = mockEvents.find((e) => e.id === eventId);
    return event
      ? HttpResponse.json(event)
      : HttpResponse.json({ message: 'Event not found' }, { status: 404 });
  }),
];
