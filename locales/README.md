# locales – one directory per language

```
locales/
  en/  ui.json widget.json banner.json nav.json pages.json   + content/ (long-form English: tools, guides, legal)
  es/  ui.json widget.json banner.json nav.json pages.json sections.json legal.json howto.json   (full language)
  ja/  ui.json widget.json banner.json nav.json pages.json sections.json                         (home-only language)
  ...
```

| File | Content |
| --- | --- |
| `ui.json` | Converter and page chrome strings |
| `widget.json` | Converter messages (errors, PDF options, …) |
| `banner.json` | Cookie notice |
| `nav.json` | Footer / legal labels |
| `pages.json` | Title, description, H1, FAQs, comparison table per route (`"/"`, `"/heic-to-jpg"`, …) |
| `sections.json` | Long-form home page copy |
| `legal.json`, `howto.json` | Privacy/terms/about/contact and the how-to steps (full languages only) |

URL layout: every language is a directory (`/es/…`, `/ja/…`); English is served from the same
tree without a prefix (`next.config.mjs` rewrites) so existing URLs did not change.

## Add a language
1. Copy `locales/ko` to `locales/<id>` and translate every value.
2. Register it in `src/i18n/languages.ts` (`SUPPORTED_LANGUAGES`, `PACK_LANGS`, `NON_EN_LANGS`), `PackLang` in `src/types.ts`, and `OG_LOCALE` in `src/head.ts`.
3. `npm run locales:index && npm run build`, then run `npm start` and `npm run verify`.
