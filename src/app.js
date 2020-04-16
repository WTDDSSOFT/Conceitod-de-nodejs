const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);
  return response.status(200).json(repositorie);
  // TODO
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIdIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIdIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }
  const repositoryUpdate = {
    id,
    title,
    url,
    techs,
    likes: 0,
  };

  repositories[repositoryIdIndex] = repositoryUpdate;

  return response.json(repositoryUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Repository ID not found" });
  }
  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).json({ error: "Repository not found" });
  }
  console.log(repositoryIndex);
  repositories.splice(repositoryIndex, 1);
  console.log(repositoryIndex);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: "Repository ID not found" });
  }

  const repositorieLike = repositories.find(
    (repository) => repository.id === id
  );

  repositorieLike.likes += 1;
  return response.json(repositorieLike);
});

module.exports = app;
