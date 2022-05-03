import path from 'path'
import fs from 'fs/promises'
import Link from 'next/link'

function HomePage({ products }) {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  )
}

export const getStaticProps = async (context) => {
  console.log('re-generating')
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData)

  // const response = await fetch('http://localhost:4000/products')
  // const products = await response.json()

  // console.log(products)

  if (!data) {
    return {
      redirect: {
        destination: '/no-data',
      },
    }
  }

  if (data.products.length === 0) {
    return { notFound: true }
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  }
}

export default HomePage
