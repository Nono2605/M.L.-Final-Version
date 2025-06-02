import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, AlertCircle } from 'lucide-react';

interface AdminAuthProps {
  onAuthenticated: () => void;
}

export function AdminAuth({ onAuthenticated }: AdminAuthProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Mot de passe fixe à 6 chiffres
    const correctPassword = '123456';

    // Simulation d'une vérification
    setTimeout(() => {
      if (password === correctPassword) {
        localStorage.setItem('admin_authenticated', 'true');
        onAuthenticated();
      } else {
        setError('Mot de passe incorrect');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-swiss-blue rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Accès Administration
          </CardTitle>
          <p className="text-swiss-slate">
            Entrez le mot de passe pour accéder à l'administration
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="password">Mot de passe (6 chiffres)</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                maxLength={6}
                pattern="[0-9]{6}"
                required
                className="text-center text-lg tracking-widest"
              />
            </div>
            
            {error && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            
            <Button 
              type="submit" 
              disabled={password.length !== 6 || isLoading}
              className="w-full bg-swiss-blue hover:bg-blue-800"
            >
              {isLoading ? 'Vérification...' : 'Accéder'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}