# Rainbow Six Siege API

Docker image avalaible at [r6-api](https://hub.docker.com/repository/docker/pololacoste/r6-api).

## Docker

```bash
docker run --name r6-api -e EMAIL=EMAIL -e PASSWORD=PASSWORD -e PORT=3000 -p 3000:3000 -d pololacoste/r6-api
```

## Docker compose

```yaml
r6-api:
  restart: always 
  image: pololacoste/r6-api
  container_name: r6-api
  environment: 
    - EMAIL=${EMAIL}
    - PASSWORD=${PASSWORD}
    - PORT=3000
  ports:
    - 3000:3000
```

## Docker compose with Redis and Mongodb

```yaml
version: '2.1'
services:

  mongo:
    image: mongo:4.4.3-bionic
    container_name: mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: password
      MONGO_INITDB_DATABASE: r6
  
  redis:
    image: redis:6.0.9-alpine
    container_name: redis
    restart: always

  r6-api:
    restart: always 
    image: pololacoste/r6-api
    container_name: r6-api
    environment: 
      - EMAIL=${EMAIL}
      - PASSWORD=${PASSWORD}
      - PORT=3000
      - MONGO_URL=mongodb://root:password@mongo:27017/?ssl=false
      - REDIS_URL=redis://redis:6379
      - ENABLE_CACHING=1
    ports:
      - 3000:3000
    depends_on: 
      - mongo
      - redis
```