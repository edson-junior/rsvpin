import { LuCalendar, LuClock, LuMapPin, LuType, LuTag } from 'react-icons/lu';
import { iconClass, inputClass, labelClass } from './ui/input';

type Props = {
  children?: React.ReactNode;
};

function EventForm({ children }: Props) {
  return (
    <form className="space-y-5">
      <div>
        <label className={labelClass}>
          <LuType className={iconClass} />
          Event Title *
        </label>
        <input
          type="text"
          placeholder="e.g. Design Systems Workshop"
          className={inputClass}
          maxLength={100}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>
            <LuCalendar className={iconClass} />
            Date *
          </label>
          <input type="date" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>
            <LuClock className={iconClass} />
            Time *
          </label>
          <input type="time" className={inputClass} />
        </div>
      </div>

      <div>
        <label className={labelClass}>
          <LuMapPin className={iconClass} />
          Location *
        </label>
        <input
          type="text"
          placeholder="e.g. San Francisco, CA"
          className={inputClass}
          maxLength={200}
        />
      </div>

      <div>
        <label className={labelClass}>
          <LuTag className={iconClass} />
          Category *
        </label>
        <input
          type="text"
          placeholder="e.g. Tech"
          className={inputClass}
          maxLength={200}
        />
      </div>

      <div>
        <label className={labelClass}>
          <LuType className={iconClass} />
          Description
        </label>
        <textarea
          placeholder="Tell people what your event is about..."
          rows={5}
          className={`${inputClass} resize-none`}
          maxLength={2000}
        />
      </div>
      {children}
    </form>
  );
}

export default EventForm;
