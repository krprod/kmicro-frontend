import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface FormSubmitModalProps {
  confirmationDialog: boolean;
  setConfirmationDialog: (open: boolean) => void;
  showPreApprovedDialog?: number;
  handleLeaveForm?: () => void;
  handleStayOnPage?: () => void;
}

const LeaveFormAlert = ({
  confirmationDialog,
  setConfirmationDialog,
  handleLeaveForm,
  handleStayOnPage,
}: FormSubmitModalProps) => {
  return (
    <AlertDialog open={confirmationDialog} onOpenChange={setConfirmationDialog}>
      <AlertDialogContent className="px-6">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to leave this page?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Do you want to discard everything you’ve entered and exit?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleStayOnPage}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleLeaveForm}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LeaveFormAlert;
