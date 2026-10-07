import { Plus } from "lucide-react";
import Panel from "./Panel";
import Button from "../Button";

export default function QuickActions() {
  return (
    <Panel title="Quick Actions">
      <div className="flex flex-col gap-3">
        <Button href="/projects"><Plus size={16} /> Create Project</Button>
        <Button href="/tasks" variant="outline"><Plus size={16} /> Create Task</Button>
      </div>
    </Panel>
  );
}