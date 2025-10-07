import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';

interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
  variant?: 'default' | 'grey';
  plan?: string;
}

const StripeBuyButton = ({ buyButtonId, publishableKey, variant = 'default', plan }: StripeBuyButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to join community page with Stripe details in URL params
    const params = new URLSearchParams({
      buyButtonId,
      publishableKey,
      ...(plan && { plan })
    });
    navigate(`/join-community?${params.toString()}`);
  };

  return (
    <Button 
      className={`w-full ${variant === 'grey' ? 'bg-gray-100 hover:bg-gray-200 text-gray-900' : 'bg-green-600 hover:bg-green-700 text-white'}`}
      size="lg"
      onClick={handleClick}
    >
      Start 7-day trial
    </Button>
  );
};

export default StripeBuyButton;

