import { AmpTask } from "../types";

export default function AmpTable({ tasks }: { tasks: AmpTask[] }) {
  return (
    <div className="border rounded-xl overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-900">
          <tr>
            <th className="text-left p-3">Task</th>

            <th className="text-left p-3">Description</th>

            <th className="text-left p-3">Interval</th>

            <th className="text-left p-3">Due</th>

            <th className="text-left p-3">Status</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-t border-slate-800">
              <td className="p-3">{task.task_number}</td>

              <td className="p-3">{task.description}</td>

              <td className="p-3">{task.interval_hours} FH</td>

              <td className="p-3">{task.due_hours} FH</td>

              <td className="p-3">{task.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
