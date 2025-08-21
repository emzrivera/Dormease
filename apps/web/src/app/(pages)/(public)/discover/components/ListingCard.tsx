import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import ResponsiveCard from '../../../../../components/ResponsiveCard';

interface ListingCardProps {
  name: string;
  address: string;
  rating: number;
  price: string;
  type: string;
  photo: string;
  badges?: string[];
}

export default function ListingCard({
  name,
  address,
  rating,
  price,
  type,
  photo,
  badges = [],
}: ListingCardProps) {
    
  return (

   <ResponsiveCard variant="default" padding="sm" hover>
      
      {/* Photo */}
      <div className="w-full aspect-[1.597] rounded-xl overflow-hidden mb-2 relative">
        <img src={photo} alt={name} className="w-full h-full object-cover" />
        <div className="absolute bottom-2 left-2 flex space-x-2">
          {badges.map((badge, idx) => (
            <span key={idx} className="bg-dark text-white text-xs font-medium px-2 py-1 rounded">
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Details  */}
      <div className="flex justify-between items-start mb-1 w-full">
        <div>
          <h2 className="text-base font-semibold text-dark">{name}</h2>
          <div className="flex items-center">
            <FaMapMarkerAlt className="mr-1 text-labelDarkGray text-xs" />
            <span className="block max-w-48 truncate text-labelDarkGray text-sm">{address}</span>
          </div>
        </div>

        <div className="flex items-center text-base text-labelDarkGray">
          <FaStar className="mr-1 text-yellow-500" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Price */}
      <div className="flex justify-between items-end w-full mt-1">
        <div className="flex flex-col">
          <span className="text-labelDarkGray text-xs">Starts at</span>
          <span className="text-dark font-semibold text-base">{price}</span>
        </div>

        <span className="text-labelDarkGray text-sm">{type}</span>
      </div>

    </ResponsiveCard>
  );
}
