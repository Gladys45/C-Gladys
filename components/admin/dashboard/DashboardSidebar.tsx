"use client";

import classNames from "classnames";
import type {
  DashboardTab,
  DashboardTabKey,
} from "@/types/admin-dashboard";
import { upgrades } from "@/data/admin-dashboard";

type DashboardSidebarProps = {
  tabs: DashboardTab[];
  activeTab: DashboardTabKey;
  onChangeTab: (tab: DashboardTabKey) => void;
};

export default function DashboardSidebar({
  tabs,
  activeTab,
  onChangeTab,
}: DashboardSidebarProps) {
  return (
    <aside className="rounded-[26px] border border-neutral-200 bg-white p-4 shadow-[0_10px_35px_rgba(0,0,0,0.05)]">
      <div className="border-b border-neutral-100 px-2 pb-4">
        <h2 className="text-lg font-semibold text-black">Workspace</h2>
        <p className="mt-1 text-sm text-neutral-500">
          Switch between dashboard sections.
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {tabs.map((tab) => {
          const active = activeTab === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => onChangeTab(tab.key)}
              className={classNames(
                "w-full rounded-2xl border px-4 py-4 text-left transition-all duration-200",
                active
                  ? "border-black bg-black text-white shadow-lg"
                  : "border-neutral-200 bg-white text-black hover:border-neutral-300 hover:bg-neutral-50"
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className={classNames(
                      "mt-0.5 rounded-xl p-2",
                      active ? "bg-white/10" : "bg-neutral-100"
                    )}
                  >
                    {tab.icon}
                  </div>

                  <div>
                    <h3 className="font-semibold">{tab.label}</h3>
                    <p
                      className={classNames(
                        "mt-1 text-xs leading-5",
                        active ? "text-white/70" : "text-neutral-500"
                      )}
                    >
                      {tab.description}
                    </p>
                  </div>
                </div>

                <span
                  className={classNames(
                    "rounded-full px-2.5 py-1 text-xs font-semibold",
                    active
                      ? "bg-white/10 text-white"
                      : "bg-neutral-100 text-neutral-700"
                  )}
                >
                  {tab.count}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-[#F8F8F8] p-4">
        <p className="text-sm font-semibold text-black">Next upgrades</p>
        <ul className="mt-3 space-y-2 text-sm text-neutral-600">
          {upgrades.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </aside>
  );
}