let formulaire;
let nom;
let arme;
let pouvoir;
let choices;
let text;
let background;
let princesse;
let pv;
let pieces_or;

function handleForm(event) 
{
    event.preventDefault();
    nom = document.getElementById("name").value;
    arme = document.getElementById("arme").value;
    pouvoir = document.getElementById("pouvoir").value;
    startGame();
} 

function init()
{
    formulaire = document.getElementById("formulaire");
    choices = document.getElementById("choices");
    text = document.getElementById("text");
    background = document.getElementById("background");
    princesse = false;
    pv = 11;
    pieces_or = 0;
    formulaire.addEventListener('submit', handleForm);
}

window.addEventListener('load', function () {
    init();
  })

function startGame() 
    {
        background.style.backgroundImage = "url('background.jpg')";
        game.style.display = 'flex';
        if ((nom == "") || (arme == "") || (pouvoir == ""))
        {
        alert("Choisissez un nom, une arme et un pouvoir !");
        return false;
        }
        alert("Bienvenue " + nom + " très bon choix !");
        formulaire.style.display = "none";
        playGame();
    } 

function add_choice(chemin, texte)
{
    choices.innerHTML += '<button onclick = "' + chemin + '">' + texte + '</button>';
}

function playGame()
    {
        background.style.backgroundImage = "url('background.jpg')";
        if (pv != 11)
        {
            alert("oups, retour à la case départ");
        }
        pv--;
        console.log(pv);
        if (pv == 0)
        {
            alert("trop d'erreurs ! recommencez une nouvelle partie");
            document.location.reload();
        }
        console.log(nom, arme, pouvoir);
        console.log("cépartiii");
        let game = document.getElementById("game");
        game.style.display = "flex";
        text.innerHTML = "<p>Oh non ! Vous avez été capturé par le Baron Noir... Au fond d'un cachot sombre, vos yeux commencent à s'habituer à la pénombre.</p>"
                            + "<p>Devant vous se trouve la porte du cachot, à votre droite dans le noir, vous percevez le couinement d'un petit annimal...</p>";
        choices.innerHTML = "";
        add_choice('level_1_door()', "examiner la porte");
        add_choice("level_1_rat()", "tenter de communiquer avec la bestiole");
        add_choice('level_1_wait()', "Atendre dans le noir");
    }

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

function death()
{
    alert("ce choix vous a été fatal... Vous n'avez plus d'autre choix que de recommencer l'aventure.");
    startGame();
}

function victory()
{
    choices.innerHTML = "";
    pieces_or = pieces_or - 9;
    background.style.backgroundImage = "url('victory.jpg')";
    text.innerHTML = "Victoire ! Vous vous envolez vers les cieux, enfin libéré de cet étrange donjon maléfique.";
    add_choice("document.location.reload()", "Recommencer une partie !");
}

function yellow_pot()
{
    alert("Pouf ! Vous vous téléportez dans un nuage de fumée !");
    level_4();
}

function lancer_sort(proba)
{
    if (Math.random() > proba)
    {
        return true;
    }
    return false;
}

function ogre()
{
    background.style.backgroundImage = "url('ogre.jpg')";
    text.innerHTML = "<p>Un gigantesque homme des tunnels vous barre la route ! Il n'est pas armé mais il est massif et ne semble pas vouloir vous laisser passer</p>";
    choices.innerHTML = "";
    add_choice("level_3()", "rebrousser chemin");
    if (pouvoir == "invisible")
    {
        add_choice("level_4()", "se rendre invisibe et passer");
    }
    if (arme == "epee")
    {
        add_choice("alert('ennemi vaincu !'); level_4()", "se battre !");
    }
}

function fall()
{
    pv--;
    alert("vous glissez et tombez dans un puit... aye !");
    playGame();
}

function fight()
{
    if (arme == epee)
    {
        alert("ennemi vaincu");
        return true;
    }
    return false;
}

function stone()
{
    arme = "cuiller";
    alert("Votre arme disparaît en fumée et à sa place, sur la pierre trône... une cuiller brillante.");
}

function trade()
{
    arme = "";
    pieces_or = 10;
    alert("vous échangez votre cuillere au marchand avant de continuer votre chemin");
    level_5();
}

function level_2_princesse()
{
    princesse = true;
    level_2();
}

function level_1_door()
{
    choices.innerHTML = "";
    if (pouvoir == "chance")
    {
        text.innerHTML = "<p>Quelle aubaine ! Le garde a du oublier de refermer la porte. Vous la poussez et elle s'ouvre légèrement</p>";
        add_choice("level_2()", "avancer prudemment");
    }
    else if (arme == "baguette")
    {
        text.innerHTML = "<p>La vieille serrure est bien fermée. Peut être est il possible de l'ouvrir avec un sort ?</p>";
        add_choice("level_2()", "lancer un sort d'ouverture.");
    }
    else 
    {
        alert("La porte semble bien fermée... il va falloir trouver autre chose");
        add_choice("level_1_wait()", "se résoudre à attendre");
    }
}

