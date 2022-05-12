import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = ({ featuredEvents }) => {
  return (
    <>
      <EventList items={featuredEvents} />
    </>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()
  return {
    props: {
      featuredEvents,
    },
    revalidate: 1800,
  }
}

export default HomePage
