import { useState } from "react";

import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footbar from "./Footbar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="layout">
      <nav className="nav">
        <Topbar setOpen={setSidebarOpen} />
      </nav>

      <aside>
        <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      </aside>

      <main className="main">{children}</main>

      <footer>
        <Footbar />
      </footer>
    </div>
  );
}
