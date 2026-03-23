import { LuCalendar, LuClock, LuMapPin, LuType, LuTag } from 'react-icons/lu';

export default async function Create() {
  const inputClass =
    'w-full px-4 py-3 rounded-md bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow';
  const labelClass =
    'flex items-center gap-2 text-sm font-medium text-foreground mb-2';
  const iconClass = 'w-4 h-4 text-primary';

  return (
    <main className="container mx-auto px-4 pt-32 md:pt-40 pb-20 max-w-2xl">
      <h1 className="font-display text-3xl font-bold text-foreground mb-2">
        Create Event
      </h1>
      <p className="text-muted-foreground mb-8">
        Fill in the details to create a beautiful event page.
      </p>

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

        <button className="w-full py-3.5 px-6 rounded-md bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity">
          Create Event
        </button>
      </form>
    </main>
  );
}
