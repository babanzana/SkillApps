import {
  TopNavigation,
  TopNavigationAction,
  useTheme,
  Divider,
} from "@ui-kitten/components";
import { BackIcon } from "../assets-data/icons";
import { INDIGO_1 } from "./color-databsae.component";

export const HeaderBar = (props: any) => {
  const { title, handleGoBack } = props;
  const theme = useTheme();
  const renderBackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={handleGoBack} />
  );
  return (
    <>
      <TopNavigation
        title={title}
        accessoryLeft={renderBackAction}
        style={{
          backgroundColor: INDIGO_1,
        }}
      />

      <Divider
        style={{
          height: 2,
          backgroundColor: theme["background-basic-color-1"],
          marginBottom: 10,
        }}
      />
    </>
  );
};
