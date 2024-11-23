[![image-fx.png](https://i.postimg.cc/wxXGqjhv/image-fx.png)](https://postimg.cc/c6JmTZky)

# Film Rental API

Bienvenue dans l'API de gestion des locations de films. Cette API vous permet de gérer les films, les clients et les locations de manière simple et efficace.

## Table des matières

- [Technologies utilisées](#technologies-utilisées)
- [Installation](#installation)
- [Configuration](#configuration)
- [Lancer l'application](#lancer-lapplication)
- [Endpoints](#endpoints)
  - [Films](#films)
  - [Clients](#clients)
  - [Locations](#locations)
- [Notifications par e-mail](#notifications-par-e-mail)
- [Tests](#tests)
- [Docker](#docker)

## Technologies utilisées

- **[NestJS](https://nestjs.com/)** - Framework Node.js progressif pour construire des applications scalables
- **[TypeORM](https://typeorm.io/)** - ORM moderne pour TypeScript et JavaScript
- **[PostgreSQL](https://www.postgresql.org/)** - Système de gestion de base de données relationnel
- **[Swagger](https://swagger.io/)** - Documentation API interactive
- **[Docker](https://www.docker.com/)** - Conteneurisation de l'application

## Installation

1. **Clonez le dépôt :**

   ```bash
   git clone https://github.com/votre-utilisateur/film-rental-api.git
   cd film-rental-api
   ```

2. **Installez les dépendances :**

   ```bash
   npm install
   ```

3. **Vérifiez que Docker est installé sur votre machine :**

   ```bash
   docker --version
   ```

## Configuration

L'application peut être configurée de deux manières :

### 1. Configuration locale

Créez un fichier `.env` à la racine du projet avec les variables suivantes :

```
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=sakila
```

Assurez-vous que PostgreSQL est en cours d'exécution et que la base de données spécifiée existe.

## Lancer l'application

Pour démarrer l'application, utilisez la commande suivante :

```bash
npm run start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Endpoints

### Films

- **Lister tous les films**
  - `GET /films`
  - **Réponse :** Liste des films.

- **Récupérer un film par ID**
  - `GET /films/:id`
  - **Réponse :** Détails du film.

- **Créer un nouveau film**
  - `POST /films`
  - **Corps de la requête :**
    ```json
    {
      "title": "Titre du film",
      "description": "Description du film",
      "releaseYear": 2023,
      "rentalDuration": 5,
      "rentalRate": 2.99,
      "length": 120,
      "replacementCost": 19.99,
      "rating": "PG-13"
    }
    ```

### Clients

- **Lister tous les clients**
  - `GET /customers`
  - **Réponse :** Liste des clients.

- **Récupérer un client par ID**
  - `GET /customers/:id`
  - **Réponse :** Détails du client.

- **Créer un nouveau client**
  - `POST /customers`
  - **Corps de la requête :**
    ```json
    {
      "storeId": 1,
      "firstName": "Prénom",
      "lastName": "Nom",
      "email": "email@example.com",
      "timezone": "Europe/Paris"
    }
    ```

### Locations

- **Lister toutes les locations**
  - `GET /rentals`
  - **Réponse :** Liste des locations.

- **Récupérer une location par ID**
  - `GET /rentals/:id`
  - **Réponse :** Détails de la location.

- **Créer une nouvelle location**
  - `POST /rentals`
  - **Corps de la requête :**
    ```json
    {
      "customerId": 1,
      "filmId": 1,
      "rentalDate": "2023-10-01T10:00:00Z",
      "returnDate": "2023-10-08T10:00:00Z",
      "timezone": "Europe/Paris"
    }
    ```



## Tests

Pour exécuter les tests, utilisez la commande suivante :

```bash
npm run test
```

## Docker

Pour construire et exécuter l'application dans un conteneur Docker, utilisez les commandes suivantes :

```bash
docker-compose up -d --build 
```
