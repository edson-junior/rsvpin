import {
  LuCalendar,
  LuClock,
  LuMapPin,
  LuType,
  LuTag,
  LuUsers,
} from 'react-icons/lu';
import { iconClass, inputClass, labelClass } from './ui/input';
import { cn } from '@/lib/utils';
import { ImageUpload } from './ImageUpload';

type Props = {
  children?: React.ReactNode;
  action?: (formData: FormData) => void;
  defaultValues?: {
    name?: string;
    date?: string;
    time?: string;
    location?: string;
    category?: string;
    description?: string;
    maxGuests?: number;
    image?: string | null;
  };
  errors?: {
    name?: string;
    date?: string;
    time?: string;
    location?: string;
    category?: string;
    description?: string;
    maxGuests?: string;
    image?: string;
    general?: string;
  };
};

const eventFormLabelClass = cn(labelClass, 'flex items-center gap-2 mb-0');
const errorClass = 'text-destructive text-xs mt-1';

function EventForm({ children, action, defaultValues, errors }: Props) {
  return (
    <form action={action} className="space-y-5">
      {errors?.general && (
        <p className="text-destructive text-sm">{errors.general}</p>
      )}

      <div>
        <p className={eventFormLabelClass}>Event Image</p>
        <div className="mt-2">
          <ImageUpload name="image" defaultValue={defaultValues?.image} />
        </div>
        {errors?.image && <span className={errorClass}>{errors.image}</span>}
      </div>

      <div>
        <label htmlFor="name" className={eventFormLabelClass}>
          <LuType className={iconClass} />
          Event Title <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          id="name"
          name="name"
          placeholder="e.g. Design Systems Workshop"
          defaultValue={defaultValues?.name}
          className={inputClass}
          maxLength={100}
          required
        />
        {errors?.name && <span className={errorClass}>{errors.name}</span>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className={eventFormLabelClass}>
            <LuCalendar className={iconClass} />
            Date <span className="text-red-600 text-lg font-bold">*</span>
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={defaultValues?.date}
            className={inputClass}
            required
          />
          {errors?.date && <span className={errorClass}>{errors.date}</span>}
        </div>
        <div>
          <label htmlFor="time" className={eventFormLabelClass}>
            <LuClock className={iconClass} />
            Time <span className="text-red-600 text-lg font-bold">*</span>
          </label>
          <input
            id="time"
            name="time"
            type="time"
            defaultValue={defaultValues?.time}
            className={inputClass}
            required
          />
          {errors?.time && <span className={errorClass}>{errors.time}</span>}
        </div>
      </div>

      <div>
        <label htmlFor="location" className={eventFormLabelClass}>
          <LuMapPin className={iconClass} />
          Location <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          id="location"
          name="location"
          placeholder="e.g. San Francisco, CA"
          defaultValue={defaultValues?.location}
          className={inputClass}
          maxLength={120}
          required
        />
        {errors?.location && (
          <span className={errorClass}>{errors.location}</span>
        )}
      </div>

      <div>
        <label htmlFor="category" className={eventFormLabelClass}>
          <LuTag className={iconClass} />
          Category <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          id="category"
          name="category"
          placeholder="e.g. Tech"
          defaultValue={defaultValues?.category}
          className={inputClass}
          maxLength={120}
          required
        />
        {errors?.category && (
          <span className={errorClass}>{errors.category}</span>
        )}
      </div>

      <div>
        <label htmlFor="maxGuests" className={eventFormLabelClass}>
          <LuUsers className={iconClass} />
          Max Guests <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          id="maxGuests"
          name="maxGuests"
          type="number"
          min={1}
          max={500}
          placeholder="e.g. 50"
          defaultValue={defaultValues?.maxGuests}
          className={inputClass}
          required
        />
        {errors?.maxGuests && (
          <span className={errorClass}>{errors.maxGuests}</span>
        )}
      </div>

      <div>
        <label htmlFor="description" className={eventFormLabelClass}>
          <LuType className={iconClass} />
          Description <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Tell people what your event is about..."
          defaultValue={defaultValues?.description}
          rows={5}
          className={`${inputClass} resize-none`}
          maxLength={2000}
          required
        />
        {errors?.description && (
          <span className={errorClass}>{errors.description}</span>
        )}
      </div>
      {children}
    </form>
  );
}

export default EventForm;
