import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../dummy-data";
import EventsSearch from "../../components/events/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(selectedYear, selectedMonth) {
    const fullPath = `events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default EventsPage;
