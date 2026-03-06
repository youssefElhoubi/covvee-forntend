import AuthenticatedLayout from "../components/layout/Layout";
import { MOCK_LAYOUT_PROJECT_DATA } from "../data/mockProjectData";

export function AuthenticatedLayoutDemo() {
  return (
    <AuthenticatedLayout projectData={MOCK_LAYOUT_PROJECT_DATA}>
      <div className="h-full p-6 text-slate-300">
        <h1 className="mb-2 text-xl font-semibold text-slate-100">Editor Surface</h1>
        <p className="max-w-xl text-sm leading-6 text-slate-400">
          This area receives your page content via the children prop. Replace this with routes,
          file preview panels, terminal output, or any authenticated app view.
        </p>
      </div>
    </AuthenticatedLayout>
  );
}
