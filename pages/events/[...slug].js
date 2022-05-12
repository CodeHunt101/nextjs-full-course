import { useRouter } from 'next/router'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import { getFilteredEvents } from '../../helpers/api-util'
import ErrorAlert from '../../components/ui/error-alert'

const FilteredEventsPage = ({ events, hasError, datee }) => {
  // const router = useRouter()

  // const filterData = router.query.slug

  // if (!filterData) {
  //   return <p className="center">Loading...</p>
  // }

  // const filteredYear = filterData[0]
  // const filteredMonth = filterData[1]

  // const numYear = +filteredYear
  // const numMonth = +filteredMonth

  if (hasError) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={'/events'}>Show All Events</Button>
        </div>
      </>
    )
  }

  const filteredEvents = events

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link={'/events'}>Show All Events</Button>
        </div>
      </>
    )
  }

  const date = new Date(datee.year, datee.month - 1)

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  )
}

export const getServerSideProps = async ({ params }) => {
  const filterData = params.slug

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      // notFound: true,
      // redirect: {
      //   destination: '/error'
      // }
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filteredEvents,
      datee: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
