import { Card } from "@/components/ui/card";
import { MapPinHouse, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

const AIRMAIL_BORDER = cn(
  "before:content-[''] before:absolute before:inset-0 before:rounded-xl",
  "before:p-[6px]",
  "before:bg-[repeating-linear-gradient(-45deg,#ef4444,#ef4444_20px,#fff_20px,#fff_40px,#3b82f6_40px,#3b82f6_60px,#fff_60px,#fff_80px)]"
);

type AddressCardAddProps = {
  variant: "add";
  onClick: () => void;
};

type AddressCardItemProps = {
  variant: "item";
  name: string;
  address: string;
  phone: string;
  isMain?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
};

export type AddressCardProps = AddressCardAddProps | AddressCardItemProps;

function AddressCard(props: AddressCardProps) {
  if (props.variant === "add") {
    return (
      <Card
        role="button"
        tabIndex={0}
        onClick={props.onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            props.onClick();
          }
        }}
        className={cn(
          "relative flex h-64 w-full max-w-md cursor-pointer items-center justify-center overflow-hidden border-none bg-orange-50/50 shadow-lg transition-transform hover:scale-[1.02]",
          AIRMAIL_BORDER
        )}
      >
        <div className="absolute inset-0 m-1 flex items-center justify-center rounded-[10px] bg-white/90">
          <div className="group relative flex items-center justify-center">
            <div className="flex h-24 w-24 rotate-[-15deg] items-center justify-center rounded-full border-4 border-double border-red-500 transition-transform group-hover:rotate-0">
              <span className="text-sm font-bold uppercase text-red-500">
                Add New
              </span>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  const { name, address, phone, isMain, onEdit, onDelete, disabled } = props;

  return (
    <Card
      className={cn(
        "relative flex h-64 w-full max-w-md items-center justify-center overflow-hidden border-none bg-orange-50/50 shadow-lg",
        AIRMAIL_BORDER
      )}
    >
      <div className="absolute inset-0 m-1 flex flex-col justify-between rounded-[10px] bg-white p-8 text-primary/90">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xl font-bold">Address ID: {name}</h3>
          <div className="flex shrink-0 flex-col items-center">
            <MapPinHouse className="h-10 w-10 text-slate-400" strokeWidth={1} />
            {isMain ? (
              <span className="mt-1 text-[10px] font-bold tracking-tighter text-slate-500">
                MAIN
              </span>
            ) : null}
          </div>
        </div>

        <div className="mt-4 min-h-0 grow">
          <p className="max-w-[90%] font-medium leading-relaxed">{address}</p>
        </div>

        <div className="mt-2 flex items-end justify-between gap-2 border-t border-border/40 pt-3">
          <p className="font-medium">{phone}</p>
          <div className="flex gap-1">
            <Button
              type="button"
              size="icon"
              variant="outline"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              aria-label="Edit address"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="destructive"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
              aria-label="Delete address"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default AddressCard;
