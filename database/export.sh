#!/bin/bash
set -e

source /.env
DIR="/backup"

if [[ -z "$(ls -A $DIR | grep data-dump.sql)" ]]; then
	echo "Exporting database"
else
	echo "Database already exist at $DIR"
	exit 1
fi

mysqldump -u $DB_USER -p$DB_PASSWORD $DB_DATABASE > $DIR/data-dump.sql

if [[ -z "$(ls -A $DIR | grep data-dump.sql)" ]]; then
	echo "Error database exportation"
	exit 1
fi
  
exec "$@"