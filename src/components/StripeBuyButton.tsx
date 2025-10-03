import { useEffect, useRef } from 'react';

interface StripeBuyButtonProps {
  buyButtonId: string;
  publishableKey: string;
  variant?: 'default' | 'grey';
}

const StripeBuyButton = ({ buyButtonId, publishableKey, variant = 'default' }: StripeBuyButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Create the stripe-buy-button element
      const stripeButton = document.createElement('stripe-buy-button');
      stripeButton.setAttribute('buy-button-id', buyButtonId);
      stripeButton.setAttribute('publishable-key', publishableKey);
      
      // Append to container
      containerRef.current.appendChild(stripeButton);
      
      // Cleanup on unmount
      return () => {
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }
      };
    }
  }, [buyButtonId, publishableKey]);

  return (
    <div 
      ref={containerRef} 
      className={`w-full flex justify-center stripe-button-container ${variant === 'grey' ? 'stripe-button-grey' : ''}`}
    />
  );
};

export default StripeBuyButton;

