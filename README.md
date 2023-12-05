# Fungi Shroomer 🍄

Discord bot made specifically for the Fungus Inc. server 💬

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`TOKEN` - Your Discord's Bot generated token on [Discord Developer Portal](https://discord.com/developers/applications)

`CLIENT_ID` - Your Discord's user token

`GUILD_ID` - The Discord's server you invite the bot to

## Run Locally

Clone the project in the current directory

```bash
  git clone https://github.com/MuchaSsak/fungi-shroomer.git .
```

Install dependencies

```bash
  yarn
```

Start the server

```bash
  yarn start
```

## Deployment with Docker

Get the latest Docker image

```bash
  docker pull muchassak/fungi-shroomer:latest
```

Define the container

```bash
  docker-compose up -d
```

Start the container

```bash
  docker exec fungi-shroomer env
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
