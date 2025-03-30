import { WorkflowsTable } from "./components/WorkflowsTable";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-300">
      <WorkflowsTable />
    </div>
  );
}
