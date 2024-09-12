import { Typography, Container } from "@mui/material";
import React from "react";

const AproposPage = () => {
  return (
    <Container maxWidth="md" style={{ marginTop: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur le tableau de bord administrateur de l'application
        SomiloWays
      </Typography>
      <Typography variant="body1" paragraph>
        Ce tableau de bord est conçu pour vous fournir une interface intuitive
        et efficace afin de gérer les principales fonctionnalités de
        l'application.
      </Typography>

      <Typography variant="h5" gutterBottom>
        1. Gestion des Tickets
      </Typography>
      <Typography variant="body1" paragraph>
        Liste des tickets : Accédez à tous les tickets réservés par les
        utilisateurs. Vous pouvez voir les détails tels que les dates de
        réservation, les points de départ et d'arrivée, et le nombre de places
        disponibles.
      </Typography>
      <Typography variant="body1" paragraph>
        Mise à jour des tickets : Modifiez les informations des tickets, telles
        que le nombre de places disponibles ou les détails de l'itinéraire.
      </Typography>
      <Typography variant="body1" paragraph>
        Création de tickets : Ajoutez de nouveaux tickets en spécifiant les
        informations nécessaires telles que les points de départ et d'arrivée,
        la date et l'heure, et le nombre de places disponibles.
      </Typography>
      <Typography variant="body1" paragraph>
        Suppression de tickets : Supprimez les tickets obsolètes ou annulés.
      </Typography>

      <Typography variant="h5" gutterBottom>
        2. Gestion des Informations
      </Typography>
      <Typography variant="body1" paragraph>
        Notifications et informations partagées : Consultez et gérez les
        notifications et les informations partagées avec les utilisateurs de
        l'application. Vous pouvez ajouter de nouvelles informations, les
        modifier ou les supprimer.
      </Typography>
      <Typography variant="body1" paragraph>
        Partage d'informations : Utilisez la fonction de partage pour envoyer
        des annonces importantes ou des mises à jour directement aux
        utilisateurs de l'application.
      </Typography>

      <Typography variant="h5" gutterBottom>
        3. Gestion des Réclamations
      </Typography>
      <Typography variant="body1" paragraph>
        Suivi des réclamations : Consultez les réclamations envoyées par les
        utilisateurs. Vous pouvez voir les détails de chaque réclamation, y
        compris le titre, le message, et toute image associée.
      </Typography>
      <Typography variant="body1" paragraph>
        Réponse aux réclamations : Vous pouvez répondre aux réclamations
        directement via le tableau de bord pour maintenir une communication
        efficace avec les utilisateurs.
      </Typography>
      <Typography variant="body1" paragraph>
        Archivage et suppression : Archivez ou supprimez les réclamations une
        fois qu'elles ont été traitées.
      </Typography>
    </Container>
  );
};

export default AproposPage;
