import { useRouter } from "next/router"

const ClientProjectsPage =() => {
  
  const router = useRouter()

  console.log(router.query)

  const loadProjectHandler = () => {
    // load data...
    router.push('/clients/max/projectA')
  }
  
  return (
    <div>
      <h1>The Projects of a Given Client</h1>
      <button onClick={loadProjectHandler}>Load Project A</button>
    </div>
  )
}

export default ClientProjectsPage