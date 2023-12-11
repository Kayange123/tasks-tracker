import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { notFound, redirect } from "next/navigation";
import BoardNavbar from "./[boardId]/_components/BoardNavbar";

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
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {
  const { orgId } = auth();
  if (!orgId) redirect("/select-org");
  let board;
  try {
    board = await db.board.findUnique({
      where: {
        id: params?.boardId,
        orgId,
      },
    });
  } catch (error) {
    // throw BoardIdPageError();
  }

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar board={board} />
      <div className="bg-black/10 absolute inset-0" />
      <main className="w-full pt-8 relative">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
