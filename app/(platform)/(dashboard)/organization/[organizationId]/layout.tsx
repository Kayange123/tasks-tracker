import OrganizationControl from "./_components/OrganizationControl";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <OrganizationControl />
      {children}
    </div>
  );
};

export default OrganizationIdLayout;
