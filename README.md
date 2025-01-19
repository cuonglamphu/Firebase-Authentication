# Basic Authentication Flow [Test]

## Setup Server

```bash
npm install
```

## Run

```bash
npm run start
```

# Using ngrok

1. Install ngrok

```bash
brew install ngrok
```

2. Run ngrok

```bash
ngrok http http://localhost:3000
```

3. Get ngrok url

Get the url from the ngrok terminal and use it in Config.ts of the client (seatscout-client/config/config.tsx).

## Setup Client

1. Install dependencies

```bash
cd seatscout-client
```

2. Run the client

```bash
npm run start
```

Now, you can use Expo Go to scan the QR code and run the client on your phone.