function level_1_rat()
{
    choices.innerHTML = "";
    if (pouvoir == 'annimaux')
    {
        text.innerHTML = "<p>Quoi ? Tu comprends ce que je dis ? Incroyable ! Ca fait 15 ans que j'écume ces contrées à la recherche d'aide. Ne te fie pas à mon aspect répugnant, j'ai été transformé en rat par une sorcière maléfique. Je suis en réalité un princesse intergalactique et je peux reprendre ma forme originelle et t'aider à sortir d'ici. Pour rompre le sortilège, il te suffit de m'embrasser !</p>"
    }
    else
    {
        text.innerHTML = "<p>couic</p>"
    }
    add_choice('playGame()', "Caresser le rat");
    add_choice('playGame()', "prononcer une formule magique");
    add_choice('level_2_princesse()', "Faire un bisou à la créature répugnante");
    add_choice('playGame()', "Couiner à son tour");
}

async function level_1_wait()
{
    text.innerHTML = "";
    choices.innerHTML = "";
    await sleep(2000);
    text.innerHTML += "Vous vous décidez à attendre";
    await sleep(4000);
    text.innerHTML += " C'est long...";
    await sleep(4000);
    text.innerHTML += "...Très long...";
    await sleep(4000);
    text.innerHTML += " Tellement long que vous vous endormez.";
    await sleep(4000);
    text.innerHTML += "<br/>Vous rêvez de rivages lointains, d'une piscine de bonbons, d'un chevalier noir et d'une princesse...";
    await sleep(8000);
    text.innerHTML += "<br/>ZZzzzZZzzZZZZzzzZZzz..";
    await sleep(6000);
    text.innerHTML += "<br/>...A votre réveil, le rat est parti et un faisceau de lumière semble provenir de la porte.";
    await sleep(4000);
    text.innerHTML += " Miracle, la porte est ouverte ! dépéchez vous de filer";
    await sleep(4000);
    add_choice('level_2()', "Prendre la fuite");

}

function level_2()
{
    choices.innerHTML = "";
    console.log(princesse);
    background.style.backgroundImage = "url('labyrinth.jpg')";
    text.innerHTML = "<p>Vous vous retrouvez dans un immense méandre d'escaliers délabrés, aucune indication ne vous permet de savoir ou aller, deux des escaliers semblent en meilleur état que les autres...</p>";
    add_choice('fall()', "Descendre");
    add_choice('level_3()', "Monter");
    if (princesse == true)
    {
        text.innerHTML += "<p>La princesse, à peine transformée, vous regarde avec des yeux doux...</p>";
        add_choice("alert('Mon père le roi disait toujours : dans le doute, mieux vaut prendre de la hauteur')", "Demander conseil à la princesse");
    }
}

function level_3()
{
    choices.innerHTML = "";
    background.style.backgroundImage = "url('laboratory.jpg')";
    text.innerHTML = "<p>Après avoir gravi un nombre interminable de marches, vous vous trouvez dans un vaste pièce qui ressemble à un laboratoire. Des rangées de potions magiques sur les étagères... Peut être que l'une d'entre elle peut vous permettre de vous échapper ? Aurez vous le courage d'en boire une avant de continuer votre chemin ?</p>";
    add_choice('death()', "Boire la potion rose");
    add_choice('yellow_pot()', "Boire la potion jaune");
    add_choice('ogre()', "Continuer son chemin");
}

function level_4()
{
    choices.innerHTML = "";
    background.style.backgroundImage = "url('merchant.jpg')";
    text.innerHTML = "<p>Ce donjon est décidément plein de surprises, vous tombez nez à nez avec un vieil homme étrange mais plutôt sympathique ! à sa droite, un grand escalier lumineux. A sa gauche, un tobbogan qui descend vers les ténèbres.</p>";
    text.innerHTML += "</p>\"Bonjour noble héros, on m'appelle le collectionneur. Cela fait des mois que je cherche la pièce qu'il manque à ma collection : la petite cuillère sacrée. Si tu as ça dans ton inventaire, je suis prêt à t'en donner un bon prix... 10 pièces d'or, sonnantes et trébuchantes ! \"</p>";
    add_choice('level_5()', "Monter l'escalier");
    add_choice('level_secret()', "Prendre le toboggan");
    if (arme == "cuiller")
    {
        add_choice('trade()', "Accepter le marché du vieil homme");
        console.log(pieces_or);
    }
}

function level_secret()
{
    choices.innerHTML = "";
    background.style.backgroundImage = "url('stone.jpg')";
    text.innerHTML = "<p>Une étrange pierre brillante trône au milieu de cette salle sombre, vous déchifrez une inscription à sa base</p>";
    text.innerHTML += "<p>La pierre d'échange donne aux aventuriers ce dont ils ont besoin pour avancer. Ils devront pour celà sacrifier leur arme préférée.</p>";
    add_choice("stone()", "déposer son arme sur la pierre");
    add_choice("level_2()", "remonter l'escalier");
}

function level_5()
{
    choices.innerHTML = "";
    background.style.backgroundImage = "url('tower_top.jpg')"
    text.innerHTML = "<p>Enfin ! Le haut de la tour. Un homme se tient là, à côté d'une créature ailée majestueuse.</p>";
    text.innerHTML += "<p>-Ca vous tente un petit voyage vers la lberté ? Pour seulement 9 pièces d'or, c'est donné ! sensations garanties</p>";
    if (pieces_or >= 9)
    {
        add_choice("victory()", "accepter le marché !");
    }
    else
    {
        add_choice("level_4()", "trop pauvre... retournez en arrière");
    }
}

