import React, { memo } from 'react';
import { SafeAreaView, Pressable, ScrollView, Image, ImageBackground } from 'react-native';
import { View, Text } from 'react-native-ui-lib';
import { Colors, Images } from '@constants';

const AboutAccount = ({ navigation }) => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ backgroundColor: Colors.white }}>
        <View row centerV marginH-16 marginV-16 style={{ justifyContent: 'space-between' }}>
          <Pressable onPress={navigation.goBack} hitSlop={10}>
            <Image source={Images.back} style={{ height: 24, width: 24 }} />
          </Pressable>
          <Text fs16 lh24 center black >Terms and Conditions</Text>
          <View style={{ height: 24, width: 24 }} />
        </View>
      </View>
      <ScrollView contentContainerStyle={{ flexGrow: 1, backgroundColor: Colors.white }}>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Effective Date: August 15, 2021 </Text>
          <Text fs14 lh20 gray700 marginT-8>
            At Lealzy, LLC a Delaware limited liability company (with its Participating Business,
            “Lealzy,” “we”, “our”, or “us”), we are dedicated to providing our customers with
            outstanding customer service and uncompromising privacy protection. For this reason,
            we believe you should understand the terms of use that we have adopted to help us
            provide you with that level of service. Our Terms of Use establish your rights and
            obligations as a user of our Services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Binding Agreement </Text>
          <Text fs14 lh20 gray700 marginT-8>
            At Lealzy, we provide users with the ability to earn tokens and rewards (collectively,
            “Rewards”) from various participating merchants (each a “Participating Business”).
            Our website and mobile application and any of the services provided by Lealzy in
            connection with the website and/or mobile application, including all of the online
            products, templates, plans, features, capabilities, and service offered by Lealzy,
            (collectively herein referred to as the “Services”) are being provided to you expressly
            subject to these Terms of Use. Please read these Terms of Use carefully as they
            govern your use of the website, mobile application, Rewards and related services. By
            accessing our Services, you agree to be bound by these Terms of Use.
          </Text>
          <Text fs14B lh20 black marginT-8>
            PLEASE READ THE FOLLOWING TERMS AND CONDITIONS
            CAREFULLY, AS THESE TERMS OF USE REQUIRE YOU TO SUBMIT
            ARBITRATION TO RESOLVE ANY AND ALL DISPUTES BETWEEN YOU
            AND LEALZY AS WELL AS WAIVER OF RIGHTS.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> General Rules of User Conduct </Text>
          <Text fs14 lh20 gray700 marginT-8>
            It is our goal to make the use of our Services a good experience for all of our users. As
            such, by using our Services you hereby agree not to do any of the following:
          </Text>
          <View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >conduct or promote any illegal activities while using the Services;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >fail to comply with all Applicable laws while using our Services;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >post on or through the Services, or transmit to any other user or Lealzy
                employee, agent, or representative, any defamatory, inaccurate, abusive,
                obscene, profane, offensive, sexually oriented, threatening, harassing, racially
                offensive, or illegal material;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >post, distribute or reproduce in any way any copyrighted material, trademarks,
                or other proprietary information without obtaining the prior written consent of
                the owner of such proprietary rights;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >post, distribute, or reproduce any material that infringes or violates another
                party’s rights (including, but not limited to, intellectual property rights and
                rights of privacy and publicity)</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >attempt to reverse engineer or jeopardize the correct functioning of the
                Services, or otherwise attempt to derive the source code of the software
                (including the tools, methods, processes, and infrastructure) that enables or
                underlies our Services;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >attempt to gain access to secured portions of the Services to which you do not
                possess access rights;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >upload or transmit any form of virus, worm, Trojan horse, or other malicious
                code;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >seek any automatic or manual process to search or harvest information from the
                Services, or to interfere in any way with the proper functioning of the Services;</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >send junk or unsolicited mail or other communications, ‘phishing’ or
                ‘scamming’; or</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>{'\u2022'}</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >impersonate another user or provider.</Text>
            </View>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Credentials </Text>
          <Text fs14 lh20 gray700 marginT-8>
            When you create your account, you undertake to share the information required to
            process your orders as requested online, including, your surname, first name (or
            corporate name of your company), address, phone number, and valid email. This data
            shall be processed in accordance with our Privacy Policy, where we describe how we
            manage, process and store your data in the context of providing our Services. You are
            responsible for the consequences of false or inaccurate information you have shared
            with us.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You shall keep confidential and secure all credentials, User IDs and passwords
            associated with your account (including the master account and any attached sub-
            accounts), and to immediately notify us of any unauthorized use of your account, or of
            any theft or loss of credentials allowing access to the account. You agree not to
            provide your User ID or password to any unauthorized third party. Each account is
            personal and can only be accessed and used by you or the users duly authorized by
            you. You recognize and acknowledge that you may be liable for any unlawful,
            wrongful or fraudulent use of the account, and you shall indemnify and hold us
            harmless as set forth in these Terms of Use. We reserve the right to request proof of
            your identity or authority before granting access to your account.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You represent and warrant that all information submitted in connection with the
            establishment and use of your account will be accurate.
            You acknowledge any unauthorized use of credentials, User IDs or passwords by or
            on behalf of you will constitute a material breach of these Terms of Use.
          </Text>

        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Rewards </Text>
          <Text fs14 lh20 gray700 marginT-8>
            The rewards offered by each Participating Business is at their sole discretion. The
            rewards obtained from one Participating Business can be redeemed only from that
            particular Participating Business itself. Rewards from one Participating Business
            cannot be redeemed from another Participating Business or even from Lealzy,
            directly.
          </Text>
          <View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>1.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >You understand and agree that the administration, management and
                maintenance of Lealzy is bound by the Terms and Conditions of Lealzy. In case
                of any dispute regarding any offers made through Lealzy, it will be between
                you and the Participating Business and you agree that Lealzy, is not
                responsible, and shall have no liability to you, with respect to such offers.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>2.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Any use of the offers in violation of these terms of use will render the offers
                void, and Lealzy, will avail itself of any and all legal remedies available to it.
                Offers may not be reproduced and are void where prohibited or restricted by
                law.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>3.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, will not be responsible for the expiration or refusal of any Participating
                Business to honor their offers; however, we will use reasonable efforts to
                rectify the situation, to the extent possible.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>4.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy will not be responsible in the event that acts of God, fire casualties,
                illness, injury or other events beyond its control, prevent you from using any
                Rewards or accepting any offer.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>5.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Users must ensure that they have collected the appropriate number of Rewards
                to redeem against any offers listed. When you redeem an offer facilitated by the
                Lealzy Services, please note that the Participating Business, not Lealzy,
                processes your Reward redemption and fulfils your offer under their own terms.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>6.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, and its Participating Business will not interfere with redemptions
                arbitrarily, but we reserve the right to cancel or not process a redemption
                because of certain extenuating circumstances, such as when a redemption is no
                longer available or when we have reasonable cause to suspect that a redemption
                request may be fraudulent.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>7.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Each Participating Business have their own terms of use which may impact
                your ability to use your Rewards or accept any offers.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>8.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Each Participating Business runs offers on a contract basis. Lealzy will not be
                responsible for the loss of Rewards when a contract has expired and you can no
                longer redeem/collect Rewards at a Participating Business. While we do our
                best to ensure that the service is continued and you can redeem all of your
                Rewards we cannot be responsible for lost Rewards due to closure of
                businesses, expired contracts, or other events or circumstances outside of our
                control.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>9.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Rewards may not be cashed out or transferred into any other medium of
                exchange.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>10.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Rewards are nontransferable.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>11.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Redemption frequency is determined by the Participating Business.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>12.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Use of Rewards relating to alcoholic beverages is at the sole discretion of the
                Participating Business and is subject to compliance with applicable law.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>13.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Rewards cannot be combined with any other rewards, offers, vouchers, third-
                party certificates, coupons, or promotions, unless otherwise specified by the
                Participating Business.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>14.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Sale of any Reward is prohibited.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>15.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Rewards are void to the extent prohibited by law or not consistent with these
                Terms or any other restrictions imposed by the Rewards Provider.</Text>
            </View>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Competitions </Text>
          <View marginT-8>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>1.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Eligibility: The amount of Rewards collected per user shall be equal to or more
                than the declared required amount of Rewards needed for the subject
                competition.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>2.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Exceptions: Anyone found to be entered fraudulently will not be permitted to
                enter the competition.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>3.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Prize validity: Prizes shall be collected within no more than one week from the
                date of announcing the winner.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>4.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Prize winners will be officially notified by Lealzy, authorized staff using the
                customer information provided on your registration. Users are strongly advised
                to ensure that their contact information is updated.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>5.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, reserves the right to request winners to provide proof of identity of the
                winning candidate at the time of claiming the prizes</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>6.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, will never request the winners to pay any charges for claiming their
                prizes or ask for their personal identification numbers, bank account details and
                other important documents</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>7.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >By entering the competition, unless otherwise advised, each winner agrees that
                Lealzy may use their information and announce their win on the competition
                page of the Services, in any media for future promotional, marketing and
                publicity purposes without any further reference, payment or other
                compensation to the winner.</Text>
            </View>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black> Content </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You shall be solely and wholly liable (i) for any data, information or content, in
            particular the content of emails, SMS, other information or content sent by you
            through the Service, including if such content is provided by a third party, such as, but
            not limited to, an SMTP relay or via the routing of an entire infrastructure (the
            “Content”), and (ii) for the Content’s compliance with the regulations in force in
            accordance with these Terms of Use.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You acknowledge that we have the right, but not the obligation, to monitor the
            Services and any Content submitted. To comply with legal obligations in this respect,
            we may take any actions including, without limitation, removing Content or denying
            routing of certain data and emails that we reasonably believe are necessary to prevent
            unlawful activity in connection with the Services, but have no affirmative duty to so,
            as the affirmative duty rests solely with you.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You expressly acknowledge and agree that Lealzy shall not be liable for any loss or
            destruction of the Content and that you shall be responsible for ensuring that you have
            proper backups thereof.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy does not make any guarantee to the Services provided by third parties. Should
            any user determine to utilize, contribute, or invest in any Service, the user
            acknowledges that Lealzy has no control over the compliance with the proposed
            provider of the Service and cannot guarantee that such provider will honor any
            commitment made, nor the legality of the same.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Enrollment/Copyrights/Trademarks/Restrictions on Use </Text>
          <Text fs14 lh20 gray700 marginT-8>
            All of the pages and screens on the Services are owned and controlled by Lealzy,
            except as otherwise expressly stated, and are protected by U.S. copyright laws and
            international treaties. The copyrighted materials on our Services include, but are not
            limited to, the text, design, software, images, graphics, source code, and the content
            on the Services. You are authorized to view the information available on the Services
            for your informational purposes only. You may download copyrighted materials for
            your personal or internal business purposes only. You acknowledge that you do not
            acquire any ownership rights by downloading copyrighted material. Except as
            provided herein, you may not copy, display, distribute, transfer, link to, reproduce,
            license, frame, alter, create derivative works of or republish all or any portion of the
            Services for any commercial or public purpose without Lealzy’s prior written consent.
            You may not use, copy, display, distribute, modify or reproduce any of the trademarks
            found on the Services except as authorized in this paragraph. You may not use any
            Lealzy trademark as a link to our Services except pursuant to a written trademark
            license agreement.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            During your use of the Services, you shall have the nonexclusive, non-assignable,
            royalty free, worldwide limited right to use the Services solely for your personal use
            and subject to the terms herein and any other policies Lealzy may have, including,
            without limitation, its Privacy Policy. You are solely responsible for your compliance
            with these Terms of Use. You shall not acquire, herein, any license to use the Services
            in excess of the scope and/or duration of the Services. Upon the termination or expiry
            of the Services thereunder, your right to access or use the Services and the Services
            shall terminate.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            By posting, submitting, providing and/or otherwise making available any Content,
            you expressly grant, and represent that you have a right to grant, to Lealzy, a royalty-
            free, sub-licensable, perpetual, transferable, non-exclusive, worldwide license to use,
            sell, reproduce, adapt, translate, sublicense, publicly perform, publicly display, and
            make derivative works from and otherwise exploit, all such Content, in whole or in
            part, and in any form, media or technology, whether now known or hereafter
            developed, for the purposes of posting Content on the Lealzy Services, distributing
            such Content to in compliance with Applicable data privacy laws. This license
            continues even if you stop using the Services to the maximum extent permitted by
            Applicable laws.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You represent and warrant that you have the rights, power and authority necessary to
            grant the rights described in this section to Content that you submit, provide, make
            available or post, via the Services, that the use by Lealzy of Content will not violate
            any law or infringe the rights of any third party, and that the Content and any other
            information that you provide to Lealzy is legal, complete, legitimate, truthful and
            accurate.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Limited license </Text>
          <View marginT-8>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>1.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >You are granted a limited, non-exclusive, revocable and non-transferable
                license to utilize and access the Services pursuant to the requirements and
                restrictions of these Terms of Use. Lealzy, may change, suspend, or discontinue
                any aspect of the Services at any time. Lealzy, may also, without notice or
                liability, impose limits on certain features and services or restrict your access to
                all or portions of the Services.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>2.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >You shall have no rights to the proprietary software and related documentation,
                if any, provided to you in order to access the Services. Except as provided in
                the Terms of Use, you shall have no right to directly or indirectly, own, use,
                loan, sell, rent, lease, license, sub-license, assign, copy, translate, modify,
                adapt, improve, or create any new or derivative works from, or display,
                distribute, perform, or in any way exploit the Services, or any of its contents
                (including software) in whole or in part.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>3.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy Services stores and processes personal data that you have provided to
                us, in order to provide our Service. It’s your responsibility to keep your phone
                and access to the Services secure. We therefore recommend that you do not
                jailbreak or root your phone, which is the process of removing software
                restrictions and limitations imposed by the official operating system of your
                device. It could make your phone vulnerable to malware/viruses/malicious
                programs, compromise your phone’s security features and it could mean that
                the Services will not work properly or at all.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>4.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >You should be aware that there are certain things that Lealzy, will not take
                responsibility for, certain functions of the Services will require the Services to
                have an active internet connection. The connection can be Wi-Fi, or provided
                by your mobile network provider, However Lealzy, cannot take responsibility
                for the Services not working at full functionality if you don’t have access to
                Wi-Fi, and you don’t have any of your data allowance left.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>5.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >If you’re using the Services outside of an area with Wi-Fi, you should
                remember that your terms of the agreement with your mobile network provider
                will still apply. As a result, you may be charged by your mobile provider for
                the cost of data for the duration of the connection while accessing the Services,
                or other third party charges. In using the Services, you’re accepting
                responsibility for any such charges, including roaming data charges if you use
                the Services outside of your home territory (i.e. region or country) without
                turning off data roaming. If you are not the bill payer for the device on which
                you’re using the Services, please be aware that we assume that you have
                received permission from the bill payer for using the Services.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>6.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, cannot always take responsibility for the way you use the Services i.e.
                You need to make sure that your device stays charged – if it runs out of battery
                and you can’t turn it on to avail the Service, Lealzy, cannot accept
                responsibility. With respect to Lealzy’s responsibility for your use of the
                Services, when you’re using the Services, it’s important to bear in mind that
                although we endeavor to ensure that it is updated and correct at all times, we do
                rely on third parties to provide information to us so that we can make it
                available to you. Lealzy accepts no liability for any loss, direct or indirect, you
                experience as a result of relying wholly on this functionality of the Services.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>7.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >At some point, we may wish to update the Services. The Services are currently
                available on Android & iOS – the requirements for both systems (and for any
                additional systems we decide to extend the availability of the Services to) may
                change, and you’ll need to download the updates if you want to keep using the
                Services. Lealzy does not promise that it will always update the Services so that
                it is relevant to you and/or works with the Android & iOS version that you have
                installed on your device. However, you promise to always accept updates to the
                Application when offered to you, We may also wish to stop providing the
                Services, and may terminate use of it at any time without giving notice of
                termination to you. Unless we tell you otherwise, upon any termination, (a) the
                rights and licenses granted to you in these terms will end; (b) you must stop
                using the Services, and (if needed) delete it from your device.</Text>
            </View>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs16 lh24 black underline={true}> Featured Ads and Sponsored Content </Text>
          <View marginT-8>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>1.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy may offer sponsored content and featured ads as well as other paid
                services to its customers. This can include paid content links, featured ads and
                other digital marketing tools which may require information to be transmitted
                to a Third Party supplier.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>2.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, is not liable for these actions and or any use or terms of service
                imposed from the Third Party.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>3.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Lealzy, also makes no representation or guarantee as to the safety or security of
                the information transmitted to any Third Party, and your linking to any Third
                Party is completely at your own risk.</Text>
            </View>
            <View marginT-3 row>
              <Text fs14 lh20 gray700>4.</Text>
              <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >The Lealzy Services may contain advertisements and/or sponsorships. The
                advertisers and/or sponsors that provide these advertisements and sponsorships
                are solely responsible for insuring that the materials submitted for inclusion on
                the application are accurate and comply with all Applicable laws. Lealzy is not
                responsible for the acts or omissions of any advertiser or sponsor.</Text>
            </View>
          </View>
        </View>
        <View marginT-16 marginH-16>
          <Text fs14 lh20 black marginT-8>
            AS A USER OF THIS SERVICES, INCLUDING REWARD REDEMPTIONS, YOU
            UNDERSTAND AND AGREE THAT: (1) NEITHER LEALZY NOR ITS
            PARTICIPATING BUSINESS WILL HAVE ANY LIABILITY TO YOU OR
            OTHERS FOR ANY UNAUTHORIZED TRANSACTIONS MADE USING YOUR
            PASSWORD OR ACCOUNT; AND (2) THE UNAUTHORIZED USE OF YOUR
            PASSWORD OR ACCOUNT COULD CAUSE YOU TO INCUR LIABILITY TO
            BOTH LEALZY AND OTHER USERS
          </Text>
          <Text fs14 lh20 black marginT-8>
            Lealzy reserves the right to make changes to these terms and conditions at any time
            that are effective immediately upon posting on the Services. We may do this to ensure
            the Services are as useful and efficient as possible, we will note on this page when
            there are any changes and we advise you to check this page periodically. If you violate
            these Terms of Use, Lealzy may terminate your use of the Services, bar you from
            future use of the Services, and/or take Appropriate legal action against you.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Privacy </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Our Privacy Policy explains how we collect, use and disclose information that
            pertains to your privacy. The Privacy Policy forms part of our agreement with you and
            is incorporated in this Agreement by reference. For full details, please refer to our
            Privacy Policy.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Any communications between you and Lealzy, such as email or other correspondence,
            in which you offer suggestions or comments for improving or modifying our Services
            will be deemed by us to be non-confidential and non-proprietary, and you agree that
            such information may be used by us without any limitation whatsoever.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Links to Third Party Services </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Our Services may contain links to third party Services that are not owned, operated, or
            controlled by Lealzy. Therefore, we cannot and do not assume responsibility for the
            content, privacy policies, or practices of such Services or the companies that own
            them. Additionally, we cannot and will not censor or edit the content of any third
            party Services. By using our Services you expressly relieve us from any and all
            liability arising from your use of any third party Services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Third Party Products and Services </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy may from time to time promote or offer services and/or products of a third
            party. In no event shall Lealzy be liable for any incidental, indirect, special, incidental,
            exemplary, punitive or consequential damages arising out of your purchase, inability
            to purchase, or use of such third party services or products.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            All third parties who utilize the Services are solely responsible for compliance with
            these Terms of Use, Lealzy’s Privacy Policy, and all Applicable laws, including user
            privacy rights (i.e. CCPA, GDPR, etc.).
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Disclaimer </Text>
          <Text fs14 lh20 gray700 marginT-8>
            THE SERVICES ARE OFFERED ON AN “AS IS,” “WHERE IS” AND “WHERE
            AVAILABLE” BASIS, WITH NO WARRANTY OF ANY KIND-WHETHER
            EXPRESS, IMPLIED OR STATUTORY-INCLUDING, BUT NOT LIMITED TO,
            WARRANTIES OF TITLE OR THE IMPLIED WARRANTIES OF
            MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. THIS
            DOES NOT AFFECT THOSE WARRANTIES WHICH ARE INCAPABLE OF
            EXCLUSION, RESTRICTION OR MODIFICATION UNDER THE LAWS
            APPLICABLE TO THIS AGREEMENT.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            YOU ACKNOWLEDGE THAT NEITHER LEALZY NOR ANY OF ITS RESPECTIVE EMPLOYEES, AGENTS, THIRD PARTY CONTENT PROVIDERS OR LICENSORS WARRANT THAT THE SERVICES OR THE SERVICES WILL BE UNINTERRUPTED OR ERROR FREE; NOR DO THEY MAKE ANY WARRANTY AS TO THE RESULTS THAT MAY BE OBTAINED FROM USE OF THE SERVICES OR THE SERVICES, OR AS TO THE TIMELINESS, SEQUENCE, ACCURACY, RELIABILITY, COMPLETENESS OR CONTENT OF ANY INFORMATION, SERVICE, OR MERCHANDISE PROVIDED THROUGH THE SERVICES AND THE SERVICES. LEALZY DOES NOT ENDORSE PRODUCTS OR SERVICES APPEARING ON LINKED SERVICES OR PURCHASED VIA LINKED SERVICES (THIS DOES NOT AFFECT ANY MANUFACTURER’S WARRANTIES THAT THE PROVIDERS OF THE LINKED SERVICES OTHERWISE OFFER.)
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            EXCEPT AS SPECIFICALLY PROVIDED IN THIS AGREEMENT OR WHERE
            THE LAW REQUIRES A DIFFERENT STANDARD, YOU AGREE THAT
            LEALZY IS NOT RESPONSIBLE FOR ANY LOSS, PROPERTY DAMAGE OR
            BODILY INJURY, WHETHER CAUSED BY ACCESS TO OR USE OF THE
            SERVICES OR THE SERVICES. TO THE MAXIMUM EXTENT PERMISSIBLE
            UNDER APPLICABLE LAW, LEALZY SHALL NOT BE RESPONSIBLE TO
            YOU OR ANY THIRD PARTY CLAIMING THROUGH YOU FOR ANY DIRECT,
            INDIRECT, SPECIAL OR CONSEQUENTIAL, ECONOMIC OR OTHER
            DAMAGES ARISING IN ANY WAY OUT OF THE INSTALLATION OR USE OF
            THE SERVICES, THE SERVICES, ANY ON-LINE SERVICES OR INTERNET
            BROWSER SOFTWARE, INCLUDING LIABILITY ASSOCIATED WITH ANY
            COMPUTER VIRUSES WHICH MAY INFECT YOUR COMPUTER SYSTEM.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            THIS DISCLAIMER OF LIABILITY APPLIES TO ANY DAMAGES OR LOSS,
            INCLUDING BUT NOT LIMITED TO THOSE CAUSED BY ANY FAILURE OF
            PERFORMANCE, ERROR, OMISSION, INTERRUPTION, DELETION, DEFECT,
            DELAY IN OPERATION OR TRANSMISSION, COMPUTER VIRUS,
            COMMUNICATION LINE FAILURE, THEFT OR DESTRUCTION OR
            UNAUTHORIZED ACCESS TO, ALTERATION OF, OR USE OF
            INFORMATION, WHETHER CAUSED BY SOFTWARE, HARDWARE OR
            OTHERWISE, AND WHETHER FOR BREACH OF CONTRACT, TORT, STRICT
            LIABILITY, NEGLIGENCE, OR UNDER ANY OTHER CAUSE OF ACTION.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            ANY MATERIAL DOWNLOADED OR OTHERWISE OBTAINED FROM OR
            THROUGH THE USE OF OUR SERVICES OR THE SERVICES ARE DONE AT
            YOUR OWN DISCRETION AND RISK. YOU WILL BE SOLELY RESPONSIBLE
            FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR OTHER DEVICE OR
            FOR LOSS OF DATA THAT RESULTS FROM THE DOWNLOAD OF ANY
            SUCH MATERIAL. THE SERVICES MAY CONTAIN BUGS, ERRORS,
            PROBLEMS OR OTHER LIMITATIONS.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Section 230 of the U.S. Communications Decency Act (“CDA”) (and the equivalent
            or similar laws in your jurisdiction) is intended to exclude or limit the liability of
            online service providers such as Lealzy, when such online service providers provide
            or make available access to third party user generated content (see § 230 (c)(1) which
            states: “No provider or user of an interactive computer service shall be treated as the
            publisher or speaker of any information provided by another information content
            provider).” The decision by Lealzy to remove or not post or distribute any content,
            does not by itself amount to participation in the creation of such Content and,
            accordingly, does not constitute a waiver of the immunity afforded by the CDA.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Use by Children under the Age of 13 </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy is committed to complying fully with the Children’s Online Privacy Protection
            Act. Accordingly, if a user of this Services are under the age of thirteen, that user is
            not authorized to provide us with personally identifying information. Users under the
            age of thirteen and their parents or guardians are cautioned that the collection of
            personal information volunteered by unauthorized children online or by e-mail will be
            treated the same as information voluntarily given by an adult until Lealzy becomes
            aware that the user is under the age of thirteen. The Services are not directed at
            children under the age of 13. If you are younger than 13, please do not provide any
            personally identifying information in connection with your use of this Services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Access to Services </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You may establish one (1) authorized user account through which you will use and
            access the Services; provided that, you are at least eighteen (18) years old; provided,
            however, that if you are under the age of 18 or the age of majority in your jurisdiction,
            you must use the Services under the consent and supervision of your parent, legal
            guardian or responsible adult.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You authorize Lealzy to use your Content including, without limitation, a valid email
            address owned or controlled by you (“the User Information”) to communicate with
            third parties. You agree that any notices, agreements, disclosures or other
            communications that Lealzy sends to you electronically will satisfy any legal
            communication requirements, including, but not limited to, that such communications
            be in writing.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You consent to Lealzy’s use and disclosure of the Content solely in connection with
            its provision of the Services and in accordance with the terms herein.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Revisions to Terms of Use </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy reserves the right to revise these Terms of Use at any time without notice, but
            the most current version of the Terms of Use will always be available to you by
            clicking on the link at the bottom of the Services. If you find the Terms of Use
            unacceptable at any time, you should discontinue use of the Services. By continuing
            to access the Services after the date of any change to these Terms of Use, you agree to
            be bound by the rules contained in the most recent version of this Agreement.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Termination </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Lealzy may change or discontinue the Services or any of the Services at any time
            without prior notice. We reserve the right to terminate these Terms of Use at our
            election and for any reason, without prior notice, and these Terms of Use below. In
            the event of any termination, you will immediately cease access to the Services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Indemnification </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You agree to defend, indemnify and hold harmless Lealzy, Participating Businesses
            and their respective directors, officers, employees and agents from and against all
            claims, losses, damages, costs and expenses, including attorneys’ fees, arising out of
            your violation of these Terms of Use, Privacy Policy, or misuse of the Services or this
            Services or your account, including such violation or misuses conducted by your
            employees or agents, if applicable.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Governing Law </Text>
          <Text fs14 lh20 gray700 marginT-8>
            These Terms of Use constitute a contract between you and Lealzy governed by the
            laws of the State of New Jersey. Lealzy’s failure to insist upon or enforce strict
            performance of any provision of these Terms of Use shall not constitute a waiver of
            the provision. Neither a course of dealing or conduct between you and Lealzy nor any
            trade practices shall be deemed to modify these Terms of Use.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> General </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Subject, to Lealzy’s right to amend, which you have an affirmative obligation to keep
            Apprised of, these Terms of Use is the entire agreement between you and Lealzy and
            governs our relationship to the exclusion (to the extent permitted by law) of any other
            terms and conditions (other than those implied by law).
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Any reference to any legislation or legislative provision in these Terms of Use shall be
            construed as a reference to that legislation or provision as amended, re-enacted or
            extended at the relevant time.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You acknowledge and agree that you have not been induced to enter into these Terms
            of Use in reliance upon any representation or other promise of any nature whatsoever
            other than as expressly set out herein.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            These Terms of Use are binding on each party and their respective successors and
            assigns. You may not assign any rights herein without Lealzy’s written consent. No
            person other than Lealzy and you have any right to a benefit under, or to enforce the
            terms herein.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Any waiver under these Terms of Use must be in writing and signed by the waiving
            party. No delay, neglect or forbearance by either party in enforcing any provision
            herein shall be deemed to be a waiver or in any way prejudice any rights of that party.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Except as otherwise permitted in these Terms of Use, notices under these Terms of
            Use shall be in writing and shall be deemed to have been given (a) (5) business days
            after mailing if sent by registered or certified U.S. mail, (b) when transmitted if sent
            by facsimile or email, provided that a copy of the notice is promptly sent by another
            means specified in this section, or (c) when delivered if delivered personally or sent
            by express courier service. All notices shall be sent to you at the addresses provided
            by you at the time you register your information on the Services.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            if any provision of these Terms of Use is, or becomes, illegal, unenforceable or
            invalid, the provision must be treated for all purposes as severed from these Terms of
            Use without affecting the legality, enforceability or validity of the remaining
            provisions of these Terms of Use.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Any provision that by its nature should or implicitly should survive termination, shall
            survive termination of the parties relationship and the Services.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Legal Disputes Subject to Arbitration, Dispute Resolution, and Class Action Waiver </Text>
          <Text fs14B lh20 black marginT-8>
            PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL
            RIGHTS, INCLUDING YOUR RIGHT TO FILE A LAWSUIT IN COURT.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            This section is intended to be interpreted broadly and governs any and all disputes
            between us, including but not limited to claims arising out of or relating to any aspect
            of the relationship between us, whether based in contract, tort, statute, fraud,
            misrepresentation or any other legal theory; claims that arose before these Terms of
            Use or any prior agreement (including, but not limited to, claims related to
            interactions between users); and claims that may arise after the termination of these
            Terms of Use.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> You agree to resolve any and all disputes with Lealzy as follows: </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Pre-Arbitration Dispute Resolution: For any and all disputes, claims, or controversies
            you may have against Lealzy (“Disputes”), whether pursued in court or arbitration,
            you must first give us an opportunity to resolve the Dispute informally by contacting
            us through this link with the following information: (1) your name, (2) your address,
            (3) a written description of your claim, and (4) a description of the specific relief you
            seek. If we do not resolve the Dispute within forty-five (45) days after receiving your
            notification, then you may pursue resolution of the Dispute in arbitration. You may
            pursue your Dispute in a court only under the circumstances described below.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Arbitration Procedures </Text>
          <Text fs14 lh20 gray700 marginT-8>
            If the Dispute has not been resolved and is not subject to the exclusions provided
            above, then either party may initiate binding arbitration as the sole means to resolve
            all Disputes, subject to the terms set forth below.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            All Disputes shall be resolved before a single arbitrator in accordance with the JAMS
            Streamlined Arbitration Rules and Procedures for claims that do not exceed $250,000
            and the JAMS Comprehensive Arbitration Rules and Procedures for claims exceeding
            $250,000, in each case applying the rules and procedures in effect at the time the
            arbitration is initiated, excluding any rules or procedures governing or permitting class
            actions. You can find the JAMS rules and procedures here at this link:
            https://www.jamsadr.com/adr-rules-procedures/.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            To start an arbitration with JAMS, you must do the following: (1) write a Demand for
            Arbitration that includes a description of the claim and the amount of damages you
            seek to recover (you may find a copy of a Demand for Arbitration at
            www.jamsadr.com); (2) send three copies of the Demand for Arbitration, plus the
            Appropriate filing fee, to JAMS, NY Times Building, 620 8th Ave, 34th Floor, New
            York, NY 10018; and (3) send three copies of the Demand for Arbitration to Lealzy at
            NY Times Building, 620 8th Ave, 34th Floor, New York, NY 10018 , ATTN: Legal
            Department.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            You will be required to pay $250 to initiate an arbitration against us. If the arbitrator
            finds the arbitration to be non-frivolous, each party will pay an equal share of all other
            fees invoiced by JAMS, including filing fees and arbitrator and hearing expenses. You
            are responsible for your own attorneys’ fees unless the arbitration rules and/or
            Applicable law provide otherwise.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Location of Arbitration: If you live in the United States, you may initiate and litigate
            the arbitration in your hometown area or through the JAMS office located in New
            York, New York. If you live outside the United States, you must initiate and litigate
            the arbitration through the JAMS office located in New York, New York. Either party
            may ask that the arbitration, including the hearings, arguments, and all conferences, be
            conducted telephonically or by video conference (e.g., Skype).
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            The arbitrator, and not any federal, state, or local court or agency, shall have exclusive
            authority to resolve all disputes arising out of or relating to the interpretation,
            applicability, enforceability, or formation of these Terms of Use, the Privacy Policy or
            any additional policy of Lealzy, including but not limited to any claim that all or any
            part of such is void or voidable, whether a claim is subject to arbitration, or the
            question of waiver by litigation conduct. The arbitrator shall be empowered to grant
            whatever relief would be available in a court under law or in equity. The arbitrator’s
            award shall be written and shall be binding on the parties and may be entered in any
            court with jurisdiction.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            The parties understand that, absent this mandatory arbitration provision, they would
            have the right to sue in court and have a jury trial. They further understand that, in
            some instances, the costs of arbitration could exceed the costs of litigation and the
            right to discovery may be more limited in arbitration than in court.
          </Text>
          <Text fs14 lh20 gray700 marginT-8>
            CLASS ACTION WAIVER: The parties agree that the arbitration shall be conducted
            in their individual capacities only and not as a class action or other representative
            action, and the parties expressly waive their right to file a class action or seek relief on
            a class basis. THIS MEANS THAT YOU AND LEALZY AGREE THAT EACH
            MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR ITS
            INDIVIDUAL CAPACITY, AND NOT AS A LEAD OR REPRESENTATIVE
            CLASS PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS OR
            REPRESENTATIVE PROCEEDING. HOWEVER, THE PARTIES EXPRESSLY
            AGREE THAT SEPARATE INDIVIDUAL ARBITRATIONS SHALL BE
            CONSOLIDATED, UPON REQUEST BY EITHER PARTY, IF SUCH SEPARATE
            INDIVIDUAL ARBITRATIONS RELATE TO OR ARISE OUT OF THE SAME
            OR SUBSTANTIALLY THE SAME TRANSACTION(S) OR OCCURRENCE(S).
            CONSOLIDATION MEANS THAT ANY AND ALL SEPARATELY INITIATED
            ARBITRATIONS THAT RELATE TO OR ARISE OUT OF THE SAME OR
            SUBSTANTIALLY THE SAME TRANSACTION(S) OR OCCURRENCE(S) ARE
            ALL HEARD BY A SINGLE ARBITRATOR IN A SINGLE ARBITRATION. IF
            EITHER PARTY REQUESTS CONSOLIDATION OF MULTIPLE
            ARBITRATIONS, THEN THE PARTIES TO THE CONSOLIDATED CASE(S)
            WILL BE DEEMED TO HAVE WAIVED THEIR RIGHT TO DESIGNATE AN
            ARBITRATOR AS WELL AS ANY CONTRACTUAL PROVISION WITH
            RESPECT TO THE SERVICES OF THE ARBITRATION. THE FOLLOWING
            FACTORS MAY BE CONSIDERED IN REQUESTING A CONSOLIDATION OF
            ARBITRATIONS:
          </Text>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >The arbitrations have a common question of law or fact;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >The issues in the multiple arbitrations are largely identical;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >There are common claims, disputes, defenses, and relationships between or
              among the parties in the different arbitrations;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >One or more parties is named in multiple pending arbitrations;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >The arbitrations relate to the same campaign featured on Lealzy’s platform;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >Consolidation will save time and resources;</Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 gray700 style={{ paddingLeft: 5 }} >One party will be seriously prejudiced by having multiple arbitrations heard
              separately.</Text>
          </View>
          <Text fs14 lh20 gray700 marginT-8>
            By agreeing to these Terms, you are waiving your right to trial by jury or to
            participate in a class action. We are also waiving these rights.
          </Text>
        </View>
        <View marginT-16 marginH-16>
          <Text underline fs16 lh24 black> Exclusions from Arbitration </Text>
          <Text fs14 lh20 gray700 marginT-8>
            Intellectual Property and Small Claims Court Claims: Notwithstanding the parties’
            agreement to resolve Disputes through arbitration, either party may (1) bring
            enforcement actions, validity determinations or claims arising from or relating to
            misuse, infringement, or misappropriation of intellectual property theft, piracy or
            unauthorized use of intellectual property in state or federal court or in the U.S. Patent
            and Trademark Office to protect its intellectual property rights (“intellectual property
            rights” means patents, copyrights, moral rights, trademarks, and trade secrets, but not
            privacy or publicity rights); and/or (2) seek relief in a small claims court for disputes
            or claims within the scope of that court’s jurisdiction.
          </Text>
          <View marginT-24>
            <ImageBackground source={Images.lealzy} style={{ height: 100 }} resizeMode={'contain'} />
            <Text fs16SB black lh24 >  Support Local. Reward Local </Text>
            <Text fs14 black lh20 >  © 2022 Lealzy. All rights reserved. Powered by </Text>
            <Text fs14 black lh20 underline> Project 10K. </Text>

          </View>
          <View marginT-10 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 underline gray700 style={{ paddingLeft: 5, color: "#0000EE" }} > TERMS AND CONDITIONS </Text>
          </View>
          <View marginT-3 row>
            <Text fs14 lh20 gray700>{'\u2022'}</Text>
            <Text fs14 lh20 underline style={{ paddingLeft: 5, color: "#0000EE" }} >  PRIVACY POLICY </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView >
  );
}

export default memo(AboutAccount)
