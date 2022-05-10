import { useEffect, useState } from 'react'
import useSWR from 'swr'

const LastSalesPage = () => {
  const [sales, setSales] = useState([])
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

  if (!data || !sales) {
    return <p>Loading...</p>
  }

  // useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))

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

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  )
}

export default LastSalesPage
