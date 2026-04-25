import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  HiOutlineHomeModern,
  HiOutlineCalendarDays,
  HiOutlineInbox,
} from "react-icons/hi2";

import { requireAdminPage, type SerializableAppUser } from "@/lib/auth-guards";
import type {
  DashboardTab,
  DashboardTabKey,
  MetricItem,
  PropertyItem,
  KanbanColumn,
  ViewMode,
} from "@/types/admin-dashboard";
import DashboardHero from "@/components/admin/dashboard/DashboardHero";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/admin/dashboard/DashboardTopbar";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import MetricCard from "@/components/admin/dashboard/MetricCard";
import PropertyForm from "@/components/admin/properties/propertyForm";
import { getAdminDashboardData } from "@/lib/services/admin-dashboard.service";

type HeroStat = {
  label: string;
  value: string;
};

type Props = {
  currentUser: SerializableAppUser;
  propertyItems: PropertyItem[];
  propertyKanban: KanbanColumn[];
  propertyMetrics: MetricItem[];
  heroStats: HeroStat[];
};

const AdminDashboardPage: NextPage<Props> = ({
  currentUser,
  propertyItems,
  propertyKanban,
  propertyMetrics,
  heroStats,
}) => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<DashboardTabKey>("properties");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [searchValue, setSearchValue] = useState("");
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);

  useEffect(() => {
    const tab = router.query.tab;
    if (tab === "properties" || tab === "bookings" || tab === "contacts") {
      setActiveTab(tab);
    }
  }, [router.query.tab]);

  const dashboardTabs: DashboardTab[] = useMemo(
    () => [
      {
        key: "properties",
        label: "Properties",
        description: "Manage listings, statuses, and publishing workflow.",
        icon: <HiOutlineHomeModern className="text-[20px]" />,
        count: String(propertyItems.length),
      },
      {
        key: "bookings",
        label: "Bookings",
        description: "Track requests, approvals, and scheduling activities.",
        icon: <HiOutlineCalendarDays className="text-[20px]" />,
        count: "0",
      },
      {
        key: "contacts",
        label: "Contacts",
        description: "Review leads, inquiries, and communication pipeline.",
        icon: <HiOutlineInbox className="text-[20px]" />,
        count: "0",
      },
    ],
    [propertyItems]
  );

  const activeTabMeta = useMemo(() => {
    return dashboardTabs.find((tab) => tab.key === activeTab) ?? dashboardTabs[0];
  }, [dashboardTabs, activeTab]);

  const metrics = useMemo(() => {
    if (activeTab === "properties") return propertyMetrics;

    return [
      {
        title: "Total Items",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Active",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Pending",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
      {
        title: "Completed",
        value: "0",
        hint: "No database table connected yet",
        trend: "Live",
      },
    ];
  }, [activeTab, propertyMetrics]);

  const handleOpenCreate = () => {
    setIsAddPropertyOpen(true);
  };

  return (
    <>
      <main className="min-h-screen bg-[#F6F7FB] px-[30px] pb-[30px] pt-[30px]">
        <div className="w-full">
          <DashboardHero currentUser={currentUser} heroStats={heroStats} />

          <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
            <DashboardSidebar
              tabs={dashboardTabs}
              activeTab={activeTab}
              onChangeTab={setActiveTab}
            />

            <section className="min-w-0">
              <DashboardTopbar
                title={activeTabMeta?.label ?? "Dashboard"}
                description={activeTabMeta?.description ?? ""}
                viewMode={viewMode}
                onChangeView={setViewMode}
                searchValue={searchValue}
                onChangeSearch={setSearchValue}
                onCreateNew={handleOpenCreate}
                createLabel={activeTab === "properties" ? "Add Property" : "New Item"}
              />

              <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
                {metrics.map((metric) => (
                  <MetricCard key={metric.title} {...metric} />
                ))}
              </div>

              <div className="mt-6">
                <DashboardContent
                  activeTab={activeTab}
                  viewMode={viewMode}
                  searchValue={searchValue}
                  propertyItems={propertyItems}
                  propertyKanban={propertyKanban}
                />
              </div>
            </section>
          </div>
        </div>
      </main>

      <PropertyForm
        isOpen={isAddPropertyOpen}
        onClose={() => setIsAddPropertyOpen(false)}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const authResult = await requireAdminPage(ctx);

  if ("redirect" in authResult || "notFound" in authResult) {
    return authResult;
  }

  const dashboardData = await getAdminDashboardData();

  return {
    props: {
      ...(authResult.props as { currentUser: SerializableAppUser }),
      propertyItems: dashboardData.propertyItems,
      propertyKanban: dashboardData.propertyKanban,
      propertyMetrics: dashboardData.propertyMetrics,
      heroStats: dashboardData.heroStats,
    },
  };
};

export default AdminDashboardPage;