import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/stores/store"
import { useAppDispatch } from '../../stores/store';
import { closeDailog } from "@/stores/slice/sarkariSlice";

interface TheDailogBoxProps{
        children: React.ReactNode
}
const TheDailogBox: React.FC<TheDailogBoxProps> = ({children}: TheDailogBoxProps) => {

        const sarkar = useAppSelector((state) => state.sarkar);
        const dispatch = useAppDispatch();

  return (
    <Dialog open={sarkar.isDailogOpen} onOpenChange={()=>{ dispatch(closeDailog())  }}>
      <DialogContent>
        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
                {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default TheDailogBox;
