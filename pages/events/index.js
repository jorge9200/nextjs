import EventList from "../../components/events/event-list";
import { getAllEvents } from "../../helpers/api-util";
import EventsSearch from "../../components/events/event-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function EventsPage(props) {
  const router = useRouter();

  function findEventsHandler(selectedYear, selectedMonth) {
    const fullPath = `events/${selectedYear}/${selectedMonth}`;
    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={props.events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export default EventsPage;