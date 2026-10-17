import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (import.meta.env.DEV) {
        return (
          <div className="p-6 bg-red-50 border border-red-200 text-red-800 rounded-lg">
            <h2 className="text-lg font-bold mb-2">Terjadi Kesalahan (Dev Only)</h2>
            <p className="font-mono text-sm">{this.state.error?.message}</p>
          </div>
        );
      }
      return (
        <div className="p-6 bg-gray-50 text-gray-700 rounded-lg text-center">
          <h2 className="text-lg font-bold mb-2">Terjadi Kesalahan</h2>
          <p>Mohon muat ulang halaman atau hubungi administrator.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
