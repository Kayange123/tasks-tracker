import { OrganizationSwitcher, auth } from "@clerk/nextjs";
const OrganizationPage = () => {
  const { organization } = auth();
  return <div>Organization page</div>;
};

export default OrganizationPage;
