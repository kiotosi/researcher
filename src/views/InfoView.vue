<script setup lang="ts">
import { open } from '@tauri-apps/api/shell'
interface LicenseListItem {
  title: string,
  link: string,
  licenseName: string
}

const licenseList: LicenseListItem[] = [
  {
    title: 'Vue',
    link: "https://opensource.org/licenses/MIT",
    licenseName: 'MIT'
  },
  {
    title: 'Material Icons',
    link: "https://github.com/google/material-design-icons/blob/master/LICENSE",
    licenseName: "Apache License 2.0"
  },
  {
    title: 'Open Doodles',
    link: 'https://creativecommons.org/publicdomain/zero/1.0/',
    licenseName: 'CC0 License'
  },
  {
    title: 'Twitter Twemoji',
    link: 'https://creativecommons.org/licenses/by/4.0/',
    licenseName: 'CC BY 4.0 License'
  },
  {
    title: "Raleway Font",
    link: "https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL",
    licenseName: "SIL Open Font License"
  },
  {
    title: "Jost Font",
    link: "https://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL",
    licenseName: "SIL Open Font License"
  },
]
</script>

<template>
  <div class="info">
    <div class="info__content">
      <!-- About -->
      <h1 class="info__title">
        {{ $t('info.title') }}
      </h1>
      <p class="info__text">
        {{ $t('info.about') }}
      </p>
      <p class="info__text">
        {{ $t('info.personalData') }}
      </p>

      <!-- License -->
      <h2 class="info__subtitle">
        {{ $t('info.license.title') }}
      </h2>
      <ul class="info__list license-list">
        <li
          v-for="(license, index) in licenseList"
          :key="index"
          class="license-list__item"
        >
          <span class="license-list__title">{{ license.title }}</span> —
          <div
            class="license-list__link"
            @click="open(license.link)"
          >
            {{ license.licenseName }}
          </div>
        </li>
      </ul>

      <!-- Privacy -->
      <h1 class="info__title">
        Privacy Policy
      </h1>
      <p class="info__text">
        At Researcher, accessible from Researcher app, one of our main priorities is the privacy of
        our visitors. This Privacy Policy document contains types of information that is collected and recorded by
        Researcher and how we use it.
      </p>
      <p class="info__text">
        If you have additional questions or require more information about our Privacy Policy, do
        not hesitate to contact us.
      </p>

      <h2 class="info__subtitle">
        Log Files
      </h2>
      <p class="info__text">
        Researcher follows a standard procedure of using log files. The information
        collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP),
        date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any
        information that is personally identifiable. The purpose of the information is for analyzing trends,
        administering the app, tracking users' movement on the app, and gathering demographic information.
      </p>

      
      <h2 class="info__subtitle">
        Privacy Policies
      </h2>
      <p class="info__text">
        You may consult this list to find the Privacy Policy for each of the advertising partners of
        Researcher.
      </p>
      <p class="info__text">
        Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web
        Beacons that are used in their respective advertisements and links that appear on Researcher, which are sent
        directly to users' browser. They automatically receive your IP address when this occurs. These technologies are
        used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content
        that you see on websites that you visit.
      </p>
      <p class="info__text">
        Note that Researcher has no access to or control over these cookies that are used by
        third-party advertisers.
      </p>

      <h2 class="info__subtitle">
        Third Party Privacy Policies
      </h2>
      <p class="info__text">
        Researcher's Privacy Policy does not apply to other advertisers or websites. Thus, we are
        advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed
        information. It may include their practices and instructions about how to opt-out of certain options.
      </p>
      <p class="info__text">
        You can choose to disable cookies through your individual browser options. To know more
        detailed information about cookie management with specific web browsers, it can be found at the browsers'
        respective websites.
      </p>

      <h2 class="info__subtitle">
        Children's Information
      </h2>
      <p class="info__text">
        Another part of our priority is adding protection for children while using the internet. We
        encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
      </p>
      <p class="info__text">
        Researcher does not knowingly collect any Personal Identifiable Information from children
        under the age of 13. If you think that your child provided this kind of information in our app, we strongly
        encourage you to contact us immediately and we will do our best efforts to promptly remove such information from
        our records.
      </p>

      <h2 class="info__subtitle">
        Consent
      </h2>
      <p class="info__text">
        By using our app, you hereby consent to our Privacy Policy and agree to its Terms and
        Conditions.
      </p>

      <!-- License -->
      <h1 class="info__title">
        License
      </h1>
      <p class="info__text">
        Researcher app is distributed under the license of <span
          class="info__link"
          @click="open('https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode')"
        >Attribution-NonCommercial-NoDerivatives 4.0 International</span>
      </p>

      <!-- Contributors -->
      <h1 class="info__title">
        Contributors
      </h1>
      <p class="info__text">
        <strong>nicknamekeeper</strong> — Main Developer
      </p>
    </div>

    <!-- Footer -->
    <footer class="info__footer footer">
      <div
        class="footer__emoji"
        title="Cats."
      >
        🐈 🐈‍⬛ 🐈 🐈‍⬛ <span
          class="footer__text_invisible"
          title="It's not a cat."
        >🥷</span>
      </div>
      <div class="footer__text">
        Coded by bunch of ninja-cats <span
          title="Who the hell is nicknamekeeper?"
          class="footer__text_invisible"
          @click="open('https://github.com/nicknamekeeper')"
        >with help of
          nicknamekeeper</span>
      </div>
    </footer>
  </div>
</template>

<style scoped lang="scss">
.info {
  user-select: none;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  &__content {
    padding: 36px 100px;
    position: relative;
  }

  &__subtitle {
    margin-top: 32px;
  }

  &__title:not(:first-child) {
    margin-top: 36px;
    line-height: 120%;
  }

  &__title+&__text {
    margin-top: 24px;
  }

  &__text {
    white-space: pre-wrap;
  }

  &__link {
    display: inline;
    color: var(--color-blue);
    cursor: pointer;

    &:hover {
      color: var(--color-blue-hover);
    }
  }
}

.license-list {
  margin-top: 24px;
  list-style-type: circle;
  padding-left: 24px;

  &__item+&__item {
    margin-top: 8px;
  }

  &__title {
    display: inline;
    font-weight: 600;
  }

  &__link {
    display: inline;
    color: var(--color-blue);
    cursor: pointer;

    &:hover {
      color: var(--color-blue-hover);
    }

  }
}

.footer {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: var(--color-normal-30);
  padding: 8px;
  font-weight: 400;
  justify-content: center;
  opacity: 0.5;
  cursor: default;

  &__text_invisible {
    opacity: 0.2;
  }
}
</style>
