


import type { GetServerSideProps, NextPage } from "next";
import { requireAdminPage } from "../../../lib/auth-guards";
// import { requireAdminPage } from "@/lib/auth-guards";

type Props = {
  currentUser: {
    id: string;
    name: string;
    email: string;
    role: "USER" | "ADMIN" | "AGENT";
  };
};

const AdminPropertiesPage: NextPage<Props> = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black">Properties</h1>
        <p className="mt-2 text-neutral-600">
          This is the protected properties area.
        </p>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = requireAdminPage;

export default AdminPropertiesPage;