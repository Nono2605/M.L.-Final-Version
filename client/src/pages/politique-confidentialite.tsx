import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import logoPath from '@assets/Logo_Mahmoud-02.png';

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="min-h-screen bg-swiss-light">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <img 
                src={logoPath} 
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
            Politique de confidentialité
          </h1>
          <p className="text-lg text-swiss-slate">
            Protection et traitement de vos données personnelles
          </p>
        </div>

        <div className="space-y-8">
          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle>Engagement de confidentialité</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                SuisseToiture®️ s'engage à protéger la confidentialité de vos données personnelles. 
                Cette politique explique comment nous collectons, utilisons et protégeons vos informations 
                conformément à la Loi fédérale sur la protection des données (LPD) suisse.
              </p>
            </CardContent>
          </Card>

          {/* Données collectées */}
          <Card>
            <CardHeader>
              <CardTitle>Données collectées</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><strong>Lors de votre demande de devis, nous collectons :</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nom et prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Adresse postale (optionnel)</li>
                <li>Informations sur votre projet (type de bâtiment, services souhaités, superficie)</li>
              </ul>
              <p><strong>Données techniques :</strong></p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Adresse IP</li>
                <li>Type de navigateur</li>
                <li>Pages visitées sur notre site</li>
              </ul>
            </CardContent>
          </Card>

          {/* Utilisation des données */}
          <Card>
            <CardHeader>
              <CardTitle>Utilisation de vos données</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Vos données personnelles sont utilisées pour :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Établir et vous envoyer votre devis personnalisé</li>
                <li>Vous contacter concernant votre demande</li>
                <li>Planifier et réaliser les prestations convenues</li>
                <li>Améliorer nos services</li>
                <li>Respecter nos obligations légales</li>
              </ul>
              <p className="mt-4">
                <strong>Nous ne vendons jamais vos données à des tiers.</strong>
              </p>
            </CardContent>
          </Card>

          {/* Base légale */}
          <Card>
            <CardHeader>
              <CardTitle>Base légale du traitement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Le traitement de vos données repose sur :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Votre consentement</strong> pour l'envoi de devis</li>
                <li><strong>L'exécution du contrat</strong> pour la réalisation des prestations</li>
                <li><strong>Nos intérêts légitimes</strong> pour l'amélioration de nos services</li>
                <li><strong>Les obligations légales</strong> (comptabilité, fiscalité)</li>
              </ul>
            </CardContent>
          </Card>

          {/* Conservation des données */}
          <Card>
            <CardHeader>
              <CardTitle>Durée de conservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Nous conservons vos données :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Devis non acceptés :</strong> 2 ans maximum</li>
                <li><strong>Clients :</strong> 10 ans (obligations comptables)</li>
                <li><strong>Données techniques :</strong> 12 mois maximum</li>
              </ul>
            </CardContent>
          </Card>

          {/* Vos droits */}
          <Card>
            <CardHeader>
              <CardTitle>Vos droits</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>Conformément à la LPD suisse, vous disposez des droits suivants :</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes</li>
                <li><strong>Droit d'effacement :</strong> demander la suppression de vos données</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement</li>
                <li><strong>Droit de portabilité :</strong> récupérer vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer ces droits, contactez-nous à : <a href="mailto:info@suissetoiture.ch" className="text-swiss-blue hover:underline font-semibold">info@suissetoiture.ch</a>
              </p>
            </CardContent>
          </Card>

          {/* Sécurité */}
          <Card>
            <CardHeader>
              <CardTitle>Sécurité des données</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Nous mettons en place des mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre la perte, l'utilisation abusive et l'accès non autorisé. 
                Nos serveurs sont hébergés en Suisse et respectent les standards de sécurité suisses.
              </p>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact et réclamations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Pour toute question concernant cette politique de confidentialité ou 
                l'utilisation de vos données personnelles :
              </p>
              <div className="bg-swiss-light p-4 rounded-lg">
                <p><strong>SuisseToiture®️</strong></p>
                <p>Email : <a href="mailto:info@suissetoiture.ch" className="text-swiss-blue hover:underline">info@suissetoiture.ch</a></p>
                <p>Téléphone : <a href="tel:+41786903334" className="text-swiss-blue hover:underline">+41 78 690 33 34</a></p>
              </div>
              <p>
                Vous avez également le droit de déposer une plainte auprès du 
                Préposé fédéral à la protection des données et à la transparence (PFPDT).
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-swiss-slate mb-4">
            Dernière mise à jour : Juin 2025
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