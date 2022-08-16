import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';

const PrivacyPolicyAccount = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Privacy Policy</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 gray700> Effective Date: 08/12/22 </Text>
          <Text fs16 lh24 gray700> Last Updated: 08/12/22 </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy LLC (“Lealzy”) has created this privacy policy in order to demonstrate
            our commitment to your privacy. The following discloses our information
            gathering and dissemination practices relating to Lealzy’s websites, mobile
            applications, the delivery of our services and other interactions with you
            (collectively, the “Sites”). Please note that this privacy policy only applies to
            those Sites that post a link to this privacy policy, and when you access any
            external links from Lealzy’s Sites (including any Lealzy subsidiary Sites), such
            external websites may have different privacy policies from the Sites and
            Lealzy is not responsible for the privacy practices of such external websites.
            We encourage you to read all privacy policies posted on the web sites that
            you visit.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            In addition to reading this privacy policy, please review our Terms of Use,
            which governs your use of the Sites and our services. If you do not agree to
            our Terms of Use and the collection, use and sharing of your information as
            detailed in this privacy policy, please do not access or otherwise use the
            Sites.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Our practices are subject to applicable laws in the places in which we operate.
            This means that we engage in the practices described in this notice in a
            particular country or region only if permitted under the laws of those places.
            Please contact us at team@Lealzy.com with any questions regarding our
            practices in a particular country or region.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Information We Collect </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Information we collect includes both information you knowingly and actively
            provide us when using or participating in any of our services and promotions,
            and any information automatically sent by your devices in the course of
            accessing our products and services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Log Data </Text>
          <Text fs14 lh20 gray700 marginT-8>
            When you visit our website, our servers may automatically log the standard
            data provided by your web browser. It may include your device’s Internet
            Protocol (IP) address, your browser type and version, the pages you visit, the
            time and date of your visit, the time spent on each page, other details about
            your visit, and technical details that occur in conjunction with any errors you
            may encounter.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Please be aware that while this information may not be personally identifying
            by itself, it may be possible to combine it with other data to personally identify
            individual persons.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We may ask for personal information which may include one or more of the
            following:
          </Text>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Name</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Email</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Social media profiles</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Date of birth</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Phone/mobile number</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Home/mailing address</Text>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Legitimate Reasons for Processing Your Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We only collect and use your personal information when we have a legitimate
            reason for doing so. In which instance, we only collect personal information
            that is reasonably necessary to provide our services to you.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Use of Cookies </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We use “cookies” to collect information about you and your activity across our
            site. A cookie is a small piece of data that our website stores on your
            computer, and accesses each time you visit, so we can understand how you
            use our site. We may use cookies to personalize your interactions with our
            Sites. You do not have to accept our cookies and you may set your browser to
            restrict their use and you may delete them after they have been placed on
            your computer or mobile devices. If you do not accept or delete our cookies,
            some areas of our Sites may take more time to work, or may not function
            properly. Under the laws of certain countries, cookies may be served, as long
            as individuals have provided their consent, having been given clear and
            comprehensive information, in particular about the purposes for which their
            personal data will be processed. Effective consent may be provided by using
            your browser settings, as long as you take positive action. Before using
            Lealzy’s Sites, you are advised to check your current browser settings to
            ensure that the settings reflect your consent for Lealzy to place cookies on
            your devices.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Collection and Use of Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy may also collect additional information from your web browser each
            time you visit one of our Sites. We may collect information about the pages
            that you visit and the time spent on each web page or area of the Sites, the
            promotions or advertisements that you click on, and other actions that you
            take while using our Sites. This information may include your Internet Protocol
            (“IP”) address, the type of browser, the time that your browser was used to
            access our Sites, and the referring web site’s address. We may use Google
            Analytics, a web analytics service provided by Google, Inc. (“Google”), to help
            us analyze use of the Sites. For more information on how Google uses this
            data, go to www.google.com/policies/privacy/partners/.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We may collect personal information from you when you do any of the
            following on our website:
          </Text>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Use a mobile device or web browser to access our content</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Contact us via email, social media, or on any similar technologies</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >When you mention us on social media</Text>
          </View>
          <Text fs14 lh20 gray700 marginT-8>
            We may collect, hold, use, and disclose information for the following
            purposes, and personal information will not be further processed in a manner
            that is incompatible with these purposes:
          </Text>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >to enable you to customize or personalize your experience of our
              website</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >to contact and communicate with you</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >for analytics, market research, and business development, including to
              operate and improve our website, associated applications, and
              associated social media platforms</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >for advertising and marketing, including to send you promotional
              information about our products and services and information about third
              parties that we consider may be of interest to you</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >to enable you to access and use our website, associated applications,
              and associated social media platforms</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >for internal record keeping and administrative purposes</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >to comply with our legal obligations and resolve any disputes that we
              may have</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >for security and fraud prevention, and to ensure that our sites and apps
              are safe, secure, and used in line with our terms of use</Text>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Security of Your Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            When we collect and process personal information, and while we retain this
            information, we will protect it within commercially acceptable means to prevent
            loss and theft, as well as unauthorized access, disclosure, copying, use, or
            modification.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Although we will do our best to protect the personal information you provide to
            us, we advise that no method of electronic transmission or storage is 100%
            secure, and no one can guarantee absolute data security. We will comply with
            laws applicable to us in respect of any data breach.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You are responsible for selecting any password and its overall security
            strength, ensuring the security of your own information within the bounds of
            our services.
          </Text>
          <Text underline fs14 lh20 gray700 marginT-8>
            We do not sell, lease, or license your personal information to third parties.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We may share your personal information with service providers that provide
            certain services to us, including, without limitation, website hosting services,
            credit card processing, product promotions, order processing and shipping
            services, and visitor surveys. We take commercially reasonable steps to
            ensure these service provider adhere to the security standards we apply to
            your personal information and we prohibit them from using your information
            for their own marketing purposes.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy may also disclose your personal information as is necessary to: (a)
            comply with a subpoena or court order; (b) cooperate with law enforcement or
            other government agencies; (c) establish or exercise our legal rights; (d)
            protect the property or safety of our company and employees, contractors,
            vendors, suppliers, and customers; (e) defend against legal claims; (f) help
            with internal and external investigations; or (g) as otherwise required by law or
            permitted by law. We may disclose your information to others in connection
            with the sale, merger, acquisition or financing of a Lealzy company, or in
            connection with any transaction that involves the sale or assignment of some
            or all of our assets, including during the diligence process.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We reserve the right to provide non-personal information, such as aggregated
            data, to third parties.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> How Long We Keep Your Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We keep your personal information only for as long as we need to. This time
            period may depend on what we are using your information for, in accordance
            with this privacy policy. If your personal information is no longer required, we
            will delete it or make it anonymous by removing all details that identify you.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            However, if necessary, we may retain your personal information for our
            compliance with a legal, accounting, or reporting obligation or for archiving
            purposes in the public interest, scientific, or historical research purposes or
            statistical purposes.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Children’s Privacy </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We do not aim any of our products or services directly at children under the
            age of 18, and we do not knowingly collect personal information about
            children under 18.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Notice to California Residents </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If you are a California resident, please email us at team@Lealzy.com for
            additional information about your privacy rights.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Residents of California may also, under §1798.83, known as the “Shine The
            Light” law, request and obtain from us, once a year and free of charge,
            information about categories of personal information (if any) we disclosed to
            our affiliates for direct marketing purposes and the number of affiliates with
            which we shared personal information in the immediately preceding calendar
            year. As stated above, we do not sell your personal information to third
            parties. If you are a California resident and would like to make such a request,
            please submit your request and identify that you are requesting information
            under “Shine The Light” and send the request in writing to us at
            team@Lealzy.com.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> International Transfers of Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            The personal information we collect is stored and/or processed where we or
            our partners, affiliates, and third-party providers maintain facilities. Please be
            aware that the locations to which we store, process, or transfer your personal
            information may not have the same data protection laws as the country in
            which you initially provided the information. If we transfer your personal
            information to third parties in other countries: (i) we will perform those
            transfers in accordance with the requirements of applicable law; and (ii) we
            will protect the transferred personal information in accordance with this
            privacy policy.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Your Rights and Controlling Your Personal Information </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You always retain the right to withhold personal information from us, with the
            understanding that your experience of our website may be affected. We will
            not discriminate against you for exercising any of your rights over your
            personal information. If you do provide us with personal information you
            understand that we will collect, hold, use and disclose it in accordance with
            this privacy policy. You retain the right to request details of any personal
            information we hold about you.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If we receive personal information about you from a third party, we will protect
            it as set out in this privacy policy. If you are a third party providing personal
            information about somebody else, you represent and warrant that you have
            such person’s consent to provide the personal information to us.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If you have previously agreed to us using your personal information for direct
            marketing purposes, you may change your mind at any time. We will provide
            you with the ability to unsubscribe from our email-database or opt out of
            communications. Please be aware we may need to request specific
            information from you to help us confirm your identity.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If you believe that any information we hold about you is inaccurate, out of
            date, incomplete, irrelevant, or misleading, please contact us using the details
            provided in this privacy policy. We will take reasonable steps to correct any
            information found to be inaccurate, incomplete, misleading, or out of date.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If you believe that we have breached a relevant data protection law and wish
            to make a complaint, please contact us using the details below and provide us
            with full details of the alleged breach. We will promptly investigate your
            complaint and respond to you, in writing, setting out the outcome of our
            investigation and the steps we will take to deal with your complaint. You also
            have the right to contact a regulatory body or data protection authority in
            relation to your complaint.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Limits of Our Policy </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Our website may link to external sites that are not operated by us. Please be
            aware that we have no control over the content and policies of those sites,
            and cannot accept responsibility or liability for their respective privacy
            practices.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Changes to This Policy </Text>
          <Text fs14 lh20 gray700 marginT-8>
            We may occasionally update this notice. If we make significant changes, we
            may notify users in advance of the changes through the Lealzy app or through
            email. We encourage users to periodically review this notice for the latest
            information on our privacy practices.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Use of our services after an update constitutes consent to the updated notice
            to the extent permitted by law.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Contact Us </Text>
          <Text fs14 lh20 gray700 marginT-8>
            For any questions or concerns regarding your privacy, you may contact us at
            team@Lealzy.com.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(PrivacyPolicyAccount)
