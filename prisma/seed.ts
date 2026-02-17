import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminUser = await prisma.user.upsert({
    where: { email: "admin@occreva.local" },
    update: {
      name: "Admin User",
      updated_by: "system",
      deleted_at: null,
    },
    create: {
      email: "admin@occreva.local",
      name: "Admin User",
      created_by: "system",
      updated_by: "system",
    },
  });

  const workspace = await prisma.workspace.upsert({
    where: { id: "seed-workspace" },
    update: {
      name: "Occreva",
      updated_by: "system",
      deleted_at: null,
    },
    create: {
      id: "seed-workspace",
      name: "Occreva",
      created_by: "system",
      updated_by: "system",
    },
  });

  const roleCodes = ["ADMIN", "FINANCE", "PM", "TEAM_MEMBER", "CLIENT"] as const;

  const roles = await Promise.all(
    roleCodes.map((code) =>
      prisma.role.upsert({
        where: {
          workspace_id_code: {
            workspace_id: workspace.id,
            code,
          },
        },
        update: {
          name: code.replace("_", " "),
          updated_by: "system",
          deleted_at: null,
        },
        create: {
          workspace_id: workspace.id,
          code,
          name: code.replace("_", " "),
          created_by: "system",
          updated_by: "system",
        },
      }),
    ),
  );

  const adminRole = roles.find((role) => role.code === "ADMIN");
  if (!adminRole) {
    throw new Error("Missing ADMIN role");
  }

  await prisma.userWorkspace.upsert({
    where: {
      workspace_id_user_id: {
        workspace_id: workspace.id,
        user_id: adminUser.id,
      },
    },
    update: {
      role_id: adminRole.id,
      updated_by: "system",
      deleted_at: null,
    },
    create: {
      workspace_id: workspace.id,
      user_id: adminUser.id,
      role_id: adminRole.id,
      created_by: "system",
      updated_by: "system",
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
