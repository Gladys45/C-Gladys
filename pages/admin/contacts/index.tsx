
import type { GetServerSideProps, NextPage } from "next";
// import { requireAdminPage } from "@/lib/auth-guards";

import { requireAdminPage } from "../../../lib/auth-guards";


const AdminContactsPage: NextPage = () => {
  return (
    <main className="min-h-screen bg-[#FAFAFA] pt-32 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-black">Contacts</h1>
        <p className="mt-2 text-neutral-600">
          This is the protected contacts area.
        </p>
      </div>
    </main>
  );
};

export const getServerSideProps: GetServerSideProps = requireAdminPage;

export default AdminContactsPage;