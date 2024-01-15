FROM cloudblueconnect/connect-extension-runner:30.0

COPY pyproject.toml /install_temp/.
COPY poetry.* /install_temp/.
WORKDIR /install_temp
RUN apt-get update && apt-get upgrade -y && apt-get install libsqlite3-dev -y
RUN poetry update && poetry install --no-root
COPY package*.json /extension/.
WORKDIR /extension
RUN if [ -f "/extension/package.json" ]; then npm install; fi
