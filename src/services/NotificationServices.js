import "@react-native-firebase/messaging";

const onGetRouteName = (notificationType) => {
  switch (notificationType) {
    case "reward":
      return "rewardDetails";
    case "credit":
      return "rewardDetails";
    case "debit":
      return "rewardDetails";
    case "offer":
      return "BusinessInfo";
    default:
      return "homeTab";
  }
};

export { onGetRouteName };
