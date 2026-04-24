import React from 'react';
import { Check } from 'lucide-react'; // Optional: Use any icon library

// Define the valid statuses in order
const ORDER_STEPS = ["pending","payment","placed" ,"processing" , "shipped" , "delivered" , "cancelled" ,"failed",] as const;
// const ORDER_STEPS2 = [
//   { step: "pending" },
//   { step: "payment" },
//   { step: "placed" },
//   { step: "packed" },
//   { step: "shipped" },
//   { step: "delivered" },
// ] as const
type OrderStatus = typeof ORDER_STEPS[number];

interface OrderProgressProps {
  currentStatus: string; // The status from your API
}

const OrderProgressBar: React.FC<OrderProgressProps> = ({ currentStatus }) => {
  // Normalize status to lowercase to match our array
  const status = currentStatus.toLowerCase() as OrderStatus;
  const currentIndex = ORDER_STEPS.indexOf(status);

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 bg-gray-200" />
        
        {/* Active Progress Line */}
        <div 
          className="absolute left-0 top-1/2 h-1 transition-all duration-500 -translate-y-1/2 bg-emerald-500"
          style={{ width: `${(currentIndex / (ORDER_STEPS.length - 1)) * 100}%` }}
        />

        {/* Step Circles */}
        {ORDER_STEPS.map((step, index) => {
          const isCompleted = index < currentIndex;
        //   const isCurrent = index === currentIndex;
          const isActive = index <= currentIndex;

          return (
            <div key={step} className="relative z-10 flex flex-col items-center">
              {/* Circle */}
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors duration-500 ${
                  isActive 
                    ? "border-emerald-500 bg-emerald-500 text-white" 
                    : "border-gray-300 bg-white text-gray-300"
                }`}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} />
                ) : (
                  <div className={`h-2 w-2 rounded-full ${isActive ? 'bg-white' : 'bg-gray-300'}`} />
                )}
              </div>

              {/* Label */}
              <span
                className={`absolute top-10 whitespace-nowrap text-sm font-medium capitalize ${
                  isActive ? "text-emerald-500" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderProgressBar;