docker rm -f postgres
docker run --name postgres -e POSTGRES_PASSWORD=finanxe -e POSTGRES_USER=finanxe -e POSTGRES_DB=finanxe -d -p 5432:5432 postgres