
import { EmptyState } from "@/app/components/EmptyState";
import { ClientOnly } from "@/app/components/ClientOnly";

import { getCurrentUser}  from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import { PropertiesClient } from "./PropertiesClient";
import getListings from "../actions/getListings";

export default async function PropertiesPage () {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No properties found"
          subtitle="Looks like you hav no prperties."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
}