-- CreateTable
CREATE TABLE "repos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "github_id" INTEGER NOT NULL,
    "node_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "owner_login" TEXT NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "owner_avatar_url" TEXT NOT NULL,
    "owner_html_url" TEXT NOT NULL,
    "html_url" TEXT NOT NULL,
    "description" TEXT,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "stargazers_count" INTEGER NOT NULL,
    "watchers_count" INTEGER NOT NULL,
    "language" TEXT,
    "forks_count" INTEGER NOT NULL,
    "open_issues_count" INTEGER NOT NULL,
    "license_key" TEXT,
    "license_name" TEXT,
    "topics" TEXT NOT NULL,
    "default_branch" TEXT NOT NULL,
    "subscribers_count" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "repos_github_id_key" ON "repos"("github_id");
