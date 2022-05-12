import Head from 'next/head'

import EventList from '../components/events/event-list'
import { getFeaturedEvents } from '../helpers/api-util'

const HomePage = ({ featuredEvents }) => {
  return (
    <>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
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
