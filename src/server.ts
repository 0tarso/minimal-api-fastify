import fastify from "fastify";
import cors from "@fastify/cors"

const teams = [
  { id: 1, name: "mercedes", country: "united kingdom" },
  { id: 2, name: "mcLaren", country: "united kingdom" },
  { id: 3, name: "ferrari", country: "italy" },
]

const drivers = [
  { id: 1, name: "lewis hamilton", team: "ferrari" },
  { id: 2, name: "lando norris", team: "mclaren" },
  { id: 3, name: "kimi antonelli", team: "mercedes" },
]


const server = fastify(
  { logger: true, }
);

server.register(cors, {
  origin: "*", //Qualquer origem
  methods: ["GET"]
})

server.get("/teams", async (request, response) => {
  response.type("application/json").code(200)

  return teams
})

server.get("/drivers", async (request, response) => {
  response.type("application/json").code(200)

  return drivers
})


interface DriverParams {
  id: string
}

server.get<{ Params: DriverParams }>("/drivers/:id", async (request, response) => {
  const id = parseInt(request.params.id)

  const driverById = drivers.find(driver => driver.id === id)

  if (!driverById) {
    response.type("application/json").code(404)

    return { message: "Driver not found" }
  }

  return driverById

})


server.listen(
  { port: 3233 }, () => { console.log("Server init") }
)