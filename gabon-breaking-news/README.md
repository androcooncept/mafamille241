# Gabon Breaking News

Site d'information : actualité du Gabon, de l'Afrique et du monde.
Site statique (HTML, CSS, JavaScript) : aucun serveur ni base de données à installer.

## Pages

- `index.html` — accueil (à la une, Gabon, Afrique, Monde), rubriques (`?cat=politique`), zones (`?zone=gabon`) et recherche (`?q=...`)
- `article.html?id=...` — page d'un article, avec boutons de partage Facebook / WhatsApp / X
- `admin.html` — rédaction : écrire, modifier et supprimer des articles

## Publier un article

1. Ouvrir `admin.html` et rédiger l'article (un aperçu s'affiche sur le site, uniquement dans votre navigateur).
2. Cliquer sur **Télécharger articles.js**.
3. Remplacer `js/articles.js` par le fichier téléchargé (par exemple via GitHub, « Add file » → « Upload files »).

Les images peuvent être une adresse web (`https://...`) ou un fichier déposé dans `images/` (`images/photo.jpg`).

## Réglages

Dans `js/articles.js` : lien Facebook, WhatsApp, e-mail de contact (`SITE`) et rubriques (`CATEGORIES`).
Les articles marqués `demo: true` sont des exemples : bouton « Supprimer les exemples » dans `admin.html`.
