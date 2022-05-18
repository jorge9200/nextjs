import Link from "next/link";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import Head from "next/head";
import NewsletterRegistration from "../components/input/newsletter-registration";

function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NextJs Events</title>
        <meta name="description" content="Find a lot of great events!" />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.featuredEvents} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
