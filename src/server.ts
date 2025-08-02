import fastify from "fastify";
import cors from "@fastify/cors"

const teams = [
  { id: 1, name: "mercedes", country: "united kingdom" },
  { id: 2, name: "mclaren", country: "united kingdom" },
  { id: 3, name: "ferrari", country: "italy" },
  { id: 4, name: "red bull racing", country: "austria" },
  { id: 5, name: "racing bulls", country: "austria" },
  { id: 6, name: "aston martin", country: "united kingdom" },
  { id: 7, name: "haas", country: "united states" },
  { id: 8, name: "alpine", country: "france" },
  { id: 9, name: "williams", country: "united kingdom" },
  { id: 10, name: "sauber", country: "switzerland" }
];

const drivers = [
  // Mercedes
  { id: 1, name: "george russell", team: "mercedes" },
  { id: 2, name: "kimi antonelli", team: "mercedes" },
  // McLaren
  { id: 3, name: "lando norris", team: "mclaren" },
  { id: 4, name: "oscar piastri", team: "mclaren" },
  // Ferrari
  { id: 5, name: "charles leclerc", team: "ferrari" },
  { id: 6, name: "lewis hamilton", team: "ferrari" },
  // Red Bull Racing
  { id: 7, name: "max verstappen", team: "red bull racing" },
  { id: 8, name: "yuki tsunoda", team: "red bull racing" },
  // Racing Bulls
  { id: 9, name: "isack hadjar", team: "racing bulls" },
  { id: 10, name: "liam lawson", team: "racing bulls" },
  // Aston Martin
  { id: 11, name: "fernando alonso", team: "aston martin" },
  { id: 12, name: "lance stroll", team: "aston martin" },
  // Haas
  { id: 13, name: "esteban ocon", team: "haas" },
  { id: 14, name: "oliver bearman", team: "haas" },
  // Alpine
  { id: 15, name: "pierre gasly", team: "alpine" },
  { id: 16, name: "franco colapinto", team: "alpine" },
  // Williams
  { id: 17, name: "alex albon", team: "williams" },
  { id: 18, name: "carlos sainz", team: "williams" },
  // Sauber
  { id: 19, name: "nico hulkenberg", team: "sauber" },
  { id: 20, name: "gabriel bortoleto", team: "sauber" }
];


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


const PORT = parseInt(process.env.PORT ?? "3333")

server.listen(
  { port: PORT }, () => { console.log(`Server init on => ${PORT}`) }
)