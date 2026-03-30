import { LuCalendar, LuClock, LuMapPin, LuType, LuTag } from 'react-icons/lu';
import { iconClass, inputClass, labelClass } from './ui/input';
import { cn } from '@/lib/utils';

type Props = {
  children?: React.ReactNode;
};

const eventFormLabelClass = cn(labelClass, 'flex items-center gap-2 mb-0');

function EventForm({ children }: Props) {
  return (
    <form className="space-y-5">
      <div>
        <label className={eventFormLabelClass}>
          <LuType className={iconClass} />
          Event Title <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Design Systems Workshop"
          className={inputClass}
          maxLength={100}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={eventFormLabelClass}>
            <LuCalendar className={iconClass} />
            Date <span className="text-red-600 text-lg font-bold">*</span>
          </label>
          <input type="date" className={inputClass} required />
        </div>
        <div>
          <label className={eventFormLabelClass}>
            <LuClock className={iconClass} />
            Time <span className="text-red-600 text-lg font-bold">*</span>
          </label>
          <input type="time" className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={eventFormLabelClass}>
          <LuMapPin className={iconClass} />
          Location <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. San Francisco, CA"
          className={inputClass}
          maxLength={200}
          required
        />
      </div>

      <div>
        <label className={eventFormLabelClass}>
          <LuTag className={iconClass} />
          Category <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <input
          type="text"
          placeholder="e.g. Tech"
          className={inputClass}
          maxLength={200}
          required
        />
      </div>

      <div>
        <label className={eventFormLabelClass}>
          <LuType className={iconClass} />
          Description <span className="text-red-600 text-lg font-bold">*</span>
        </label>
        <textarea
          placeholder="Tell people what your event is about..."
          rows={5}
          className={`${inputClass} resize-none`}
          maxLength={2000}
          required
        />
      </div>
      {children}
    </form>
  );
}

export default EventForm;
