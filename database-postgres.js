import { randomUUID } from "node:crypto";
import { sql } from "./db.js";

export class DatabasePostres {
  async create(video) {
    const videoId = randomUUID();
    const { title, description, duration } = video;
    const videos = await sql`
      INSERT INTO videos (id, title, description, duration)
      VALUES (${videoId}, ${title}, ${description}, ${duration})
      RETURNING *;
    `;
    return videos;
  }
  async read(search) {
    let videos;
    if (search) {
      videos = await sql`SELECT * FROM videos WHERE title ilike ${
        "%" + search + "%"
      }`;
    } else {
      videos = await sql`SELECT * FROM videos`;
    }
    return videos;
  }
  async update(id, video) {
    const { title, description, duration } = video;
    const updatedVideos = await sql`
    UPDATE videos
    SET title = ${title}, description = ${description}, duration = ${duration}
    WHERE id = ${id}
    RETURNING *;
  `;
    return updatedVideos;
  }
  async delete(id) {
    const deletedVideos = await sql`
      DELETE FROM videos
      WHERE id = ${id}
      RETURNING *;
    `;
    return deletedVideos;
  }
}
