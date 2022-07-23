import i18n from 'sveltekit-i18n'
import parser from '@sveltekit-i18n/parser-default'
import type { Config, Parser } from '@sveltekit-i18n/parser-default'

export interface Payload extends Parser.PayloadDefault {
	paymentType?: string
	direction?: string
	status?: string
	feeType?: string
}

const config: Config<Payload> = {
	loaders: [
		{
			locale: 'en',
			key: 'app',
			loader: async () => import('./en.json')
		}
	],
	parser: parser()
}

export const { t, locale, locales, loading, loadTranslations } = new i18n<Parser.Params<Payload>>(
	config
)
