# Zen

## Setup

**A `.env` file must be created and populated with appropriate configuration values. Sample values in the `.env.example` file.**

**For front-end Sentry use, a `front/.env.local` needs creation and configuration too.**

Install Docker and Docker-Compose, then

```
docker-compose build
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up # dev
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up # prod
```

Dev containers start with :

- Express app on port 8080
- React app on port 3000
- nginx (last React production build) on port 80

Production containers only open port 443 & 80

## Production

### Enabling e-mails and data transmission to pole-emploi.fr

The following value need to be set to `true` in the production server production.js configuration file:

```js
  {
    shouldSendReminderEmails: false, // reminder e-mails
    shouldSendPEAgentEmails: false, // transactional e-mails
    shouldTransmitDataToPE: false, // pe-agent activation
  }
```

### HTTPS certificate

The entrust-zen.pole-emploi.fr-key.pem file must be put in the nginx folder
