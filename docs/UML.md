# KitchenScript

KitchenScript est une application de recettes de cuisine développée avec React.

## Conception UML

Les diagrammes suivants présentent les principaux cas d’utilisation, le modèle
du domaine et deux scénarios de séquence de l’application.

### Diagramme de cas d’utilisation

```mermaid
flowchart LR
    Visiteur[Visiteur]
    Utilisateur[Utilisateur connecté]
    Admin[Administrateur]

    subgraph KS["KitchenScript"]
        UC1([Créer un compte])
        UC2([Se connecter])
        UC3([Parcourir les recettes])
        UC4([Rechercher des recettes])
        UC5([Filtrer par catégorie])
        UC6([Consulter une recette])
        UC7([Consulter son profil])
        UC8([Modifier son profil])
        UC9([Se déconnecter])
        UC10([Gérer ses recettes])
        UC11([Gérer ses favoris])
        UC12([Gérer les catégories])
        UC13([Modérer les recettes])
        UC14([Gérer les comptes])
    end

    Visiteur --> UC1
    Visiteur --> UC2
    Visiteur --> UC3
    Visiteur --> UC4
    Visiteur --> UC5
    Visiteur --> UC6

    Utilisateur --> UC3
    Utilisateur --> UC4
    Utilisateur --> UC5
    Utilisateur --> UC6
    Utilisateur --> UC7
    Utilisateur --> UC8
    Utilisateur --> UC9
    Utilisateur --> UC10
    Utilisateur --> UC11

    Admin --> UC12
    Admin --> UC13
    Admin --> UC14
```

### Diagramme de classes du domaine

```mermaid
classDiagram
    class Utilisateur {
        +UUID id
        +String pseudo
        +String email
        +String motDePasseHash
        +RoleUtilisateur role
        +StatutCompte statut
        +DateTime dateCreation
    }

    class Recette {
        +UUID id
        +String titre
        +Text description
        +Integer tempsPreparationMin
        +Integer tempsCuissonMin
        +Integer nombrePortions
        +String imageUrl
        +StatutRecette statut
        +DateTime dateCreation
        +DateTime dateModification
    }

    class Ingredient {
        +UUID id
        +String nom
    }

    class LigneIngredient {
        +UUID id
        +Decimal quantite
        +String unite
        +Integer position
    }

    class Etape {
        +UUID id
        +Integer position
        +Text instruction
    }

    class Categorie {
        +UUID id
        +String nom
        +String slug
    }

    class Favori {
        +DateTime dateAjout
    }

    class RoleUtilisateur {
        <<enumeration>>
        MEMBRE
        ADMIN
    }

    class StatutCompte {
        <<enumeration>>
        ACTIF
        SUSPENDU
    }

    class StatutRecette {
        <<enumeration>>
        PUBLIEE
        MASQUEE
    }

    Utilisateur --> RoleUtilisateur
    Utilisateur --> StatutCompte
    Recette --> StatutRecette

    Utilisateur "1" --> "0..*" Recette : rédige
    Utilisateur "1" --> "0..*" Favori : possède
    Recette "1" --> "0..*" Favori : est référencée par
    Recette "1" *-- "1..*" LigneIngredient : contient
    Ingredient "1" --> "0..*" LigneIngredient : est utilisé dans
    Recette "1" *-- "1..*" Etape : se compose de
    Recette "0..*" --> "0..*" Categorie : est classée dans
```

Contraintes métier principales :

- L’adresse e-mail et le pseudo d’un utilisateur sont uniques.
- Le mot de passe est stocké sous forme de hash.
- Une ligne d’ingrédient référence un ingrédient et appartient à une recette ;
  sa quantité doit être positive et sa position unique dans la recette.
- Les étapes d’une recette sont ordonnées à partir de 1.
- Le couple utilisateur-recette est unique dans les favoris.

### Diagramme de séquence — Consulter une recette

```mermaid
sequenceDiagram
    actor Visiteur
    participant UI as Page détail React
    participant Client as Client API
    participant API as API REST
    participant Service as Service recettes
    participant BD as Base de données

    Visiteur->>UI: Ouvre /recettes/{id}
    UI->>UI: Affiche le chargement
    UI->>Client: getRecipe(id)
    Client->>API: GET /recettes/{id}
    API->>Service: consulterRecettePublique(id)
    Service->>BD: Charger recette, auteur, ingrédients, étapes et catégories
    BD-->>Service: Résultat de la recherche

    alt Recette existante et publiée
        Service-->>API: Détail public de la recette
        API-->>Client: 200 OK + JSON
        Client-->>UI: Recette
        UI-->>Visiteur: Affiche le détail
    else Recette inexistante ou masquée
        Service-->>API: Recette indisponible
        API-->>Client: 404 Not Found
        Client-->>UI: Erreur de disponibilité
        UI-->>Visiteur: Affiche « Recette introuvable »
    end
```

### Diagramme de séquence — Créer une recette

```mermaid
sequenceDiagram
    actor Utilisateur
    participant UI as Formulaire React
    participant Client as Client API
    participant API as API REST
    participant Auth as Service d'authentification
    participant Service as Service recettes
    participant BD as Base de données

    Utilisateur->>UI: Remplit et soumet le formulaire
    UI->>UI: Vérifie les champs

    alt Formulaire invalide
        UI-->>Utilisateur: Affiche les erreurs de saisie
    else Formulaire valide
        UI->>Client: createRecipe(données)
        Client->>API: POST /recettes + preuve de session
        API->>Auth: Vérifier session et statut du compte
        Auth->>BD: Lire la session et le statut du compte
        BD-->>Auth: Informations d'authentification
        Auth-->>API: Résultat de la vérification

        alt Session absente ou expirée
            API-->>Client: 401 Unauthorized
            Client-->>UI: Connexion nécessaire
            UI-->>Utilisateur: Invite à se connecter
        else Compte suspendu
            API-->>Client: 403 Forbidden
            Client-->>UI: Action interdite
            UI-->>Utilisateur: Informe de la suspension
        else Session valide et compte actif
            API->>Service: creerRecette(utilisateurId, données)
            Service->>Service: Valider les règles métier
            Service->>BD: Vérifier ingrédients et catégories
            BD-->>Service: Résultat de validation

            alt Données métier invalides
                Service-->>API: Erreurs de validation
                API-->>Client: 422 Unprocessable Content
                Client-->>UI: Détail des erreurs
                UI-->>Utilisateur: Affiche les erreurs
            else Données métier valides
                Service->>BD: BEGIN
                Service->>BD: Insérer recette, auteur, ingrédients et étapes

                alt Enregistrement réussi
                    BD-->>Service: Recette créée
                    Service->>BD: COMMIT
                    Service-->>API: Recette créée
                    API-->>Client: 201 Created + id
                    Client-->>UI: Identifiant de la recette
                    UI-->>Utilisateur: Redirige vers /recettes/{id}
                else Échec technique
                    BD-->>Service: Échec de création
                    Service->>BD: ROLLBACK
                    Service-->>API: Erreur de création
                    API-->>Client: 500 Internal Server Error
                    Client-->>UI: Échec
                    UI-->>Utilisateur: Affiche une erreur et conserve la saisie
                end
            end
        end
    end
```
