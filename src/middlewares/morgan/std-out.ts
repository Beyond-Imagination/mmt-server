import { FormatBuilder, toolkit, TokenPainter, TokenParser } from './toolkit';

export const StdOut = (options = {}): any =>
	toolkit(
		(tokens, req, res) => {
			const parserToken = TokenParser.parse(tokens, req, res);
			const colorizedToken = TokenPainter.paintColor(parserToken);

			return FormatBuilder.build(null, colorizedToken);
		},
		{
			skip(req) {
				const { url } = req;

				const skipFilter = [
					/\/font/,
					/\/image/,
					/\/js/,
					/\/scss/,
					/\/thridParty/,
					/\/ELB-HealthChecker/
				];

				return skipFilter.some(reg => reg.test(url));
			},
			...options
		}
	);
