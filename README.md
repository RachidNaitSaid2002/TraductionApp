# TraductionApp

## Description
TraductionApp est une application web de traduction entre le français et l'anglais. Elle permet aux utilisateurs de s'inscrire, se connecter et d'utiliser un service de traduction basé sur l'IA avec authentification JWT.

## Fonctionnalités
- Inscription et connexion des utilisateurs
- Authentification JWT sécurisée
- Traduction français-anglais et anglais-français
- Historique des traductions par utilisateur
- Interface utilisateur moderne avec Next.js
- API RESTful avec FastAPI

## Pile technologique
- **Backend** : FastAPI (Python)
- **Frontend** : Next.js (React, TypeScript)
- **Base de données** : PostgreSQL
- **Authentification** : JWT (JSON Web Tokens)
- **Conteneurisation** : Docker & Docker Compose
- **Hachage des mots de passe** : Argon2

## Architecture
```
Frontend (Next.js) <-> Backend (FastAPI) <-> Base de données (PostgreSQL)
     |                        |
     |                        |
   Pages React            Endpoints API
   Composants UI          Modèles de données
   Gestion d'état         Utilitaires de traduction
```

## Workflow
1. **Inscription/Connexion** : L'utilisateur s'inscrit ou se connecte via le frontend
2. **Authentification JWT** : Le backend génère un token JWT après vérification des credentials
3. **Endpoints protégés** : L'utilisateur peut accéder aux endpoints de traduction avec son token
4. **Traduction** : Le service utilise des utilitaires IA pour traduire le texte
5. **Historique** : Les traductions sont sauvegardées dans la base de données

## Installation et exécution avec Docker

### Prérequis
- Docker
- Docker Compose
- Variables d'environnement (voir `.env` dans le backend)

### Lancement
1. Cloner le repository
2. Créer un fichier `.env` dans le dossier `backend/` avec :
   ```
   SECRET_KEY=votre_clé_secrète
   ALGORITHM=HS256
   user=votre_user_postgres
   password=votre_password_postgres
   database=votre_nom_db
   ```
3. Lancer les services :
   ```bash
   docker-compose up --build
   ```
4. Accéder à l'application :
   - Frontend : http://localhost:3000
   - Backend API : http://localhost:8000

## Endpoints API

### Authentification
- `POST /signup` : Inscription d'un nouvel utilisateur
- `POST /login` : Connexion et génération du token JWT

### Traduction
- `POST /Prediction/{mode_type}` : Traduction de texte (nécessite JWT)
  - `mode_type` : `FnEn` (Français vers Anglais) ou `EnFn` (Anglais vers Français)
- `GET /Prediction/{id}` : Récupération de l'historique des traductions d'un utilisateur (nécessite JWT)

### Exemple d'utilisation
```bash
# Connexion
curl -X POST "http://localhost:8000/login" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","hashed_password":"password"}'

# Traduction (avec token JWT)
curl -X POST "http://localhost:8000/Prediction/FnEn" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"user_text":"Bonjour le monde"}'
```
