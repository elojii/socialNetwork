export const changeSettingsState = (changeUserName, changeUserAge, changeUserDescription, changing) => {
    changeUserName(changing.name);
    changeUserAge(changing.age);
    changeUserDescription(changing.description);
  };