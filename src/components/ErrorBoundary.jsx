import { Component } from 'react';
import { AlertOctagon, RotateCcw } from 'lucide-react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-6 text-center dark:bg-slate-900">
          <div className="rounded-full bg-red-100 p-3 dark:bg-red-900/40">
            <AlertOctagon className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
            មានបញ្ហាកើតឡើង
          </h1>
          <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            កម្មវិធីជួបបញ្ហាមិនបានរំពឹងទុក។ សូមសាកល្បង Reload ទំព័រ
            ឬចុចប៊ូតុងខាងក្រោម។
          </p>
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={this.handleReset}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              សាកល្បងម្តងទៀត
            </button>
            <button
              type="button"
              onClick={this.handleReload}
              className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              <RotateCcw className="h-4 w-4" />
              Reload ទំព័រ
            </button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-4 max-w-md overflow-x-auto rounded-lg bg-slate-100 p-3 text-left text-xs text-red-600 dark:bg-slate-800 dark:text-red-400">
              {this.state.error.toString()}
            </pre>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
