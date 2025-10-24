import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main content area (3/4 width) */}
        <main className="lg:col-span-3">{children}</main>

        {/* Sidebar (1/4 width) */}
        <aside className="hidden lg:block bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Sidebar</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:text-blue-600 cursor-pointer">Category 1</li>
            <li className="hover:text-blue-600 cursor-pointer">Category 2</li>
            <li className="hover:text-blue-600 cursor-pointer">Category 3</li>
            <li className="hover:text-blue-600 cursor-pointer">Category 4</li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Layout;
