import { LayoutAnimation } from "react-native";

export const mailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

export const animation = {
  duration: 700,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.9,
  },
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.9,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.scaleXY,
    springDamping: 0.9,
  },
}

const BusinessCategories = {
  'Arts Culture & Entertainment': 'arts_culture_entertainment',
  'Auto Sales & Service': 'auto_sales_services',
  'Chiropractor': 'chiropractor',
  'Clothing Retail': 'clothing_retail',
  'Community Organizations': 'community_organizations',
  'Dentist': 'dentist',
  'Education': 'education',
  'Food Truck': 'food_truck',
  'General Health Practitioner': 'general_health_practitioner',
  'Health & Wellness': 'health_wellness',
  'Home Improvement': 'home_improvement',
  'Insurance': 'insurance',
  'Internet and Web Services': 'internet_web_services',
  'Legal Services': 'legal_services',
  'Lodging & Travel': 'lodging_Travel',
  'Pet Services': 'pet_services',
  'Real Estate': 'real_estate',
  'Restaurant': 'restaurant',
  'Sports & Recreation': 'sports_recreation',
  'Transportation': 'transportation',
}

export const fetchBusinessCategory = (categoryName) => {
  return BusinessCategories[categoryName]
}