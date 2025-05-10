"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VoterManagement } from "@/components/admin/VoterManagement";
import { CandidateManagement } from "@/components/admin/CandidateManagement";

export default function AdminPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Tabs defaultValue="voters" className="w-full">
        <TabsList>
          <TabsTrigger value="voters">Voter Management</TabsTrigger>
          <TabsTrigger value="candidates">Candidate Management</TabsTrigger>
        </TabsList>
        <TabsContent value="voters">
          <VoterManagement />
        </TabsContent>
        <TabsContent value="candidates">
          <CandidateManagement />
        </TabsContent>
      </Tabs>
    </div>
  );
}