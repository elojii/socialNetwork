import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { authActions } from "../store/authReducer";
import { userActions } from "../store/userReducer";
import { isLoadingActions } from "../store/IsLoadingReducer";
import { flagForDialogActions } from "../store/flagForDialogReducer";
import { themeActions } from "../store/themeReducer";
import { userInfoActions } from "../store/userInfoReducer";
import { postsActions } from "../store/postsReducer";
import { friendPostsActions } from "../store/FriendPosts";

const actions = {
    ...authActions,
    ...userActions,
    ...isLoadingActions,
    ...flagForDialogActions,
    ...themeActions,
    ...userInfoActions,
    ...postsActions,
    ...friendPostsActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(actions, dispatch)
}