# Rainbow Six Siege API

![R6-Api CI](https://github.com/PoloLacoste/r6-api/workflows/R6-Api%20CI/badge.svg?branch=main)

REST API version of [r6api.js](https://github.com/danielwerg/r6api.js) using Docker.
The data is cached (expire after 1 minute) if you are using redis and mongodb.

Docker image avalaible at [r6-api](https://hub.docker.com/repository/docker/pololacoste/r6-api).

# Install

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

# HTTP API

An swagger documentation is available at the root of the server.

## Get id

Gets the id of a player from their username.

**URL** : `/{platform}/id/{username}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `username` [string] : username of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781"
}
```

## Get level

Gets the level, xp and alpha pack drop chance of a player.

**URLS** : 
- `/{platform}/level/id/{id}`
- `/{platform}/level/username/{username}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `id` [string] : id of the player
- `username` [string] : username of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781",
  "level": 377,
  "xp": 137702,
  "lootboxProbability": {
    "raw": 4320,
    "percent": "43.20%"
  }
}
```

## Get playtime

Gets the playtime of a player.

**URLS** : 
- `/{platform}/playtime/id/{id}`
- `/{platform}/playtime/username/{username}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `id` [string] : id of the player
- `username` [string] : username of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781",
  "pvp": {
    "general": 6343064,
    "ranked": 5699426,
    "casual": 499943,
    "custom": 0,
    "other": 143695
  },
  "pve": {
    "general": 989429
  }
}
```

## Get rank

Gets seasonal stats of a player.

Return all the 

**URLS** : 
- `/{platform}/rank/id/{id}`
- `/{platform}/rank/username/{username}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `id` [string] : id of the player
- `username` [string] : username of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781",
  "seasons": {
    "20": {
      "id": 20,
      "name": "Neon Dawn",
      "color": "#D14007",
      "image": "https://staticctf.akamaized.net/J3yJr34U2pZ2Ieem48Dwy9uqj5PNUQTn/3vRTyOgSmwcUVxiOk60p3w/e2f41521df1f67704dae051d147a32cc/r6s-seasons-y5s4.jpg",
      "regions": {
        "emea": {
          "region": "emea",
          "skillMean": 44.754280517,
          "skillStdev": 4.1872731355,
          "current": {
            "name": "Diamond",
            "id": 22,
            "mmr": 4475,
            "image": "https://i.imgur.com/dPuxt0u.png"
          },
          "max": {
            "name": "Diamond",
            "id": 22,
            "mmr": 4669,
            "image": "https://i.imgur.com/dPuxt0u.png"
          },
          "lastMatch": {
            "mmrChange": -35,
            "won": false,
            "skillStdevChange": -0.0127268645
          },
          "previousMmr": 4400,
          "nextMmr": 5000,
          "nextRankMatchesNeeded": 15,
          "topRankPosition": 0,
          "kills": 365,
          "deaths": 271,
          "wins": 48,
          "losses": 20,
          "matches": 68,
          "abandons": 1,
          "updateTime": "2021-01-16T19:06:55.075000+00:00"
        }
      }
    }
  }
}
```

## Get stats

Gets general stats of a player.

**URLS** : 
- `/{platform}/stats/id/{id}`
- `/{platform}/stats/username/{username}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `id` [string] : id of the player
- `username` [string] : username of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781",
  "pvp": {
    "weapons": {},
    "operators": {},
    "general": {},
    "modes": {},
    "queue": {},
  },
  "pve": {
    "weapons": {},
    "operators": {},
    "general": {},
    "modes": {},
    "types": {},
  }
}
```

## Get servers status

Gets Rainbow Six Siege servers status.

**URL** : `/status`

**Method** : `GET`

**Response** :

```json
{
  "PC": {
    "AppID ": "e3d5ea9e-50bd-43b7-88bf-39794f4e3d40",
    "MDM": "4073",
    "SpaceID": "5172a557-50b5-4665-b7db-e3f2e8c5041d",
    "Category": "Instance",
    "Name": "Rainbow Six Siege - PC - LIVE",
    "Platform": "PC",
    "Status": "Online",
    "Maintenance": null,
    "ImpactedFeatures": []
  },
  "PS4": {
    "AppID ": "fb4cc4c9-2063-461d-a1e8-84a7d36525fc",
    "MDM": "14922",
    "SpaceID": "05bfb3f7-6c21-4c42-be1f-97a33fb5cf66",
    "Category": "Instance",
    "Name": "Rainbow Six Siege - PS4 - LIVE",
    "Platform": "PS4",
    "Status": "Online",
    "Maintenance": null,
    "ImpactedFeatures": []
  },
  "XBOX": {
    "AppID ": "4008612d-3baf-49e4-957a-33066726a7bc",
    "MDM": "4075",
    "SpaceID": "98a601e5-ca91-4440-b1c5-753f601a2c90",
    "Category": "Instance",
    "Name": "Rainbow Six Siege - XBOXONE - LIVE",
    "Platform": "XBOXONE",
    "Status": "Online",
    "Maintenance": null,
    "ImpactedFeatures": []
  }
}
```

## Get username

Gets the username of a player from their id.

**URL** : `/{platform}/username/{id}`

**Method** : `GET`

**Parameters** : 
- `platform` [string] : `uplay` (pc), `xbl` (Xbox Live) or `psn` (PlayStation Network)
- `id` [string] : id of the player

**Response** :

```json
{
  "id": "be3313d6-d443-4eae-818f-bb7f56837781",
  "userid": "be3313d6-d443-4eae-818f-bb7f56837781",
  "username": "Godly",
  "platform": "uplay"
}
```

# TODO

* More stats routes, split data in routes
* Specify which season stats we want in rank route
* Tests 😭
