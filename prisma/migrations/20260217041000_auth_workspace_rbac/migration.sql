-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "workspace_id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" TEXT NOT NULL,
    "updated_by" TEXT NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- We assume bootstrap state has no prior UserWorkspace rows.
ALTER TABLE "UserWorkspace" DROP COLUMN "role";
ALTER TABLE "UserWorkspace" ADD COLUMN "role_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Role_workspace_id_code_key" ON "Role"("workspace_id", "code");
CREATE INDEX "Role_workspace_id_idx" ON "Role"("workspace_id");
CREATE INDEX "UserWorkspace_workspace_id_role_id_idx" ON "UserWorkspace"("workspace_id", "role_id");

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_workspace_id_fkey" FOREIGN KEY ("workspace_id") REFERENCES "Workspace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "UserWorkspace" ADD CONSTRAINT "UserWorkspace_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
