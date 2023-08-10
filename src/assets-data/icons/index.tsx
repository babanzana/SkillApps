import { Icon, useTheme } from "@ui-kitten/components";
import { ImageProps } from "react-native-svg";

export const HomeIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="home-outline" />;
};
export const HomeIconSelected = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="home" />;
};
export const OrdersIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="cube-outline" />;
};
export const OrdersIconSelected = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="cube" />;
};

export const PromosIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="gift-outline" />;
};
export const PromosIconSelected = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="gift" />;
};

export const AccountIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="person-outline" />;
};
export const AccountIconSelected = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="person" />;
};

export const SearchIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="search-outline" />;
};

export const WAIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="message-circle" />;
};

export const FilterIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="options-2-outline" />;
};

export const PlusIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="plus" />;
};

export const PlusOutlineIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="plus-circle-outline" />
);

export const MinusIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="minus-outline" />
);

export const BackIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="arrow-back" />
);

export const SaveIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="save" />
);

export const ArrowBackIcon = (props: Partial<ImageProps> | undefined) => {
  // console.log("propsss: ", props);
  return <Icon {...props} name="arrow-back-outline" />;
};

export const CorrectIconOutline = (props: Partial<ImageProps> | undefined) => {
  // console.log("propsss: ", props);
  return <Icon {...props} name="checkmark-circle-2-outline" />;
};

export const CorrectIcon = (props: Partial<ImageProps> | undefined) => {
  // console.log("propsss: ", props);
  return <Icon {...props} name="checkmark-circle" />;
};

export const MapIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="map-outline" />;
};

export const BookmarkIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="bookmark" />;
};

export const CurrentLocationIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="shake-outline" />;
};

export const LocationIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="radio-button-on" />;
};

export const PinLocationIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="pin-outline" />;
};
export const EditIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="edit" />;
};

export const QuestionIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="question-mark-outline" />;
};
export const ClockIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="clock-outline" />;
};
export const AddNotesIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="file-add-outline" />;
};
export const CloseIcon = (props: Partial<ImageProps> | undefined) => {
  return <Icon {...props} name="close-outline" />;
};

export const CalendarIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="calendar" />
);
export const FlashIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="flash-outline" />
);
export const RightIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="chevron-right-outline" />
);

export const MessageIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="message-square" />
);

export const CallIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="phone" />
);
export const CopyIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="copy" />
);
export const CopyOutlineIcon = (props: Partial<ImageProps> | undefined) => (
  <Icon {...props} name="copy-outline" />
);

import React from "react";
import { StyleSheet } from "react-native";

export const CartIcon = () => {
  return (
    <Icon
      style={styles.icon}
      fill={useTheme()["text-basic-color"]}
      name="shopping-bag-outline"
    />
  );
};

export const LineIcon = () => {
  return (
    <Icon
      style={styles.mediumIcon}
      fill={useTheme()["color-primary-hover"]}
      name="minus-outline"
    />
  );
};

export const CloseIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      name="close-outline"
      fill={useTheme()["color-white"]}
    />
  );
};
export const EditIconOnly = () => {
  return (
    <Icon style={styles.icon} name="edit" fill={useTheme()["color-white"]} />
  );
};

export const CalendarIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      name="calendar"
      fill={useTheme()["color-white"]}
    />
  );
};

export const KeyboardIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      name="keypad-outline"
      fill={useTheme()["color-primary-900"]}
    />
  );
};
export const ClockIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      name="clock-outline"
      fill={useTheme()["color-primary-900"]}
    />
  );
};

export const CashIcon = () => {
  return (
    <Icon
      style={styles.mediumIcon}
      fill={useTheme()["color-success-500"]}
      name="credit-card-outline"
    />
  );
};
export const CopyIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      fill={useTheme()["text-basic-color"]}
      name="copy"
    />
  );
};
export const ProfileIconOnly = (props: any) => {
  return (
    <Icon
      style={styles.icon}
      fill={useTheme()["background-basic-color-1"]}
      name="person"
      {...props}
    />
  );
};

export const LocationIconOnly = () => {
  return (
    <Icon
      style={styles.mediumIcon}
      fill={useTheme()["color-primary-default"]}
      name="pin"
    />
  );
};
export const DriverIconOnly = () => {
  return (
    <Icon
      style={styles.mediumIcon}
      fill={useTheme()["color-info-default"]}
      name="car"
    />
  );
};
export const OutletIconOnly = () => {
  return (
    <Icon
      style={styles.mediumIcon}
      fill={useTheme()["color-danger-default"]}
      name="radio-button-on"
    />
  );
};
export const DotIconOnly = () => {
  return (
    <Icon
      style={styles.smallIcon}
      fill={useTheme()["text-hint-color"]}
      name="radio-button-off"
    />
  );
};

export const EyeCloseIcon = () => {
  return (
    <Icon
      style={styles.icon}
      name="eye-off-outline"
      fill={useTheme()["text-hint-color"]}
    />
  );
};
export const EyeIcon = () => {
  return (
    <Icon
      style={styles.icon}
      name="eye-outline"
      fill={useTheme()["text-hint-color"]}
    />
  );
};

export const ArrowBackIconOnly = () => {
  return (
    <Icon
      style={styles.icon}
      name="arrow-back-outline"
      fill={useTheme()["text-basic-color"]}
    />
  );
};
// coba-coba
export const ArrowUpIcon = (props: Partial<ImageProps> | undefined) => {
  return (
    <Icon
      {...props}
      style={styles.icon}
      name="arrow-ios-upward-outline"
      fill={useTheme()["text-basic-color"]}
    />
  );
};

export const ArrowDownIcon = (props: Partial<ImageProps> | undefined) => {
  return (
    <Icon
      {...props}
      style={styles.icon}
      name="arrow-ios-downward-outline"
      fill={useTheme()["text-basic-color"]}
    />
  );
};

export const Trash2Icon = (props: Partial<ImageProps> | undefined) => {
  return (
    <Icon
      {...props}
      style={styles.midIcon}
      name="trash-2-outline"
      fill={useTheme()["text-basic-color"]}
    />
  );
};

export const Edit2Icon = (props: Partial<ImageProps> | undefined) => {
  return (
    <Icon
      {...props}
      style={styles.midIcon}
      name="edit-2-outline"
      fill={useTheme()["text-basic-color"]}
    />
  );
};

export const BulletIcon = (props: Partial<ImageProps> | undefined) => {
  return (
    <Icon
      {...props}
      style={styles.smallIcon}
      name="radio-button-on"
      fill={useTheme()["text-basic-color"]}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
  },
  smallIcon: {
    width: 5,
    height: 5,
  },
  mediumIcon: {
    width: 30,
    height: 30,
  },
  largeIcon: {
    width: 40,
    height: 40,
  },
  midIcon: {
    width: 15,
    height: 15,
  },
  smallMidIcon: {
    width: 10,
    height: 10,
  },

  // cashIcon: {
  //   width: 30,
  //   height: 30,
  // },
  // profileIcon: {
  //   width: 25,
  //   height: 25,
  // },
});
