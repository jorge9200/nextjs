export async function getAllEvents() {
  const reponse = await fetch(
    "https://nextjs-ded2e-default-rtdb.firebaseio.com/events.json"
  );
  const data = await reponse.json();
  return eventsDBToArray(data);
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

function eventsDBToArray(eventsDB) {
  const events = [];
  for (const key in eventsDB) {
    events.push({
      id: key,
      ...eventsDB[key],
    });
  }
  return events;
}
