import { fastify } from "fastify";
import { consola } from "consola";
import { DatabasePostres } from "./database-postgres.js";

const server = fastify();

const database = new DatabasePostres();

server.post("/videos", async (request, reply) => {
  const { title, description, duration } = request.body;
  await database.create({
    title: title,
    description: description,
    duration: duration,
  });
  return reply.status(201).send();
});
server.get("/videos", async (request, reply) => {
  const search = request.query.search;
  const videos = await database.read(search);
  reply.status(200).send(videos);
});
server.put("/videos/:id", (request, reply) => {
  const { title, description, duration } = request.body;
  const videoId = request.params.id;
  database.update(videoId, {
    title,
    description,
    duration,
  });
  reply.status(204).send();
});
server.delete("/videos/:id", async (request, reply) => {
  const videoId = request.params.id;
  await database.delete(videoId);
  reply.status(204).send();
});

server.listen({ port: 3333 }, () => {
  consola.success("Servidor rodando!");
});
