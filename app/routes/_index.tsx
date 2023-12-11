import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import LinkComponent from "~/components/Link/Link";
import i18next from "~/i18next.server";


import styles from "~/styles/home.css";

export const links: LinksFunction = () => (
  [
    { rel: 'stylesheet', href: styles },
  ]
);

export async function loader({ request }: LoaderFunctionArgs) {
  let locale = await i18next.getLocale(request);
  return json({ locale });
}

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export default function Index() {
  // Get the locale from the loader
  let { locale } = useLoaderData<typeof loader>();

  let { t } = useTranslation();

  return (
    <main id="content">
      <h1>A better way ofkeeping track of your notes</h1>
      <h2>{t('greeting')} - {locale}</h2>
      <p>Lorem ipsu   m dolor sit amet consectetur!</p>
      <p id="cta">
        <LinkComponent />
      </p>
    </main>
  );
}

