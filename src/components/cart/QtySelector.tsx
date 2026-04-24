import React from 'react'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

interface QuantitySelectorProps {
      quantity: number;
      onIncrement: () => void;
      onDecrement: () => void;
      min?: number;
      max?: number;
}

const QtySelector: React.FC<QuantitySelectorProps> = ({
      quantity,
      onIncrement,
      onDecrement,
      min = 1,
      max = 99
}: QuantitySelectorProps) => {

      return (
            <div className="flex items-center gap-3">
                  <div className="inline-flex items-center">
               
                        <Button disabled={quantity <= min} onClick={onDecrement}>
                              <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <div className="px-3">{quantity}</div>
                    
                        <Button onClick={onIncrement} disabled={quantity >= max}>
                              <FontAwesomeIcon icon={faPlus} />
                        </Button>
                  </div>
            </div>
      )
}

export default QtySelector