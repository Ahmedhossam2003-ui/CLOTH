# ELHOSS CLOTHS

Online clothing store built with the **MERN stack**, containerized with **Docker**, images stored in a private **Nexus** registry, deployed on **Kubernetes**, and automated with a **Jenkins** CI/CD pipeline.

![screenshot](docs/screenshot.png)

> Based on the open-source clothshop project  extended with a new UI, new features, and a full DevOps setup.

## Features

- Product reviews and ratings
- Product pagination and search
- Category tabs (Hoodies / T-Shirts / Shoes)
- Hot Sales section with live countdown
- Services section with detail popups
- Redesigned purple theme
- User profile, cart, checkout, PayPal
- Admin product, user and order management
- Database seeder

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, Redux, React Bootstrap |
| Backend | Node.js, Express, JWT |
| Database | MongoDB |
| Containers | Docker, Docker Compose |
| Artifact / Image Registry | Sonatype Nexus Repository (Docker hosted) |
| Orchestration | Kubernetes (minikube) |
| CI/CD | Jenkins |

## Run with Docker Compose

Create a `.env` file in the root:

```
JWT_SECRET=change_me_to_something_long
NODE_ENV=development
PAYPAL_CLIENT_ID=sb
```

Then:

```bash
docker compose up --build -d
docker compose exec backend-cloth node seeder.js
```

Store: http://localhost

## Private Docker Registry (Nexus)

Images are stored in a self-hosted Nexus Repository.

### 1. Run Nexus

```bash
docker run -d --name nexus \
  -p 8082:8081 -p 8083:8083 \
  -v nexus-data:/nexus-data \
  sonatype/nexus3
```

Get the initial admin password:

```bash
docker exec nexus cat /nexus-data/admin.password
```

Open http://localhost:8082 and sign in as `admin`.

### 2. Create the Docker repository

In Nexus: **Administration → Repository → Repositories → Create repository → docker (hosted)**

- Name: `docker-hosted`
- HTTP port: `8083`

Then enable the **Docker Bearer Token Realm** under **Security → Realms**.

### 3. Allow the insecure (HTTP) registry

Docker Desktop → **Settings → Docker Engine**:

```json
"insecure-registries": ["localhost:8083"]
```

### 4. Login, tag and push

```bash
docker login localhost:8083 -u admin

docker tag cloth-shop-frontend localhost:8083/cloth-shop-frontend:1.0
docker push localhost:8083/cloth-shop-frontend:1.0

docker tag cloth-shop-backend-cloth localhost:8083/cloth-shop-backend:1.0
docker push localhost:8083/cloth-shop-backend:1.0
```

Images are then visible in Nexus under **Browse → docker-hosted**.

## Run on Kubernetes (minikube)

```bash
minikube start --driver=docker
kubectl config current-context

docker compose build
minikube image load cloth-shop-frontend:latest
minikube image load cloth-shop-backend-cloth:latest

kubectl apply -f k8s/cloth.yaml
kubectl exec -n cloth-app deploy/cloth-backend -- node seeder.js
kubectl port-forward -n cloth-app svc/frontend-cloth 8080:80
```

Open http://localhost:8080

> To pull from Nexus instead of loading local images, create an image pull secret and reference the Nexus image in `k8s/cloth.yaml`:
>
> ```bash
> kubectl create secret docker-registry nexus-cred \
>   --docker-server=<nexus-host>:8083 \
>   --docker-username=admin \
>   --docker-password=<password> \
>   -n cloth-app
> ```
>
> Then add `imagePullSecrets: [{ name: nexus-cred }]` to the pod spec, and add `<nexus-host>:8083` to minikube's insecure registries (`minikube start --insecure-registry="<nexus-host>:8083"`).

## CI/CD with Jenkins

The pipeline: **Checkout** → **Build images** → **Push to Nexus** → **Deploy** (`kubectl apply -f k8s/cloth.yaml` and wait for rollout).

Jenkins authenticates to Nexus using a stored credential (`nexus-creds`) and pushes tagged images (build number + `latest`) to `localhost:8083`.

See the `Jenkinsfile` in the repo root.

## Credits

- Original project: Ahmed Hossam
- Extended and deployed by: Ahmed Hossam

License: MIT
