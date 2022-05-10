import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

function SearchEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;
  const [loadedEvents, setLoadedEvents] = useState();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  // Get all events
  const { data, error } = useSWR(
    "https://nextjs-ded2e-default-rtdb.firebaseio.com/events.json",
    fetcher
  );

  //Set loaded events
  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta name="description" content="Filtered events" />
    </Head>
  );

  // If no loaded events: loading...
  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading...</p>
      </Fragment>
    );
  }

  // Prepare date filters
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  pageHeadData = (
    <Head>
      <title>Filtered events</title>
      <meta
        name="description"
        content={`Filtered events for ${filteredMonth}/${filteredYear}`}
      />
    </Head>
  );

  // If filters not right || error, show error
  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid filters. Please adjust your values!!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">All Events</Button>
        </div>
      </Fragment>
    );
  }

  // Filter events by date
  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  // If no events for choosed filters, show alert
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filters.</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">All Events</Button>
        </div>
      </Fragment>
    );
  }

  // Prepare date for banner
  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default SearchEventsPage;
