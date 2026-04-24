import  { useMemo, type ReactNode } from 'react'
import { Star } from 'lucide-react';
import { StarHalf } from 'lucide-react';

interface ReviewStarProps {
  rating: number;
  children?: ReactNode;
}

const ReviewStars: React.FC<ReviewStarProps> = ({rating, children}: ReviewStarProps) =>{
    
    const  starArray = useMemo(() => {
    const fullStars = Math.floor(rating);
    // return Array(5).fill(false).map((_, index) =>  index < fullStars);
    
    const halfStar = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    return Array(fullStars).fill('full')
      .concat(Array(halfStar).fill('half'))
      .concat(Array(emptyStars).fill('empty'));
  },[rating]);

  return (
     <div className="flex items-center mb-3">
    <div className="flex items-center mr-2">
        {
            starArray.map((s)=>(
                <>
                  {s === "full" && (
            <Star size={18} className="text-yellow-400 fill-current" />
          )}
          {s === "half" && (
            <StarHalf size={18} className="text-yellow-400 fill-current" />
          )}
          {s === "empty" && (
            <Star size={18} className="text-gray-300" /> /* No fill for empty */
          )}
                </>
            ))
        }
    </div>
    <span className="text-sm text-gray-500">
        {children}
    </span>
  </div>
  )
}

export default ReviewStars