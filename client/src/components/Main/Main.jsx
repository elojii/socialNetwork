import { Route, Routes } from "react-router-dom";
import { Dialogs } from "../Dialogs/Dialogs";
import { AllFriendPosts } from "../Profile/AllFriendPosts/AllFriendPosts";
import { Profile } from "../Profile/Profile";
import { Settings } from "../Profile/Settings/Settings";
import { useActions } from "../../hooks/useActions";
export const Main = ({ themeOfSite, user }) => {
  const FILESTACK_API_KEY = "AGMuxgomTTEyezPLlV9Qfz";
  const client = filestack.init(FILESTACK_API_KEY);
  const { changePfp } = useActions();
  const openFileFolder = () => {
    const picker = client.picker({
      onUploadDone: (data) => {
        const fileData = data.filesUploaded[0];
        const fileURL = fileData.url;
        changePfp(fileURL);
      },
    });
    picker.open();
  };

  return (
    <>
      <Routes>
        <Route
          path="profile"
          element={<Profile themeOfSite={themeOfSite} user={user} />}
        ></Route>
        <Route path="posts" element={<AllFriendPosts user={user} />}></Route>
        <Route
          path="settings"
          element={
            <Settings
              openFileFolder={openFileFolder}
              themeOfSite={themeOfSite}
              user={user}
            />
          }
        ></Route>
        <Route
          path="dialogs/*"
          element={<Dialogs themeOfSite={themeOfSite} />}
        ></Route>
      </Routes>
    </>
  );
};
