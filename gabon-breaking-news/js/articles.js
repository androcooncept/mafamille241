/*
 * Gabon Breaking News — base des articles et réglages du site.
 *
 * Pour publier : ouvrez admin.html, rédigez l'article, cliquez sur
 * « Télécharger articles.js » puis remplacez ce fichier par celui téléchargé.
 *
 * Les articles marqués `demo: true` sont des exemples de mise en page :
 * supprimez-les avant la mise en ligne.
 */

const SITE = {
    nom: "Gabon Breaking News",
    slogan: "Les News Fraîches du Gabon",
    facebook: "https://www.facebook.com/share/1HMKmTcYkj/",
    whatsapp: "",            // ex. "https://wa.me/241XXXXXXXX"
    email: ""                // ex. "redaction@exemple.ga"
};

// zone : "gabon" (actualité nationale), "afrique" ou "monde"
const CATEGORIES = [
    { id: "politique", nom: "Politique", zone: "gabon", c1: "#1e3a8a", c2: "#3a75c4" },
    { id: "economie", nom: "Économie", zone: "gabon", c1: "#7c5e00", c2: "#d4a514" },
    { id: "societe", nom: "Société", zone: "gabon", c1: "#065f46", c2: "#0d9488" },
    { id: "environnement", nom: "Environnement", zone: "gabon", c1: "#14532d", c2: "#009e60" },
    { id: "sport", nom: "Sports", zone: "gabon", c1: "#1e40af", c2: "#22c55e" },
    { id: "culture", nom: "Culture", zone: "gabon", c1: "#581c87", c2: "#a855f7" },
    { id: "faits-divers", nom: "Faits divers", zone: "gabon", c1: "#7f1d1d", c2: "#c8102e" },
    { id: "afrique", nom: "Afrique", zone: "afrique", c1: "#7c2d12", c2: "#ea580c" },
    { id: "monde", nom: "Monde", zone: "monde", c1: "#0f172a", c2: "#475569" }
];

const ARTICLES = [
    {
        id: "exemple-parcs-nationaux",
        titre: "Parcs nationaux : de nouvelles mesures contre le braconnage",
        chapo: "Article d'exemple pour la rubrique Environnement.",
        contenu: "Texte d'exemple. Détaillez les mesures, les zones concernées et leur impact sur les populations riveraines.",
        categorie: "environnement",
        date: "2026-10-02T09:10",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-libreville-voirie",
        titre: "Libreville : des travaux de voirie annoncés sur plusieurs axes",
        chapo: "Article d'exemple. Remplacez-le par vos propres informations depuis la page d'administration.",
        contenu: "Ceci est un texte d'exemple qui montre la mise en page d'un article sur Gabon Breaking News.\n\nChaque paragraphe est séparé par une ligne vide. Vous pouvez écrire autant de paragraphes que nécessaire.\n\n## Un intertitre\n\nLes lignes qui commencent par « ## » deviennent des intertitres, pratiques pour structurer les longs articles.",
        categorie: "societe",
        date: "2026-10-03T08:30",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: true,
        une: true,
        demo: true
    },
    {
        id: "exemple-conseil-ministres",
        titre: "Conseil des ministres : les principales décisions à retenir",
        chapo: "Article d'exemple pour la rubrique Politique.",
        contenu: "Texte d'exemple. Résumez ici les décisions annoncées, en citant vos sources officielles.\n\nAjoutez le contexte et ce que ces décisions changent concrètement pour les Gabonais.",
        categorie: "politique",
        date: "2026-10-03T07:15",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: true,
        une: false,
        demo: true
    },
    {
        id: "exemple-pantheres",
        titre: "Panthères du Gabon : la liste des joueurs convoqués dévoilée",
        chapo: "Article d'exemple pour la rubrique Sport.",
        contenu: "Texte d'exemple. Présentez la liste, les nouveautés et le calendrier des prochains matchs.",
        categorie: "sport",
        date: "2026-10-02T19:40",
        auteur: "Service des sports",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-prix-carburant",
        titre: "Prix à la pompe : ce qui change ce mois-ci",
        chapo: "Article d'exemple pour la rubrique Économie.",
        contenu: "Texte d'exemple. Indiquez les nouveaux tarifs et leur date d'entrée en vigueur.",
        categorie: "economie",
        date: "2026-10-02T15:05",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-port-gentil-accident",
        titre: "Port-Gentil : un accident de la circulation fait plusieurs blessés",
        chapo: "Article d'exemple pour la rubrique Faits divers.",
        contenu: "Texte d'exemple. Donnez les faits vérifiés, le lieu et l'heure, sans divulguer l'identité des victimes.",
        categorie: "faits-divers",
        date: "2026-10-02T11:20",
        auteur: "Correspondant Port-Gentil",
        image: "",
        legende: "",
        urgent: true,
        une: false,
        demo: true
    },
    {
        id: "exemple-festival",
        titre: "Un festival de musique urbaine attendu à Libreville",
        chapo: "Article d'exemple pour la rubrique Culture.",
        contenu: "Texte d'exemple. Présentez les artistes, les dates et le lieu de l'événement.",
        categorie: "culture",
        date: "2026-10-01T18:00",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-cemac",
        titre: "Zone CEMAC : les chefs d'État attendus pour un sommet régional",
        chapo: "Article d'exemple pour la rubrique Afrique.",
        contenu: "Texte d'exemple. Expliquez les enjeux du sommet pour le Gabon et la sous-région.",
        categorie: "afrique",
        date: "2026-10-01T09:45",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-rentree-scolaire",
        titre: "Rentrée scolaire : les parents face à la hausse des fournitures",
        chapo: "Article d'exemple pour la rubrique Société.",
        contenu: "Texte d'exemple. Donnez la parole aux parents et comparez les prix d'une année sur l'autre.",
        categorie: "societe",
        date: "2026-09-30T16:30",
        auteur: "La rédaction",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-monde-onu",
        titre: "Assemblée générale de l'ONU : ce qu'il faut retenir de la semaine",
        chapo: "Article d'exemple pour la rubrique Monde.",
        contenu: "Texte d'exemple. Résumez les temps forts et expliquez ce qui concerne le Gabon et l'Afrique.",
        categorie: "monde",
        date: "2026-10-01T12:10",
        auteur: "Service international",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-afrique-elections",
        titre: "Afrique centrale : un scrutin présidentiel sous haute surveillance",
        chapo: "Article d'exemple pour la rubrique Afrique.",
        contenu: "Texte d'exemple. Présentez les candidats, les enjeux et le calendrier électoral.",
        categorie: "afrique",
        date: "2026-09-30T10:00",
        auteur: "Service international",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    },
    {
        id: "exemple-monde-climat",
        titre: "Climat : les grandes puissances divisées avant la prochaine COP",
        chapo: "Article d'exemple pour la rubrique Monde.",
        contenu: "Texte d'exemple. Rappelez la place du Gabon et de ses forêts dans les négociations climatiques.",
        categorie: "monde",
        date: "2026-09-29T17:45",
        auteur: "Service international",
        image: "",
        legende: "",
        urgent: false,
        une: false,
        demo: true
    }
];
