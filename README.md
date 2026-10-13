# LivrExpress

Landing page de LivrExpress, service de livraison rapide de colis à Dakar (moins de 60 minutes).

## Stack

- React 19 + Vite
- Tailwind CSS 3.4.17
- GSAP 3 + ScrollTrigger
- Lucide React

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement sur http://localhost:5173
npm run build    # build de production dans dist/
npm run preview  # prévisualiser le build
```

## Structure

```
src/
  App.jsx               # assemblage des sections + grain global
  index.css             # directives Tailwind et utilitaires
  lib/gsap.js           # enregistrement de ScrollTrigger
  components/
    Navbar.jsx          # navbar pilule flottante
    Hero.jsx            # plan d'ouverture plein écran
    Features.jsx        # 3 cartes interactives (mélangeur, flux GPS, planificateur)
    Philosophy.jsx      # manifeste avec révélation mot par mot
    Protocol.jsx        # 3 cartes empilées au scroll
    Pricing.jsx         # tarifs Essentiel / Performance / Entreprise
    Footer.jsx          # pied de page et contacts
    ui.jsx              # bouton magnétique, découpe de texte, lien WhatsApp
```

## À personnaliser

- Numéro WhatsApp : `WHATSAPP_URL` dans `src/components/ui.jsx`
- Téléphone, e-mail et adresse : `src/components/Footer.jsx`
