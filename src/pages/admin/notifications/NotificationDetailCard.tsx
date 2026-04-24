import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Clock, 
  User, 
  Mail, 
  AlertCircle, 
//   CheckCircle2, 
  RefreshCcw 
} from "lucide-react";

interface NotificationData {
  id: string;
  recipientName: string;
  recipientId: number;
  fragment: string;
  sendTo: string;
  subject: string;
  retryCount: number;
  channelType: string;
  priority: number;
  status: string;
  payload: Record<string, unknown>;
  mailBody: Record<string, unknown>;
  failureReason: string;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

const NotificationDetailCard = ({ data }: { data: NotificationData }) => {
  
  // Helper to color-code status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "sent": return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "failed": return "bg-destructive/10 text-destructive hover:bg-destructive/20";
      case "pending": return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      default: return "secondary";
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-xl font-bold flex items-center gap-2">
            <Mail className="h-5 w-5 text-muted-foreground" />
            {data.subject || "Notification Details"}
          </CardTitle>
          <CardDescription className="font-mono text-xs uppercase tracking-wider">
            ID: {data.id}
          </CardDescription>
        </div>
        <Badge className={getStatusColor(data.status)} variant="outline">
          {data.status.toUpperCase()}
        </Badge>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Recipient & Channel Info */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span className="font-medium text-foreground">{data.recipientName}</span>
              <span className="text-xs">(#{data.recipientId})</span>
            </div>
            <div className="text-xs text-muted-foreground italic">
              Sent to: <span className="text-foreground">{data.sendTo}</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge variant="secondary">{data.channelType}</Badge>
            <div className="text-xs text-muted-foreground">
              Priority: <span className="font-bold text-foreground">{data.priority}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Metadata & Retries */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-bold">Retries</p>
            <p className="text-sm flex items-center justify-center gap-1">
              <RefreshCcw className="h-3 w-3" /> {data.retryCount}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-[10px] uppercase text-muted-foreground font-bold">Created At</p>
            <p className="text-sm truncate px-1">
              {new Date(data.createdAt).toLocaleString()}
            </p>
          </div>
              <div className="space-y-1 border-x">
            <p className="text-[10px] uppercase text-muted-foreground font-bold">Updated At</p>
            <p className="text-sm font-medium uppercase">{new Date(data.updatedAt).toLocaleString()}</p>
          </div>
        </div>

        {/* Error Message (Conditional) */}
        {data.failureReason && (
          <div className="bg-destructive/10 p-3 rounded-md border border-destructive/20 flex gap-2 items-start">
            <AlertCircle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
            <div className="text-xs text-destructive">
              <p className="font-bold">Failure Reason:</p>
              <p>{data.failureReason}</p>
            </div>
          </div>
        )}

        {/* JSON Payloads */}
        <div className="space-y-4">
          <div>
            <h4 className="text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-tight">
              Payload Data
            </h4>
            <ScrollArea className="h-32 w-full rounded-md border bg-slate-950 p-4">
              <pre className="text-xs text-slate-50 font-mono">
                {JSON.stringify(data.payload, null, 2)}
              </pre>
            </ScrollArea>
          </div>

          <div>
            <h4 className="text-xs font-bold mb-2 flex items-center gap-2 uppercase tracking-tight">
              Mail Body Content
            </h4>
            <ScrollArea className="h-32 w-full rounded-md border bg-slate-950 p-4">
              <pre className="text-xs text-slate-50 font-mono">
                {JSON.stringify(data.mailBody, null, 2)}
              </pre>
            </ScrollArea>
          </div>
        </div>

        <div className="flex justify-between items-center text-[10px] text-muted-foreground pt-2">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" /> Created: {new Date(data.createdAt).toLocaleString()}
          </div>
          <div>Updated: {new Date(data.updatedAt).toLocaleString()}</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationDetailCard;