import { title } from "process";
import { unknown } from "zod";

export const fr = {
    admin: {
        title: "Tableau de bord Admin",
        scenariosTitle: "Gérer les Scénarios",
        scenariosDescription: "Ajouter, modifier ou supprimer des scénarios de formation avec transcriptions et analyses.",
        sessionsTitle: "Sessions des Agents",
        sessionsDescription: "Voir les sessions soumises par les agents de vente, y compris les retours et les statistiques.",
        usersTitle: "Gestion des Utilisateurs",
        usersDescription: "Examiner les chefs d'équipe et les agents de vente. Permissions par rôle.",
        statsTitle: "Statistiques",
        statsDescription: "Voir les tendances d'enregistrement et les informations sur l'activité des utilisateurs."
    },
    common: {
        loading: "Chargement..."
    },
    broadcast: {
        end: "Arrêter la Diffusion",
        live: "En Direct",
        start: "Démarrer la Diffusion"
    },
    header: {
        title: "À propos",
        about: "Ce projet vise à démontrer comment utiliser l'API OpenAI Realtime avec WebRTC dans un projet Next 15 moderne. Il dispose déjà des composants shadcn/ui installés et du hook de session audio WebRTC implémenté. Clonez le projet et définissez vos propres outils.",
        banner: "🎉 Découvrez la nouvelle bibliothèque OpenAI Realtime Blocks UI pour Next.js !",
        bannerLink: "En savoir plus →",
        beta: "123ink",
        dark: "Sombre",
        dashboard: "Tableau de bord",
        login: "Connexion",
        logout: "Déconnexion",
        language: "Langue",
        light: "Clair",
        logo: "Salle de formation à la vente WeWow",
        statistics: "Statistiques",
        system: "Système",
        theme: "Changer le thème",
        twitter: "Suivre sur"
    },
    hero: {
        badge: "Next.js + shadcn/ui",
        subtitle: "Faites une démo en cliquant sur le bouton ci-dessous et essayez les outils disponibles",
        title: "OpenAI Realtime API (WebRTC)"
    },
    messageControls: {
        content: "Contenu",
        filter: "Filtrer par type",
        log: "Journal dans la Console",
        logs: "Journaux de Conversation",
        search: "Rechercher des messages...",
        type: "Type",
        view: "Voir les Journaux"
    },
    recording: {
        title: "Détails de l'Enregistrement",
        agent: "Agent",
        scenario: "Scénario",
        createdAt: "Créé le",
        transcript: "Transcription",
        feedback: "Retour",
    },
    scenarios: {
        title: "Scénario",
        description: "Ajouter, modifier ou supprimer des scénarios de formation avec transcriptions et analyses.",
        new: "Nouveau Scénario",
        id: "ID :",
        by: "Par",
        unknown: "Inconnu",
        edit: "Modifier",
        delete: "Supprimer",
        confirmDelete: "Êtes-vous sûr de vouloir supprimer ce scénario ?",
        deleteFailed: "Échec de la suppression du scénario",
    },
    status: {
        error: "Oups !",
        info: "Basculement de l'Assistant Vocal...",
        language: "Langue changée de",
        session: "Session établie",
        success: "Nous sommes en direct !",
        toggle: "Basculement de l'Assistant Vocal..."
    },
    tokenUsage: {
        input: "Tokens d'Entrée",
        output: "Tokens de Sortie",
        total: "Tokens Totaux",
        usage: "Utilisation des Tokens"
    },
    tools: {
        availableTools: {
            title: "Outils Disponibles",
            copyFn: {
                description: 'Dites "Copier ça dans le presse-papiers" pour le coller quelque part.',
                name: "Fonction Copier"
            },
            getTime: {
                description: 'Demandez "Quelle heure est-il ?" pour obtenir l\'heure actuelle.',
                name: "Obtenir l'Heure"
            },
            launchWebsite: {
                description: '"Emmène-moi sur [site web]" pour ouvrir un site dans un nouvel onglet.',
                name: "Lancer un Site Web"
            },
            partyMode: {
                description: 'Dites "Activer le mode fête" pour une animation de confettis dynamique !',
                name: "Mode Fête"
            },
            themeSwitcher: {
                description: 'Dites "Changer le fond" ou "Passer en mode sombre" ou "Passer en mode clair".',
                name: "Changeur de Thème"
            },
            scrapeWebsite: {
                name: "Extracteur de Site Web",
                description: 'Dites "Extraire le contenu de [URL du site]" pour récupérer le contenu d\'une page web.'
            }
        },
        clipboard: {
            description: "Vous pouvez maintenant le coller quelque part.",
            success: "Texte copié dans le presse-papiers. Demandez à l'utilisateur de le coller quelque part.",
            toast: "Texte copié dans le presse-papiers !"
        },
        launchWebsite: {
            description: "Échec du lancement du site web",
            success: "Site lancé ! Informez l'utilisateur qu'il a été lancé.",
            toast: "Lancement du site web "
        },
        partyMode: {
            description: "Échec de l'activation du mode fête",
            success: "Mode fête activé",
            toast: "Mode fête !"
        },
        switchTheme: "Thème changé en ",
        themeFailed: "Échec du changement de thème",
        time: "Annoncer à l'utilisateur : L'heure actuelle est ",
        scrapeWebsite: {
            success: "Contenu du site web extrait avec succès",
            description: "Échec de l'extraction du contenu du site web",
            toast: "Extraction du contenu du site web..."
        }
    },
    transcriber: {
        title: "Transcription en Direct"
    },
    voice: {
        select: "Sélectionner une voix",
        ash: "Ash - Douce et Professionnelle",
        ballad: "Ballad - Chaleureuse et Engageante",
        coral: "Coral - Claire et Amicale",
        sage: "Sage - Autoritaire et Calme",
        verse: "Verse - Dynamique et Expressive"
    },
    language: "Français",
    languagePrompt: "Parlez et répondez uniquement en français. Il est crucial que vous mainteniez vos réponses en français. Si l'utilisateur parle dans d'autres langues, vous devriez toujours répondre en français. (French only)"
}