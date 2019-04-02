#!/bin/bash
set -e

source .env
DIR="/var/www/app/src/models"

if [[ -z "$(ls -A $PWD | grep .env)" ]]; then
	echo "no .env file found."
	exit 1
fi

if [ "$(ls -A $DIR)" ]; then
     echo "Take action $DIR is not Empty"
else
    echo "$DIR is Empty"
		echo "running sequelize mapping"
		[ -d $DIR ] && echo "Directory $DIR exists." || echo "creating directory $DIR" mkdir $DIR
		# Sleep while dump data is importing
		sleep 40 && sequelize-auto -h $DB_HOST -d $DB_DATABASE -u $DB_USER -x $DB_PASSWORD -p $DB_PORT --dialect $DB_MACHINE -o $DIR
fi

yarn --cwd /var/www/app install

if [[ "$NODE_ENV" == "production" ]]; then
	yarn --cwd $DIR sls deploy -v
	yarn --cwd $DIR sls offline start
else
	yarn --cwd $DIR sls offline start
fi
  
exec "$@"