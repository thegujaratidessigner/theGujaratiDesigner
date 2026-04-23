import AdminNav from "../_components/AdminNav";
import { readData } from "@/lib/db";
import type { WebsiteProject } from "../../_components/sections/portfolio/WebsitePortfolio";
import type { GraphicsProject } from "../../_components/sections/portfolio/GraphicsPortfolio";
import ProjectsManager from "./_client";

export default async function ProjectsPage() {
  const [websiteRes, graphicsRes] = await Promise.allSettled([
    readData<WebsiteProject[]>("projects-website.json"),
    readData<GraphicsProject[]>("projects-graphics.json"),
  ]);

  const websiteProjects = websiteRes.status === "fulfilled" ? websiteRes.value : [];
  const graphicsProjects = graphicsRes.status === "fulfilled" ? graphicsRes.value : [];

  return (
    <div className="flex min-h-screen">
      <AdminNav />
      <main className="ml-56 flex-1 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Portfolio</h1>
            <p className="text-sm text-white/40 mt-1">
              Manage website and graphics portfolio projects.
            </p>
          </div>
          <ProjectsManager
            initialWebsite={websiteProjects}
            initialGraphics={graphicsProjects}
          />
        </div>
      </main>
    </div>
  );
}
