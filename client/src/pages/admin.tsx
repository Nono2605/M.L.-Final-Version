import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Quote, UpdateQuote } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Home, Building, Calendar, MapPin, User, Phone, Mail, MessageSquare, Settings, Eye } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AdminAuth } from '@/components/admin-auth';

const statusLabels = {
  en_attente: 'En attente',
  traite: 'Traité',
  annule: 'Annulé'
};

const statusColors = {
  en_attente: 'bg-yellow-100 text-yellow-800',
  traite: 'bg-green-100 text-green-800',
  annule: 'bg-red-100 text-red-800'
};

const serviceLabels = {
  toiture: 'Toiture',
  facade: 'Façade',
  terrasse: 'Terrasse'
};

const projectTypeLabels = {
  maison: 'Maison',
  immeuble: 'Immeuble'
};

export default function AdminPage() {
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Toujours appeler useQuery, mais le désactiver si pas authentifié
  const { data: quotes = [], isLoading } = useQuery<Quote[]>({
    queryKey: ['/api/quotes'],
    enabled: isAuthenticated, // Désactiver la requête si pas authentifié
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà authentifié
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  // Afficher la page d'authentification si pas connecté
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const updateQuoteMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: UpdateQuote }) => {
      return apiRequest('PATCH', `/api/quotes/${id}`, updates);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/quotes'] });
      toast({
        title: "Devis mis à jour",
        description: "Le statut du devis a été modifié avec succès.",
      });
      setSelectedQuote(null);
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour.",
        variant: "destructive",
      });
    },
  });

  const filteredQuotes = quotes.filter(quote => 
    statusFilter === 'all' || quote.status === statusFilter
  );

  const stats = {
    total: quotes.length,
    en_attente: quotes.filter(q => q.status === 'en_attente').length,
    traite: quotes.filter(q => q.status === 'traite').length,
    annule: quotes.filter(q => q.status === 'annule').length,
  };

  const handleUpdateQuote = (status: string, notes?: string) => {
    if (!selectedQuote) return;
    
    updateQuoteMutation.mutate({
      id: selectedQuote.id,
      updates: { status: status as 'en_attente' | 'traite' | 'annule', notes }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-swiss-blue mx-auto mb-4"></div>
          <p className="text-swiss-slate">Chargement des demandes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-swiss-blue rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Administration SuisseToiture®️</h1>
                <p className="text-sm text-swiss-slate">Gestion des demandes de devis</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-swiss-blue border-swiss-blue">
                {stats.total} demande{stats.total > 1 ? 's' : ''}
              </Badge>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-swiss-slate">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-swiss-blue" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-swiss-slate">En attente</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.en_attente}</p>
                </div>
                <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-swiss-slate">Traités</p>
                  <p className="text-2xl font-bold text-green-600">{stats.traite}</p>
                </div>
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-swiss-slate">Annulés</p>
                  <p className="text-2xl font-bold text-red-600">{stats.annule}</p>
                </div>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Building className="w-5 h-5 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Demandes de devis</h2>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="en_attente">En attente</SelectItem>
              <SelectItem value="traite">Traité</SelectItem>
              <SelectItem value="annule">Annulé</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Quotes List */}
        <div className="grid gap-6">
          {filteredQuotes.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Home className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune demande</h3>
                <p className="text-swiss-slate">
                  {statusFilter === 'all' 
                    ? "Aucune demande de devis n'a été soumise pour le moment."
                    : `Aucune demande avec le statut "${statusLabels[statusFilter as keyof typeof statusLabels]}" trouvée.`
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredQuotes.map((quote) => (
              <Card key={quote.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        {quote.projectType === 'maison' ? (
                          <Home className="w-5 h-5 text-swiss-blue" />
                        ) : (
                          <Building className="w-5 h-5 text-swiss-blue" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          Devis #{quote.id} - {projectTypeLabels[quote.projectType as keyof typeof projectTypeLabels]}
                        </CardTitle>
                        <p className="text-sm text-swiss-slate">
                          {format(new Date(quote.createdAt), 'dd MMMM yyyy à HH:mm', { locale: fr })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Badge className={statusColors[quote.status as keyof typeof statusColors]}>
                        {statusLabels[quote.status as keyof typeof statusLabels]}
                      </Badge>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedQuote(quote)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Voir détails
                          </Button>
                        </DialogTrigger>
                        <QuoteDetailDialog 
                          quote={selectedQuote} 
                          onUpdate={handleUpdateQuote}
                          isUpdating={updateQuoteMutation.isPending}
                        />
                      </Dialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center text-sm text-swiss-slate">
                      <Settings className="w-4 h-4 mr-2 text-swiss-blue" />
                      <span>{serviceLabels[quote.service as keyof typeof serviceLabels]}</span>
                      <span className="mx-2">•</span>
                      <span>{quote.subServices.join(', ')}</span>
                    </div>
                    <div className="flex items-center text-sm text-swiss-slate">
                      <Home className="w-4 h-4 mr-2 text-swiss-blue" />
                      <span>{quote.superficie} m²</span>
                    </div>
                    {quote.adresse && (
                      <div className="flex items-center text-sm text-swiss-slate">
                        <MapPin className="w-4 h-4 mr-2 text-swiss-blue" />
                        <span className="truncate">{quote.adresse}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {quote.email && (
                      <div className="flex items-center text-sm text-swiss-slate">
                        <Mail className="w-4 h-4 mr-2 text-swiss-blue" />
                        <span className="truncate">{quote.email}</span>
                      </div>
                    )}
                    {quote.telephone && (
                      <div className="flex items-center text-sm text-swiss-slate">
                        <Phone className="w-4 h-4 mr-2 text-swiss-blue" />
                        <span>{quote.telephone}</span>
                      </div>
                    )}
                    {quote.whatsapp && (
                      <div className="flex items-center text-sm text-swiss-slate">
                        <MessageSquare className="w-4 h-4 mr-2 text-swiss-blue" />
                        <span>{quote.whatsapp}</span>
                      </div>
                    )}
                  </div>

                  {quote.notes && (
                    <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-swiss-slate"><strong>Notes :</strong> {quote.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function QuoteDetailDialog({ 
  quote, 
  onUpdate, 
  isUpdating 
}: { 
  quote: Quote | null; 
  onUpdate: (status: string, notes?: string) => void;
  isUpdating: boolean;
}) {
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [notes, setNotes] = useState('');

  if (!quote) return null;

  const handleUpdate = () => {
    onUpdate(selectedStatus, notes);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          Devis #{quote.id} - {projectTypeLabels[quote.projectType as keyof typeof projectTypeLabels]}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Project Details */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Détails du projet</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-swiss-slate">Service :</span>
              <span className="font-medium ml-2">{serviceLabels[quote.service as keyof typeof serviceLabels]}</span>
            </div>
            <div>
              <span className="text-swiss-slate">Type :</span>
              <span className="font-medium ml-2">{quote.subServices.join(', ')}</span>
            </div>
            <div>
              <span className="text-swiss-slate">Superficie :</span>
              <span className="font-medium ml-2">{quote.superficie} m²</span>
            </div>
            <div>
              <span className="text-swiss-slate">Date :</span>
              <span className="font-medium ml-2">
                {format(new Date(quote.createdAt), 'dd/MM/yyyy HH:mm', { locale: fr })}
              </span>
            </div>
          </div>
          {quote.adresse && (
            <div className="mt-2 text-sm">
              <span className="text-swiss-slate">Adresse :</span>
              <span className="font-medium ml-2">{quote.adresse}</span>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Informations de contact</h3>
          <div className="space-y-2 text-sm">
            {quote.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-swiss-blue" />
                <span>{quote.email}</span>
              </div>
            )}
            {quote.telephone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-swiss-blue" />
                <span>{quote.telephone}</span>
              </div>
            )}
            {quote.whatsapp && (
              <div className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-2 text-swiss-blue" />
                <span>{quote.whatsapp}</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Update */}
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Mettre à jour le statut</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="status">Nouveau statut</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue placeholder={`Statut actuel: ${statusLabels[quote.status as keyof typeof statusLabels]}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en_attente">En attente</SelectItem>
                  <SelectItem value="traite">Traité</SelectItem>
                  <SelectItem value="annule">Annulé</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="notes">Notes (optionnel)</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajouter des notes sur ce devis..."
                rows={3}
              />
            </div>

            {quote.notes && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-swiss-slate">
                  <strong>Notes actuelles :</strong> {quote.notes}
                </p>
              </div>
            )}

            <Button 
              onClick={handleUpdate}
              disabled={!selectedStatus || isUpdating}
              className="w-full bg-swiss-blue hover:bg-blue-800"
            >
              {isUpdating ? 'Mise à jour...' : 'Mettre à jour le devis'}
            </Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}