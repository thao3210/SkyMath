import React from "react";

import UserAchievement from "./UserAchievement/user";
import SearchAchievement from "./SearchAchievement/search";
import TableAchievement from "./TableAllAchievement/table";

function AchievementPage() {
  return (
    <body className="w-100">
      <UserAchievement />
      <SearchAchievement />
      <TableAchievement/>
    </body>
  );
}

export default AchievementPage;
