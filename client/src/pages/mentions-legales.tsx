import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'wouter';
import logoPath from '@assets/Logo_Mahmoud-02.png';

export default function MentionsLegalesPage() {
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
            Mentions légales
          </h1>
          <p className="text-lg text-swiss-slate">
            Informations légales concernant SuisseToiture®️
          </p>
        </div>

        <div className="space-y-8">
          {/* Identification de l'entreprise */}
          <Card>
            <CardHeader>
              <CardTitle>Identification de l'entreprise</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <strong>Raison sociale :</strong> SuisseToiture®️
              </div>
              <div>
                <strong>Activité :</strong> Nettoyage professionnel à vapeur
              </div>
              <div>
                <strong>Téléphone :</strong> +41 78 690 33 34
              </div>
              <div>
                <strong>Email :</strong> info@suissetoiture.ch
              </div>
              <div>
                <strong>Zone d'intervention :</strong> Toute la Suisse
              </div>
            </CardContent>
          </Card>

          {/* Propriété intellectuelle */}
          <Card>
            <CardHeader>
              <CardTitle>Propriété intellectuelle</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                L'ensemble de ce site relève de la législation suisse et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La marque SuisseToiture®️ ainsi que les logos figurant sur ce site sont des marques déposées. Toute reproduction totale ou partielle de ces marques sans autorisation expresse est prohibée.
              </p>
            </CardContent>
          </Card>

          {/* Responsabilité */}
          <Card>
            <CardHeader>
              <CardTitle>Limitation de responsabilité</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site remis à jour à différentes périodes de l'année, mais peut toutefois contenir des inexactitudes ou des omissions.
              </p>
              <p>
                Si vous constatez une lacune, erreur ou ce qui parait être un dysfonctionnement, merci de bien vouloir le signaler par email, à l'adresse info@suissetoiture.ch, en décrivant le problème de la façon la plus précise possible.
              </p>
              <p>
                Tout contenu téléchargé se fait aux risques et périls de l'utilisateur et sous sa seule responsabilité. En conséquence, SuisseToiture®️ ne saurait être tenu responsable d'un quelconque dommage subi par l'ordinateur de l'utilisateur ou d'une quelconque perte de données consécutives au téléchargement.
              </p>
            </CardContent>
          </Card>

          {/* Droit applicable */}
          <Card>
            <CardHeader>
              <CardTitle>Droit applicable et juridiction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p>
                Tout litige en relation avec l'utilisation du site www.suissetoiture.ch est soumis au droit suisse. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Suisse.
              </p>
              <p>
                La langue de référence du présent site web est le français. En cas de divergence entre la version française et d'autres versions linguistiques, la version française fait foi.
              </p>
            </CardContent>
          </Card>

          {/* Hébergement */}
          <Card>
            <CardHeader>
              <CardTitle>Hébergement</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Ce site est hébergé en Suisse, conformément à la législation suisse sur la protection des données.
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