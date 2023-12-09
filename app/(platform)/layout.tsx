import ToasterProvider from "@/Providers/ToasterProvider";
import { ClerkProvider } from "@clerk/nextjs";

const PlatformLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider>
      <ToasterProvider />
      {children}
    </ClerkProvider>
  );
};

export default PlatformLayout;
