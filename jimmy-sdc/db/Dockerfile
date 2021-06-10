FROM mongo:latest

# Taken from Trent's lecture
WORKDIR /usr/src/

# also taken fron Trent's lecture, this will copy in all csv's from the csv directory
COPY ./csv .

# Trent also has this line but doesn't explain it
# Is there anther step required to load csv's?
# How do I load transformed Mongo data?
# COPY ./init/_/docker-entrypoint-something.sh/