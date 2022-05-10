import { useEffect, useState } from 'react'
import useSWR from 'swr'

const LastSalesPage = ({ preRenderedSales }) => {
  const [sales, setSales] = useState(preRenderedSales)
  // const [isLoading, setIsLoading] = useState(false)

  const { data, error } = useSWR(
    'https://nextjs-full-course-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json',
    (url) => fetch(url).then((res) => res.json())
  )

  useEffect(() => {
    const transformedSales = []
    if (data) {
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        })
      }
    }

    setSales(transformedSales)
  }, [data])

  if (error) {
    return <p>Failed to load.</p>
  }

  if (!data && !sales) {
    return <p>Loading...</p>
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  )

  // useEffect(() => {
  //   setIsLoading(true)
  //   fetch(
  //     'https://nextjs-full-course-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  //   )
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       const transformedSales = []

  //       for (const key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         })
  //       }

  //       setSales(transformedSales)
  //       setIsLoading(false)
  //     })
  // }, [])

  // if (isLoading) {
  //   return <p>Loading...</p>
  // }
}

export const getStaticProps = async () => {
  const response = await fetch(
    'https://nextjs-full-course-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json'
  )
  const data = await response.json()
  const transformedSales = []

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    })
  }
  return {
    props: {
      preRenderedSales: transformedSales,
    },
    revalidate: 10,
  }
}

export default LastSalesPage
