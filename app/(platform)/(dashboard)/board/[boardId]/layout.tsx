import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import BoardNavbar from "./_components/BoardNavbar";
import { Board } from "@prisma/client";

export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {
  const { orgId } = auth();
  if (!orgId) {
    return { title: "Board" };
  }
  const board = await db.board.findUnique({
    where: {
      id: params?.boardId,
      orgId,
    },
  });
  return { title: board?.title || "Board" };
}

const BoardIdLayout = async ({
  children,
  params: { boardId },
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");
  if (!boardId) redirect(`/organization/${orgId}`);

  let board: Board | null = null;
  try {
    board = await db.board.findUnique({
      where: {
        id: boardId,
        orgId,
      },
    });
  } catch (error) {
    // throw BoardIdPageError();
  }

  setTimeout(() => {
    if (!board) {
      redirect(`/organization/${orgId}`);
    }
  }, 1000);

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board?.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className="bg-black/10 absolute inset-0" />
      <main className="w-full pt-8 relative">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
