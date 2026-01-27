import { ROLES } from "../../../store/roleUtils";

export const roleConfig = {
  [ROLES.USER]: {
    title: "Utilisateur",
    description: "Acces aux evenements, billets et notifications.",
    capabilities: [
      "Consulter des evenements",
      "Reserver des billets",
      "Recevoir des alertes",
    ],
  },
  [ROLES.ORGANIZER]: {
    title: "Organisateur",
    description: "Creer et gerer vos evenements.",
    capabilities: [
      "Creer des evenements",
      "Gerer les collaborateurs",
      "Suivre les performances",
    ],
  },
  [ROLES.PROVIDER]: {
    title: "Prestataire",
    description: "Proposer vos services et gerer vos demandes.",
    capabilities: [
      "Publier des services",
      "Recevoir des demandes",
      "Gerer votre vitrine",
    ],
  },
  [ROLES.LANDLORD]: {
    title: "Proprietaire",
    description: "Lister vos espaces et gerer les demandes.",
    capabilities: [
      "Ajouter des lieux",
      "Gerer disponibilites",
      "Suivre les reservations",
    ],
  },
  [ROLES.ADMIN]: {
    title: "Admin",
    description: "Superviser la plateforme.",
    capabilities: ["Administrer les utilisateurs", "Superviser les contenus"],
  },
};
