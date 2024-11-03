-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_repos" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "github_id" TEXT NOT NULL,
    "node_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "owner_login" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
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
INSERT INTO "new_repos" ("created_at", "default_branch", "description", "forks_count", "full_name", "github_id", "html_url", "id", "language", "license_key", "license_name", "name", "node_id", "open_issues_count", "owner_avatar_url", "owner_html_url", "owner_id", "owner_login", "size", "stargazers_count", "subscribers_count", "topics", "url", "watchers_count") SELECT "created_at", "default_branch", "description", "forks_count", "full_name", "github_id", "html_url", "id", "language", "license_key", "license_name", "name", "node_id", "open_issues_count", "owner_avatar_url", "owner_html_url", "owner_id", "owner_login", "size", "stargazers_count", "subscribers_count", "topics", "url", "watchers_count" FROM "repos";
DROP TABLE "repos";
ALTER TABLE "new_repos" RENAME TO "repos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
