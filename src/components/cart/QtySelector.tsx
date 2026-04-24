import React from 'react'
import { Button } from '../ui/button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

// interface QtySelectorProps{
//     // cartItem: CartItem;
//     quantity: number;
//     product: Product;
//     min: 1,
//     max: 99,

// }
interface QuantitySelectorProps {
      quantity: number;
      onIncrement: () => void;
      onDecrement: () => void;
      min?: number;
      max?: number;
}

// const QtySelector: React.FC<QtySelectorProps> = ({product, qty}: QtySelectorProps) => {
const QtySelector: React.FC<QuantitySelectorProps> = ({
      quantity,
      onIncrement,
      onDecrement,
      min = 1,
      max = 99
}: QuantitySelectorProps) => {

      // const dispatch = useDispatch();
      // const [quant, setQuant] = useState(qty);

      /* const updateQty = (action: string, cartItem: Product)  => {
            // let qty: number = 0;    
            // if(cartItem.quantity > 0){
      
            if(action === "add"){
              console.log("adding");
              const qt  = quant + 1;
              setQuant(qt);
              dispatch(setItemQuantity({product, quantity: qt}));
                // cartItem.quantity = cartItem.quantity + 1;
            }
            if(action === "sub"){
              console.log("subtracting");
              if(quant === 1) return;  
              const qt  = quant - 1;
              setQuant(qt);
              // cartItem.quantity = cartItem.quantity - 1;
            }
            dispatch(setItemQuantity({product, quantity: quant}));
            // dispatch(setItemQuantity(cartItem));
      } */

      return (
            <div className="flex items-center gap-3">
                  <div className="inline-flex items-center">
                        {/* <button matIconButton [disabled]="quantity() === 1" (click)="qtyUpdated.emit(quantity() - 1)">
    //   <mat-icon>remove</mat-icon>
    </button> */}
                        {/* <Button disabled={quant === 1} onClick={()=>{ updateQty("sub", product)}}> */}
                        <Button disabled={quantity <= min} onClick={onDecrement}>
                              <FontAwesomeIcon icon={faMinus} />
                        </Button>
                        <div className="px-3">{quantity}</div>
                        {/* <button matIconButton (click)="qtyUpdated.emit(quantity() + 1)">
    //   <mat-icon>add</mat-icon>
    </button> */}
                        {/* <Button onClick={()=>{ updateQty("add", product)}}> */}
                        <Button onClick={onIncrement} disabled={quantity >= max}>
                              <FontAwesomeIcon icon={faPlus} />
                        </Button>
                  </div>
            </div>
      )
}

export default QtySelector