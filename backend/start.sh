#!/bin/bash
set -e
DIR="/var/www/app/src/models"
DIR_PROJECT="/var/www/app"

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

sudo yarn --cwd $DIR_PROJECT install

yarn --cwd $DIR_PROJECT sls offline start
  
exec "$@"