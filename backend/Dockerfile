FROM python:3.10.11

WORKDIR /usr/src/app

RUN python -m venv .venv
RUN . .venv/bin/activate
RUN pip install --no-cache-dir thirdweb-sdk
RUN pip install --no-cache-dir Flask

COPY . .

CMD [ "python", "hello.py" ]