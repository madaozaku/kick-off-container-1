## kick-off-container

動かし方

```bash
kick-off-container % kick-off-container % cd frontend/
frontend % npm install
frontend % cd ../
kick-off-container % docker-compose up -d
```

事前準備と動作確認

```bash
frontend % curl http://localhost
```

AppService Push

```bash
kick-off-container % az login
kick-off-container % az acr login -n web3kickoff
kick-off-container % cd frontend/
frontend % docker build -f Dockerfile -t web3kickoff.azurecr.io/kick-off-container-frontend .
[+] Building 1.7s (10/10) FINISHED
 => [internal] load build definition from Dockerfile                                                                                               0.1s
 => => transferring dockerfile: 74B                                                                                                                0.0s
 => [internal] load .dockerignore                                                                                                                  0.0s
 => => transferring context: 2B                                                                                                                    0.0s
 => [internal] load metadata for docker.io/library/node:18                                                                                         1.5s
 => [1/5] FROM docker.io/library/node:18@sha256:8cdf7234449f35e579f7491137807ddb3a089f028862f7ab69af437cc9f47ff1                                   0.0s
 => [internal] load build context                                                                                                                  0.0s
 => => transferring context: 255B                                                                                                                  0.0s
 => CACHED [2/5] WORKDIR /app                                                                                                                      0.0s
 => CACHED [3/5] COPY package*.json ./                                                                                                             0.0s
 => CACHED [4/5] RUN npm install                                                                                                                   0.0s
 => CACHED [5/5] COPY .* .                                                                                                                         0.0s
 => exporting to image                                                                                                                             0.0s
 => => exporting layers                                                                                                                            0.0s
 => => writing image sha256:f80cd324dbcf2ec597a3cc7607830ea1311a951b4dc239488be8f4d968b33d55                                                       0.0s
 => => naming to web3kickoff.azurecr.io/kick-off-container-frontend                                                                                0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
frontend % docker push web3kickoff.azurecr.io/kick-off-container-frontend:latest
The push refers to repository [web3kickoff.azurecr.io/kick-off-container-frontend]
f0d7745f20f2: Pushed
1280148177f2: Pushed
bb04407fa67a: Pushed
a52d1d3d9e1b: Pushed
9a6b7dbea5f0: Pushed
0f1b4e3c1366: Pushed
c6b728da845d: Pushed
76b3bac327c3: Pushed
d11b7e30e28a: Pushed
737e3d34f974: Pushed
5db8071bd6c0: Pushed
67974f604d8a: Pushed
latest: digest: sha256:de1a54da09df0edb05e549b5b543fb0a002183688e949637ccfcb75a85cf673b size: 2837

frontend % cd ../backend/
backend % docker build -f Dockerfile -t web3kickoff.azurecr.io/kick-off-container-backend .
[+] Building 1.9s (13/13) FINISHED
 => [internal] load build definition from Dockerfile                                                                                               0.0s
 => => transferring dockerfile: 304B                                                                                                               0.0s
 => [internal] load .dockerignore                                                                                                                  0.0s
 => => transferring context: 2B                                                                                                                    0.0s
 => [internal] load metadata for docker.io/library/python:3.10.11                                                                                  1.8s
 => [auth] library/python:pull token for registry-1.docker.io                                                                                      0.0s
 => [1/7] FROM docker.io/library/python:3.10.11@sha256:f5ef86211c0ef0db2e3059787088221602cad7e11b238246e406aa7bbd7edc41                            0.0s
 => [internal] load build context                                                                                                                  0.0s
 => => transferring context: 4.32kB                                                                                                                0.0s
 => CACHED [2/7] WORKDIR /usr/src/app                                                                                                              0.0s
 => CACHED [3/7] RUN python -m venv .venv                                                                                                          0.0s
 => CACHED [4/7] RUN . .venv/bin/activate                                                                                                          0.0s
 => CACHED [5/7] RUN pip install --no-cache-dir thirdweb-sdk                                                                                       0.0s
 => CACHED [6/7] RUN pip install --no-cache-dir Flask                                                                                              0.0s
 => [7/7] COPY . .                                                                                                                                 0.0s
 => exporting to image                                                                                                                             0.0s
 => => exporting layers                                                                                                                            0.0s
 => => writing image sha256:ee6596f93debe5e5cd1ebb7f8a178ea54cbac71b0965b0b5fcbae40109f98b47                                                       0.0s
 => => naming to web3kickoff.azurecr.io/kick-off-container-backend                                                                                 0.0s

Use 'docker scan' to run Snyk tests against images to find vulnerabilities and learn how to fix them
backend % docker push web3kickoff.azurecr.io/kick-off-container-backend:latest
The push refers to repository [web3kickoff.azurecr.io/kick-off-container-backend]
e72b089ac0e6: Pushed
e5fe28edddc3: Pushed
56836b1b32f3: Pushed
a220b9ac43a9: Pushed
8462b8c3aac3: Pushed
ec8e6edf461e: Pushed
293035325198: Pushed
bd9190cbbafd: Pushed
b22a8e3be9ee: Pushed
09f95e0cd33c: Pushed
d11b7e30e28a: Mounted from kick-off-container-frontend
737e3d34f974: Mounted from kick-off-container-frontend
5db8071bd6c0: Mounted from kick-off-container-frontend
67974f604d8a: Mounted from kick-off-container-frontend
latest: digest: sha256:32659662764522e4c5ac13b9154f7c8ed7cecc01b0e70a22a1f43783238deeea size: 3262
```
