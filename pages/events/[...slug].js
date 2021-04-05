import { useRouter } from "next/router";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import useSWR from "swr";
import { useEffect, useState } from "react";

export default function FilteredEventsPage() {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  const { data, error } = useSWR(
    "https://kanbanfire-12f4e-default-rtdb.firebaseio.com/events.json"
  );

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

  if (!loadedEvents) return <p className="center">Loading...</p>;

  const [filteredYear, filteredMonth] = filterData;
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2040 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter, please change your value!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvents}></EventList>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;
//   const [year, month] = filterData;
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2040 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return { props: { hasError: true } };
//     //{ notFound: true };
//     //or we can redirect to another page
//     // redirect: {
//     //   destination: '/error'
//     // }
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       time: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
