import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';

export default function ConditionsGeneralesPage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img 
                src="/attached_assets/Logo_Mahmoud-02.png" 
                alt="SuisseToiture"
                className="h-12 cursor-pointer"
              />
            </Link>
            <Link href="/">
              <Button variant="outline">
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Conditions générales
          </h1>
          <p className="text-lg text-swiss-slate">
            Conditions générales de vente et de prestation de services
          </p>
        </div>

        <div className="space-y-8">
          {/* Objet et champ d'application */}
          <Card>
            <CardHeader>
              <CardTitle>1. Objet et champ d'application</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Les présentes conditions générales s'appliquent à toutes les prestations de nettoyage 
                professionnel à vapeur fournies par SuisseToiture®️ en Suisse.
              </p>
              <p>
                Nos services incluent le nettoyage de toitures, façades, terrasses et autres surfaces 
                extérieures par procédé de nettoyage à vapeur.
              </p>
            </CardContent>
          </Card>

          {/* Devis et commandes */}
          <Card>
            <CardHeader>
              <CardTitle>2. Devis et acceptation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Devis gratuits :</strong> Tous nos devis sont établis gratuitement et sans engagement. 
                Ils sont valables 30 jours à compter de leur émission.
              </p>
              <p>
                <strong>Acceptation :</strong> La commande devient ferme et définitive dès acceptation écrite 
                du devis par le client (signature, email de confirmation).
              </p>
              <p>
                <strong>Visite préalable :</strong> Une visite préalable peut être nécessaire pour établir 
                un devis précis selon la complexité du projet.
              </p>
            </CardContent>
          </Card>

          {/* Prix et facturation */}
          <Card>
            <CardHeader>
              <CardTitle>3. Prix et facturation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Prix :</strong> Les prix sont indiqués en francs suisses (CHF), TVA incluse au taux en vigueur.
              </p>
              <p>
                <strong>Facturation :</strong> La facture est établie à la fin des travaux. 
                Le paiement est exigible dans les 30 jours suivant la facturation.
              </p>
              <p>
                <strong>Moyens de paiement :</strong> Espèces, virement bancaire, ou selon accord préalable.
              </p>
            </CardContent>
          </Card>

          {/* Exécution des prestations */}
          <Card>
            <CardHeader>
              <CardTitle>4. Exécution des prestations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Délais :</strong> Les délais d'intervention sont donnés à titre indicatif et dépendent 
                des conditions météorologiques et de la charge de travail.
              </p>
              <p>
                <strong>Accès :</strong> Le client doit assurer un accès libre et sécurisé aux zones à traiter. 
                Il appartient au client de signaler tout obstacle ou danger particulier.
              </p>
              <p>
                <strong>Conditions météorologiques :</strong> Les travaux extérieurs peuvent être reportés 
                en cas de conditions météorologiques défavorables.
              </p>
            </CardContent>
          </Card>

          {/* Obligations du client */}
          <Card>
            <CardHeader>
              <CardTitle>5. Obligations du client</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="list-disc pl-6 space-y-2">
                <li>Fournir un accès sécurisé aux zones de travail</li>
                <li>Signaler tout danger ou particularité du site</li>
                <li>Protéger les biens mobiliers si nécessaire</li>
                <li>Être présent ou représenté lors de l'intervention</li>
                <li>Régler les factures dans les délais convenus</li>
              </ul>
            </CardContent>
          </Card>

          {/* Garantie et responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>6. Garantie et responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Garantie :</strong> Nous garantissons nos prestations contre tout vice de réalisation 
                pendant une durée de 6 mois à compter de la fin des travaux.
              </p>
              <p>
                <strong>Assurance :</strong> SuisseToiture®️ est couverte par une assurance responsabilité civile 
                professionnelle pour les dommages causés dans le cadre de ses activités.
              </p>
              <p>
                <strong>Limites :</strong> Notre responsabilité est limitée aux dommages directs et ne peut 
                excéder le montant de la prestation concernée.
              </p>
            </CardContent>
          </Card>

          {/* Annulation et modifications */}
          <Card>
            <CardHeader>
              <CardTitle>7. Annulation et modifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                <strong>Annulation par le client :</strong> Possible jusqu'à 48h avant l'intervention prévue 
                sans frais. En deçà, des frais de déplacement peuvent être facturés.
              </p>
              <p>
                <strong>Modifications :</strong> Toute modification doit faire l'objet d'un avenant écrit 
                au devis initial.
              </p>
            </CardContent>
          </Card>

          {/* Retard de paiement */}
          <Card>
            <CardHeader>
              <CardTitle>8. Retard de paiement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                En cas de retard de paiement, des intérêts de retard au taux de 5% l'an seront appliqués 
                dès le premier jour de retard, sans mise en demeure préalable.
              </p>
              <p>
                Les frais de poursuite et d'encaissement restent à la charge du débiteur.
              </p>
            </CardContent>
          </Card>

          {/* Protection de l'environnement */}
          <Card>
            <CardHeader>
              <CardTitle>9. Engagement environnemental</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                SuisseToiture®️ s'engage à utiliser exclusivement des procédés de nettoyage à vapeur, 
                respectueux de l'environnement, sans produits chimiques nocifs. 
                Nos méthodes permettent une réduction de 80% de la consommation d'eau par rapport 
                aux méthodes traditionnelles.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>10. Droit applicable et for juridique</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Les présentes conditions générales sont soumises au droit suisse. 
                Le for juridique est le lieu du siège de SuisseToiture®️.
              </p>
              <p>
                En cas de divergence entre les versions linguistiques, 
                la version française fait foi.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-swiss-slate mb-4">
            Conditions générales en vigueur depuis juin 2025
          </p>
          <Link href="/">
            <Button variant="outline">
              Retour à l'accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}