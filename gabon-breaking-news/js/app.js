/* Gabon Breaking News — rendu commun à toutes les pages */

/* Brouillon de la rédaction : les articles saisis dans admin.html sont gardés
   dans ce navigateur uniquement, et remplacent l'aperçu tant qu'ils n'ont pas été publiés. */
const CLE_BROUILLON = "gbn-brouillon";

function lireBrouillon() {
    try { return JSON.parse(localStorage.getItem(CLE_BROUILLON) || "null"); } catch { return null; }
}
function ecrireBrouillon(liste) {
    try { localStorage.setItem(CLE_BROUILLON, JSON.stringify(liste)); } catch { alert("Impossible d'enregistrer le brouillon dans ce navigateur."); }
}
function effacerBrouillon() {
    try { localStorage.removeItem(CLE_BROUILLON); } catch { }
}

const BROUILLON = lireBrouillon();
if (Array.isArray(BROUILLON)) ARTICLES.splice(0, ARTICLES.length, ...BROUILLON);

const MOIS = ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."];

function esc(texte) {
    return String(texte ?? "").replace(/[&<>"']/g, c => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[c]);
}

function categorie(id) {
    return CATEGORIES.find(c => c.id === id) || { id, nom: id, c1: "#1f2937", c2: "#4b5563" };
}

function dateLisible(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const minutes = Math.round((Date.now() - d) / 60000);
    if (minutes >= 0 && minutes < 60) return `Il y a ${Math.max(minutes, 1)} min`;
    if (minutes >= 60 && minutes < 24 * 60) return `Il y a ${Math.floor(minutes / 60)} h`;
    const heure = `${String(d.getHours()).padStart(2, "0")}h${String(d.getMinutes()).padStart(2, "0")}`;
    return `${d.getDate()} ${MOIS[d.getMonth()]} ${d.getFullYear()} à ${heure}`;
}

function imageSure(url) {
    return /^(https?:\/\/|images\/)/i.test(url || "") ? url : "";
}

function articlesTries() {
    return [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));
}

function lienArticle(a) {
    return `article.html?id=${encodeURIComponent(a.id)}`;
}

function vignette(a, mot = true) {
    const cat = categorie(a.categorie);
    const img = imageSure(a.image);
    return `<div class="thumb" style="--c1:${cat.c1};--c2:${cat.c2}">
        ${img ? `<img src="${esc(img)}" alt="" loading="lazy">` : (mot ? `<span class="thumb-word">${esc(cat.nom)}</span>` : "")}
    </div>`;
}

function kicker(a) {
    const cat = categorie(a.categorie);
    return a.urgent
        ? `<span class="kicker urgent">Urgent · ${esc(cat.nom)}</span>`
        : `<span class="kicker">${esc(cat.nom)}</span>`;
}

function story(a, resume = true) {
    return `<a class="story" href="${lienArticle(a)}">
        ${vignette(a)}
        ${kicker(a)}
        <h3>${esc(a.titre)}</h3>
        ${resume ? `<p>${esc(a.chapo)}</p>` : ""}
        <span class="meta">${esc(dateLisible(a.date))}</span>
    </a>`;
}

const ZONES = { gabon: "Gabon", afrique: "Afrique", monde: "Monde" };

function zoneDe(a) {
    return categorie(a.categorie).zone || "gabon";
}

function rendreEntete(actif = "") {
    const params = new URLSearchParams(location.search);
    const urgents = articlesTries().filter(a => a.urgent).slice(0, 8);
    const ticker = (urgents.length ? urgents : articlesTries().slice(0, 5))
        .map(a => `<a href="${lienArticle(a)}">${esc(a.titre)}</a>`).join("");
    const apercu = Array.isArray(BROUILLON) && !location.pathname.endsWith("admin.html")
        ? `<div class="demo-note" style="margin:0;text-align:center">Aperçu de vos brouillons (visible uniquement sur cet appareil) — <a href="admin.html"><u>retour à la rédaction</u></a></div>`
        : "";

    document.getElementById("entete").innerHTML = `${apercu}
    <div class="brand"><div class="container">
        <a class="logo" href="index.html">
            <img src="images/logo.jpg" alt="Gabon Breaking News">
            <span class="logo-text"><strong>Gabon Breaking News</strong><small>${esc(SITE.slogan)}</small></span>
        </a>
        <div class="brand-actions">
            <form class="search" action="index.html" role="search">
                <input type="search" name="q" placeholder="Rechercher" value="${esc(params.get("q") || "")}" aria-label="Rechercher">
                <button type="submit">OK</button>
            </form>
            <a class="fb-top" href="${esc(SITE.facebook)}" target="_blank" rel="noopener">Facebook</a>
        </div>
    </div></div>
    <nav class="nav"><div class="container">
        <a href="index.html" class="${actif === "" ? "active" : ""}">Accueil</a>
        <a href="index.html?zone=gabon" class="${actif === "gabon" ? "active" : ""}">Gabon</a>
        ${CATEGORIES.map(c => `<a href="index.html?cat=${c.id}" class="${actif === c.id ? "active" : ""}">${esc(c.nom)}</a>`).join("")}
    </div></nav>
    <div class="ticker"><div class="container">
        <div class="ticker-label"><span class="pulse"></span>Dernière minute</div>
        <div class="ticker-track"><div class="ticker-items">${ticker}</div></div>
    </div></div>`;
}

function rendrePlusLus(sauf) {
    const liste = articlesTries().filter(a => a.id !== sauf).slice(0, 6);
    const zone = document.getElementById("plus-lus");
    if (!zone || !liste.length) return;
    zone.innerHTML = `<section class="most-read"><div class="container">
        <h2 class="section-title">À ne pas manquer</h2>
        <ol class="popular">${liste.map(a => `<li><a href="${lienArticle(a)}">${esc(a.titre)}</a></li>`).join("")}</ol>
    </div></section>`;
}

function rendrePied() {
    const liens = [
        `<a href="index.html">Accueil</a>`,
        `<a href="index.html?zone=gabon">Gabon</a>`,
        ...CATEGORIES.map(c => `<a href="index.html?cat=${c.id}">${esc(c.nom)}</a>`),
        SITE.facebook && `<a href="${esc(SITE.facebook)}" target="_blank" rel="noopener">Facebook</a>`,
        SITE.whatsapp && `<a href="${esc(SITE.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`,
        SITE.email && `<a href="mailto:${esc(SITE.email)}">Contact</a>`
    ].filter(Boolean).join("");

    document.getElementById("pied").innerHTML = `<div class="container">
        <div class="footer-top">
            <img src="images/logo.jpg" alt="">
            <strong>Gabon Breaking News</strong>
        </div>
        <nav class="footer-links">${liens}</nav>
        <p class="copyright">© ${new Date().getFullYear()} Gabon Breaking News — ${esc(SITE.slogan)}. Tous droits réservés.</p>
        <div class="flag-bar"><span></span><span></span><span></span></div>
    </div>`;
}

/* ----- Page d'accueil / rubrique / recherche ----- */
function pageAccueil() {
    const params = new URLSearchParams(location.search);
    const cat = params.get("cat") || "";
    const zone_ = ZONES[params.get("zone")] ? params.get("zone") : "";
    const q = (params.get("q") || "").trim().toLowerCase();
    rendreEntete(cat || zone_);
    rendrePlusLus();
    rendrePied();

    const zone = document.getElementById("contenu");
    let liste = articlesTries();
    const demo = ARTICLES.some(a => a.demo)
        ? `<div class="demo-note">Les articles affichés sont des exemples de mise en page. Publiez vos propres articles depuis <a href="admin.html"><u>la page de rédaction</u></a>.</div>`
        : "";

    if (q || cat || zone_) {
        if (cat) liste = liste.filter(a => a.categorie === cat);
        if (zone_) liste = liste.filter(a => zoneDe(a) === zone_);
        if (q) liste = liste.filter(a => `${a.titre} ${a.chapo} ${a.contenu}`.toLowerCase().includes(q));
        const nom = cat ? categorie(cat).nom : ZONES[zone_];
        const titre = q ? `Résultats pour « ${esc(params.get("q"))} »` : esc(nom);
        document.title = `${q ? "Recherche" : nom} — Gabon Breaking News`;
        zone.innerHTML = `<section class="section"><h2 class="section-title">${titre}</h2>` + (liste.length
            ? `<div class="grid">${liste.map(a => story(a)).join("")}</div>`
            : `<div class="empty">Aucun article pour le moment.</div>`) + `</section>`;
        return;
    }

    if (!liste.length) {
        zone.innerHTML = `<div class="empty">Aucun article publié pour le moment.</div>`;
        return;
    }

    const une = liste.find(a => a.une) || liste[0];
    const reste = liste.filter(a => a !== une);
    const cote = reste.slice(0, 3);
    const suite = reste.slice(3);

    // Puis une section par zone : l'actualité gabonaise d'abord, l'Afrique et le Monde ensuite
    const sections = [
        { zone: "gabon", titre: "Actualité au Gabon", max: 8 },
        { zone: "afrique", titre: "Afrique", max: 4 },
        { zone: "monde", titre: "Monde", max: 4 }
    ].map(z => ({ ...z, liste: suite.filter(a => zoneDe(a) === z.zone).slice(0, z.max) }))
        .filter(z => z.liste.length);
    const sectionHtml = z => `<section class="section">
        <h2 class="section-title"><a href="index.html?zone=${z.zone}">${esc(z.titre)} ›</a></h2>
        <div class="grid">${z.liste.map(a => story(a)).join("")}</div>
    </section>`;

    zone.innerHTML = `${demo}
    <section class="section">
        <h2 class="section-title">À la une</h2>
        <div class="lead">
            <a class="lead-main" href="${lienArticle(une)}">
                ${vignette(une)}
                <div>
                    ${kicker(une)}
                    <h2>${esc(une.titre)}</h2>
                    <p>${esc(une.chapo)}</p>
                    <span class="meta">${esc(dateLisible(une.date))}</span>
                </div>
            </a>
            <div class="lead-side">${cote.map(a => story(a, false)).join("")}</div>
        </div>
    </section>
    ${sections.slice(0, 1).map(sectionHtml).join("")}
    <div class="fb-band"><div class="container" style="padding:0">
        <div><strong>Suivez Gabon Breaking News sur Facebook</strong><p>Les alertes et les news fraîches du Gabon, directement dans votre fil.</p></div>
        <a class="btn btn-fb" href="${esc(SITE.facebook)}" target="_blank" rel="noopener">Suivre la page</a>
    </div></div>
    ${sections.slice(1).map(sectionHtml).join("")}`;
}

/* ----- Page article ----- */
function contenuEnHtml(texte) {
    return String(texte || "").split(/\n\s*\n/).map(bloc => {
        bloc = bloc.trim();
        if (!bloc) return "";
        if (bloc.startsWith("## ")) return `<h2>${esc(bloc.slice(3))}</h2>`;
        return `<p>${esc(bloc).replace(/\n/g, "<br>")}</p>`;
    }).join("");
}

function initiales(nom) {
    return String(nom || "R").split(/\s+/).filter(m => m.length > 2 || /^[A-Z]/.test(m)).slice(0, 2)
        .map(m => m[0].toUpperCase()).join("") || "R";
}

function pageArticle() {
    const id = new URLSearchParams(location.search).get("id");
    const a = ARTICLES.find(x => x.id === id);
    rendreEntete(a ? a.categorie : "");
    rendrePlusLus(id);
    rendrePied();

    const zone = document.getElementById("contenu");
    if (!a) {
        zone.innerHTML = `<div class="empty">Cet article est introuvable. <a href="index.html"><u>Retour à l'accueil</u></a></div>`;
        return;
    }

    document.title = `${a.titre} — Gabon Breaking News`;
    const url = encodeURIComponent(location.href);
    const texte = encodeURIComponent(a.titre);
    const auteur = a.auteur || "La rédaction";
    const memes = articlesTries().filter(x => x.id !== a.id && x.categorie === a.categorie);
    const autres = (memes.length ? memes : articlesTries().filter(x => x.id !== a.id)).slice(0, 3);

    zone.innerHTML = `
    <article class="article">
        ${a.demo ? `<div class="demo-note">Article d'exemple — à remplacer par un vrai contenu.</div>` : ""}
        <a href="index.html?cat=${esc(a.categorie)}">${kicker(a)}</a>
        <h1>${esc(a.titre)}</h1>
        <div class="byline">
            <span class="avatar">${esc(initiales(auteur))}</span>
            <div><strong>${esc(auteur)}</strong><span class="meta">Gabon Breaking News · ${esc(dateLisible(a.date))}</span></div>
        </div>
        <figure class="figure">
            ${vignette(a)}
            ${a.legende ? `<figcaption>${esc(a.legende)}</figcaption>` : ""}
        </figure>
        <p class="chapo">${esc(a.chapo)}</p>
        <div class="content">${contenuEnHtml(a.contenu)}</div>
        <div class="share">
            <a class="btn fb" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${url}">Partager sur Facebook</a>
            <a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=${texte}%20${url}">WhatsApp</a>
            <a class="btn x" target="_blank" rel="noopener" href="https://twitter.com/intent/tweet?text=${texte}&url=${url}">X</a>
            <button class="btn copy" id="copier">Copier le lien</button>
        </div>
    </article>
    ${autres.length ? `<section class="related"><h2 class="section-title">À lire aussi</h2><div class="grid">${autres.map(x => story(x)).join("")}</div></section>` : ""}`;

    document.getElementById("copier").addEventListener("click", e => {
        navigator.clipboard?.writeText(location.href).then(() => { e.target.textContent = "Lien copié ✓"; });
    });
}
