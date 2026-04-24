import  { useState } from 'react'
import type { UserApiType } from "@/core/modals/userT";
import  { Button } from '@/components/ui/button';
import  { Dialog, DialogContent, DialogHeader, DialogTitle, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { useApi } from '@/hooks/useApi';

type MailFormState = {
  subject: string;
  message: string;
};

interface MailPopUpProps {
  target: UserApiType | null;
  form: MailFormState;
  setForm: React.Dispatch<React.SetStateAction<MailFormState>>;
  onClose: () => void;
  setTarget: React.Dispatch<React.SetStateAction<UserApiType | null>>;
}

export default function MailPopUp({ target, form, setForm, onClose, setTarget }: MailPopUpProps) {
          const { callApi } = useApi();
        //   const [mailTarget, setMailTarget] = useState<UserApiType | null>(null);
        //   const [mailForm, setMailForm] = useState<MailFormState>({ subject: "", message: "" });
          const [sendingMail, setSendingMail] = useState(false);


            const sendPersonalMail = async () => {
              if (!target) return;
              if (!form.subject.trim() || !form.message.trim()) {
                toast.error("Subject and message are required");
                return;
              }
              setSendingMail(true);
              const body = {
                email: target.email,
                userId: target.id,
                subject: form.subject.trim(),
                message: form.message.trim(),
              };
              const res = await callApi("POST", `/api/users/${target.id}/send-mail`, body);
              console.log("Mail API response:", res);
              console.log("Mail API request body:", body);
              setSendingMail(false);
              if (!res.success) {
                toast.error(typeof res.error === "string" ? res.error : "Failed to send personal email");
                return;
              }
              setTarget(null);
              setForm({ subject: "", message: "" });
              toast.success("Personal email sent");
            };
            
  return (
          <Dialog open={Boolean(target)} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Personal Mail</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
            />
            <textarea
              className="min-h-28 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2"
              placeholder="Write your message"
              value={form.message}
              onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setTarget(null)}>
                Cancel
              </Button>
              <Button onClick={() => void sendPersonalMail()} disabled={sendingMail}>
                {sendingMail ? "Sending..." : "Send Mail"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
  )
}
