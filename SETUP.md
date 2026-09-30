## Local Development Setup

Start NetBox before running tests:

```bash
cd /d/Programiranje/netbox-docker
docker compose up -d
```

Wait 30 seconds, then verify at http://localhost:8000

Run tests:

```bash
cd /d/Programiranje/JavaScript/ddi-qa-lab
npx playwright test
```