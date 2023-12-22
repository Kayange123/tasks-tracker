import { auth } from "@clerk/nextjs";
import { db } from "./prisma";
import { MAX_FREE_BOARDS } from "@/constants/boards";

export const incrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }
  try {
    const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });

    if (orgLimit) {
      await db.orgLimit.update({
        where: { orgId },
        data: { count: orgLimit.count + 1 },
      });
    } else {
      await db.orgLimit.create({ data: { orgId, count: 1 } });
    }
  } catch (error) {
    throw new Error("Failed to envoke");
  }
};

export const decrementAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }
};

export const hasAvailableCount = async () => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });

  if (!orgLimit || orgLimit.count < MAX_FREE_BOARDS) {
    return true;
  } else {
    return false;
  }
};
export const getAvailableCount = async (): Promise<number> => {
  const { orgId } = auth();

  if (!orgId) {
    throw new Error("Unauthorized");
  }

  const orgLimit = await db.orgLimit.findUnique({ where: { orgId } });

  if (orgLimit) {
    await db.orgLimit.update({
      where: { orgId },
      data: { count: orgLimit.count > 0 ? orgLimit.count - 1 : 0 },
    });
  } else {
    await db.orgLimit.create({ data: { orgId, count: 1 } });
  }

  if (!orgLimit) {
    return 0;
  }

  return orgLimit.count;
};
