# CSG Visitor Kiosk

Version 3 (July 2026). Built during the summer 2026 internship.

A visitor check-in web app for the CSG lobby. Visitors check in on a
kiosk in about 30 seconds. Each check-in instantly pings the host in
Slack and is logged as a row in the company Postgres database. Admins
view, filter, and export the full visitor history from any computer on
the network, and manage the app entirely from a built-in dashboard with
no code changes needed for day-to-day upkeep.

## Features

Visitor side:
- Check-in form: first name, last name, who they are here to see
  (dropdown with type-ahead), planned or drop-in, reason for visit
- Slack notification on every check-in: personal @mention if the host
  has a Slack ID on file, otherwise an @here to the channel
- Confirmation screen telling the visitor to wait in the lobby
- Check-in chime, with a small mute toggle in the corner (the choice is
  remembered per device)
- CSG watermark background on the form page

Admin side (Sign in as Admin link on the kiosk, or add #admin to the URL):
- Visitor History tab: filter by time period (last 30 days, this week,
  last week, last two weeks, or custom dates), visitors-by-day chart,
  full history list, and Export to Excel that exports exactly the
  selected period
- Settings tab: add or remove names from the check-in dropdown (with
  optional Slack member ID for personal mentions), add or remove admin
  accounts, and change your own password
- Sign-in is verified by the server. Passwords are stored hashed in the
  database. No secrets exist anywhere in the page source.

## How it works

One Docker container runs a small Node.js app (server.js) that serves
the page and provides the API. All data lives on the company Postgres
server in three tables: kiosk_visits, kiosk_admins, kiosk_employees.
The tables are created automatically on first startup, and seeded with
the initial admin accounts and employee list only if they are empty.
After that, everything is managed from the dashboard.

Slack notifications are sent by the page through an incoming webhook.
The webhook URL is set in public/index.html (search SLACK_WEBHOOK_URL).
A webhook is permanently tied to one channel; to change channels,
create a new webhook in the Slack app settings and paste the new URL.

## Folder contents

- public/index.html    the entire kiosk page and admin dashboard
- public/checkin.mp3   the check-in chime (must keep this exact name)
- server.js            the API and database logic
- reset-password.js    rescue script for a forgotten admin password
- Dockerfile           how the app container is built
- docker-compose.yml   how the container runs
- .env.example         template for the database connection details
- .env                 the real connection details (create from the
                       template; never share this file or zip it up)

## Deploying

Requirements: Docker Desktop installed and running on the host machine,
and network access to the Postgres server.

1. Copy this folder onto the host machine.
2. Create the connection file:
   copy .env.example .env
   Edit .env with the Postgres details. Notes learned the hard way:
   type the hostname by hand (pasting can smuggle in link formatting),
   no quotes, no spaces around the equals sign, and uncomment
   PGSSL=require because the CSG Postgres requires SSL.
3. Start it:
   docker compose up -d --build
4. Verify: http://localhost:3000/api/health should return
   {"ok":true,"db":true}. If db is false, run
   docker compose logs app and read the last lines; the error names
   the exact problem (wrong password, unreachable host, SSL, or a
   misspelled database name).

URLs once running (replace HOST with the machine's address):
- Kiosk: http://HOST:3000
- Admin dashboard: http://HOST:3000#admin

The kiosk device (MDM browser) points at the kiosk URL. The admin URL
is pinned in the private admin Slack channel. These URLs work on the
office network only.

## Making changes

The golden rule: edit the file, then rebuild the container. Edits are
invisible until you run:
   docker compose up -d --build
Data is never affected by rebuilds. Admins are signed out by any
restart and simply sign in again.

Common edits, all in public/index.html:
- Slack channel: replace SLACK_WEBHOOK_URL with a new webhook URL
- Watermark strength: search fill-opacity (higher is bolder)
- Reasons list: search const REASONS
Names, admins, and passwords need no edits at all; use the dashboard.

## Admin account notes

- New admins are added from Settings with a temporary password; they
  sign in and change it themselves. You cannot remove your own account,
  which guarantees at least one admin always exists.
- Forgotten password rescue, run on the host machine in this folder:
  docker compose exec app node reset-password.js someone@thisiscsg.com NewPassword123

## Data safety

All data lives on the Postgres server, covered by whatever backup
routine that server has. No Docker command on this app can delete the
data; even docker compose down -v only removes the app. The only way to
lose visitor history is deleting the kiosk_ tables on the Postgres
server itself.

## Troubleshooting quick list

- Site unreachable from other computers: use the host's real network
  address (not a 172.x virtual adapter address), and if needed allow
  inbound TCP 3000 in Windows Firewall on the host.
- Port is already allocated on startup: an older copy is still running.
  docker ps, then docker stop and docker rm the old containers.
- no configuration file provided: you are one folder too high; cd into
  the folder containing docker-compose.yml.
- Health check db:false: connection details; read docker compose logs app.
- No chime: check the corner mute toggle first, then confirm
  checkin.mp3 sits in public/ with exactly that name.
- Docker API / pipe error: Docker Desktop is not running; start it and
  make sure "Start Docker Desktop when you sign in" is enabled so the
  kiosk survives reboots.

## Contact

Built by the 2026 summer interns. The admin accounts, the Slack app,
and the Postgres access were set up during the internship; IT holds
the credentials going forward.
