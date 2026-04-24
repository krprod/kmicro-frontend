// import { Button } from "@/components/ui/button"
import {
  Dialog,
//   DialogClose,
  DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
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
      {/* <DialogTrigger asChild>
        <Button variant="outline">Sticky Footer</Button>
      </DialogTrigger> */}
      {/* className="max-w-50 lg:max-w-200 w-full" */}
      <DialogContent>
  {/*       <DialogHeader>
          <DialogTitle>Sticky Footer</DialogTitle>
          <DialogDescription>
            This dialog has a sticky footer that stays visible while the content
            scrolls.
          </DialogDescription>
        </DialogHeader> */}
        {/* <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4"> */}
        <div className="-mx-4 no-scrollbar max-h-[70vh] overflow-y-auto px-4">
                {children}
        </div>
    {/*     <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={()=>{ dispatch(closeDailog())  }}>Close</Button>
          </DialogClose>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}

export default TheDailogBox;
